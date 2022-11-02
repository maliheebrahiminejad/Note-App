const addBtn = document.querySelector("notes__add");
const noteTitle = document.querySelector("notes__title");
const noteBody = document.querySelector("notes__body");

const notes = [
  {
    id: 1,
    title: "First note",
    body: "This is first note ",
    updated: "2022-10-01T04:21:08.266Z",
  },
  {
    id: 2,
    title: "Second note",
    body: " This is second note",
    updated: "2022-10-01T05:12:58.156Z",
  },
  {
    id: 3,
    title: "Third note",
    body: " This is third note",
    updated: "2022-10-12T06:05:44.076Z",
  },
];
export default class NotesAPI {
  static getAllnotes() {
    // دفعه اول اجرا ا داخل ارایه مقادیر را می خوانیم بعد که داخل لوکال ذخیره شد دفعات بعد از لوکال
    // const savedNotes = notes || [];
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];

    // const savedNotes = notes || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }
  static saveNote(noteToSave) {
    // 1.exited or 2. no exited
    const notes = NotesAPI.getAllnotes();
    const exitedNote = notes.find((n) => n.id == noteToSave.id);
    if (exitedNote) {
      exitedNote.title = noteToSave.title;
      exitedNote.body = noteToSave.body;
      exitedNote.updated = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }
  static deleteNote(id) {
    const notes = NotesAPI.getAllnotes();
    const filteredNotes = notes.filter((n) => n.id != id);
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}
// برای اینکه داخل حافظه محلی ذخیره کنه این کد را باید اجرا کنیم
// NotesAPI.saveNote({
//   id: 3,
//   title: "Third note updeted",
//   body: " This is third note updated",
//   updated: "022-10-15T05:53:01.328Z",
// });
// console.log(NotesAPI.getAllnotes());
