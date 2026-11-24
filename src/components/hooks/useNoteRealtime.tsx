import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "../../lib/supabase";

export function useNoteRealtime() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel("notes-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notes" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}
