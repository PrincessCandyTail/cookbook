'use client'

import Link from "next/link";

export default function Header () {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link href={"mainpage"}>Main Page</Link></li>
                    <li><Link href={"groups"}>Groups</Link></li>
                    <li><Link href={"userprofile"}>Profile</Link></li>
                    <li><Link href={"login"}>Login</Link> </li>
                    <li><Link href={"register"}>Register</Link></li>
                </ul>
            </nav>
        </header>
    );
};

