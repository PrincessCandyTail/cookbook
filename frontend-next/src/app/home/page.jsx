'use client'
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import GroupCard from '@/components/GroupCard';
import style from './page.module.css'

export default function MainPage() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/users/" + localStorage.getItem("userId"), requestOptions)
            .then((response) => response.json())
            .then((result) => logGroups(result.groups))
            .catch((error) => console.error(error));
    }, []);

    function logGroups(groups) {
        setGroups(groups)
        console.log(groups)
    }

    return (
        <div className="container">
            <Header />
            <h1>Home</h1>
            {groups.length > 0 ? 
                <div className={style.groups}>
                    {groups.map((group) => 
                        <GroupCard id={group.id} name={group.name}/ >
                    )}
                </div>
                :
                <p className={style.text}>No Groups found</p>
            }
        </div>
    );
};
