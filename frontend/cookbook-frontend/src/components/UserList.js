// components/UserList.js
import React from 'react';

export default function UserList (){
    return (
        <ul>
            {users.map(user => (
                <li key={user.user_id}>{user.username}</li>
            ))}
        </ul>
    );
};

