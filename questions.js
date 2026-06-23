// ============================================================
//  MPG2026 – P09 Relative Clauses Review Quiz
//  Post-lesson review activity – Relative Clauses
// ============================================================

const QUIZ_META = {
  courseID: "MPG2026",
  lessonID: "P09",
  quizID:   "MPG2026_P09",
  title:    "Modern Pronunciation and Grammar 2026",
  subtitle: "Relative Clauses – Review Quiz",
};

const SECTIONS = [
  { name: "Multiple Choice",  questions: [1,2,3,4,5,6,7,8,9,10] },
  { name: "Word Order",       questions: [11,12,13,14,15] },
  { name: "Short Answer",     questions: [16,17,18,19,20,21,22,23,24] },
  { name: "Dictation",        questions: [25,26,27] },
];

const COMMENT_BANDS = [
  { min: 25, max: 27, comment: "Excellent. You have a strong command of relative clauses in English." },
  { min: 20, max: 24, comment: "Good work. Your understanding of relative clauses is solid. Review relative pronouns in object position and relative adverbs." },
  { min: 14, max: 19, comment: "Developing. Focus on choosing the right relative pronoun or adverb, and practise combining sentences with who, which, that, where, and when." },
  { min:  8, max: 13, comment: "Keep working. Review how to use who, which, that, where, and when to connect ideas, and pay attention to subject and object position." },
  { min:  0, max:  7, comment: "Work harder. Start with the basics: how relative pronouns and adverbs connect a noun to a clause that gives more information about it." },
];

const CLOSING_NOTE = "Relative clauses help you build precise, connected sentences. Use who, which, that, where, when, and whose to add information and combine ideas naturally.";

