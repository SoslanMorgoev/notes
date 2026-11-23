import type { Note } from "../type"
import { useDeleteNote } from "./hooks/useDeleteNote"

export function NoteItem({ note }: { note: Note }) {
    const deleteNote = useDeleteNote();
    return (
        <li>

            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <button onClick={() => deleteNote.mutate(note.id)}>{deleteNote.isPending ? "Deleting" : "Delete"}</button>
            <p>~~~~~~~~~~~~~~~~~~~~~~~~~~~</p>
            {deleteNote.error && <p>{deleteNote.error.message}</p>}
        </li>



    )
}
