import { useState } from "react";
import { supabase } from "../lib/supabase";

export function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const [mode, setMode] = useState<"signUp" | "login">("login");
    function handleToggle() {
        if (mode === "signUp") {
            setMode("login")
        } else {
            setMode("signUp");
        }

    }
    return (
        <>
            <div>
                <h3>{mode === "login" ? "LogIn" : "SignUp"}</h3>
                {mode === "signUp" ?
                    (
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const { data, error } = await supabase.auth.signUp({ email, password });
                            if (error) { setErrorText(error.message); return };
                            return data;
                        }}>
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit">Submit</button>
                        </form>)
                    : (
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            if (!email.trim() || !password.trim()) return;
                            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                            if (error) { setErrorText(error.message); return };
                            setPassword("");
                            return data;
                        }}>
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit">Submit</button>
                        </form>
                    )}
            </div>

            <button onClick={handleToggle}>{mode === "login" ? "to SignUp" : "to LogIn"}</button>
            {errorText && <p>{errorText}</p>}
        </>


    )
}