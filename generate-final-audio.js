require("dotenv").config();
const fs   = require("fs");
const path = require("path");
const vm   = require("vm");

// Set AZURE_TTS_KEY and AZURE_REGION in a .env file or your shell environment.
const KEY    = process.env.AZURE_TTS_KEY || "YOUR_AZURE_KEY_HERE";
const REGION = process.env.AZURE_REGION  || "eastus";

// Load QUESTIONS straight out of questions.js (a browser script with no
// module.exports) instead of hand-copying sentences, so this generator stays
// correct automatically whenever questions.js changes.
const QUESTIONS_PATH = path.join(__dirname, "questions.js");
const source = fs.readFileSync(QUESTIONS_PATH, "utf8") + "\nQUESTIONS;\n";
const sandbox = {};
vm.createContext(sandbox);
const QUESTIONS = vm.runInContext(source, sandbox, { filename: QUESTIONS_PATH });

// Any question that references an audio file needs that file generated
// (currently the Dictation and Dictation + Analysis sections).
const sentences = QUESTIONS
  .filter((q) => q.audio)
  .map((q) => ({ file: path.basename(q.audio), text: q.correct, id: q.id }));

const OUTPUT_DIR = path.join(__dirname, "audio");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

async function generate(s) {
  const ssml = `<speak version="1.0" xml:lang="en-US"><voice name="en-US-JennyNeural"><prosody rate="-15%">${s.text}</prosody></voice></speak>`;
  const res = await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": KEY,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
    },
    body: ssml,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(path.join(OUTPUT_DIR, s.file), Buffer.from(buf));
}

(async () => {
  console.log(`Found ${sentences.length} audio file(s) required by the Final Exam.\n`);
  let ok = 0, failed = 0;
  for (const s of sentences) {
    process.stdout.write(`  Q${s.id}  ${s.file} ... `);
    try {
      await generate(s);
      console.log("✓");
      ok++;
    } catch (e) {
      console.log("✗  " + e.message);
      failed++;
    }
  }
  console.log(`\nDone. ${ok} generated, ${failed} failed, out of ${sentences.length} required.`);
})();
