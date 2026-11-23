import { useState } from "react";
import type { Note } from "../type";
import { useDeleteNote } from "./hooks/useDeleteNote";

export function NoteItem({ note }: { note: Note }) {
  const deleteNote = useDeleteNote();
  const [isDelete, setIsDelete] = useState(false);

  return (
    <li>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => setIsDelete(true)}>Delete</button>
      <p>~~~~~~~~~~~~~~~~~~~~~~~~~~~</p>
      {isDelete && (
        <div>
          <p>Are you sure?</p>
          <button onClick={() => deleteNote.mutate(note.id)}>
            {deleteNote.isPending ? "Deleting" : "Delete"}
          </button>
          <button onClick={() => setIsDelete(false)}>No</button>
        </div>
      )}
      {deleteNote.error && <p>{deleteNote.error.message}</p>}
    </li>
  );
}
