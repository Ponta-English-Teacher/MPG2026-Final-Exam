/* ============================================================
   MPG2026 Quiz – script.js
   Vanilla JS, no dependencies.
   ============================================================ */

"use strict";

// ── Backend URL ────────────────────────────────────────────────
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw2rGaPKbCdqxQ-U-j_bXTBmQLrQfUAmBh8zG5nSy7bLHMgLFBx68YSk0a-mimEBfU_4A/exec";

// ── State ──────────────────────────────────────────────────────
// Unscored Course Feedback step — never affects the exam score.
function emptyFeedback() {
  return {
    classFeedback:        "",
    instructorGrade:      "",
    bonusPointsReported:  "",
    freeComments:         "",
  };
}

const state = {
  studentID: "",
  name:      "",
  current:   0,           // 0-based index
  answers:   {},          // { questionId: { value } } — raw answers only; correctness is
                          // computed on demand from these, never stored or shown pre-submission
  dragState: {},          // { questionId: [ordered tokens] }
  attempt:   0,   // ← ADD THIS LINE
  feedback:  emptyFeedback(),
  feedbackDone: false,    // true once the Course Feedback step has been completed
};

// ── Course Feedback (unscored, not part of QUESTIONS / scoring) ────────────
const FEEDBACK_NOTE =
  "These questions do not affect your exam score. They are used only for course evaluation.";

const CLASS_FEEDBACK_OPTIONS = [
  "I liked it very much.",
  "I liked it.",
  "It was okay.",
  "I did not like it very much.",
  "I did not like it.",
];

const INSTRUCTOR_GRADE_OPTIONS = ["A+", "A", "B", "C", "D", "F"];

const FREE_COMMENTS_PROMPT =
  "Write anything you would like to tell me about this class.\n\n" +
  "If there is anything I should consider when grading your performance in this class, please explain it here. " +
  "For example, you may mention unavoidable absences due to teaching practicum, special training, nursing-care " +
  "practicum (介護等実習), illness, or other important circumstances.";

// ── DOM refs ───────────────────────────────────────────────────
const $ = id => document.getElementById(id);

// ── Screens ───────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  $(id).classList.remove("hidden");
}

