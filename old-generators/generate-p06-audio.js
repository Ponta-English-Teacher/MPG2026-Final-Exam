const fs = require("fs");
const path = require("path");

const KEY    = "YOUR_AZURE_KEY_HERE";
const REGION = "eastus";

const sentences = [
  { file: "p06_q36.mp3", text: "Either the captain or the players are responsible for the mistake." },
  { file: "p06_q37.mp3", text: "She walked into the room quietly." },
  { file: "p06_q38.mp3", text: "I usually go to work by car." },
  { file: "p06_q39.mp3", text: "The letter was written in pencil, not with a pen." },
  { file: "p06_q40.mp3", text: "He gave up smoking after twenty years." },
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
      "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3"
    },
    body: ssml
  });
  if (!res.ok) throw new Error(`Status ${res.status}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(path.join(OUTPUT_DIR, s.file), Buffer.from(buf));
}

(async () => {
  for (const s of sentences) {
    process.stdout.write(`  ${s.file} ... `);
    try {
      await generate(s);
      console.log("✓");
    } catch(e) {
      console.log("✗ " + e.message);
    }
  }
  console.log("\nDon
