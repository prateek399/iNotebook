import React, { useContext } from "react";
import NoteContext from "../context/Notes/NoteContext";

const Noteitem = (props) => {
  const { deleteNote } = useContext(NoteContext);
  const { note, updateNote } = props;
  const handleClick = (id) => {
    deleteNote(id);
  };
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h6 className="p-2 flex-grow-1 card-title">{note.title}</h6>
            <i
              className="p-2 fa-solid fa-trash-can mx-2"
              onClick={() => {
                handleClick(note._id);
              }}
            ></i>
            <i
              className="p-2 fa-regular fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
