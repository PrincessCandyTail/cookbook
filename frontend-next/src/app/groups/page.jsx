'use client'
import Header from '../../components/Header';
import GroupList from '../../components/GroupList';
import { useEffect, useState } from 'react';

export default function GroupsPage() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // fetch
    }, []);

    return (
        <div className="container">
            <Header />
            <h1>Gruppen</h1>
            <GroupList groups={groups} />
        </div>
    );
};
