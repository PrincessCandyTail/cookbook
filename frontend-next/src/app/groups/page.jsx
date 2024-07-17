'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import GroupList from "@/components/GroupList";

export default function GroupsPage() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {

        const fetchGroups = async () => {
            const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzZGFhIiwiaWF0IjoxNzIxMjAwMjkzLCJleHAiOjE3MjEyODY2OTN9.ZRArIjePyWYm6VLbWgZRVmT04V6QEo4cQtEFHwC1RlXQoYpWb8ODPT2s70yMLWd9"
            //localStorage.getItem('token');

            if (!token) {
                console.error('No token found');
                return;
            }

            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            try {
                const response = await fetch('http://localhost:8080/api/groups', requestOptions);
                const result = await response.json();
                setGroups(result.groups);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    return (
        <div className="container">
            <Header />
            <h1>Gruppen</h1>
            <GroupList groups={groups} />
        </div>
    );
};
