import NotesAPI from "./NotesAPI.js";
// console.log(NotesAPI.getAllnotes());
import NotesView from "./NotesView.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());
    this._refreshNotes();
  }
  _handlers() {
    return {
      onNoteAdd: () => {
        // call saveNotes from NotesAPI
        // create new Note
        const newNote = {
          title: "New Note",
          body: "Take Some Note",
        };
        NotesAPI.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (newTitle, newBody) => {
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        });
        this._refreshNotes();
      },
      onNoteSelect: (noteID) => {
        // اول نوتی که انتخاب شده و ای دی ان فرستاده شده را  جستجو می کنیم
        const selectedNote = this.notes.find((note) => note.id == noteID);
        this.activeNote = selectedNote;
        this.view.updateActiveNote(selectedNote);
      },
      onNoteDelete: (noteID) => {
        NotesAPI.deleteNote(noteID);
        this._refreshNotes();
      },
    };
  }
  _refreshNotes() {
    const notes = NotesAPI.getAllnotes();

    // set notes
    this.notes = notes;
    this.view.updateNoteList(notes);
    // if exits note preview visible
    this.view.updateNotePreviewVisibility(notes.length > 0);

    // set active note
    this.activeNote = notes[0];
    this.view.updateActiveNote(notes[0]);
  }
}
