import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import type { NewNote } from "../../type";


export function useAddNote() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (note: NewNote) => {
            const { error } = await supabase.from("notes").insert(note);
            if (error) throw error;
        },
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["notes"] });
        }
    })
}