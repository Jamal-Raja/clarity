//  # Utility files (helpers for reading/writing data)
const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "../allData.json");

async function readNotes() {
  const data = await fs.readFile(dataPath, "utf8");
  return data ? JSON.parse(data) : [];
}

async function writeNotes(notes) {
  await fs.writeFile(dataPath, JSON.stringify(notes, null, 2));
}

module.exports = { readNotes, writeNotes };
