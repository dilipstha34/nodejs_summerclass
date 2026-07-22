import { useContext } from "react"

export function Profile() {
    const { user } = useContext(UserContext)
    return <p>Welcome, {user}!</p>
}