// Logic for creating, reading, updating, and deleting notes.
const { readNotes, writeNotes } = require("../utils/fileHandler");

// GET ALL NOTES
async function getAllNotes(req, res) {
  try {
    const allNotes = await readNotes();
    res.json(allNotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read notes" });
  }
}
// CREATE NEW NOTE
async function createNote(req, res) {
  try {
    const newNote = req.body;
    const notes = await readNotes();
    notes.unshift(newNote);
    await writeNotes(notes);
    res.status(201).json({ message: "Note created", note: newNote });
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
}
// UPDATE NOTE
async function updateNote(req, res) {
  try {
    const id = Number(req.params.id);
    const updatedNote = req.body.note;

    const notes = await readNotes();
    const newNotes = notes.map((note) =>
      Number(note.id) === id ? { ...note, ...updatedNote } : note
    );

    await writeNotes(newNotes);
    res.json({ message: "Note updated", note: updatedNote });
  } catch (err) {
    res.status(500).json({ error: "Failed to update note" });
  }
}
// DELETE NOTE
async function deleteNote(req, res) {
  try {
    const id = Number(req.params.id);
    const notes = await readNotes();
    const newNotes = notes.filter((note) => Number(note.id) !== id);
    await writeNotes(newNotes);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
}

module.exports = { getAllNotes, createNote, updateNote, deleteNote };
