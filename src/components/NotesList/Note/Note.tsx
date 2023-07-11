import { useState } from "react";
import NoteViewer from "./NoteViewer";
import NoteEditor from "./NoteEditor";
import { NoteObject } from "../../../App";

export enum NoteView {
  VIEWING,
  EDITING,
}

export default function Note({ note }: { note: NoteObject }) {
  const [noteView, setNoteView] = useState<NoteView>(NoteView.VIEWING);

  switch (noteView) {
    case NoteView.VIEWING:
      return <NoteViewer note={note} setNoteView={setNoteView} />;
    case NoteView.EDITING:
      return <NoteEditor note={note} setNoteView={setNoteView} />;
    default:
      return <></>;
  }
}
