# MPG2026 – P09 Relative Clauses Review Quiz

A standalone, mobile-friendly web quiz for **Modern Pronunciation and Grammar 2026**.  
Topic: **Relative Clauses — Restrictive, Nonrestrictive, Relative Adverbs & Beyond**

---

## Files Required

```
p09-relative-clauses-quiz/
├── index.html              ← Copy from existing quiz (unchanged)
├── style.css               ← Copy from existing quiz (unchanged)
├── script.js               ← Copy from existing quiz (unchanged)
├── questions.js            ← This quiz's content (edit here)
├── Code.gs                 ← Google Apps Script backend (reuse existing)
├── generate-p09-audio.js   ← Generates the 3 dictation MP3s via Azure TTS
├── README.md               ← This file
└── audio/
    ├── p09_q35.mp3
    ├── p09_q36.mp3
    └── p09_q37.mp3
```

`index.html`, `style.css`, `script.js`, and `Code.gs` are **identical** to your existing quizzes —
just copy them in. Only `questions.js` is new content.

---

## Quiz Structure: 37 Questions

| Section | Topic                           | Q#    | Type(s)                        | Count |
|---------|---------------------------------|-------|--------------------------------|-------|
| 1       | Restrictive vs Nonrestrictive   | 1–5   | Multiple choice                | 5     |
| 2       | Relative Adverbs                | 6–11  | Multiple choice                | 6     |
| 3       | Multiple Acceptable Forms       | 12–15 | Multiple choice                | 4     |
| 4       | Relative Clause vs That-Clause  | 16–18 | Multiple choice                | 3     |
| 5       | Error Correction                | 19–23 | Multiple choice                | 5     |
| 6       | Word Order                      | 24–28 | Drag and Drop                  | 5     |
| 7       | Sentence Combining              | 29–34 | Multiple choice (4 options)    | 6     |
| 8       | Dictation + Analysis            | 35–37 | Dictation + analysis (3 opts)  | 3     |
|         | **Total**                       |       |                                | **37**|

---

## Pedagogical Goals Covered

| Concept | Questions |
|---------|-----------|
| Restrictive relative clauses (identifying a referent) | 1, 3, 4, 28, 33 |
| Nonrestrictive relative clauses (adding information) | 2, 3, 25, 29, 32, 34 |
| Relative adverbs: where / when / why | 6, 7, 8, 9, 10, 11, 26, 31, 36 |
| where vs that (locative vs object role) | 10, 11, 19, 36 |
| Multiple acceptable forms (who / that / zero) | 12, 13, 14, 15, 27, 35 |
| Relative clause vs content that-clause | 16, 17, 18, 37 |
| Error correction | 19–23 |
| Sentence combining | 29–34 |
| Word order | 24–28 |

---

## Audio Files Required

Generate MP3s using Azure TTS before deploying:

```bash
node generate-p09-audio.js
```

Set your credentials in `.env`:
```
AZURE_TTS_KEY=your_key_here
AZURE_REGION=eastus
```

| File | Sentence |
|------|----------|
| p09_q35.mp3 | The article that I cited in my presentation has since been retracted. |
| p09_q36.mp3 | The campus where the annual symposium is held is undergoing major renovation. |
| p09_q37.mp3 | The assumption that all participants understood the instructions proved to be incorrect. |

---

## Backend (Google Apps Script)

Reuse your existing `Code.gs` and deployed Web App URL.  
In `script.js`, set `SCRIPT_URL` to your existing endpoint.  
The `quizID` is `MPG2026_P09` — responses will be labelled separately in the spreadsheet.

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

- **Commas = meaning**: restrictive (no commas) vs nonrestrictive (commas) changes who or what is being referred to
- **'that' in nonrestrictive clauses**: always wrong — use 'which' or 'who'
- **who vs whom**: subject form vs object form — apply the he/him test
- **where vs which/that**: locative role → relative adverb; object role → relative pronoun
- **Zero relative**: only in object position, never subject position
- **Relative clause vs content clause**: gap test — relative clauses have a syntactic gap; content clauses do not
- **Sentence combining**: choosing restrictive or nonrestrictive based on intended meaning
