'use client'
import {useState} from "react";
import Link from "next/link";
import style from "./page.module.css";

export default function LoginPage  () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Login logic :(
    };

    return (
        <div className={style.outter}>
            <h1>Login</h1>
            <form className={style.form} onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className={style.inner}>
                    <button className={style.submitButton} type="submit">Einloggen</button>
                    <p>Noch kein Account? <Link className={style.link} href="/register">Registrieren</Link></p>
                </div>
            </form>
        </div>
    );
};
