require("dotenv").config();
const fs   = require("fs");
const path = require("path");

// Set AZURE_TTS_KEY and AZURE_REGION in a .env file or your shell environment.
// See .env.example for the required variables.
const KEY    = process.env.AZURE_TTS_KEY    || "YOUR_AZURE_KEY_HERE";
const REGION = process.env.AZURE_REGION     || "eastus";

const sentences = [
  { file: "p08_q38.mp3", text: "The company's rapid expansion surprised investors." },
  { file: "p08_q39.mp3", text: "She lived in a beautiful old Japanese house." },
  { file: "p08_q40.mp3", text: "The students preparing for the presentation filled the classroom." },
];

const OUTPUT_DIR = path.join(__dirname, "audio");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

async function generate(s) {
  const ssml = `<speak version="1.0" xml:lang="en-US"><voice name="en-US-JennyNeural"><prosody rate="-20%">${s.text}</prosody></voice></speak>`;
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
  for (const s of sentences) {
    process.stdout.write(`  ${s.file} ... `);
    try {
      await generate(s);
      console.log("✓");
    } catch (e) {
      console.log("✗  " + e.message);
    }
  }
  console.log("\nDone. Place the mp3 files in the audio/ folder before opening the quiz.");
})();
