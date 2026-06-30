# MPG2026 – P10 Comparison Review Quiz

A standalone, mobile-friendly web quiz for **Modern Pronunciation and Grammar 2026**.  
Topic: **Comparison – Review Quiz**

---

## Files Required

```
p10-quiz/
├── index.html              ← Copy from existing quiz (unchanged)
├── style.css               ← Copy from existing quiz (unchanged)
├── script.js               ← Copy from existing quiz (unchanged)
├── questions.js            ← This quiz's content (edit here)
├── Code.gs                 ← Google Apps Script backend (reuse existing)
├── generate-p10-audio.js   ← Generates the 3 dictation MP3s via Azure TTS
├── README_P10.md           ← This file
└── audio/
    ├── p10_q25.mp3
    ├── p10_q26.mp3
    └── p10_q27.mp3
```

`index.html`, `style.css`, `script.js`, and `Code.gs` are **identical** to your existing quizzes —
just copy them in. Only `questions.js` is new content.

---

## Quiz Structure: 27 Questions

| Section | Topic            | Q#    | Type(s)          | Count |
|---------|------------------|-------|------------------|-------|
| 1       | Multiple Choice  | 1–10  | Multiple choice  | 10    |
| 2       | Word Order       | 11–15 | Drag and Drop    | 5     |
| 3       | Short Answer     | 16–24 | Fill-in-blank    | 9     |
| 4       | Dictation        | 25–27 | Dictation        | 3     |
|         | **Total**        |       |                  | **27**|

---

## Pedagogical Goals Covered

_(Update this table once P10 question data is finalised.)_

| Concept | Questions |
|---------|-----------|
| Comparative adjectives / adverbs | TBD |
| Superlative forms | TBD |
| as … as constructions | TBD |
| the … the … structures | TBD |
| Irregular comparatives / superlatives | TBD |
| Word order in comparison sentences | TBD |
| Dictation | 25–27 |

---

## Audio Files Required

Generate MP3s using Azure TTS before deploying:

```bash
node generate-p10-audio.js
```

Set your credentials in `.env`:
```
AZURE_TTS_KEY=your_key_here
AZURE_REGION=eastus
```

| File | Sentence |
|------|----------|
| p10_q25.mp3 | _(update when P10 dictation sentences are finalised)_ |
| p10_q26.mp3 | _(update when P10 dictation sentences are finalised)_ |
| p10_q27.mp3 | _(update when P10 dictation sentences are finalised)_ |

---

## Backend (Google Apps Script)

Reuse your existing `Code.gs` and deployed Web App URL.  
In `script.js`, set `SCRIPT_URL` to your existing endpoint.  
The `quizID` is `MPG2026_P10` — responses will be labelled separately in the spreadsheet.

---

## Score Bands

| Score | Feedback |
|-------|----------|
| 34–37 | Excellent |
| 27–33 | Good |
| 19–26 | Developing |
| 10–18 | Keep working |
| 0–9   | Work harder |

---

## Key Distinctions Tested

_(Update this section once P10 question data is finalised.)_

- **Comparative vs superlative**: two items → comparative (-er / more); three or more → superlative (-est / most)
- **Irregular forms**: good → better → best; bad → worse → worst; far → further / farther → furthest / farthest
- **as … as**: used for equality; not as … as for inequality
- **the … the …**: parallel comparatives expressing proportional change
- **Adjective vs adverb forms**: compare nouns with adjective forms; compare verbs/adjectives with adverb forms
