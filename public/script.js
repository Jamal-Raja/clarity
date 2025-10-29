const URL = "http://localhost:3000";

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

    // for (const { id, title, content } of notes) {
    //   ulEl.appendChild(`
    //     <li><a>${title}</a></li>
    //     `);
    // }
  } catch (err) {
    console.error(err);
  }
}
loadNotes();

async function loadNote() {}
