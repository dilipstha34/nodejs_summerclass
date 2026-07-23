import { useContext } from 'react';
import { UserContext } from '../App';

export function Profile() {
    const {user} = useContext(UserContext);

    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {user}</p>
        </div>
    );
}