import { useEffect } from "react";
import { AddNote } from "./components/AddNote";
import { AuthForm } from "./components/AuthForm";
import { NoteList } from "./components/NoteList";
import { UserList } from "./components/UserList";
import { useAuthStore } from "./store/authStore";
import { supabase } from "./lib/supabase";

function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const authLoading = useAuthStore((state) => state.authLoading);
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);
  if (authLoading) return <p>Loading...</p>;
  if (!user) return <AuthForm />;
  return (
    <>
      <h1>Notes</h1>
      <AddNote />
      <NoteList />
      <UserList />

      <button
        onClick={() => {
          supabase.auth.signOut();
        }}
      >
        Log out
      </button>
    </>
  );
}

export default App;
