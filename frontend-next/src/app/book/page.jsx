'use client'

import Header from "@/components/Header"
import { useEffect, useState } from 'react';
import style from './page.module.css'
import BookCard from "@/components/BookCard";
import { IconCirclePlus } from '@tabler/icons-react';

export default function bookPage() {
    const [books, setBooks] = useState([])
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [everybodyEdit, setEverybodyEdit] = useState(false);

    useEffect(() => {
        fetchBooks()
    }, []);

    function fetchBooks() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/groups/" + localStorage.getItem("groupId"), requestOptions)
            .then((response) => response.json())
            .then((result) => logBooks(result.books))
            .catch((error) => console.error(error));
    }

    function logBooks(books) {
        setBooks(books)
        console.log(books)
    }

    function addBook() {
        setShow(false)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const raw = JSON.stringify({
            "title": title,
            "everybodyEdit": everybodyEdit
        });

        console.log(raw)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/books?userId=" + localStorage.getItem("userId") + "&groupId=" + localStorage.getItem("groupId"), requestOptions)
            .then((response) => response.text())
            .then((result) => fetchBooks())
            .catch((error) => console.error(error));
    }

    return (
        <div className="container">
            {show ?
                <div className={style.dialogBackground}>
                    <div className={style.dialog}>
                        <form onSubmit={addBook}>
                            <h2 className={style.title}>Buch hinzufügen</h2>

                            <label className={style.label}>Buchtitel</label>
                            <input className={style.input} type="text" onChange={(e) => setTitle(e.target.value)} />

                            <label className={style.label}>Jeder darf editieren</label>
                            <input className={style.input} type="checkbox" onChange={(e) => setEverybodyEdit(e.target.checked)} />

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
            <h1>Kochbücher</h1>
            {books.length > 0 ?
                <div className={style.books}>
                    {books.map((book) =>
                        <BookCard id={book.id} title={book.title} owner={book.owner.username} ownerId={book.owner.id} everybodyEdit={book.everybodyEdit} />
                    )}
                </div>
                :
                <p className={style.text}>No Books found</p>
            }

            <IconCirclePlus onClick={() => setShow(true)} className={style.icon} stroke={1.5} size={"4rem"} />
        </div>
    )
}