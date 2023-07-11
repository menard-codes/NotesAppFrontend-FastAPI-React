import { useContext, Dispatch, SetStateAction } from "react";
import axios from "axios";

import { NoteObject, NotesListUpdateFunctionContext } from "../../../App";

import "./DeleteModal.styles.css";

interface DeleteModalProps {
  noteId: number;
  showDeleteModal: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteModal({
  noteId,
  showDeleteModal,
}: DeleteModalProps) {
  const setNotes = useContext(NotesListUpdateFunctionContext);

  const handleYesClick = async () => {
    const API_URL = import.meta.env.VITE_NOTES_API_URL;
    await axios.delete(`${API_URL}/note/${noteId}`);

    const { data } = await axios.get<NoteObject[]>(`${API_URL}/notes`);
    setNotes(data);
    showDeleteModal(false);
  };

  const handleNoClick = () => {
    showDeleteModal(false);
  };

  return (
    <div id="delete-modal-container">
      <div id="delete-modal">
        <p id="prompt-msg">Delete this Note?</p>
        <div id="btn-container">
          <button id="yes-btn" onClick={() => void handleYesClick()}>
            Yes
          </button>
          <button id="no-btn" onClick={handleNoClick}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
