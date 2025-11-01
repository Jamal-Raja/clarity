const URL = "";
const textAreaEl = document.getElementById("textArea");
const themeToggle = document.getElementById("themeToggle");
// Load all notes
async function loadNotes() {
  try {
    const res = await fetch(`${URL}/notes`);
    if (!res.ok) throw new Error("Failed to fetch");
    const notes = await res.json();
    const ulEl = document.getElementById("notesUl");
    ulEl.innerHTML = notes
      .map(
        (note) => `<li>
                  <a id=${
                    note.id
                  } class="flex justify-between gap-0 max-w-full">${
          note.title.length > 20
            ? `${note.title.substring(0, 15)}...`
            : note.title
        } 
                  <button>
                    <svg class="min-w-4 min-h-4 w-4 h-4 fill-current hover:fill-red-500 animate-rotate-upside-down transition-transform duration-300 hover:rotate-180 active:scale-200" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
                    </svg>
                  </button>
                </a>                
              </li>`
      )
      .join("");
  } catch (err) {
    console.error(err);
  }
}

async function ensureLoadedNote() {
  const res = await fetch(`${URL}/notes`);
  const notes = await res.json();
  if (notes.length === 0) return;
  const savedID = localStorage.getItem("curNoteID");
  let idToLoad = savedID;

  if (!idToLoad) {
    idToLoad = notes[0].id;
    localStorage.setItem("curNoteID", idToLoad);
  }

  textAreaEl.setAttribute("loadedNote", idToLoad);

  await loadNote(idToLoad);
}

// Initial setup of loadednotes
ensureLoadedNote();
// Initial Render of all notes
loadNotes();
// Load individual note into editor
async function loadNote(noteID) {
  try {
    const res = await fetch(`${URL}/notes`, { method: "GET" });
    if (!res.ok) {
      throw new Error();
    }
    const allNotes = await res.json();
    for (note of allNotes) {
      if (note.id == noteID) {
        textAreaEl.value = `${note.title}\n${note.content}`;
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
        content: "",
      }),
    });
    const data = await res.json();
    loadNotes();
    loadNote(data["note"].id);
    textAreaEl.setAttribute("loadedNote", data["note"].id);
    if (!res.ok) throw new Error("Failed to fetch");
  } catch (err) {
    console.error(err);
  }
}
// Update note
async function updateNote(note) {
  try {
    const numericID = Number(note.id);
    if (isNaN(numericID)) {
      throw new Error("Invalid note ID. Must be a number");
    }
    const res = await fetch(`${URL}/notes/${numericID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    });
    loadNotes();
    if (!res.ok) throw new Error("Failed to fetch");
  } catch (err) {
    console.error(err);
  }
}
// Delete note
async function deleteNote(noteID) {
  try {
    const numericID = Number(noteID);
    if (isNaN(numericID)) {
      throw new Error("Invalid note ID. Must be a number");
    }
    const res = await fetch(`${URL}/notes/${numericID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: numericID,
      }),
    });
    loadNotes();
    if (!res.ok) throw new Error("Failed to fetch");
  } catch (err) {
    console.error(err);
  }
}

const currentNoteID = localStorage.getItem("curNoteID");
if (!currentNoteID) {
  (async () => {
    const res = await fetch(`${URL}/notes`);
    const notes = await res.json();
    loadNote(notes[0].id);
  })();
} else loadNote(currentNoteID);

document.getElementById("composeIcon").addEventListener("click", createNewNote);
document.getElementById("notesUl").addEventListener("click", (e) => {
  const note = e.target.closest("a");
  const bin = e.target.closest("svg");
  if (note) {
    loadNote(e.target.id);
    textAreaEl.setAttribute("loadedNote", e.target.id);
    localStorage.setItem("curNoteID", e.target.id);
  }
  // Delete note
  if (bin) {
    const confirm = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirm) return;
    deleteNote(e.target.closest("a").id);
    textAreaEl.value = "";
  }
});
// Debounce textarea input to prevent rapid PUT requests to server
let timer;

textAreaEl.addEventListener("input", () => {
  clearTimeout(timer); // Reset timer on each keystroke

  timer = setTimeout(() => {
    const note = {
      title: textAreaEl.value.split("\n")[0],
      content: textAreaEl.value.split("\n").slice(1).join("\n"),
      id: textAreaEl.getAttribute("loadedNote"),
    };
    updateNote(note); // Send update after typing stops
  }, 300);
});

// Theme save
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}
document.querySelectorAll(".theme-controller").forEach((input) => {
  input.addEventListener("change", (e) => {
    const newTheme = e.target.value;
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
});
