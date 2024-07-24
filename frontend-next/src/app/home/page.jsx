'use client'
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import GroupCard from '@/components/GroupCard';
import JoinGroup from '@/components/JoinGroup';
import style from './page.module.css'
import { IconCirclePlus, IconSearch } from '@tabler/icons-react';

export default function MainPage() {
    const [groups, setGroups] = useState([]);
    const [show, setShow] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [showGroups, setShowGroups] = useState(false);
    const [allGroups, setAllGroups] = useState([]);
    const [showSure, setShowSure] = useState(false)
    const [groupId, setGroupId] = useState()
    const [showEdit, setShowEdit] = useState(false)

    useEffect(() => {
        fetchGroups()
    }, []);

    function fetchGroups() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/users/" + sessionStorage.getItem("userId"), requestOptions)
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
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const raw = JSON.stringify({
            "name": groupName
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/groups?userId=" + sessionStorage.getItem("userId"), requestOptions)
            .then((response) => response.json())
            .then((result) => fetchGroups())
            .catch((error) => console.error(error));
    }

    function joinGroupShow() {
        setShowGroups(true)

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/groups", requestOptions)
            .then((response) => response.json())
            .then((result) => setAllGroups(result))
            .catch((error) => console.error(error));
    }

    function configureDelete(id) {
        setShowSure(true)
        setGroupId(id)
    }

    function deleteGroup() {
        setShowSure(false)

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/groups/" + groupId, requestOptions)
            .then((response) => response.text())
            .then((result) => fetchGroups())
            .catch((error) => console.error(error));
    }

    function editConfig(id, name) {
        setGroupId(id)
        setGroupName(name)
        setShowEdit(true)
    }

    function edit() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const raw = JSON.stringify({
            "name": groupName
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/groups/" + groupId, requestOptions)
            .then((response) => response.json())
            .then((result) => setGroupName(""))
            .catch((error) => console.error(error));
    }

    return (
        <div className='background'>
            <div className="container">
                <div className='inner'>
                    <Header />
                    {show ?
                        <div className="dialogBackground">
                            <div className="dialog">
                                <form onSubmit={addGroup}>
                                    <h2 className="dialogTitle">Gruppe hinzufügen</h2>

                                    <div className='inputPair'>
                                        <label className={style.label}>Gruppenname</label>
                                        <input required value={groupName} className={style.input} type="text" onChange={(e) => setGroupName(e.target.value)} />
                                    </div>

                                    <div className="dialogButtons">
                                        <button type="submit">Speichern</button>
                                        <button className="closeButton" onClick={() => setShow(false)}>Schliessen</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        :
                        <></>
                    }

                    {showEdit ?
                        <div className="dialogBackground">
                            <div className="dialog">
                                <form onSubmit={edit}>
                                    <h2 className="dialogTitle">Gruppe editieren</h2>

                                    <div className='inputPair'>
                                        <label className={style.label}>Gruppenname</label>
                                        <input required value={groupName} className={style.input} type="text" onChange={(e) => setGroupName(e.target.value)} />
                                    </div>

                                    <div className="dialogButtons">
                                        <button type="submit">Speichern</button>
                                        <button className="closeButton" onClick={() => setShowEdit(false)}>Schliessen</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        :
                        <></>
                    }

                    {showGroups ?
                        <div className="dialogBackground">
                            <div className="dialog">
                                <h2 className="dialogTitle">Trete einer Gruppe bei</h2>
                                {allGroups.length > 0 ?
                                    <div>
                                        {allGroups.map((group) =>
                                            <JoinGroup id={group.id} name={group.name} owner={group.owner.username} fetchGroups={fetchGroups} />
                                        )}
                                    </div>
                                    :
                                    <p>Es wurden keine Gruppen gefunden.</p>
                                }
                                <button className="closeButton" onClick={() => setShowGroups(false)}>Schliessen</button>
                            </div>
                        </div>
                        :
                        <></>
                    }

                    {showSure ?
                        <div className="dialogBackground">
                            <div className="dialog">
                                <h2 className="dialogTitle">Möchten Sie diese Gruppe wirklich löschen?</h2>
                                <button onClick={deleteGroup}>Ja</button>
                                <button className="closeButton" onClick={() => setShowSure(false)}>Nein</button>
                            </div>
                        </div>
                        :
                        <></>
                    }

                    <h1 className='pageTitle'>Gruppen</h1>
                    {groups.length > 0 ?
                        <div className="cardGrid">
                            {groups.map((group) =>
                                <GroupCard id={group.id} name={group.name} ownerId={group.owner.id} deleteFunction={configureDelete} editFunction={editConfig} />
                            )}
                        </div>
                        :
                        <p className={style.text}>Es wurden keine Gruppen gefunden.</p>
                    }

                    <div className="pageFoot">
                        <IconSearch onClick={joinGroupShow} className="addIcon" stroke={1.5} size={"4rem"} />
                        <IconCirclePlus onClick={() => setShow(true)} className="addIcon" stroke={1.5} size={"4rem"} />
                    </div>
                </div>
            </div>
        </div>
    );
};
