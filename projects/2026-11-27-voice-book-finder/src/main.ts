import { BOOKS, type Book } from "./books.js";

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const form = $<HTMLFormElement>("form");
const input = $<HTMLInputElement>("q");
const mic = $<HTMLButtonElement>("mic");
const statusEl = $<HTMLDivElement>("status");
const results = $<HTMLOListElement>("results");

const say = (msg: string) => (statusEl.textContent = msg);
const bookText = (b: Book) => `${b.title}. ${b.tags.join(", ")}. ${b.summary}`;

// ---- Small open-source model: all-MiniLM-L6-v2 sentence embeddings via Transformers.js ----
type Embed = (texts: string[]) => Promise<number[][]>;
const TRANSFORMERS_URL = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1";

async function loadModel(): Promise<Embed> {
  const { pipeline } = await import(/* @vite-ignore */ TRANSFORMERS_URL as string);
  const extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  return async (texts) => (await extractor(texts, { pooling: "mean", normalize: true })).tolist();
}

let embed: Embed | null = null;
let bookVectors: number[][] | null = null;
const ready = loadModel()
  .then(async (e) => {
    embed = e;
    bookVectors = await e(BOOKS.map(bookText));
    say("Model ready (all-MiniLM-L6-v2). Ask away.");
  })
  .catch((err) => {
    console.warn("Model failed to load, using keyword matching", err);
    say("Model unavailable, using keyword matching.");
  });
say("Loading small model…");

const dot = (a: number[], b: number[]) => a.reduce((s, v, i) => s + v * b[i], 0);

const STOP = new Set("want read book books about something some like the and for with that this give recommend".split(" "));

function keywordScore(query: string, b: Book): number {
  const words = (query.toLowerCase().match(/[a-z]+/g) ?? []).filter((w) => !STOP.has(w));
  const hay = bookText(b).toLowerCase();
  return words.filter((w) => w.length > 2 && hay.includes(w)).length;
}

async function recommend(query: string): Promise<Book[]> {
  let scores: number[];
  if (embed && bookVectors) {
    const [q] = await embed([query]);
    // Blend semantic similarity with a small keyword boost for exact topic hits.
    scores = bookVectors.map((v, i) => dot(q, v) + 0.05 * keywordScore(query, BOOKS[i]));
  } else {
    scores = BOOKS.map((b) => keywordScore(query, b));
  }
  return BOOKS.map((b, i) => ({ b, s: scores[i] }))
    .sort((x, y) => y.s - x.s)
    .slice(0, 3)
    .map((x) => x.b);
}

// ---- Voice out: Web Speech synthesis ----
function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

function render(books: Book[]) {
  results.innerHTML = "";
  for (const b of books) {
    const li = document.createElement("li");
    li.innerHTML = `<h2></h2><div class="author"></div><p></p>`;
    li.querySelector("h2")!.textContent = b.title;
    li.querySelector(".author")!.textContent = b.author;
    li.querySelector("p")!.innerText = b.summary;
    results.append(li);
  }
}

// The mic must never be open while we talk, or it hears the results and searches them again.
let micClosed: Promise<void> = Promise.resolve();
let micSessions = 0;

async function handle(query: string) {
  if (!query.trim()) return;
  const sessionsAtStart = micSessions;
  say("Thinking…");
  await ready;
  const top = await recommend(query);
  render(top);
  await micClosed;
  // The mic was turned on again during this search: show the books, but don't talk over the user.
  if (micSessions !== sessionsAtStart) return;
  say(`Top 3 for "${query}"`);
  speak(
    "Here are three picks. " +
      top.map((b, i) => `${i + 1}: ${b.title} by ${b.author}. ${b.summary.replace("\n", " ")}`).join(" ")
  );
}

let discardMic = () => {}; // set below when speech recognition is supported

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value.trim()) return;
  discardMic();
  handle(input.value);
});

// ---- Voice in: Web Speech recognition ----
const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
if (!SR) {
  mic.disabled = true;
  mic.title = "Speech recognition not supported in this browser (try Chrome or Edge)";
} else {
  const rec = new SR();
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.continuous = false;
  let accepting = false; // true until this session's request is taken or thrown away
  let markClosed = () => {};
  let gotOutcome = false; // this session produced a result or showed an error
  rec.onresult = (e: any) => {
    // Some browsers keep listening and send more results, so take only the first final one.
    if (!accepting) return;
    const final = Array.from(e.results as ArrayLike<any>).slice(e.resultIndex).find((r) => r.isFinal);
    if (!final) return;
    accepting = false;
    gotOutcome = true;
    input.value = final[0].transcript;
    rec.abort(); // unlike stop(), this can't deliver another result
    handle(final[0].transcript); // shows the books now, speaks only after the mic has closed
  };
  let listening = false;
  let stoppedByUser = false;
  rec.onend = () => {
    listening = false;
    accepting = false;
    mic.classList.remove("listening");
    markClosed();
    if (!gotOutcome) say("Stopped listening.");
  };
  rec.onerror = (e: any) => {
    // Stopping before saying anything is not an error worth showing.
    if (stoppedByUser && e.error === "no-speech") return;
    // Our own abort(), after taking or discarding the request.
    if (!accepting && e.error === "aborted") return;
    gotOutcome = true;
    say(`Mic error: ${e.error}`);
  };
  mic.addEventListener("click", () => {
    // start() throws if recognition is already running, so a second click means "done speaking":
    // stop() still returns a result for audio already captured (abort() would discard it).
    if (listening) {
      stoppedByUser = true;
      return rec.stop();
    }
    stoppedByUser = false;
    gotOutcome = false;
    speechSynthesis.cancel();
    micSessions++;
    mic.classList.add("listening");
    say("Listening…");
    rec.start();
    listening = true;
    accepting = true;
    micClosed = new Promise((resolve) => (markClosed = resolve));
  });
  // A typed search replaces whatever the mic was about to hear.
  discardMic = () => {
    if (!listening) return;
    accepting = false;
    gotOutcome = true;
    rec.abort();
  };
}
