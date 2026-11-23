import { supabase } from "../../lib/supabase";
import { useQuery } from "@tanstack/react-query";
import type { Note } from "../../type";


export function useNotes() {
    return useQuery<Note[]>({
        queryKey: ["notes"],
        queryFn: async () => {
            const { data, error } = await supabase.from("notes").select("*");
            if (error) throw new Error(error.message);

            return data;
        }
    })
}
