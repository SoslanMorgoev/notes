import type { User } from "../type"

export function UserItem({ user }: { user: User }) {

    return (
        <li>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>~~~~~~~~~~~~~~~~~~~~~~~~~~~</p>

        </li>



    )
}