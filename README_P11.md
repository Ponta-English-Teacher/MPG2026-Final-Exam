# MPG2026 – P11 Hypothetical & Unreal Expressions Quiz

A standalone, mobile-friendly web quiz for **Modern Pronunciation and Grammar 2026**.
Topic: **Hypothetical & Unreal Expressions – Review Quiz**

---

## Files Required

```
p11-quiz/
├── index.html              ← Copy from existing quiz (unchanged)
├── style.css                ← Copy from existing quiz (unchanged)
├── script.js                ← Copy from existing quiz (unchanged)
├── questions.js             ← This quiz's content
├── Code.gs                  ← Google Apps Script backend (reuse existing)
├── generate-p11-audio.js    ← Generates the 3 dictation MP3s via Azure TTS
├── README_P11.md            ← This file
└── audio/
    ├── p11_q28.mp3
    ├── p11_q29.mp3
    └── p11_q30.mp3
```

`index.html`, `style.css`, `script.js`, and `Code.gs` are **identical** to your existing quizzes —
just copy them in. Only `questions.js` is new content.

---

## Quiz Structure: 30 Questions

| Section | Topic              | Q#     | Type(s)         | Count |
|---------|--------------------|--------|-----------------|-------|
| 1       | Multiple Choice    | 1–15, 27 | Multiple choice | 16    |
| 2       | Fill in the Blank  | 16–20, 26 | Fill-in-blank   | 6     |
| 3       | Word Order         | 21–25  | Drag and Drop   | 5     |
| 4       | Dictation          | 28–30  | Dictation       | 3     |
|         | **Total**          |        |                 | **30**|

---

## Pedagogical Goals Covered

| Concept                                   | Questions          |
|--------------------------------------------|---------------------|
| Real conditionals (If + present, will …)   | 1                   |
| Present hypothetical (If + past, would …)  | 6, 13, 21            |
| Past hypothetical (If + had + pp, would have + pp) | 3, 11, 12, 14 |
| Mixed conditionals                        | 15                   |
| wish / if only                            | 2, 16, 17, 22         |
| as if / as though                         | 4, 9, 19, 23         |
| It's time / I'd rather                    | 7, 8, 18, 24, 26     |
| Without / But for / Otherwise / Given     | 5, 10, 20, 25, 27    |
| Dictation                                 | 28–30                |

---

## Audio Files Required

Generate MP3s using Azure TTS before deploying:

```bash
node generate-p11-audio.js
```

Set your credentials in `.env`:
```
AZURE_TTS_KEY=your_key_here
AZURE_REGION=eastus
```

| File | Sentence |
|------|----------|
| p11_q28.mp3 | If I had known the truth, I would have apologized. |
| p11_q29.mp3 | I wish I were a little more patient. |
| p11_q30.mp3 | He behaves as if he were the king. |

> **Status:** Audio has not yet been generated. The last `node generate-p11-audio.js` run failed with `HTTP 401` — the `AZURE_TTS_KEY` in `.env` needs to be checked/renewed before these files exist.

---

## Backend (Google Apps Script)

Reuse your existing `Code.gs` and deployed Web App URL.
In `script.js`, set `SCRIPT_URL` to your existing endpoint.
The `quizID` is `MPG2026_P11` — responses will be labelled separately in the spreadsheet.

---

## Score Bands

| Score | Feedback |
|-------|----------|
| 27–30 | Excellent |
| 22–26 | Good |
| 15–21 | Developing |
| 8–14  | Keep working |
| 0–7   | Work harder |

---

## Key Distinctions Tested

- **Real vs unlikely**: If + present (may happen) vs If + should (possible but not expected)
- **Present vs past hypothetical**: If + past, would … (not true now) vs If + had + pp, would have + pp (didn't happen)
- **Mixed conditionals**: a different past (If + had + pp) leading to a different present (would + verb)
- **wish / if only**: past form shows the wish isn't true now; if only is the stronger form
- **as if / as though**: past form shows the speaker doubts the comparison is true
- **It's time / I'd rather**: past form softens or signals something that should already be true
- **Hidden conditionals**: without, but for, otherwise, given all imply an unstated if-clause
