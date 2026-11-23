import type { User } from "../type";
import { useFetching } from "./hooks/useFetching";
import { UserItem } from "./UserItem";

export function UserList() {
    const urlUsers = `https://jsonplaceholder.typicode.com/users`;
    const { data: users, isPending, isError } = useFetching<User[]>(urlUsers, "users");
    return (
        <div>
            {isError ? <p>Something went wrong</p> : isPending ? <p>Loading...</p> : <ul>{users.map(user => (
                <UserItem key={user.id} user={user} />
            ))}
            </ul>}
        </div>
    )
}