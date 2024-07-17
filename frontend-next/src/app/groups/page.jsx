'use client';

import {useEffect, useState} from 'react';
import Header from "@/components/Header";
import GroupList from "@/components/GroupList";

export default function GroupsPage() {
    const [groups, setGroups] = useState([]);
    const [dataFetched, setDataFetched] = useState(false)

    useEffect(() => {

        const fetchGroups = async () => {
            const token = localStorage.getItem('token');
            console.log(token)

            if (!token) {
                console.error('No token found');
                return "bogos";
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
                console.log(groups)
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    useEffect(() => {
        if (groups.length > 0){
            setDataFetched(true);
        }else {
        }

    }, [groups]);

    return (
        <div className="container">
            <Header/>
            <h1>Gruppen</h1>

            {
                dataFetched ? <GroupList groups={groups}/>
                    : ""
            }
        </div>
    );
};
