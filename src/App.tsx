import {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";

import "./App.css";
import "./utility.styles.css";

export interface NoteObject {
  id: number;
  title: string;
  note_body: string;
}

export const NotesListUpdateFunctionContext = createContext(
  {} as Dispatch<SetStateAction<NoteObject[]>>
);

export default function App() {
  const [notes, setNotes] = useState<NoteObject[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      const API_URL = import.meta.env.VITE_NOTES_API_URL;
      const { data } = await axios.get<NoteObject[]>(`${API_URL}/notes`);
      setNotes(data);
    };

    void getNotes();
  }, []);

  return (
    <NotesListUpdateFunctionContext.Provider value={setNotes}>
      <div>
        <h1 id="app-title">Notes App</h1>
        <small id="made-with-txt">
          Made with{" "}
          <a target="_blank" href="https://fastapi.tiangolo.com/">
            FastAPI
          </a>{" "}
          and
          <a target="_blank" href="https://react.dev/">
            {" "}
            React.js
          </a>
        </small>
        <AddNote />
        <hr />
        <NotesList notes={notes} />
      </div>
    </NotesListUpdateFunctionContext.Provider>
  );
}