// ── Normalise dictation answer ─────────────────────────────────
function normaliseDictation(str) {
  return str
    .toLowerCase()
    .replace(/[.,!?;:'"]/g, "")   // remove punctuation
    .replace(/\s+/g, " ")          // collapse spaces
    .trim();
}

// ── Comment band lookup ────────────────────────────────────────
function getComment(score) {
  for (const band of COMMENT_BANDS) {
    if (score >= band.min && score <= band.max) return band.comment;
  }
  return COMMENT_BANDS[COMMENT_BANDS.length - 1].comment;
}

// ── Section for question id ───────────────────────────────────
function getSectionInfo(qId) {
  return SECTIONS.find(s => s.questions.includes(qId));
}

// ============================================================
//  CORRECTNESS  (computed only at submission time — never surfaced
//  to the student during the exam; this is a real final exam, not
//  a practice quiz, so nothing here may drive UI feedback pre-submit)
// ============================================================

function dragDropArranged(q) {
  const arranged = state.dragState[q.id];
  return Array.isArray(arranged) ? arranged : [];
}

function isMCCorrect(q, ans) {
  return !!(ans && ans.value === q.correct);
}

function isDragDropCorrect(q) {
  const arranged = dragDropArranged(q);
  if (arranged.length === 0) return false;
  const fullArranged = [...(q.fixedStart || []), ...arranged];
  const fullStr = JSON.stringify(fullArranged);
  return Array.isArray(q.corrects)
    ? q.corrects.some(c => JSON.stringify(c) === fullStr)
    : fullStr === JSON.stringify(q.correct);
}

function isFillinCorrect(q, ans) {
  if (!ans || !ans.value) return false;
  const typed    = ans.value.trim().toLowerCase();
  const accepted = Array.isArray(q.correct) ? q.correct : [q.correct];
  return accepted.some(a => a.toLowerCase() === typed);
}

function isDictationCorrect(q, ans) {
  if (!ans || !ans.value) return false;
  return normaliseDictation(ans.value) === normaliseDictation(q.correct);
}

function isDictationAnalysisCorrect(q, ans) {
  if (!ans || !ans.dictValue || !ans.analysisValue) return false;
  const dictOK   = normaliseDictation(ans.dictValue) === normaliseDictation(q.correct);
  const analysOK = ans.analysisValue === q.correctAnalysis;
  return dictOK && analysOK;
}

function isCorrect(q) {
  const ans = state.answers[q.id];
  switch (q.type) {
    case "mc":                return isMCCorrect(q, ans);
    case "dragdrop":           return isDragDropCorrect(q);
    case "fillin":             return isFillinCorrect(q, ans);
    case "dictation":          return isDictationCorrect(q, ans);
    case "dictation_analysis": return isDictationAnalysisCorrect(q, ans);
    default:                   return false;
  }
}

// ── Has the student answered this question? Drives whether "Next" is
// enabled. This is presence-of-an-answer only — it never reveals or
// implies correctness. ──────────────────────────────────────────────
function isAnswered(q) {
  const ans = state.answers[q.id];
  switch (q.type) {
    case "mc":                return !!(ans && ans.value);
    case "dragdrop":           return dragDropArranged(q).length > 0;
    case "fillin":             return !!(ans && ans.value && ans.value.trim());
    case "dictation":          return !!(ans && ans.value && ans.value.trim());
    case "dictation_analysis": return !!(ans && ans.dictValue && ans.dictValue.trim() && ans.analysisValue);
    default:                   return false;
  }
}

function refreshNextButton() {
  $("btn-next").disabled = !isAnswered(QUESTIONS[state.current]);
}

// ── Score calculation — computed once, only at submission ──────────
function calcScore() {
  let total = 0;
  for (const q of QUESTIONS) {
    if (isCorrect(q)) total++;
  }
  return total;
}

// ============================================================
//  QUESTION RENDERING
// ============================================================

function renderQuestion(index) {
  const q = QUESTIONS[index];
  const container = $("question-container");
  container.innerHTML = "";

  // ── Progress bar ──
  const pct = Math.round(((index + 1) / QUESTIONS.length) * 100);
  $("progress-fill").style.width = pct + "%";
  $("progress-text").textContent = `Question ${index + 1} of ${QUESTIONS.length}`;
  $("progress-pct").textContent  = pct + "%";

  // ── Section label ──
  const secInfo = getSectionInfo(q.id);
  const sectionEl = document.createElement("div");
  sectionEl.className = "section-label";
  sectionEl.textContent = secInfo ? secInfo.name.toUpperCase() : "";
  container.appendChild(sectionEl);

  // ── Question number ──
  const numEl = document.createElement("div");
  numEl.className = "question-number";
  numEl.textContent = `Q${q.id}`;
  container.appendChild(numEl);

  // ── Dispatch to type-specific renderer ──
  if (q.type === "mc")                renderMC(q, container);
  else if (q.type === "dragdrop")     renderDragDrop(q, container);
  else if (q.type === "dictation")    renderDictation(q, container);
  else if (q.type === "dictation_analysis") renderDictationAnalysis(q, container);
  else if (q.type === "fillin")           renderFillin(q, container);

  // ── Nav buttons ──
  $("btn-back").disabled = (index === 0);
  $("btn-next").textContent =
    index === QUESTIONS.length - 1 ? "Continue to Course Feedback →" : "Next →";
  refreshNextButton();
}

// ── Multiple Choice ────────────────────────────────────────────
// Real-exam behavior: no Check button, no correct/incorrect feedback.
// The chosen option is saved silently and can be changed at any time
// before the exam is submitted.
function renderMC(q, container) {
  const stem = document.createElement("div");
  stem.className = "question-stem";
  stem.innerHTML = q.stem;
  container.appendChild(stem);

  const list = document.createElement("div");
  list.className = "options-list";

  const saved = state.answers[q.id];

  for (const [key, label] of Object.entries(q.options)) {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.dataset.key = key;
    btn.innerHTML = `<span class="option-key">${key}</span> ${label}`;

    if (saved && saved.value === key) btn.classList.add("selected");

    btn.addEventListener("click", () => {
      list.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      state.answers[q.id] = { value: key };
      saveProgress();
      refreshNextButton();
    });

    list.appendChild(btn);
  }
  container.appendChild(list);
}

// ── Drag and Drop ─────────────────────────────────────────────
// Real-exam behavior: no Check button, no correct/incorrect feedback.
// "Reset Sentence" just clears the current arrangement — it does not
// reveal anything about correctness.
function renderDragDrop(q, container) {
  const stem = document.createElement("div");
  stem.className = "question-stem";
  stem.textContent = q.instruction;
  container.appendChild(stem);

  const hint = document.createElement("div");
  hint.className = "drag-instruction";
  hint.textContent = "Drag the blocks into the correct order.";
  container.appendChild(hint);

  const savedOrder = state.dragState[q.id];

  // Current arrangement and pool state
  let arranged, pool;
  if (savedOrder) {
    arranged = [...savedOrder];
    pool = [];
  } else {
    arranged = [];
    // Shuffle pool
    pool = [...q.blocks].sort(() => Math.random() - 0.5);
  }

  // Fixed prefix — shown for questions where the first word(s) are anchored
  if (q.fixedStart && q.fixedStart.length) {
    const prefixDiv = document.createElement("div");
    prefixDiv.className = "drag-fixed-prefix";
    const prefixLabel = document.createElement("span");
    prefixLabel.className = "drag-fixed-label";
    prefixLabel.textContent = "Given:";
    prefixDiv.appendChild(prefixLabel);
    q.fixedStart.forEach(word => {
      const tok = document.createElement("span");
      tok.className = "drag-token locked";
      tok.textContent = word;
      prefixDiv.appendChild(tok);
    });
    container.appendChild(prefixDiv);
  }

  // Answer zone
  const ansLabel = document.createElement("div");
  ansLabel.className = "drag-zone-label";
  ansLabel.textContent = "Your sentence";
  container.appendChild(ansLabel);

  const ansZone = document.createElement("div");
  ansZone.className = "drag-answer-zone";
  ansZone.id = `ans-zone-${q.id}`;
  container.appendChild(ansZone);

  // Pool zone
  const poolLabel = document.createElement("div");
  poolLabel.className = "drag-zone-label";
  poolLabel.textContent = "Word blocks";
  container.appendChild(poolLabel);

  const poolZone = document.createElement("div");
  poolZone.className = "drag-pool-zone";
  poolZone.id = `pool-zone-${q.id}`;
  container.appendChild(poolZone);

  function makeToken(text, inAnswer) {
    const token = document.createElement("span");
    token.className = "drag-token";
    token.textContent = text;
    token.draggable = true;
    token.dataset.text = text;

    // Click to move between zones
    token.addEventListener("click", () => {
      if (inAnswer) {
        poolZone.appendChild(token);
        inAnswer = false;
      } else {
        ansZone.appendChild(token);
        inAnswer = true;
      }
      persistDragState(q.id, ansZone);
    });

    // Drag events
    token.addEventListener("dragstart", e => {
      token.classList.add("dragging");
      e.dataTransfer.setData("text/plain", text);
    });
    token.addEventListener("dragend", () => {
      token.classList.remove("dragging");
      persistDragState(q.id, ansZone);
    });

    return token;
  }

  // Populate zones
  if (savedOrder && savedOrder.length) {
    savedOrder.forEach(text => ansZone.appendChild(makeToken(text, true)));
    // pool has whatever's NOT in ansZone
    pool.forEach(text => poolZone.appendChild(makeToken(text, false)));
  } else {
    pool.forEach(text => poolZone.appendChild(makeToken(text, false)));
  }

  // Drop zone listeners
  [ansZone, poolZone].forEach(zone => {
    zone.addEventListener("dragover", e => {
      e.preventDefault();
      zone.classList.add("drag-over");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
    zone.addEventListener("drop", e => {
      e.preventDefault();
      zone.classList.remove("drag-over");
      const text = e.dataTransfer.getData("text/plain");

      // Find the token in its current home and move it
      const allTokens = document.querySelectorAll(`[data-text="${CSS.escape(text)}"]`);
      for (const tok of allTokens) {
        zone.appendChild(tok);
        break;
      }
      persistDragState(q.id, ansZone);
    });
  });

  // Reset button (clears the arrangement only — no correctness involved)
  const actionRow = document.createElement("div");
  actionRow.className = "check-btn-row";
  const resetBtn = document.createElement("button");
  resetBtn.className = "btn btn-secondary";
  resetBtn.textContent = "Reset Sentence";
  resetBtn.addEventListener("click", () => {
    ansZone.innerHTML = "";
    poolZone.innerHTML = "";
    q.blocks.forEach(text => poolZone.appendChild(makeToken(text, false)));
    delete state.dragState[q.id];
    delete state.answers[q.id];
    saveProgress();
    refreshNextButton();
  });
  actionRow.appendChild(resetBtn);
  container.appendChild(actionRow);
}

function persistDragState(qId, ansZone) {
  const tokens = [...ansZone.querySelectorAll(".drag-token")].map(t => t.dataset.text);
  state.dragState[qId] = tokens;
  state.answers[qId]   = { value: tokens };
  saveProgress();
  refreshNextButton();
}

// ── Fill-in-the-blank ────────────────────────────────────────
// Real-exam behavior: no Check button, no correct/incorrect feedback.
function renderFillin(q, container) {
  const stem = document.createElement("div");
  stem.className = "question-stem";
  stem.textContent = q.stem;
  container.appendChild(stem);

  const input = document.createElement("input");
  input.type        = "text";
  input.className   = "dictation-input";
  input.placeholder = "Type your answer…";
  input.style.width = "100%";
  const saved = state.answers[q.id];
  if (saved) input.value = saved.value || "";
  container.appendChild(input);

  input.addEventListener("input", () => {
    state.answers[q.id] = { value: input.value };
    saveProgress();
    refreshNextButton();
  });
}

// ── Dictation ─────────────────────────────────────────────────
// Real-exam behavior: no Check button, no correct/incorrect feedback.
function renderDictation(q, container) {
  const stem = document.createElement("div");
  stem.className = "question-stem";
  stem.textContent = "Listen and write the sentence you hear.";
  container.appendChild(stem);

  // Audio row
  const audioRow = document.createElement("div");
  audioRow.className = "audio-player-row";

  const playBtn = document.createElement("button");
  playBtn.className = "audio-play-btn";
  playBtn.innerHTML = "▶ Play Audio";

  const audio = new Audio(q.audio);
  playBtn.addEventListener("click", () => { audio.currentTime = 0; audio.play(); });

  const hint = document.createElement("span");
  hint.className = "audio-hint";
  hint.textContent = "You may replay as many times as you like.";

  audioRow.appendChild(playBtn);
  audioRow.appendChild(hint);
  container.appendChild(audioRow);

  // Text input
  const input = document.createElement("textarea");
  input.className    = "dictation-input";
  input.placeholder  = "Type what you hear…";
  input.rows         = 2;
  const saved = state.answers[q.id];
  if (saved) input.value = saved.value || "";
  container.appendChild(input);

  input.addEventListener("input", () => {
    state.answers[q.id] = { value: input.value };
    saveProgress();
    refreshNextButton();
  });
}

// ── Dictation + Analysis ──────────────────────────────────────
// Real-exam behavior: no Check button, no correct/incorrect feedback.
function renderDictationAnalysis(q, container) {
  // Dictation part
  const stem = document.createElement("div");
  stem.className = "question-stem";
  stem.textContent = "Listen and write the sentence you hear.";
  container.appendChild(stem);

  const audioRow = document.createElement("div");
  audioRow.className = "audio-player-row";
  const playBtn = document.createElement("button");
  playBtn.className = "audio-play-btn";
  playBtn.innerHTML = "▶ Play Audio";
  const audio = new Audio(q.audio);
  playBtn.addEventListener("click", () => { audio.currentTime = 0; audio.play(); });
  const hint = document.createElement("span");
  hint.className = "audio-hint";
  hint.textContent = "You may replay as many times as you like.";
  audioRow.appendChild(playBtn);
  audioRow.appendChild(hint);
  container.appendChild(audioRow);

  const input = document.createElement("textarea");
  input.className   = "dictation-input";
  input.placeholder = "Type what you hear…";
  input.rows        = 2;
  const saved = state.answers[q.id];
  if (saved) input.value = saved.dictValue || "";
  container.appendChild(input);

  input.addEventListener("input", () => {
    const existing = state.answers[q.id] || {};
    state.answers[q.id] = { ...existing, dictValue: input.value };
    saveProgress();
    refreshNextButton();
  });

  // Separator
  const sep = document.createElement("hr");
  sep.className = "analysis-separator";
  container.appendChild(sep);

  // Analysis sub-question
  const analysisLabel = document.createElement("div");
  analysisLabel.className = "analysis-label";
  analysisLabel.textContent = "Analysis question";
  container.appendChild(analysisLabel);

  const aStem = document.createElement("div");
  aStem.className = "question-stem";
  aStem.innerHTML = q.analysisQuestion;
  aStem.style.fontSize = "1rem";
  container.appendChild(aStem);

  const list = document.createElement("div");
  list.className = "options-list";

  for (const [key, label] of Object.entries(q.options)) {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.dataset.key = key;
    btn.innerHTML = `<span class="option-key">${key}</span> ${label}`;

    if (saved && saved.analysisValue === key) btn.classList.add("selected");

    btn.addEventListener("click", () => {
      list.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      const existing = state.answers[q.id] || {};
      state.answers[q.id] = { ...existing, analysisValue: key };
      saveProgress();
      refreshNextButton();
    });

    list.appendChild(btn);
  }
  container.appendChild(list);
}

// ============================================================
//  NAVIGATION
// ============================================================

function goTo(index) {
  if (index < 0 || index >= QUESTIONS.length) return;
  state.current = index;
  saveProgress();
  renderQuestion(index);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================
//  COURSE FEEDBACK  (unscored — runs after Q95, before results)
// ============================================================

function goToFeedback() {
  showScreen("feedback-screen");
  renderFeedbackScreen();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderFeedbackScreen() {
  const fs_ = $("feedback-screen");
  const fb  = state.feedback;

  const classChoicesHtml = CLASS_FEEDBACK_OPTIONS.map(opt => `
    <button type="button" class="option-btn feedback-opt-btn" data-group="classFeedback"
      data-value="${opt}">${opt}</button>`).join("");

  const gradeChoicesHtml = INSTRUCTOR_GRADE_OPTIONS.map(opt => `
    <button type="button" class="option-btn feedback-opt-btn" data-group="instructorGrade"
      data-value="${opt}">${opt}</button>`).join("");

  fs_.innerHTML = `
    <div class="card">
      <h2>Course Feedback</h2>
      <div class="instructions-box">${FEEDBACK_NOTE}</div>

      <div class="question-number" style="margin-top:20px;">1. How did you like this class? <span style="color:var(--color-error)">*</span></div>
      <div class="options-list" id="fb-classFeedback">${classChoicesHtml}</div>

      <div class="question-number" style="margin-top:20px;">2. What grade would you give Hitoshi for this class? <span style="color:var(--color-error)">*</span></div>
      <div class="options-list" id="fb-instructorGrade">${gradeChoicesHtml}</div>

      <div class="question-number" style="margin-top:20px;">3. How many bonus points have you received during the class?</div>
      <textarea id="fb-bonusPointsReported" class="dictation-input" rows="2"
        placeholder="Type your answer…"></textarea>

      <div class="question-number" style="margin-top:20px;">4. Free Comments</div>
      <div class="question-stem" style="white-space:pre-line;font-size:0.95rem;">${FREE_COMMENTS_PROMPT}</div>
      <textarea id="fb-freeComments" class="dictation-input" rows="5"
        placeholder="Type your comments here (optional)…"></textarea>

      <div id="fb-error" class="feedback-error" style="display:none;color:var(--color-error);margin-top:14px;">
        Please answer questions 1 and 2 before continuing.
      </div>

      <div class="text-center mt-20">
        <button id="btn-feedback-submit" class="btn btn-primary btn-lg">Submit &amp; See Results →</button>
      </div>
    </div>`;

  // Restore any previously typed free-text answers (set via .value, not
  // innerHTML, so stray "</textarea>" etc. in a saved answer can't inject markup).
  $("fb-bonusPointsReported").value = fb.bonusPointsReported || "";
  $("fb-freeComments").value = fb.freeComments || "";

  // Restore any previously selected choices
  fs_.querySelectorAll(".feedback-opt-btn").forEach(btn => {
    const group = btn.dataset.group;
    if (fb[group] === btn.dataset.value) btn.classList.add("selected");

    btn.addEventListener("click", () => {
      fs_.querySelectorAll(`.feedback-opt-btn[data-group="${group}"]`)
        .forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      state.feedback[group] = btn.dataset.value;
      saveProgress();
    });
  });

  $("fb-bonusPointsReported").addEventListener("input", (e) => {
    state.feedback.bonusPointsReported = e.target.value;
    saveProgress();
  });

  $("fb-freeComments").addEventListener("input", (e) => {
    state.feedback.freeComments = e.target.value;
    saveProgress();
  });

  $("btn-feedback-submit").addEventListener("click", () => {
    if (!state.feedback.classFeedback || !state.feedback.instructorGrade) {
      $("fb-error").style.display = "block";
      return;
    }
    state.feedback.bonusPointsReported = $("fb-bonusPointsReported").value;
    state.feedback.freeComments        = $("fb-freeComments").value;
    state.feedbackDone = true;
    saveProgress();
    finishQuiz();
  });
}

// ── Finish Quiz ───────────────────────────────────────────────
// Called only by the Course Feedback screen's Submit button (see
// renderFeedbackScreen), never from the exam itself — Q95's "Continue"
// button always routes to goToFeedback() first. Do not gate this on
// state.feedbackDone: that flag is persisted across sessions, so on a
// student's second pass (e.g. after reloading) it would already be true
// and this function would jump straight to the result screen, skipping
// feedback entirely — that was the cause of a real navigation bug.
function finishQuiz() {
  const score   = calcScore();
  const total   = QUESTIONS.length;
  const pct     = Math.round((score / total) * 1000) / 10; // one decimal place
  const comment = getComment(score); // recorded to the spreadsheet only — never shown to the student

  renderResultScreen(score, total, pct);
  showScreen("result-screen");
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Send to spreadsheet silently — no submission-status UI on a real exam.
  submitToSpreadsheet(score, pct, comment);

  state.attempt = (state.attempt || 0) + 1;
}

// ============================================================
//  RESULT SCREEN
// ============================================================

const FINAL_GRADE_BANDS = [
  { min: 90, range: "90% or above", grade: "Possible Grade: A or A+" },
  { min: 85, range: "85%–89%",      grade: "Possible Grade: B+" },
  { min: 80, range: "80%–84%",      grade: "Possible Grade: B" },
  { min: 70, range: "70%–79%",      grade: "Possible Grade: C" },
  { min: 60, range: "60%–69%",      grade: "Possible Grade: D" },
  { min: 50, range: "50%–59%",      grade: "Possible Grade: D",
    note: "(Final decision will depend on attendance, assignment completion, quizzes, bonus points, and other coursework.)" },
  { min: 0,  range: "Below 50%",    grade: "Possible Grade: F" },
];

// Picks the single matching band's grade text for a given percentage —
// used only for the spreadsheet's "Tentative Grade" column. The result
// screen itself still shows the full static table above; this doesn't
// change what's displayed to the student.
function getTentativeGrade(pct) {
  for (const band of FINAL_GRADE_BANDS) {
    if (pct >= band.min) return band.grade;
  }
  return FINAL_GRADE_BANDS[FINAL_GRADE_BANDS.length - 1].grade;
}

function renderResultScreen(score, total, pct) {
  const rs = $("result-screen");

  const gradeRowsHtml = FINAL_GRADE_BANDS.map(b => `
    <tr>
      <td>${b.range}</td>
      <td>${b.grade}${b.note ? `<br><span style="font-size:0.82rem;color:var(--color-muted);">${b.note}</span>` : ""}</td>
    </tr>`).join("");

  rs.innerHTML = `
    <div class="card">
      <div class="result-header">
        <h2>Final Exam Completed</h2>
        <p>Thank you for completing the Modern Pronunciation &amp; Grammar Final Examination.</p>
        <p>Your responses have been submitted successfully.</p>
      </div>

      <div class="breakdown-title">Exam Result</div>
      <div class="score-display">
        <div class="score-circle">
          <span class="score-number">${score}</span>
          <span class="score-total">out of ${total}</span>
        </div>
        <div class="score-percent">${pct.toFixed(1)}%</div>
      </div>

      <div class="breakdown-title">Estimated Course Grade Based on Final Exam</div>
      <table class="breakdown-table">
        <tbody>${gradeRowsHtml}</tbody>
      </table>

      <div class="breakdown-title">Important</div>
      <div class="comment-box">
        <p>This is only an estimate based on your Final Examination score.</p>
        <p>Your final course grade will also consider:</p>
        <ul style="margin:8px 0 8px 20px;">
          <li>Attendance</li>
          <li>Assignment completion</li>
          <li>Quiz performance</li>
          <li>Bonus points</li>
          <li>Other coursework and overall class performance</li>
        </ul>
        <p style="margin-bottom:0;">The instructor may adjust the final course grade after reviewing the complete course record.</p>
      </div>

      <div class="breakdown-title">Course Feedback</div>
      <div class="comment-box">
        <p style="margin-bottom:0;">Thank you for your feedback.<br>Your responses have been recorded.</p>
      </div>
    </div>`;
}

// ============================================================
//  SPREADSHEET SUBMISSION
// ============================================================

function buildPayload(score, pct, comment) {
  const payload = {
    Timestamp:  new Date().toISOString(),
    CourseID:   QUIZ_META.courseID,
    LessonID:   QUIZ_META.lessonID,
    QuizID:     QUIZ_META.quizID,
    StudentID:  state.studentID,
    Name:       state.name,
    Attempt: (state.attempt || 0) + 1,
    Score:      score,
    TotalQuestions: QUESTIONS.length,
    Percentage: pct + "%",
    TentativeGrade: getTentativeGrade(pct),
    Comment:    comment,
  };

  for (const q of QUESTIONS) {
    const ans    = state.answers[q.id];
    const colKey = `Q${q.id}`;
    if (!ans) { payload[colKey] = ""; continue; }

    if (q.type === "mc") {
      payload[colKey] = ans.value || "";
    } else if (q.type === "dragdrop") {
      payload[colKey] = isCorrect(q) ? "correct" : "incorrect";
    } else if (q.type === "fillin") {
      payload[colKey] = ans.value || "";
    } else if (q.type === "dictation") {
      payload[colKey] = ans.value || "";
    } else if (q.type === "dictation_analysis") {
      payload[colKey] = `${ans.dictValue || ""} | analysis: ${ans.analysisValue || ""}`;
    }
  }

  // Unscored Course Feedback (not part of QUESTIONS / scoring).
  payload.classFeedback       = state.feedback.classFeedback       || "";
  payload.instructorGrade     = state.feedback.instructorGrade     || "";
  payload.bonusPointsReported = state.feedback.bonusPointsReported || "";
  payload.freeComments        = state.feedback.freeComments        || "";

  return payload;
}

// Submits silently in the background — the exam result screen shows no
// submission-status indicator (see requirement: display ONLY the result
// screen content, nothing else).
async function submitToSpreadsheet(score, pct, comment) {
  const payload = buildPayload(score, pct, comment);

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Submission error:", err);
  }
}
// ============================================================
//  PERSISTENCE (localStorage)
// ============================================================

const LS_KEY = `quiz_progress_${QUIZ_META.quizID}`;

function saveProgress() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      studentID: state.studentID,
      name:      state.name,
      current:   state.current,
      answers:   state.answers,
      dragState: state.dragState,
      feedback:     state.feedback,
      feedbackDone: state.feedbackDone,
    }));
  } catch (e) { /* storage may be full */ }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { return null; }
}

