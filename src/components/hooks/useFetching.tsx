import { useQuery } from "@tanstack/react-query";


export function useFetching<T>(url: string, name: string) {
    return useQuery<T>({
        queryKey: [name, url],
        queryFn: async () => {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Error:${res.status}`);
            return res.json();
        }
    })
}
