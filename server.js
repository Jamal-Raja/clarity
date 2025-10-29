const express = require("express");
const fs = require("fs").promises;

const app = express();
const PORT = process.env.PORT || 3000;

async function readNotes() {
  const data = await fs.readFile("./allData.json", "utf8");
  return JSON.parse(data);
}

readNotes();
// ============ MIDDLEWARE ============
app.use(express.json());
app.use("/", express.static("public"));

// ============ ROUTES ============
// Get all notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await readNotes();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read notes" });
  }
});
// Create new note
app.post("/notes", (req, res) => {
  const { title, content } = req.body; // Destructure req
  res.json({ message: "Note received!", note: req.body });
});
// Update a note
app.put("/notes", (req, res) => {});
// Delete a note
app.delete("/notes", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
