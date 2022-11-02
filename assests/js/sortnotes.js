// approch 2
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
      body: " Thais is second note",
      updated: "2023-10-01T05:12:58.156Z",
    },
    {
      id: 3,
      title: "Second note",
      body: " Thais is second note",
      updated: "2021-10-03T04:39:38.366Z",
    },
  ];
  class Notes {
    static getAllnote() {
      const savedNotes = notes || [];
      return savedNotes.sort((a, b) => {
        const nameA = a.updated.toUpperCase(); // ignore upper and lowercase
        const nameB = b.updated.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    }
  }
  console.log(Notes.getAllnote());
  