// ============================================================
//  MPG2026 – P10 Comparison Review Quiz
//  Post-lesson review activity – Comparison
// ============================================================

const QUIZ_META = {
  courseID: "MPG2026",
  lessonID: "P10",
  quizID:   "MPG2026_P10",
  title:    "Modern Pronunciation and Grammar 2026",
  subtitle: "Comparison – Review Quiz",
};

const SECTIONS = [
  { name: "Multiple Choice", questions: [1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30] },
  { name: "Word Order",      questions: [5] },
  { name: "Dictation",       questions: [31,32,33] },
];

const COMMENT_BANDS = [
  { min: 30, max: 33, comment: "Excellent. You have a strong command of comparison structures in English." },
  { min: 25, max: 29, comment: "Good work. Your understanding of comparison is solid. Review comparative and superlative forms and any areas where you made errors." },
  { min: 17, max: 24, comment: "Developing. Focus on forming comparatives and superlatives correctly, and practise using as … as, more/less … than, and the … the … structures." },
  { min: 10, max: 16, comment: "Keep working. Review the rules for comparative and superlative adjectives and adverbs, and pay attention to irregular forms." },
  { min:  0, max:  9, comment: "Work harder. Start with the basics: how to compare two things using -er / more and how to express the highest degree using -est / most." },
];

const CLOSING_NOTE = "Comparison structures let you express degree and rank clearly. Practise comparative and superlative forms, as … as constructions, and the … the … patterns to build fluency.";

