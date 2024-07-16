'use client'

export default function Header () {
    return (
        <header>
            <nav>
                <ul>
                    <li><a href={"mainpage"}>Main Page</a></li>
                    <li><a href={"groups"}>Groups</a></li>
                    <li><a href={"userprofile"}>Profile</a></li>
                    <li><a href={"login"}>Login</a> </li>
                    <li><a href={"register"}>Register</a></li>
                </ul>
            </nav>
        </header>
    );
};

