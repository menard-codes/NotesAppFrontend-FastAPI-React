import { useState, Dispatch, SetStateAction } from "react";

import DeleteModal from "./DeleteModal";

import { NoteView } from "./Note";
import { NoteObject } from "../../../App";

import "./Note.styles.css";

interface NoteViewerProps {
  note: NoteObject;
  setNoteView: Dispatch<SetStateAction<NoteView>>;
}

export default function NoteViewer({ note, setNoteView }: NoteViewerProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { id, title, note_body } = note;

  const handleDeleteNote = () => {
    setShowDeleteModal(true);
  };

  return (
    <div id="note-container">
      {showDeleteModal && (
        <DeleteModal showDeleteModal={setShowDeleteModal} noteId={id} />
      )}
      <h3>{title}</h3>
      <p>{note_body}</p>
      <div className="note-buttons-container">
        <button
          className="neutral-btn"
          onClick={() => setNoteView(NoteView.EDITING)}
        >
          Edit
        </button>
        <button className="delete-btn" onClick={() => void handleDeleteNote()}>
          Delete
        </button>
      </div>
    </div>
  );
}
