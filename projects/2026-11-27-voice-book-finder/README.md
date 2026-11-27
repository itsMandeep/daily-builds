# Voice Book Finder

**What:** Say (or type) "I want to read a book about food or diet" and get the top 3 book picks, each with a two-line summary, read back to you out loud.

**Why:** A tiny experiment combining a small open-source model with browser voice APIs, no backend and no API keys.

**How it works**
- **Ranking model:** [all-MiniLM-L6-v2](https://huggingface.co/Xenova/all-MiniLM-L6-v2) (~23 MB) via Transformers.js, loaded from a CDN in the browser. It embeds your request and ~30 curated books (`src/books.ts`) and ranks by cosine similarity. If the model can't load, it falls back to keyword matching.
- **Voice in:** Web Speech API `SpeechRecognition` (Chrome / Edge).
- **Voice out:** `speechSynthesis` reads the three picks aloud.

**Run**
```bash
npm install
npm start        # builds with tsc and serves at http://localhost:3000
```
Open the page, tap 🎤, and speak. The first load downloads the model once (cached afterwards).
