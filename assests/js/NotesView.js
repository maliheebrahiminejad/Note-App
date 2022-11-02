export default class View {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;

    // view DOM
    this.root.innerHTML = `<nav class="nav">
    <div class="nav__logo">Note App</div>
    <ul class="notes__list">
    </ul>
    <button class="notes__add">ADD NOTE</button>
    </nav>
  <main class="notes__preview">
    <input type="text" class="notes__title" placeholder="note title ..." />
    <textarea name="" class="notes__body">Take Note </textarea>
  </main>`;

    //   events => 1. button(click) 2.inputs(blur)
    const notesAddBtn = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".notes__title");
    const inputBody = this.root.querySelector(".notes__body");
    // الان می خواهیم وقتی روی دکمه کلیک می کنیم یک تابع از صفحه بالادستی این صفحه بعنی main
    // اجرا بشه بنابراین یک سری کارها انجام می دهیم داخل صفحه اصلی به ابن صفحه جاوا یک ابجکت پاس می دهیم که یک تابع هست نحوه دی استراکچر ابجکت را هم مثال زدم
    notesAddBtn.addEventListener("click", () => {
      onNoteAdd();
    });
    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const newTitle = inputTitle.value.trim();
        const newBody = inputBody.value.trim();
        this.onNoteEdit(newTitle, newBody);
      });
    });

    // hide preview on first lodding
    this.updateNotePreviewVisibility(false);
  }
  _createListItemHTML(id, title, body, updated) {
    // طول بدنه \پیام را محدود کردیم
    const MAX_BODY_LENGTH = 50;
    return `<li class="notes__list-item" data-note-id="${id}">
    <div class="notes__item-header">
      <div class="notes__small-title">${title}</div>
      <span class="notes__list-trash" data-note-id="${id}" >
      <i class="fa fa-trash-alt" aria-hidden="true"></i>
      </span>
    </div>
       <div class="notes__small-body">
        
       ${body.substring(0, MAX_BODY_LENGTH)} 
       ${body.length > MAX_BODY_LENGTH ? "..." : ""}
       </div>
       <div class="notes__small-updated">${new Date(updated).toLocaleString(
         "en",
         {
           dateStyle: "full",
           timeStyle: "short",
         }
       )}</div>
       </li>`;
  }

  updateNoteList(notes) {
    const notesContainer = this.root.querySelector(".notes__list");
    notesContainer.innerHTML = "";
    let notesList = "";
    for (const note of notes) {
      // destructure
      const { id, title, body, updated } = note;
      const html = this._createListItemHTML(id, title, body, updated);
      notesList += html;
    }
    notesContainer.innerHTML = notesList;
    // وقتی روی یک نوت کلیک می کنیم چه اتفاقی رخ بده؟
    notesContainer.querySelectorAll(".notes__list-item").forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        this.onNoteSelect(noteItem.dataset.noteId);
      });
      notesContainer
        .querySelectorAll(".notes__list-trash")
        .forEach((noteItem) => {
          noteItem.addEventListener("click", (e) => {
            e.stopPropagation();
            this.onNoteDelete(noteItem.dataset.noteId);
          });
        });
    });
  }
  updateActiveNote(note) {
    // initial preview div element
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;
    // remove class selected notes 
    this.root.querySelectorAll(".notes__list-item").forEach(note=>{
      note.classList.remove("notes__list-item--selected");
    })
    // add class selected
    this.root
      .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add("notes__list-item--selected");
  }
  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
