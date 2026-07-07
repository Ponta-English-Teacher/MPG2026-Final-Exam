// ============================================================
//  MPG2026 – P11 Hypothetical & Unreal Expressions Quiz
//  Post-lesson review activity – Hypothetical & Unreal Expressions
// ============================================================

const QUIZ_META = {
  courseID: "MPG2026",
  lessonID: "P11",
  quizID:   "MPG2026_P11",
  title:    "Modern Pronunciation and Grammar 2026",
  subtitle: "Hypothetical & Unreal Expressions – Review Quiz",
};

const SECTIONS = [
  { name: "Multiple Choice",   questions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,27] },
  { name: "Fill in the Blank", questions: [16,17,18,19,20,26] },
  { name: "Word Order",        questions: [21,22,23,24,25] },
  { name: "Dictation",         questions: [28,29,30] },
];

const COMMENT_BANDS = [
  { min: 27, max: 30, comment: "Excellent. You have a strong command of hypothetical and unreal expressions in English." },
  { min: 22, max: 26, comment: "Good work. Your understanding of conditionals and unreal expressions is solid. Review any areas where you made errors." },
  { min: 15, max: 21, comment: "Developing. Focus on matching if-clauses with the correct result clause, and practise the wish / if only / as if structures." },
  { min:  8, max: 14, comment: "Keep working. Review the patterns for real, unlikely, present, past, and mixed conditionals." },
  { min:  0, max:  7, comment: "Work harder. Start with the basics: If + present, will … and If + past, would … ." },
];

const CLOSING_NOTE = "Hypothetical and unreal expressions let you imagine situations different from reality — from real possibilities to wishes and regrets. Practise the reality scale (real → unlikely → present hypothetical → past hypothetical → mixed), along with wish, if only, as if, and hidden conditionals like without and otherwise, to build fluency.";

