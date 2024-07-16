'use client'
import Header from '../../components/Header';
import GroupList from '../../components/GroupList';
import { useEffect, useState } from 'react';
import { fetchGroups } from '../../services/api';

export default function GroupsPage() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroupsData = async () => {
            try {
                const groupsData = await fetchGroups();
                setGroups(groupsData);
            } catch (error) {
                console.error('Error fetching groups:', error.message);
            }
        };

        fetchGroupsData();
    }, []);

    return (
        <div className="container">
            <Header />
            <h1>Gruppen</h1>
            <GroupList groups={groups} />
        </div>
    );
};
