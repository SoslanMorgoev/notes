import { useState } from "react";
import { useAddNote } from "./hooks/useAddNote";

export function AddNote() {
    const [inputTitle, setInputTitle] = useState("");
    const [inputBody, setInputBody] = useState("");
    const addNote = useAddNote();
    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (!inputBody || !inputTitle) return;
                addNote.mutate({ title: inputTitle, body: inputBody },
                    {
                        onSuccess: () => {
                            setInputBody("");
                            setInputTitle("");
                        }
                    }
                );


            }}>
                <input value={inputTitle} placeholder="Add note title..." onChange={(e) => setInputTitle(e.target.value)} />
                <input value={inputBody} placeholder="Add note body..." onChange={(e) => setInputBody(e.target.value)} />
                <button type="submit" disabled={addNote.isPending}>{addNote.isPending ? "Adding..." : "Add note"}</button>
            </form>
            {addNote.isError && <p>{addNote.error.message}</p>}
        </>
    )
}