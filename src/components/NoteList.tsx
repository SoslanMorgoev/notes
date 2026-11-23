import { NoteItem } from "./NoteItem";
import { useNotes } from "./hooks/useNotes";

export function NoteList() {
    const { data: notes, isPending, isError } = useNotes();
    return (
        <div>
            {isError ? <p>Something went wrong</p> : isPending ? <p>Loading...</p> : <ul>{notes.map(note => (
                <NoteItem key={note.id} note={note} />
            ))}
            </ul>}
        </div>
    )
}