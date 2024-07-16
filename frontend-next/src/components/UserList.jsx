'use client'
export default function UserList({ users }) {
    return (
        <ul>
            {users.map(user => (
                <li key={user.user_id}>{user.username}</li>
            ))}
        </ul>
    );
};