const QUESTIONS = [

  // ── Multiple Choice ──────────────────────────────────────────

  {
    id: 1, type: "mc",
    stem: "This smartwatch is much ________ than the previous model.",
    options: {
      A: "lighter",
      B: "more lighter",
      C: "lightier",
      D: "lightest",
    },
    correct: "A",
    explanation: "One-syllable adjectives add <em>-er</em> to form the comparative. 'More lighter' is a double comparative; 'lightier' is not a word; 'lightest' is a superlative.",
  },
  {
    id: 2, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "The river is wider than I expected.",
      B: "The river is wideer than I expected.",
      C: "The river is more wider than I expected.",
      D: "The river is widest than I expected.",
    },
    correct: "A",
    explanation: "'Wide' adds <em>-r</em> to form 'wider'. 'Wideer' is a misspelling; 'more wider' is a double comparative; 'widest' is a superlative, not a comparative.",
  },
  {
    id: 3, type: "mc",
    stem: "Which sentence contains a grammatical error?",
    options: {
      A: "This puzzle is much easier than the last one.",
      B: "Today's train is even more crowded than yesterday's.",
      C: "My new phone is more faster than my old one.",
      D: "Winter in Hokkaido is colder than in Tokyo.",
    },
    correct: "C",
    explanation: "'More faster' is a double comparative — both <em>more</em> and <em>-er</em> are used together. Use either 'faster' or 'more fast' (though 'faster' is the standard form).",
  },
  {
    id: 4, type: "mc",
    stem: "This camera is ________ more expensive than I expected.",
    options: {
      A: "much",
      B: "very",
      C: "too",
      D: "quite",
    },
    correct: "A",
    explanation: "<em>Much</em> intensifies a comparative adjective. 'Very', 'too', and 'quite' do not modify comparatives in standard grammar.",
  },

  // ── Word Order ───────────────────────────────────────────────

  {
    id: 5, type: "dragdrop",
    instruction: "Arrange the words to make a correct sentence. One word is unnecessary.",
    blocks: ["than", "much", "This", "computer", "is", "my", "faster", "old", "very", "one"],
    correct: ["This", "computer", "is", "much", "faster", "than", "my", "old", "one"],
  },

  // ── Multiple Choice (continued) ──────────────────────────────

  {
    id: 6, type: "mc",
    stem: "Choose the best English translation.<br>「このレストランは駅の近くの店よりずっと静かです。」",
    options: {
      A: "This restaurant is much quieter than the one near the station.",
      B: "This restaurant is very quieter than the one near the station.",
      C: "This restaurant is much quiet than the one near the station.",
      D: "This restaurant is quietest than the one near the station.",
    },
    correct: "A",
    explanation: "Use <em>much</em> to intensify a comparative. 'Quieter' is the correct comparative form. 'Very' cannot modify comparatives; 'quietest' is a superlative.",
  },
  {
    id: 7, type: "mc",
    stem: "Choose the sentence with the closest meaning.<br><br>Your computer is not as expensive as mine.",
    options: {
      A: "My computer is more expensive than you.",
      B: "My computer is more expensive than yours.",
      C: "My computer is very expensive than yours.",
      D: "My computer is as expensive as your computer.",
    },
    correct: "B",
    explanation: "'Not as expensive as mine' means my computer costs more. Compare like with like: 'than yours' (= your computer), not 'than you'.",
  },
  {
    id: 8, type: "mc",
    stem: "Choose the sentence with the closest meaning.<br><br>Your computer is not as expensive as mine.",
    options: {
      A: "My computer is more expensive than you.",
      B: "My computer is more expensive than yours.",
      C: "My computer is very expensive than yours.",
      D: "My computer is as expensive as your computer.",
    },
    correct: "B",
    explanation: "'Not as expensive as mine' means my computer costs more. Compare like with like: 'than yours' (= your computer), not 'than you'.",
  },
  {
    id: 9, type: "mc",
    stem: "Choose the sentence with the closest meaning.<br><br>This building is not taller than that one.",
    options: {
      A: "This building is as tall as that one or shorter.",
      B: "This building is shorter than that one.",
      C: "This building is exactly as tall as that one.",
      D: "This building is much shorter than that one.",
    },
    correct: "A",
    explanation: "'Not taller than' means the height is equal to or less than — it does not say which. Option B overclaims (shorter only); C overclaims (exactly equal); D adds 'much' which is not stated.",
  },
  {
    id: 10, type: "mc",
    stem: "Choose the best sentence.<br><br>(Blue Building: 120 m / White Building: 100 m)",
    options: {
      A: "The blue building is taller than the white building by 20 meters.",
      B: "The blue building is taller than the white building by 100 meters.",
      C: "The blue building is 20 meters tall than the white building.",
      D: "The blue building is more taller than the white building by 20 meters.",
    },
    correct: "A",
    explanation: "120 − 100 = 20 m difference. The pattern is <em>adjective + by + amount</em>. 'More taller' is a double comparative; 'tall than' omits the comparative marker.",
  },
  {
    id: 11, type: "mc",
    stem: "Choose the best English translation.<br>「私は今朝、朝5時という早い時間に起きました。」",
    options: {
      A: "I got up at early five this morning.",
      B: "I got up as earlier as five this morning.",
      C: "I got up as early as five this morning.",
      D: "I got up early than five this morning.",
    },
    correct: "C",
    explanation: "<em>As … as</em> is used for equality. 'As early as five' means five o'clock, considered an early hour. 'As earlier as' incorrectly uses the comparative inside the structure.",
  },
  {
    id: 12, type: "mc",
    stem: "Choose the best English translation.<br>「そのコンサートには200人もの人が集まりました。」",
    options: {
      A: "The concert attracted as much as 200 people.",
      B: "The concert attracted as many as 200 people.",
      C: "The concert attracted no more than 200 people.",
      D: "The concert attracted over 200 people.",
    },
    correct: "B",
    explanation: "Use <em>as many as</em> with countable nouns (people). 'As much as' is for uncountable quantities. 'No more than' means at most 200 — not the meaning of 「200人もの」.",
  },
  {
    id: 13, type: "mc",
    stem: "Choose the best English translation.<br>「このガソリン車はディーゼル車ほど燃費がよくありません。」",
    options: {
      A: "This gasoline car is not so fuel-efficient than diesel cars.",
      B: "This gasoline car is no less fuel-efficient than diesel cars.",
      C: "This gasoline car is not less fuel-efficient than diesel cars.",
      D: "This gasoline car is not as fuel-efficient as diesel cars.",
    },
    correct: "D",
    explanation: "「〜ほど…ない」= <em>not as … as</em>. 'Not so … than' is ungrammatical. Options B and C convey different meanings (no less = equally or more efficient).",
  },
  {
    id: 14, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "He is much young than I am.",
      B: "He is very younger than I am.",
      C: "He is by far youngest than I am.",
      D: "He is much younger than I am.",
    },
    correct: "D",
    explanation: "<em>Much</em> intensifies the comparative 'younger'. 'Very' does not modify comparatives; 'by far' is used with superlatives; 'young' is the base form, not the comparative.",
  },
  {
    id: 15, type: "mc",
    stem: "Choose the correct word.<br><br>There are ________ students in this class this year than last year.",
    options: {
      A: "less",
      B: "least",
      C: "fewer",
      D: "few",
    },
    correct: "C",
    explanation: "Use <em>fewer</em> with countable nouns (students). 'Less' is for uncountable quantities. 'Least' and 'few' are not comparative forms used with 'than'.",
  },
  {
    id: 16, type: "mc",
    stem: "Choose the correct word.<br><br>There is ________ traffic on Sundays than on weekdays.",
    options: {
      A: "fewer",
      B: "few",
      C: "less",
      D: "little",
    },
    correct: "C",
    explanation: "Use <em>less</em> with uncountable nouns (traffic). 'Fewer' is for countable nouns. 'Little' and 'few' are not comparative forms used with 'than'.",
  },
  {
    id: 17, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "This is the most easiest question on the test.",
      B: "This is the easiest question on the test.",
      C: "This is easiest question on the test.",
      D: "This is most easiest question on the test.",
    },
    correct: "B",
    explanation: "'Easy' forms the superlative as 'easiest' — not 'most easiest'. The definite article 'the' is required before a superlative adjective in this structure.",
  },
  {
    id: 18, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "This is by far the better restaurant in the city.",
      B: "This is by far best restaurant in the city.",
      C: "This is by far the best restaurant in the city.",
      D: "This is by far the most best restaurant in the city.",
    },
    correct: "C",
    explanation: "<em>By far</em> emphasises a superlative. 'The' is required before 'best'. 'Better' is a comparative; 'most best' is a double superlative.",
  },
  {
    id: 19, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "He is two years older than me.",
      B: "He is older than me two years.",
      C: "He is two years older to me.",
      D: "He is two years oldest than me.",
    },
    correct: "A",
    explanation: "The pattern for a measurement gap is: <em>amount + comparative + than</em>. 'Older to' and 'oldest than' are ungrammatical; placing the amount after 'me' is also non-standard.",
  },
  {
    id: 20, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "This smartphone is superior than the old model.",
      B: "This smartphone is superior to the old model.",
      C: "This smartphone is more superior than the old model.",
      D: "This smartphone is superior over the old model.",
    },
    correct: "B",
    explanation: "<em>Superior</em> is a Latin-origin comparative that takes <em>to</em>, not 'than'. 'More superior' is a double comparative; 'superior over' is ungrammatical.",
  },
  {
    id: 21, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "The climate of Hokkaido is colder than Osaka.",
      B: "The climate of Hokkaido is colder than that of Osaka.",
      C: "The climate of Hokkaido is colder than those of Osaka.",
      D: "The climate of Hokkaido is colder than Osaka's climate is.",
    },
    correct: "B",
    explanation: "Compare like with like: <em>the climate of Hokkaido</em> must be compared to <em>that of Osaka</em> (= the climate of Osaka). Option A compares a climate to a city.",
  },
  {
    id: 22, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "My car is newer than your.",
      B: "My car is newer than yours.",
    },
    correct: "B",
    explanation: "After 'than', use the possessive pronoun <em>yours</em> (= your car), not the possessive determiner 'your' alone.",
  },
  {
    id: 23, type: "mc",
    stem: "Choose the correct sentence.<br><br>Two students won first and second place in the speech contest.",
    options: {
      A: "Emily is the better of the two.",
      B: "Emily is the best of the two.",
      C: "Emily is better of the two.",
      D: "Emily is the better between the two.",
    },
    correct: "A",
    explanation: "When comparing exactly two items, use the comparative with <em>the … of the two</em>. The superlative 'best' is used for three or more. 'Between' does not replace 'of' in this pattern.",
  },
  {
    id: 24, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "Sakura is best in spring.",
      B: "Sakura is the best in spring.",
      C: "Sakura is better in spring.",
      D: "Sakura is most best in spring.",
    },
    correct: "A",
    explanation: "In this predicative, absolute use, no article is needed: <em>Sakura is best in spring</em>. 'Most best' is a double superlative; 'better' implies a specific comparison.",
  },
  {
    id: 25, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "The price of this laptop is more expensive than that one.",
      B: "This laptop is more expensive than that one.",
      C: "The price of this laptop is more high than that one.",
      D: "This laptop is more expensive than the price of that one.",
    },
    correct: "B",
    explanation: "Prices are not 'expensive' — products are. Comparing 'the price' to 'that one' (a laptop) is also a mismatch of types. The correct subject is the laptop itself.",
  },
  {
    id: 26, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "Nothing is taller than Mt. Fuji in Japan.",
      B: "Mt. Fuji is taller than any mountain in Japan.",
      C: "Mt. Fuji is taller than all mountains in Japan.",
      D: "No mountain is taller than any other mountain in Japan.",
    },
    correct: "A",
    explanation: "'Nothing is taller than Mt. Fuji in Japan' correctly expresses an absolute superlative using a negative comparative. Option B is problematic because Mt. Fuji is itself a mountain in Japan.",
  },
  {
    id: 27, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "The more you practice, you become more fluent.",
      B: "More you practice, the more fluent you become.",
      C: "The more you practice, the more fluent you become.",
      D: "The more you practice, the fluenter you become.",
    },
    correct: "C",
    explanation: "The <em>the … the …</em> structure requires both clauses to begin with 'the + comparative'. 'Fluenter' is not a word; 'more fluent' is the correct form.",
  },
  {
    id: 28, type: "mc",
    stem: "Choose the sentence with the closest meaning.<br><br>No sooner had I sat down than the meeting began.",
    options: {
      A: "The meeting began before I sat down.",
      B: "The meeting began immediately after I sat down.",
      C: "The meeting began while I was sitting down.",
      D: "The meeting began long after I sat down.",
    },
    correct: "B",
    explanation: "<em>No sooner … than</em> means 'immediately after'. The inverted word order (had + subject) signals a formal register. The meeting did not begin before or long after sitting down.",
  },
  {
    id: 29, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "This smartphone costs twice more than mine.",
      B: "This smartphone costs twice as much as mine.",
      C: "This smartphone costs twice much than mine.",
      D: "This smartphone costs twice as many as mine.",
    },
    correct: "B",
    explanation: "Multipliers use <em>as … as</em>: <em>twice as much as</em>. Cost is uncountable in this context, so 'much' not 'many'. 'Twice more than' is non-standard in formal English.",
  },
  {
    id: 30, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "This suitcase is half as heavy than mine.",
      B: "This suitcase is half so heavy as mine.",
      C: "This suitcase is half as heavy as mine.",
      D: "This suitcase is half heavier than mine.",
    },
    correct: "C",
    explanation: "Fractions use <em>as … as</em>: <em>half as heavy as</em>. 'Half as heavy than' is ungrammatical; 'so … as' is used in negative comparisons, not with fractions.",
  },

  // ── Dictation ────────────────────────────────────────────────

  {
    id: 31, type: "dictation",
    audio: "audio/p10_q31.mp3",
    correct: "Nothing is more important than good health.",
    note: "Uses the negative comparative pattern: <em>nothing is more … than</em> to express an absolute superlative idea.",
  },
  {
    id: 32, type: "dictation",
    audio: "audio/p10_q32.mp3",
    correct: "The more you practice, the more confident you become.",
    note: "The <em>the … the …</em> structure: both clauses begin with 'the + comparative' to show proportional change.",
  },
  {
    id: 33, type: "dictation",
    audio: "audio/p10_q33.mp3",
    correct: "This smartphone is superior to the old model.",
    note: "Latin-origin comparative <em>superior</em> takes <em>to</em>, not 'than'.",
  },

];
