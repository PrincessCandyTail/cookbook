'use client'
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import Header from '../../components/Header';
import Link from "next/link";

export default function UserProfilePage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // fetch
    }, []);

    return (
        <div>
            <Header />
            <h1>User Profile</h1>
            <Link href={"/CssTries"}>Link</Link>
            <UserList users={users} />
            <Link href={"/recipeDetail"}>Link </Link>
        </div>
    );
}