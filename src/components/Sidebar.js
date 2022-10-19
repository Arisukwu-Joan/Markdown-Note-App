import React from "react";
import { BsTrash } from "react-icons/bs";

function Sidebar(props) {
  const noteElements = props.notes.map((note) => (
    <div key={note.id}>
      <div
        className="title"
        // className={`title ${
        //   note.id === props.currentNote.id ? "selected-note" : ""
        // }`}
        // onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
        <button className="button-btn">
          <BsTrash
            onClick={(event) => props.delete(event, note.id)}
            className="trash-btn"
          />
        </button>
      </div>
    </div>
  ));
  return (
    <section className="pane editor">
      <div className="sidebar-header">
        <h3 className="note"> Note</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}

export default Sidebar;