const QUESTIONS = [

  // ── Section 1: Multiple Choice ───────────────────────────────

  {
    id: 1, section: 1, type: "mc",
    stem: "The researcher _____ conducted the survey presented the results.",
    options: {
      A: "whom",
      B: "who",
      C: "whose",
      D: "where",
    },
    correct: "B",
    explanation: "The relative pronoun is the subject of 'conducted' — the researcher conducted the survey. Use 'who' for a person in subject position. 'Whom' is the object form ('the researcher whom I interviewed').",
  },
  {
    id: 2, section: 1, type: "mc",
    stem: "The article _____ I read yesterday was highly informative.",
    options: {
      A: "who",
      B: "which",
      C: "where",
      D: "whose",
    },
    correct: "B",
    explanation: "An article is a thing — use 'which' or 'that.' The article is the object of 'read,' so 'that' or zero (no pronoun) would also be possible in natural English. 'Who' and 'whose' are for people. 'Where' is for places.",
  },
  {
    id: 3, section: 1, type: "mc",
    stem: "The student _____ research proposal was approved will begin collecting data next month.",
    options: {
      A: "who",
      B: "whom",
      C: "whose",
      D: "which",
    },
    correct: "C",
    explanation: "'Whose' shows possession: 'the student's research proposal was approved.' Use 'whose' when the noun that follows belongs to the antecedent.",
  },
  {
    id: 4, section: 1, type: "mc",
    stem: "The university _____ I studied has an excellent library.",
    options: {
      A: "where",
      B: "when",
      C: "why",
      D: "whose",
    },
    correct: "A",
    explanation: "We study AT a university — the university is a location. Use 'where': 'the university where I studied.' Compare Q5: 'the university which I visited' — visited takes a direct object, so use 'which' or 'that' there.",
  },
  {
    id: 5, section: 1, type: "mc",
    stem: "The university _____ I visited last year has an excellent library.",
    options: {
      A: "where",
      B: "when",
      C: "which",
      D: "whose",
    },
    correct: "C",
    explanation: "'I visited the university' — the university is the direct object of 'visited.' Use 'which' or 'that.' 'Where' is not correct here because the university is the object, not the location of the visiting.",
  },
  {
    id: 6, section: 1, type: "mc",
    stem: "The year _____ I entered university was 2023.",
    options: {
      A: "where",
      B: "when",
      C: "why",
      D: "whose",
    },
    correct: "B",
    explanation: "'The year' is a time expression. Use 'when' for time nouns: 'the year when I entered university.' 'Where' is for places. 'Why' is for reasons.",
  },
  {
    id: 7, section: 1, type: "mc",
    stem: "The reason _____ many students choose this program is its international focus.",
    options: {
      A: "where",
      B: "when",
      C: "why",
      D: "whose",
    },
    correct: "C",
    explanation: "After 'reason,' use 'why': 'the reason why many students choose this program.' 'Why' introduces the cause or reason. 'Where' is for places. 'When' is for time.",
  },
  {
    id: 8, section: 1, type: "mc",
    stem: "Professor Tanaka, _____ teaches sociolinguistics, gave the keynote speech.",
    options: {
      A: "who",
      B: "that",
      C: "whom",
      D: "where",
    },
    correct: "A",
    explanation: "Professor Tanaka is already identified by name, so the clause adds information — commas are used. With commas, use 'who' for a person. 'That' is never used in a clause with commas. 'Whom' is the object form, but here the pronoun is the subject of 'teaches.'",
  },
  {
    id: 9, section: 1, type: "mc",
    stem: "The researcher _____ I interviewed yesterday specialises in bilingual education.",
    options: {
      A: "who",
      B: "whom",
      C: "whose",
      D: "where",
    },
    correct: "B",
    explanation: "'I interviewed the researcher' — the researcher is the object of 'interviewed.' 'Whom' is the formal object form. In everyday English, 'who,' 'that,' or zero (no pronoun) are also common, but 'whom' is the most accurate answer here.",
  },
  {
    id: 10, section: 1, type: "mc",
    stem: "The proposal _____ the committee rejected generated considerable discussion.",
    options: {
      A: "which",
      B: "whose",
      C: "where",
      D: "why",
    },
    correct: "A",
    explanation: "The proposal is the object of 'rejected.' Use 'which' or 'that' for a thing in object position. 'Whose' shows possession. 'Where' and 'why' are relative adverbs for places and reasons.",
  },

  // ── Section 2: Word Order ────────────────────────────────────

  {
    id: 11, section: 2, type: "dragdrop",
    instruction: "Arrange the word blocks to make a correct phrase.",
    fixedStart: [],
    blocks: ["the", "woman", "who", "whom", "I", "spoke", "to", "yesterday"],
    correct: ["the", "woman", "who", "I", "spoke", "to", "yesterday"],
    explanation: "Natural order: 'the woman who I spoke to yesterday.' The preposition 'to' stays at the end. Formal alternative: 'the woman to whom I spoke yesterday' — 'to' moves before 'whom.' Both are correct English.",
  },
  {
    id: 12, section: 2, type: "dragdrop",
    instruction: "Arrange the word blocks to make a correct phrase.",
    fixedStart: [],
    blocks: ["the", "city", "that", "which", "they", "moved", "to", "last", "year"],
    correct: ["the", "city", "that", "they", "moved", "to", "last", "year"],
    explanation: "Natural order: 'the city that they moved to last year.' The preposition 'to' stays at the end. Formal alternative: 'the city to which they moved last year.' Both are correct.",
  },
  {
    id: 13, section: 2, type: "dragdrop",
    instruction: "Arrange the word blocks to make a correct phrase.",
    fixedStart: [],
    blocks: ["the", "company", "which", "my", "brother", "works", "for"],
    correct: ["the", "company", "my", "brother", "works", "for"],
    explanation: "Natural order: 'the company my brother works for' — the relative pronoun is omitted (zero relative). Formal alternative: 'the company for which my brother works.' We say 'work for a company,' so the preposition 'for' belongs with the verb.",
  },
  {
    id: 14, section: 2, type: "dragdrop",
    instruction: "Arrange the word blocks to make a correct phrase.",
    fixedStart: [],
    blocks: ["the", "school", "which", "she", "graduated", "from"],
    correct: ["the", "school", "which", "she", "graduated", "from"],
    explanation: "Natural order: 'the school which she graduated from.' The preposition 'from' stays at the end. Formal alternative: 'the school from which she graduated.' We say 'graduate from a school.'",
  },
  {
    id: 15, section: 2, type: "dragdrop",
    instruction: "Arrange the word blocks to make a correct phrase.",
    fixedStart: [],
    blocks: ["the", "candidate", "whom", "many", "people", "voted", "for"],
    correct: ["the", "candidate", "whom", "many", "people", "voted", "for"],
    explanation: "Natural order: 'the candidate whom many people voted for.' The preposition 'for' stays at the end. Formal alternative: 'the candidate for whom many people voted.' We say 'vote for a candidate.'",
  },

  // ── Section 3: Short Answer ──────────────────────────────────

  {
    id: 16, section: 3, type: "mc",
    stem: "Complete the sentence.\n\nThe chef _____ created the award-winning menu opened a second restaurant.",
    options: {
      A: "who",
      B: "whom",
      C: "whose",
      D: "where",
    },
    correct: "A",
    explanation: "The relative pronoun is the subject of 'created.' Use 'who' for a person in subject position. 'Whom' is the object form. 'Whose' shows possession. 'Where' is for places.",
  },
  {
    id: 17, section: 3, type: "mc",
    stem: "Complete the sentence.\n\nThe documentary _____ director won an award was shown in class.",
    options: {
      A: "whose",
      B: "who",
      C: "where",
      D: "whom",
    },
    correct: "A",
    explanation: "'Whose' shows possession: the documentary's director won an award. Use 'whose' when the noun after the blank belongs to the thing mentioned.",
  },
  {
    id: 18, section: 3, type: "mc",
    stem: "Complete the sentence.\n\nThe athlete _____ performance impressed the judges won the competition.",
    options: {
      A: "who",
      B: "whom",
      C: "whose",
      D: "which",
    },
    correct: "C",
    explanation: "'Whose' shows possession: the athlete's performance. Use 'whose' when the noun after the blank belongs to the person mentioned.",
  },
  {
    id: 19, section: 3, type: "mc",
    stem: "Complete the sentence.\n\nThe village _____ my grandfather was born attracts many tourists today.",
    options: {
      A: "which",
      B: "when",
      C: "that",
      D: "where",
    },
    correct: "D",
    explanation: "Someone is born IN a village — the village is a location. Use 'where.' Formal alternative: 'in which.'",
  },
  {
    id: 20, section: 3, type: "mc",
    stem: "Complete the sentence.\n\nThe decade _____ smartphones became common changed daily life dramatically.",
    options: {
      A: "when",
      B: "where",
      C: "why",
      D: "whose",
    },
    correct: "A",
    explanation: "'The decade' is a time expression. Use 'when' for time nouns.",
  },
  {
    id: 21, section: 3, type: "mc",
    stem: "Complete the sentence with the correct preposition.\n\nThe candidate _____ whom many people voted eventually won the election.",
    options: {
      A: "to",
      B: "for",
      C: "from",
      D: "with",
    },
    correct: "B",
    explanation: "We say 'vote FOR a candidate.' The formal relative structure places the preposition before 'whom': 'the candidate for whom many people voted.'",
  },
  {
    id: 22, section: 3, type: "mc",
    stem: "Complete the sentence with the correct preposition.\n\nThe professor _____ whom I learned a great deal has retired.",
    options: {
      A: "to",
      B: "with",
      C: "from",
      D: "for",
    },
    correct: "C",
    explanation: "We say 'learn FROM someone.' The formal structure places 'from' before 'whom': 'the professor from whom I learned a great deal.'",
  },
  {
    id: 23, section: 3, type: "mc",
    stem: "Complete the sentence.\n\nHiro is wearing the same jacket _____ his brother wore yesterday.",
    options: {
      A: "than",
      B: "that",
      C: "which",
      D: "as",
    },
    correct: "D",
    explanation: "After 'the same,' use 'as': 'the same jacket as his brother wore.'",
  },
  {
    id: 24, section: 3, type: "mc",
    stem: "Complete the sentence.\n\nThe company hired more employees _____ it did last year.",
    options: {
      A: "than",
      B: "as",
      C: "that",
      D: "which",
    },
    correct: "A",
    explanation: "After a comparative expression such as 'more,' use 'than.' Compare: 'as many employees as' for equal comparisons.",
  },

  // ── Section 4: Dictation ─────────────────────────────────────

  {
    id: 25, section: 4, type: "dictation",
    audio: "audio/p09_q25.mp3",
    correct: "The author who wrote this novel is Canadian.",
    note: "'Who wrote this novel' identifies the author. 'Who' is the subject of 'wrote' — it cannot be omitted.",
  },
  {
    id: 26, section: 4, type: "dictation",
    audio: "audio/p09_q26.mp3",
    correct: "The town where she grew up has changed.",
    note: "'She grew up in the town' — the town is a location. Use 'where.' Alternatively: 'the town that she grew up in' or 'the town she grew up in.'",
  },
  {
    id: 27, section: 4, type: "dictation",
    audio: "audio/p09_q27.mp3",
    correct: "The student whose phone rang apologized quickly.",
    note: "'Whose' shows possession: the student's phone rang. Use 'whose' when the noun that follows belongs to the person or thing in the main clause.",
  },

];