const QUESTIONS = [

  // ── Multiple Choice ──────────────────────────────────────────

  {
    id: 1, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "If the lecture finishes early, we'll have lunch together.",
      B: "If the lecture will finish early, we'll have lunch together.",
      C: "If the lecture finished early, we'll have lunch together.",
      D: "If the lecture finishes early, we'd have lunch together.",
    },
    correct: "A",
    explanation: "Real conditionals use <em>If + present</em> in the if-clause and <em>will + verb</em> in the result clause. B wrongly puts 'will' in the if-clause; C shifts the if-clause to the past; D uses 'would', which doesn't match a real conditional.",
  },
  {
    id: 2, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "I wish I knew how to play the violin.",
      B: "I wish I know how to play the violin.",
      C: "I wish I had known how to play the violin.",
      D: "I wish I will know how to play the violin.",
    },
    correct: "A",
    explanation: "After <em>wish</em>, use the past form to show the wish isn't true now. 'Had known' would refer to the past, not now; 'know' and 'will know' don't fit the wish structure.",
  },
  {
    id: 3, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "If she had accepted the offer, she would have worked in London.",
      B: "If she would have accepted the offer, she would have worked in London.",
      C: "If she accepted the offer, she would have worked in London.",
      D: "If she had accepted the offer, she would work in London yesterday.",
    },
    correct: "A",
    explanation: "Past hypothetical: <em>If + had + past participle</em>, <em>would have + past participle</em>. B wrongly uses 'would have' in the if-clause too; C drops 'had'; D mixes a past if-clause with a present-tense result and 'yesterday'.",
  },
  {
    id: 4, type: "mc",
    stem: "Choose the best completion.<br><br>He speaks as if he ________ the answer already.",
    options: {
      A: "knows",
      B: "knew",
      C: "had known",
      D: "would know",
    },
    correct: "B",
    explanation: "<em>As if + past form</em> shows the speaker doubts the comparison is true right now.",
  },
  {
    id: 5, type: "mc",
    stem: "Choose the best completion.<br><br>Without your encouragement, I ________ the project.",
    options: {
      A: "wouldn't finish",
      B: "wouldn't have finished",
      C: "didn't finish",
      D: "won't finish",
    },
    correct: "B",
    explanation: "<em>Without</em> introduces a hidden conditional. Since the encouragement did happen, this describes an imagined past that didn't occur — <em>would have + past participle</em>.",
  },

  // ── Multiple Choice (continued) ──────────────────────────────

  {
    id: 6, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "If I were in your position, I would accept the scholarship.",
      B: "If I was in your position, I will accept the scholarship.",
      C: "If I am in your position, I would accept the scholarship.",
      D: "If I would be in your position, I would accept the scholarship.",
    },
    correct: "A",
    explanation: "Present hypothetical: <em>If + past ('were')</em>, <em>would + verb</em>. B mixes 'was' with 'will'; C keeps the if-clause in the present; D wrongly uses 'would be' in the if-clause.",
  },
  {
    id: 7, type: "mc",
    stem: "Choose the best completion.<br><br>It's time we ________ the meeting.",
    options: {
      A: "start",
      B: "started",
      C: "have started",
      D: "will start",
    },
    correct: "B",
    explanation: "<em>It's time + subject + past form</em> shows something should already be happening.",
  },
  {
    id: 8, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "I'd rather you don't mention this issue again.",
      B: "I'd rather you didn't mention this issue again.",
      C: "I'd rather you won't mention this issue again.",
      D: "I'd rather you not mentioning this issue again.",
    },
    correct: "B",
    explanation: "<em>I'd rather + subject + past form</em> expresses a preference about someone else's action; the past form softens it.",
  },
  {
    id: 9, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "She looked as though she had seen something frightening.",
      B: "She looked as though she has seen something frightening.",
      C: "She looked as though she saw something frightening.",
      D: "She looked as though she would have seen something frightening.",
    },
    correct: "A",
    explanation: "<em>As though + had + past participle</em> is used when the comparison refers to an earlier, completed event.",
  },
  {
    id: 10, type: "mc",
    stem: "Choose the best completion.<br><br>We started working on the project as soon as we received the assignment. Otherwise, we ________ the deadline.",
    options: {
      A: "would miss",
      B: "would have missed",
      C: "will have missed",
      D: "had missed",
    },
    correct: "B",
    explanation: "<em>Otherwise</em> introduces an imagined alternative past. Since we did start on time, this describes what would have happened if we hadn't — <em>would have + past participle</em>.",
  },
  {
    id: 11, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "If the museum had been open, we would have seen the exhibition.",
      B: "If the museum would have been open, we would have seen the exhibition.",
      C: "If the museum was open, we would have seen the exhibition.",
      D: "If the museum had been open, we will see the exhibition.",
    },
    correct: "A",
    explanation: "Past hypothetical: <em>If + had + past participle</em>, <em>would have + past participle</em>. B wrongly uses 'would have' in the if-clause too; C drops 'had'; D switches the result clause to 'will'.",
  },
  {
    id: 12, type: "mc",
    stem: "Choose the best completion.<br><br>If the translator had checked the document more carefully, she ________ the mistake.",
    options: {
      A: "would notice",
      B: "will notice",
      C: "would have noticed",
      D: "noticed",
    },
    correct: "C",
    explanation: "The if-clause uses <em>had + past participle</em>, so the result clause must match with <em>would have + past participle</em>.",
  },
  {
    id: 13, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "If my apartment were closer to campus, I would walk to class.",
      B: "If my apartment is closer to campus, I would walk to class.",
      C: "If my apartment had been closer to campus, I would walk to class now.",
      D: "If my apartment would be closer to campus, I would walk to class.",
    },
    correct: "A",
    explanation: "Present hypothetical: <em>If + past ('were')</em>, <em>would + verb</em>. B keeps the if-clause in the present; C wrongly uses 'had been' for a present situation; D wrongly uses 'would be' in the if-clause.",
  },
  {
    id: 14, type: "mc",
    stem: "Choose the best completion.<br><br>If I had saved the file before closing the laptop, I ________ all my notes.",
    options: {
      A: "wouldn't lose",
      B: "won't lose",
      C: "wouldn't have lost",
      D: "didn't lose",
    },
    correct: "C",
    explanation: "The if-clause uses <em>had + past participle</em>, so the result clause must match with <em>would have + past participle</em>.",
  },
  {
    id: 15, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "If the director had approved the plan, the event would be happening now.",
      B: "If the director approved the plan, the event would have happened now.",
      C: "If the director has approved the plan, the event would happen now.",
      D: "If the director had approved the plan, the event will happen now.",
    },
    correct: "A",
    explanation: "Mixed conditional: a past condition (<em>If + had + past participle</em>) leads to a present result (<em>would + verb</em>). B and D mismatch the clauses; C uses the present perfect instead of the past.",
  },
  {
    id: 16, type: "fillin",
    stem: "「もっと自信があればいいのに。」\nI ________ I were more confident.",
    correct: ["wish", "Wish"],
    explanation: "After <em>wish</em>, use the past form ('were') to show the wish isn't true now.",
  },
  {
    id: 17, type: "fillin",
    stem: "「もっと早く出発していればよかったのに。」\n________ ________ I had left earlier.",
    correct: ["If only", "if only"],
    explanation: "<em>If only</em> introduces a stronger wish or regret; 'had left' (past perfect) refers to something that didn't happen in the past.",
  },
  {
    id: 18, type: "fillin",
    stem: "「あなたがもっと静かに話してくれたらいいのに。」\nI'd ________ you spoke more quietly.",
    correct: ["rather", "Rather"],
    explanation: "<em>I'd rather + subject + past form</em> expresses a preference about someone else's action; the past form softens it.",
  },
  {
    id: 19, type: "fillin",
    stem: "「彼はまるですべてを知っているかのように話す。」\nHe speaks ________ ________ he knew everything.",
    correct: ["as if", "As if"],
    explanation: "<em>As if + past form</em> introduces an imaginary comparison that the speaker doubts is true.",
  },
  {
    id: 20, type: "fillin",
    stem: "「私たちは急いだ。そうでなければ飛行機に乗り遅れていただろう。」\nWe hurried. ________, we would have missed the flight.",
    correct: ["Otherwise", "otherwise"],
    explanation: "<em>Otherwise</em> means 'if this had not happened' and introduces the imagined alternative result with 'would have + past participle'.",
  },
  {
    id: 21, type: "dragdrop",
    instruction: "「もし私があなただったら、その申し出を受けるでしょう。」\nArrange the words to complete the sentence. One word is unnecessary.",
    blocks: ["If", "were", "I", "you", "would", "accept", "the", "offer", "are", "I"],
    correct: ["If", "I", "were", "you", "I", "would", "accept", "the", "offer"],
  },
  {
    id: 22, type: "dragdrop",
    instruction: "「もっと早く出発していればよかったのに。」\nArrange the words to complete the sentence. One word is unnecessary.",
    blocks: ["wish", "had", "left", "earlier", "I", "only", "I"],
    correct: ["I", "wish", "I", "had", "left", "earlier"],
  },
  {
    id: 23, type: "dragdrop",
    instruction: "「彼はまるですべてを知っているかのように話す。」\nArrange the words to complete the sentence. One word is unnecessary.",
    blocks: ["He", "speaks", "as", "if", "he", "knew", "everything", "is"],
    correct: ["He", "speaks", "as", "if", "he", "knew", "everything"],
  },
  {
    id: 24, type: "dragdrop",
    instruction: "「私は、あなたがそんなことを言わなければいいのに。」\nArrange the words to complete the sentence. One word is unnecessary.",
    blocks: ["I'd", "rather", "you", "didn't", "say", "that", "would"],
    correct: ["I'd", "rather", "you", "didn't", "say", "that"],
  },
  {
    id: 25, type: "dragdrop",
    instruction: "We ran fast.\n「そうでなければ、電車に乗り遅れていただろう。」\nArrange the words to complete the sentence. One word is unnecessary.",
    blocks: ["Otherwise", "we", "would", "have", "missed", "the", "train", "had"],
    correct: ["Otherwise", "we", "would", "have", "missed", "the", "train"],
  },
  {
    id: 26, type: "fillin",
    stem: "「もう帰った方がいい時間だ。」\nIt's ________ we went home.",
    correct: ["time", "Time"],
    explanation: "<em>It's time + subject + past form</em> expresses that something should already happen.",
  },
  {
    id: 27, type: "mc",
    stem: "Choose the correct sentence.",
    options: {
      A: "But for your advice, I would have made a serious mistake.",
      B: "But for your advice, I will make a serious mistake.",
      C: "But for your advice, I had made a serious mistake.",
      D: "But for your advice, I would make a serious mistake yesterday.",
    },
    correct: "A",
    explanation: "<em>But for + noun</em> expresses a hidden unreal conditional. The result uses <em>would have + past participle</em>.",
  },

  // ── Dictation ────────────────────────────────────────────────

  {
    id: 28, type: "dictation",
    audio: "audio/p11_q28.mp3",
    correct: "If I had known the truth, I would have apologized.",
    note: "Past hypothetical: <em>If + had + past participle</em>, <em>would have + past participle</em>.",
  },
  {
    id: 29, type: "dictation",
    audio: "audio/p11_q29.mp3",
    correct: "I wish I were a little more patient.",
    note: "After <em>wish</em>, use the past form ('were') to show the wish isn't true now.",
  },
  {
    id: 30, type: "dictation",
    audio: "audio/p11_q30.mp3",
    correct: "He behaves as if he were the king.",
    note: "<em>As if + past form ('were')</em> introduces an imaginary comparison the speaker doubts is true.",
  },

];
