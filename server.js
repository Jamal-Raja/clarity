const express = require("express");
const fs = require("fs").promises;

const app = express();
const PORT = process.env.PORT || 3000;

async function readNotes() {
  const data = await fs.readFile("./allData.json", "utf8");
  if (!data) return [];
  return JSON.parse(data);
}

async function createNewNote(obj) {
  const allNotes = await readNotes();
  allNotes.unshift(obj);
  await fs.writeFile("./allData.json", JSON.stringify(allNotes, null, 2));
}

readNotes();
// ============ MIDDLEWARE ============
app.use(express.json());
app.use("/", express.static("public"));

// ============ ROUTES ============
// Get all notes
app.get("/notes", async (req, res) => {
  try {
    const allNotes = await readNotes();
    res.json(allNotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read notes" });
  }
});
// Create new note
app.post("/notes", async (req, res) => {
  try {
    res.json({ message: "Note received!", note: req.body });
    createNewNote(req.body);
  } catch (err) {
    console.error(err);
  }
});

// Update a note
app.put("/notes", (req, res) => {});
// Delete a note
app.delete("/notes", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
