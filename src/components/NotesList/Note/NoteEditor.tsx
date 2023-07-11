import axios from "axios";
import {
  useState,
  useEffect,
  useRef,
  useContext,
  Dispatch,
  SetStateAction,
  FormEvent,
} from "react";

import { NoteObject, NotesListUpdateFunctionContext } from "../../../App";
import { NoteView } from "./Note";

import "./Note.styles.css";

interface NoteEditorProps {
  note: NoteObject;
  setNoteView: Dispatch<SetStateAction<NoteView>>;
}

export default function NoteEditor({ note, setNoteView }: NoteEditorProps) {
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteBody, setNoteBody] = useState(note.note_body);
  const [isInvalidSave, setIsInvalidSave] = useState(false);

  const setNotes = useContext(NotesListUpdateFunctionContext);

  const noteTitleInputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  useEffect(() => {
    noteTitleInputRef.current.focus();
  }, []);

  const handleNoteSave = async (
    event: FormEvent<HTMLFormElement>,
    id: typeof note.id
  ) => {
    event.preventDefault();

    if (noteTitle.length > 0 || noteBody.length > 0) {
      const API_URL = import.meta.env.VITE_NOTES_API_URL;
      await axios.put(`${API_URL}/note/${id}`, {
        title: noteTitle,
        note_body: noteBody,
      });
      const { data } = await axios.get<NoteObject[]>(`${API_URL}/notes`);
      setNotes(data);

      setNoteView(NoteView.VIEWING);
    } else {
      setIsInvalidSave(true);
      noteTitleInputRef.current.focus();
    }
  };

  return (
    <form
      id="note-container"
      onSubmit={(event) => void handleNoteSave(event, note.id)}
    >
      <input
        type="text"
        placeholder="Enter Note Title"
        ref={noteTitleInputRef}
        id="note-title-edit-input"
        className={isInvalidSave ? "input-error" : ""}
        value={noteTitle}
        onChange={(event) => {
          setIsInvalidSave(false);
          setNoteTitle(event.target.value);
        }}
      />
      <textarea
        placeholder="Enter Note"
        id="note-body-edit-input"
        className={isInvalidSave ? "input-error" : ""}
        cols={30}
        rows={5}
        value={noteBody}
        onChange={(event) => {
          setIsInvalidSave(false);
          setNoteBody(event.target.value);
        }}
      />
      <div className="note-buttons-container">
        <button className="save-btn" type="submit">
          Save
        </button>
        <button
          className="neutral-btn"
          type="button"
          onClick={() => setNoteView(NoteView.VIEWING)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
