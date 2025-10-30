const URL = "http://localhost:3000";
// Load all notes
async function loadNotes() {
  try {
    const res = await fetch(`${URL}/notes`);
    if (!res.ok) throw new Error("Failed to fetch");
    const notes = await res.json();

    const ulEl = document.getElementById("notesUl");
    ulEl.innerHTML = notes
      .map((note) => `<li><a id=${note.id} >${note.title}</a></li>`)
      .join("");
  } catch (err) {
    console.error(err);
  }
}
// Initial Render of all notes
loadNotes();

// Load individual note into editor
async function loadNote(noteId) {
  try {
    const res = await fetch(`${URL}/notes`, { method: "GET" });
    if (!res.ok) {
      throw new Error();
    }
    const allNotes = await res.json();
    for (note of allNotes) {
      if (note.id == noteId) {
        const textAreaEl = document.getElementById("textArea");
        textAreaEl.innerText = note.content;
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// Create new note via post req
async function createNewNote() {
  try {
    const res = await fetch(`${URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Date.now(),
        title: "Untitled Note",
        content: "NEW NOTE CONTENT",
      }),
    });
    loadNotes();
    if (!res.ok) throw new Error("Failed to fetch");
  } catch (err) {
    console.error(err);
  }
}

document.getElementById("composeIcon").addEventListener("click", createNewNote);
document.getElementById("notesUl").addEventListener("click", (e) => {
  loadNote(e.target.id);
});
