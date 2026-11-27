export interface Book {
  title: string;
  author: string;
  tags: string[];
  summary: string; // two short lines
}

export const BOOKS: Book[] = [
  { title: "In Defense of Food", author: "Michael Pollan", tags: ["food", "diet", "nutrition", "eating", "health"], summary: "Eat food, not too much, mostly plants.\nA short guide to escaping processed food and nutrition hype." },
  { title: "The Omnivore's Dilemma", author: "Michael Pollan", tags: ["food", "farming", "eating", "agriculture"], summary: "Follows four meals back to where they came from.\nShows how industrial, organic and foraged food really differ." },
  { title: "How Not to Die", author: "Michael Greger", tags: ["diet", "nutrition", "health", "plant-based", "disease"], summary: "Links everyday foods to the top causes of early death.\nMakes the evidence case for a whole-food, plant-based diet." },
  { title: "Salt, Fat, Acid, Heat", author: "Samin Nosrat", tags: ["food", "cooking", "recipes", "kitchen"], summary: "Teaches the four elements behind every good dish.\nCook by understanding, not just by following recipes." },
  { title: "The Obesity Code", author: "Jason Fung", tags: ["diet", "weight", "fasting", "insulin", "health"], summary: "Argues weight gain is driven by hormones, mostly insulin.\nMakes the case for intermittent fasting over calorie counting." },
  { title: "Salt Sugar Fat", author: "Michael Moss", tags: ["food", "industry", "processed", "diet", "nutrition"], summary: "An investigation into how food giants engineer cravings.\nReveals the science behind snacks you can't stop eating." },
  { title: "Atomic Habits", author: "James Clear", tags: ["habits", "productivity", "self-improvement", "behavior"], summary: "Tiny changes compound into remarkable results.\nA practical system for building good habits and breaking bad ones." },
  { title: "Deep Work", author: "Cal Newport", tags: ["focus", "productivity", "work", "career"], summary: "Distraction-free focus is a rare and valuable skill.\nRules for training your attention in a noisy world." },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", tags: ["psychology", "decisions", "mind", "behavior", "economics"], summary: "Two systems drive how we think: fast intuition and slow reason.\nExplains the biases that quietly shape our choices." },
  { title: "Sapiens", author: "Yuval Noah Harari", tags: ["history", "humanity", "evolution", "society"], summary: "A brief history of humankind from foragers to the present.\nShows how shared stories let us cooperate at huge scale." },
  { title: "Why We Sleep", author: "Matthew Walker", tags: ["sleep", "health", "science", "brain"], summary: "Sleep is the foundation of health, memory and mood.\nExplains what we lose when we cut it short." },
  { title: "Outlive", author: "Peter Attia", tags: ["health", "longevity", "fitness", "exercise", "nutrition"], summary: "A playbook for living longer and better.\nCovers exercise, nutrition, sleep and early disease prevention." },
  { title: "Born to Run", author: "Christopher McDougall", tags: ["running", "fitness", "exercise", "adventure"], summary: "The story of a hidden tribe of super-athletes in Mexico.\nMakes the case that humans were born to run." },
  { title: "The Psychology of Money", author: "Morgan Housel", tags: ["money", "finance", "investing", "behavior"], summary: "Doing well with money is about behavior, not intelligence.\nShort stories on greed, luck, risk and patience." },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", tags: ["money", "finance", "wealth", "investing"], summary: "Two father figures, two very different money mindsets.\nArgues for building assets instead of working for a paycheck." },
  { title: "Clean Code", author: "Robert C. Martin", tags: ["programming", "software", "code", "engineering"], summary: "Code is read far more than it is written.\nPrinciples for writing software that stays easy to change." },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", tags: ["programming", "software", "career", "engineering"], summary: "Timeless habits of effective software developers.\nPractical tips on craft, tooling and taking responsibility." },
  { title: "The Manager's Path", author: "Camille Fournier", tags: ["leadership", "management", "engineering", "career", "team"], summary: "A guide for tech leaders from mentor to CTO.\nCovers each step of the engineering management ladder." },
  { title: "Radical Candor", author: "Kim Scott", tags: ["leadership", "management", "feedback", "team"], summary: "Care personally while challenging directly.\nA framework for honest feedback that builds great teams." },
  { title: "Dune", author: "Frank Herbert", tags: ["science fiction", "sci-fi", "fiction", "space", "adventure"], summary: "A young heir is thrown into a war over a desert planet.\nPolitics, ecology and prophecy in a sci-fi classic." },
  { title: "Project Hail Mary", author: "Andy Weir", tags: ["science fiction", "sci-fi", "fiction", "space", "science"], summary: "A lone astronaut wakes up with no memory on a rescue mission.\nA funny, science-packed race to save Earth." },
  { title: "The Hobbit", author: "J.R.R. Tolkien", tags: ["fantasy", "fiction", "adventure", "classic"], summary: "A home-loving hobbit is swept into a quest for dragon gold.\nThe gentle start to Middle-earth." },
  { title: "Gone Girl", author: "Gillian Flynn", tags: ["thriller", "mystery", "fiction", "crime"], summary: "A wife vanishes and her husband becomes the suspect.\nA twisty thriller about marriage and lies." },
  { title: "The Silent Patient", author: "Alex Michaelides", tags: ["thriller", "mystery", "fiction", "psychology"], summary: "A painter shoots her husband, then never speaks again.\nA therapist sets out to uncover why." },
  { title: "Pride and Prejudice", author: "Jane Austen", tags: ["romance", "classic", "fiction", "love"], summary: "Elizabeth Bennet spars with the proud Mr. Darcy.\nA witty classic about first impressions and love." },
  { title: "Meditations", author: "Marcus Aurelius", tags: ["philosophy", "stoicism", "mind", "classic"], summary: "Private notes of a Roman emperor on living well.\nStoic advice on duty, calm and what we control." },
  { title: "Man's Search for Meaning", author: "Viktor Frankl", tags: ["psychology", "philosophy", "meaning", "history"], summary: "A psychiatrist's account of surviving the Holocaust.\nArgues that finding meaning helps us endure anything." },
  { title: "A Brief History of Time", author: "Stephen Hawking", tags: ["science", "physics", "space", "universe"], summary: "Black holes, the Big Bang and the nature of time.\nBig physics explained for curious non-scientists." },
  { title: "The Body", author: "Bill Bryson", tags: ["science", "health", "body", "biology"], summary: "A tour of the human body from head to toe.\nFull of surprising facts and Bryson's humor." },
  { title: "Kitchen Confidential", author: "Anthony Bourdain", tags: ["food", "cooking", "memoir", "restaurants"], summary: "A chef's raw tour of life behind restaurant doors.\nFunny, profane and full of love for food." },
  { title: "Becoming", author: "Michelle Obama", tags: ["memoir", "biography", "politics", "life"], summary: "From Chicago's South Side to the White House.\nA candid memoir about identity, family and purpose." },
  { title: "Steve Jobs", author: "Walter Isaacson", tags: ["biography", "business", "technology", "startups"], summary: "The life of Apple's demanding, visionary co-founder.\nBased on more than forty interviews with Jobs." },
];
