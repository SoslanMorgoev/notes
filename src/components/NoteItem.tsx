import { useState } from "react";
import type { Note } from "../type";
import { useDeleteNote } from "./hooks/useDeleteNote";
import { useEditNote } from "./hooks/useEditNote";

export function NoteItem({ note }: { note: Note }) {
  const deleteNote = useDeleteNote();
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const editNote = useEditNote();
  const [titleInput, setTitleInput] = useState(note.title);

  return (
    <li>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => setIsDelete(true)}>Delete</button>
      <button onClick={() => setIsEdit(true)}>Edit</button>
      <p>~~~~~~~~~~~~~~~~~~~~~~~~~~~</p>
      {isEdit && (
        <div>
          <input
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <button
            onClick={() =>
              editNote.mutate(
                { id: note.id, title: titleInput.trim() },
                {
                  onSuccess: () => setIsEdit(false),
                },
              )
            }
          >
            Save
          </button>
          <button onClick={() => setIsEdit(false)}>Close</button>
        </div>
      )}
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
