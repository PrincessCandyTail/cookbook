'use client'
import {useState} from "react";
import Link from "next/link";
import style from "./page.module.css";
import { IconEye, IconEyeOff } from '@tabler/icons-react';

export default function LoginPage  () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [viewPassword, setViewPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": username,
            "password": password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/auth/login", requestOptions)
            .then((response) => response.json())
            .then((result) => handleFetch(result.token))
            .catch((error) => console.error(error));
    };

    function handleFetch(token) {
        localStorage.setItem("token", token)

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/users/username/" + username, requestOptions)
            .then((response) => response.json())
            .then((result) => saveId(result.id))
            .catch((error) => console.error(error));
    }

    function saveId(id) {
        localStorage.setItem("userId", id)
        window.open("/home", "_self")
    }

    return (
        <div className={style.outter}>
            <h1 className="pageTitle">Login</h1>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className="inputPair">
                    <label>Username</label>
                    <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="inputPair">
                    <label>Password</label>
                    {viewPassword ?
                        <div>
                            <input required type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <IconEyeOff className="icon" stroke={1.5} onClick={() => setViewPassword(!viewPassword)}/>
                        </div>
                        :
                        <div className="password">
                            <input className="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <IconEye className="icon" stroke={1.5} onClick={() => setViewPassword(!viewPassword)}/>
                        </div>
                    }
                </div>
                <div className={style.inner}>
                    <button className={style.submitButton} type="submit">Einloggen</button>
                    <p>Noch kein Account? <Link className="link" href="/register">Registrieren</Link></p>
                </div>
            </form>
        </div>
    );
};