function saveStudentInfo(id, name) {
  try {
    localStorage.setItem("mpg_student_id",   id);
    localStorage.setItem("mpg_student_name", name);
  } catch (e) {}
}

function loadStudentInfo() {
  return {
    id:   localStorage.getItem("mpg_student_id")   || "",
    name: localStorage.getItem("mpg_student_name") || "",
  };
}

// ============================================================
//  RESTART / RESET
// ============================================================

function restartQuiz() {
  if (!confirm("Restart the quiz? Your progress will be cleared.")) return;
  localStorage.removeItem(LS_KEY);
  state.answers  = {};
  state.dragState = {};
  state.current  = 0;
  state.feedback = emptyFeedback();
  state.feedbackDone = false;
  showScreen("start-screen");
}

// ============================================================
//  INITIALISATION
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ── Header ──
  $("header-course-code").textContent = QUIZ_META.courseID;
  $("header-quiz-title").textContent  = QUIZ_META.subtitle;

  // ── Start Screen ──
  $("quiz-title").textContent    = QUIZ_META.title;
  $("quiz-subtitle").textContent = QUIZ_META.subtitle;

  // Pre-fill student info from localStorage
  const info = loadStudentInfo();
  $("input-student-id").value = info.id;
  $("input-name").value       = info.name;

  // Start button
  $("btn-start").addEventListener("click", () => {
    const id   = $("input-student-id").value.trim();
    const name = $("input-name").value.trim();

    if (!id)   { $("input-student-id").focus(); alert("Please enter your Student ID."); return; }
    if (!name) { $("input-name").focus();       alert("Please enter your name.");       return; }

    state.studentID = id;
    state.name      = name;
    saveStudentInfo(id, name);

    // Restore saved progress (same student)
    const saved = loadProgress();
    if (saved && saved.studentID === id) {
      state.answers   = saved.answers   || {};
      state.dragState = saved.dragState || {};
      state.current   = saved.current   || 0;
      state.feedback  = saved.feedback  || emptyFeedback();
      state.feedbackDone = saved.feedbackDone || false;
    } else {
      state.answers   = {};
      state.dragState = {};
      state.current   = 0;
      state.feedback  = emptyFeedback();
      state.feedbackDone = false;
    }

    showScreen("quiz-screen");
    renderQuestion(state.current);
  });

  // ── Navigation buttons ──
  $("btn-back").addEventListener("click", () => {
    if (state.current > 0) goTo(state.current - 1);
  });

  $("btn-next").addEventListener("click", () => {
    if (state.current < QUESTIONS.length - 1) {
      goTo(state.current + 1);
    } else {
      // Q95 always leads to Course Feedback — never straight to results.
      goToFeedback();
    }
  });
});
