import React, { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import NoteContext from "../context/Notes/NoteContext";
import { useHistory } from "react-router-dom";
const YourNotes = () => {
  let { notes, getNotes, editNote } = useContext(NoteContext);
  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) getNotes();
    else history.push("/login");
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });
  const onChange = (e) => {
    e.preventDefault();
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    editNote(note.id, note.title, note.description, note.tag);
    refClose.current.click();
  };

  const updateNote = (curNote) => {
    ref.current.click();
    setnote({
      id: curNote._id,
      title: curNote.title,
      description: curNote.description,
      tag: curNote.tag,
    });
  };

  return (
    <div className="container my-3">
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={note.description}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.title.length < 3 || note.description.length < 5}
                type="submit"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length ? (
          notes.map((note, key) => {
            return <Noteitem note={note} key={key} updateNote={updateNote} />;
          })
        ) : (
          <div className="container">{"No notes to show"}</div>
        )}
      </div>
    </div>
  );
};

export default YourNotes;
