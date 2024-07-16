'use client'
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import Header from '../../components/Header';

export default function UserProfilePage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // fetch
    }, []);

    return (
        <div>
            <Header />
            <h1>User Profile</h1>
            <UserList users={users} />
        </div>
    );
}