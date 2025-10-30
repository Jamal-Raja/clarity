const express = require("express");
const fs = require("fs").promises;

const app = express();
const PORT = process.env.PORT || 3000;

async function readNotes() {
  const data = await fs.readFile("./allData.json", "utf8");
  if (!data) return [];
  return JSON.parse(data);
}

async function createNewNote(noteObj) {
  const allNotes = await readNotes();
  allNotes.unshift(noteObj);
  await fs.writeFile("./allData.json", JSON.stringify(allNotes, null, 2));
}

async function updateNote(nodeID, updatedNote) {
  const allNotes = await readNotes();
  const updatedNotes = allNotes.map((note) => {
    if (note.id === nodeID) {
      return { ...updatedNote };
    }
    return note;
  });
  await fs.writeFile("./allData.json", JSON.stringify(updatedNotes, null, 2));
}

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
    if (!req.body) {
      res.json({ message: "Error Creating Note" });
      throw new Error();
    }
    res.json({ message: "Note received!", note: req.body });
    // createNewNote(req.body); // <-- Commendted out to stop creating unnecsary notes
  } catch (err) {
    console.error(err);
  }
});

// Update a note
app.put("/notes", async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: "Error: Expected {id, title, content}" });
    }
    const { id } = req.body;
    const noteToUpdateID = Number(id);
    const allNotes = await readNotes();
    for (note of allNotes) {
      if (note.id == noteToUpdateID) {
        updateNote(noteToUpdateID, req.body);
      }
    }
    res.json({ message: "Note updated!", note: req.body });
  } catch (err) {
    console.error(err);
  }
});

// Delete a note
app.delete("/notes", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
