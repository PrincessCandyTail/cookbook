'use client'

import Link from "next/link";
import style from "./css/Header.module.css"

export default function Header() {
    return (
                <Link className={style.home} href={"/home"}>Home</Link>
    );
};

