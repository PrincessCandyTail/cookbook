'use client'

import Link from "next/link";
import style from "./Header.module.css"

export default function Header () {
    return (
        <header className={style.outter}>
            <nav>
                <ul className={style.list}>
                    <li><Link href={"/home"}>Home</Link></li>
                    <li><Link href={"/profile"}>Profile</Link></li>
                </ul>
            </nav>
        </header>
    );
};

