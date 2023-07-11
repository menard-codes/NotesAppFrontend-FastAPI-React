import { useState, useEffect, useRef, useContext, FormEvent } from "react";
import axios from "axios";

import "./AddNote.styles.css";
import { NoteObject, NotesListUpdateFunctionContext } from "../../App";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [hasInputError, setHasInputError] = useState(false);

  const setNotes = useContext(NotesListUpdateFunctionContext);

  const titleInputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.length > 0 || noteBody.length > 0) {
      setIsFormSubmitting(true);
      const API_URL = import.meta.env.VITE_NOTES_API_URL;
      const { data } = await axios.post<NoteObject>(`${API_URL}/note`, {
        title,
        note_body: noteBody,
      });
      setNotes((prev) => [...prev, data]);
    } else {
      setHasInputError(true);
    }

    setTitle("");
    setNoteBody("");
    setIsFormSubmitting(false);
    titleInputRef.current.focus();
  };

  return (
    <form onSubmit={(event) => void handleSubmit(event)} id="add-note-form">
      <input
        type="text"
        placeholder="Enter Title"
        ref={titleInputRef}
        id="title-input"
        className={hasInputError ? "input-error" : ""}
        value={title}
        onChange={(event) => {
          setHasInputError(false);
          setTitle(event.target.value);
        }}
      />
      <textarea
        placeholder="Enter Note"
        id="note-body-textarea"
        className={hasInputError ? "input-error" : ""}
        cols={30}
        rows={10}
        value={noteBody}
        onChange={(event) => {
          setHasInputError(false);
          setNoteBody(event.target.value);
        }}
      />
      <button id="add-note-btn" type="submit" disabled={isFormSubmitting}>
        {isFormSubmitting ? "..." : "Add Note"}
      </button>
    </form>
  );
}
