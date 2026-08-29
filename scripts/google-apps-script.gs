const HEADERS = [
  "id",
  "submittedAt",
  "name",
  "phone",
  "attending",
  "guestCount",
  "side",
  "wishes",
];

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function getSheet() {
  const properties = PropertiesService.getScriptProperties();
  const spreadsheetId = properties.getProperty("SPREADSHEET_ID");
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  let sheet = spreadsheet.getSheetByName("RSVP");
  if (!sheet) sheet = spreadsheet.insertSheet("RSVP");
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || "{}");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
    if (!expectedSecret || payload.secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    const sheet = getSheet();
    if (payload.action === "append") {
      const response = payload.response || {};
      sheet.appendRow(HEADERS.map((header) => response[header] ?? ""));
      return jsonResponse({ ok: true });
    }

    if (payload.action === "list") {
      const values = sheet.getDataRange().getValues();
      const headers = values.shift() || HEADERS;
      const responses = values
        .filter((row) => row.some((cell) => cell !== ""))
        .map((row) =>
          headers.reduce((item, header, index) => {
            item[header] = row[index];
            return item;
          }, {})
        )
        .reverse();
      return jsonResponse({ ok: true, responses });
    }

    return jsonResponse({ ok: false, error: "Unknown action" });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}
