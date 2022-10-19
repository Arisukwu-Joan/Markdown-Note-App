import React, { useState, useEffect } from "react";
import "./App.css";
import Split from "react-split";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { nanoid } from "nanoid";

function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  useEffect(() => {
    localStorage.setItem(notes, JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your note here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  // to arrange the recent-modified note at the note
  function updateNote(text) {
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }

  // To update note
  // function updateNote(text) {
  //   setNotes((oldNotes) =>
  //     oldNotes.map((oldNote) => {
  //       return oldNote.id === currentNoteId
  //         ? { ...oldNote, body: text }
  //         : oldNote;
  //     })
  //   );
  // }

  function deleteTask(event, noteId) {
    console.log("Meooooooooow");
    event.stopPropagation();
    setNotes((notes) => notes.filter((note) => noteId !== note.id));
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }
  return (
    <>
      <main>
        {notes.length > 0 ? (
          <Split sizes={[25, 75]} direction="horizontal" className="split">
            <Sidebar
              notes={notes}
              newNote={createNewNote}
              CurrentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              delete={deleteTask}
            />
            {currentNoteId && notes.length > 0 && (
              <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
            )}{" "}
          </Split>
        ) : (
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button className="first-note" onClick={createNewNote}>
              Create a Note
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
