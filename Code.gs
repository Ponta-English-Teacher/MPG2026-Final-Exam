// ============================================================
//  Code.gs – MPG2026 Quiz Backend
//  Google Apps Script Web App
//
//  Deploy as:
//    Execute as: Me
//    Who has access: Anyone
//
//  The spreadsheet must have a sheet named "Responses".
//  Column headers will be written automatically on first use, and
//  extended (never overwritten or reordered) if new columns are needed.
// ============================================================

const SHEET_NAME = "Responses";

// Canonical column order for a brand-new "Responses" sheet.
const Q_COLUMNS = [];
for (let i = 1; i <= 95; i++) Q_COLUMNS.push("Q" + i);

const COLUMNS = [
  "Name", "Student ID", "Score", "Total Questions", "Percentage", "Tentative Grade",
  ...Q_COLUMNS,
  "Class Feedback", "Instructor Grade", "Bonus Points Reported", "Free Comments",
  "Submitted At",
];

// Maps a header label to the payload field name, only where they differ.
// Any header not listed here (e.g. "Q1"..."Q95", "Name", "Score", or a
// legacy column from an older sheet like "CourseID"/"Attempt"/"Comment")
// is looked up using the header text itself as the key — this keeps old
// sheets/columns working without needing every possible key listed here.
const HEADER_TO_KEY = {
  "Student ID":           "StudentID",
  "Total Questions":      "TotalQuestions",
  "Tentative Grade":      "TentativeGrade",
  "Class Feedback":       "classFeedback",
  "Instructor Grade":     "instructorGrade",
  "Bonus Points Reported": "bonusPointsReported",
  "Free Comments":        "freeComments",
  "Submitted At":         "Timestamp",
};

// ── Entry point ────────────────────────────────────────────────
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); // wait up to 10 s for exclusive access

  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    const headers = ensureHeaders(sheet);
    appendRow(sheet, body, headers);

    return jsonResponse({ result: "success" });
  } catch (err) {
    return jsonResponse({ result: "error", error: err.message });
  } finally {
    lock.releaseLock();
  }
}

// Allow simple GET ping for debugging
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "MPG2026 Quiz backend is live." }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Helpers ────────────────────────────────────────────────────
function getOrCreateSheet() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

// Returns the sheet's full, current header row (an array of strings).
// - Brand-new sheet (no header yet): writes the canonical COLUMNS header.
// - Existing sheet: NEVER overwritten/reordered/cleared. Any column in
//   COLUMNS that the sheet doesn't already have is appended to the right,
//   so existing header cells and every already-written row stay exactly
//   where they are.
function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]);
    styleHeaderRow(sheet, COLUMNS.length);
    return COLUMNS;
  }

  const lastCol = sheet.getLastColumn();
  const existingHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const existingSet = new Set(existingHeaders);
  const missing = COLUMNS.filter(h => !existingSet.has(h));

  if (missing.length > 0) {
    sheet.getRange(1, lastCol + 1, 1, missing.length).setValues([missing]);
    styleHeaderRow(sheet, lastCol + missing.length);
  }

  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

function styleHeaderRow(sheet, numCols) {
  sheet.getRange(1, 1, 1, numCols)
    .setFontWeight("bold")
    .setBackground("#2c4a6e")
    .setFontColor("#ffffff");
  sheet.setFrozenRows(1);
}

// Builds one row aligned exactly to the sheet's current header (so the row
// always has the same number of values as there are header columns), then
// appends it as a new row — existing rows are never touched.
function appendRow(sheet, data, headers) {
  const row = headers.map(header => {
    const key = HEADER_TO_KEY[header] || header;
    const val = data[key];
    return (val !== undefined && val !== null) ? val : "";
  });
  sheet.appendRow(row);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
