'use client'
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import GroupCard from '@/components/GroupCard';
import style from './page.module.css'
import { IconCirclePlus } from '@tabler/icons-react';

export default function MainPage() {
    const [groups, setGroups] = useState([]);
    const [show, setShow] = useState(false);
    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        fetchGroups()
    }, []);

    function fetchGroups() {
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
    }

    function logGroups(groups) {
        setGroups(groups)
        console.log(groups)
    }

    function addGroup() {
        setShow(false)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const raw = JSON.stringify({
            "name": groupName
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/groups?userId=" + localStorage.getItem("userId"), requestOptions)
            .then((response) => response.json())
            .then((result) => fetchGroups())
            .catch((error) => console.error(error));
    }

    return (
        <div className="container">
            {show ?
                <div className={style.dialogBackground}>
                    <div className={style.dialog}>
                        <form onSubmit={addGroup}>
                            <h2 className={style.title}>Gruppe hinzufügen</h2>

                            <label className={style.label}>Gruppenname</label>
                            <input className={style.input} type="text" onChange={(e) => setGroupName(e.target.value)} />

                            <div className={style.buttons}>
                                <button type="submit">Speichern</button>
                                <button className={style.closeButton} onClick={() => setShow(false)}>Schliessen</button>
                            </div>
                        </form>
                    </div>
                </div>
                :
                <></>
            }


            <Header />
            <h1>Home</h1>
            {groups.length > 0 ?
                <div className={style.groups}>
                    {groups.map((group) =>
                        <GroupCard id={group.id} name={group.name} />
                    )}
                </div>
                :
                <p className={style.text}>No Groups found</p>
            }

            <IconCirclePlus onClick={() => setShow(true)} className={style.add} stroke={1.5} size={"4rem"} />
        </div>
    );
};
