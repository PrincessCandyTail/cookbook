import Link from 'next/link';
import React from 'react';

export default function Header () {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link href={"mainpage"}><a>Main Page</a></Link></li>
                    <li><Link href={"groups"}><a>Groups</a></Link></li>
                    <li><Link href={"userprofile"}><a>Profile</a></Link></li>
                    <li><Link href={"login"}><a>Login</a></Link></li>
                    <li><Link href={"register"}><a>Register</a></Link></li>
                </ul>
            </nav>
        </header>
    );
};

