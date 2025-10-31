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

async function updateNote(updatedNote) {
  updatedNote["id"] = Number(updatedNote["id"]);
  const allNotes = await readNotes();
  const updatedNotes = allNotes.map((note) => {
    if (note.id == updatedNote.id) return updatedNote;
    else return note;
  });
  await fs.writeFile("./allData.json", JSON.stringify(updatedNotes, null, 2));
}

async function deleteNote(noteID) {
  const allNotes = await readNotes();
  const updatedNotes = allNotes.filter((note) => note.id != noteID);
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
    createNewNote(req.body);
    res.json({ message: `Note Created!`, note: req.body, id: req.id });
  } catch (err) {
    console.error(err);
  }
});
// Update a note
app.put("/notes/:id", async (req, res) => {
  try {
    const noteRecieved = req.body["note"];
    if (!noteRecieved) {
      res.status(400).json({ message: "Error: Expected {id, title, content}" });
    }
    const allNotes = await readNotes();
    for (note of allNotes) {
      if (note.id == req.params.id) {
        updateNote(noteRecieved);
      }
    }
    res.json({ message: "Note updated!", note: noteRecieved });
  } catch (err) {
    console.error(err);
  }
});
// Delete a note
app.delete("/notes/:id", async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: "Error: Expected {id}" });
    }
    deleteNote(req.params.id);
    res.json({ message: "Note Deleted!", note: req.body });
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// REMAINING TASKS TO COMPLETE:
//
// Search functionality
// Add date created/last modified
// Separate Scrolls
// Hover Bin Btn (shud hide natrually and appear on hover only)
// Styling
