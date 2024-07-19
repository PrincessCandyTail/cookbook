'use client'
import Header from "@/components/Header"
import {useEffect, useState} from 'react';
import style from './page.module.css'
import './styles.css'
import {IconCirclePlus} from '@tabler/icons-react';
import Link from "next/link";

export default function BookPage() {
    const [books, setBooks] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [everybodyEdit, setEverybodyEdit] = useState(false);

    useEffect(() => {
        fetchBooks();
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
        setBooks(books);
        console.log(books);
    }

    function addBook(e) {
        e.preventDefault();
        setShow(false);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const raw = JSON.stringify({
            "title": title,
            "everybodyEdit": everybodyEdit
        });

        console.log(raw);

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
            <Header/>
            <h1>Kochbücher</h1>


            {show &&
                <div className={style.dialogBackground}>
                    <div className={style.dialog}>
                        <form onSubmit={addBook}>
                            <h2 className={style.title}>Buch hinzufügen</h2>

                            <label className={style.label}>Buchtitel</label>
                            <input className={style.input} type="text" onChange={(e) => setTitle(e.target.value)}/>

                            <label className={style.label}>Jeder darf editieren</label>
                            <input className={style.input} type="checkbox"
                                   onChange={(e) => setEverybodyEdit(e.target.checked)}/>

                            <div className={style.buttons}>
                                <button type="submit">Speichern</button>
                                <button className={style.closeButton} onClick={() => setShow(false)}>Schliessen</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            <div className={style.books} >
                {books.length > 0 ? (
                    books.map((book, index) => (
                        <div className="book" key={index}>
                            <div className="back"></div>
                            <div className="page6">
                                <br/>
                                <br/>
                                <h1>
                                    <Link href={"recipe"}>Click me!</Link>
                                </h1>
                            </div>
                            <div className="page5"></div>
                            <div className="page4"></div>
                            <div className="page3"></div>
                            <div className="page2"></div>
                            <div className="page1"></div>
                            <div className="front">
                                <h1>{book.title}</h1>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Keine Bücher gefunden.</p>
                )}
            </div>
            <button onClick={() => setShow(true)} className="addButton">
                <IconCirclePlus/> Buch hinzufügen
            </button>
        </div>
    );
}
