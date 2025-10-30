const URL = "http://localhost:3000";
// Load all notes
async function loadNotes() {
  try {
    const res = await fetch(`${URL}/notes`);
    if (!res.ok) throw new Error("Failed to fetch");
    const notes = await res.json();

    const ulEl = document.getElementById("notesUl");
    ulEl.innerHTML = notes
      .map(
        (note) => `<li><a onclick=loadNote(${note.id}) >${note.title}</a></li>`
      )
      .join("");
  } catch (err) {
    console.error(err);
  }
}
// Load notes on app open
loadNotes();
// Load individual note into editor
async function loadNote() {}

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
