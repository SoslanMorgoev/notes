import { useEffect } from "react";
import { AddNote } from "./components/AddNote";
import { AuthForm } from "./components/AuthForm";
import { NoteList } from "./components/NoteList";
import { UserList } from "./components/UserList";
import { useAuthStore } from "./store/authStore";
import { supabase } from "./lib/supabase";





function App() {
  const setUser = useAuthStore((state) => state.setUser);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      console.log("событие:", _event, "кто:", session?.user?.email);
    });
    return () => data.subscription.unsubscribe();
  }, []);
  return (
    <>
      <h1>Notes</h1>
      <AuthForm />
      <button onClick={() => supabase.auth.signOut()}>Log out</button>
      <AddNote />
      <NoteList />
      <UserList />
    </>

  )
}


export default App;