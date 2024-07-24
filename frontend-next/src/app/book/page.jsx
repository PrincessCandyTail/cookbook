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
    const [showSure, setShowSure] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [bookId, setBookId] = useState("");

    useEffect(() => {
        fetchBooks()
    }, []);

    function fetchBooks() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/groups/" + sessionStorage.getItem("groupId"), requestOptions)
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
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const raw = JSON.stringify({
            "title": title,
            "everybodyEdit": everybodyEdit
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/books?userId=" + sessionStorage.getItem("userId") + "&groupId=" + sessionStorage.getItem("groupId"), requestOptions)
            .then((response) => response.text())
            .then((result) => fetchBooks())
            .catch((error) => console.error(error));
    }

    function configureDelete(id) {
        setShowSure(true)
        setBookId(id)
    }

    function deleteBook() {
        setShowSure(false)

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/books/" + bookId, requestOptions)
            .then((response) => response.text())
            .then((result) => fetchBooks())
            .catch((error) => console.error(error));
    }

    function editConfig(id, name, everybodyEdit) {
        setBookId(id)
        setTitle(name)
        setEverybodyEdit(everybodyEdit)
        setShowEdit(true)
    }

    function edit() {
        setShowEdit(false)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const raw = JSON.stringify({
            "title": title,
            "everybodyEdit": everybodyEdit
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/books/" + bookId, requestOptions)
            .then((response) => response.text())
            .then((result) => fetchBooks())
            .catch((error) => console.error(error));
    }

    return (
        <div className="background">
            <div className="container">
                <div className="inner">
                    {show ?
                        <div className="dialogBackground">
                            <div className="dialog">
                                <form onSubmit={addBook}>
                                    <h2 className="dialogTitle">Buch hinzufügen</h2>

                                    <div className="inputPair">
                                        <label className={style.label}>Buchtitel</label>
                                        <input required className={style.input} type="text" onChange={(e) => setTitle(e.target.value)} />
                                    </div>

                                    <div className="inputPair">
                                        <label className={style.label}>Jeder darf editieren</label>
                                        <input className={style.input} type="checkbox" onChange={(e) => setEverybodyEdit(e.target.checked)} />
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
                                    <h2 className="dialogTitle">Buch editieren</h2>

                                    <div className="inputPair">
                                        <label className={style.label}>Buchtitel</label>
                                        <input required value={title} className={style.input} type="text" onChange={(e) => setTitle(e.target.value)} />
                                    </div>

                                    <div className="inputPair">
                                        <label className={style.label}>Jeder darf editieren</label>
                                        <input checked={everybodyEdit} className={style.input} type="checkbox" onChange={(e) => setEverybodyEdit(e.target.checked)} />
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

                    {showSure ?
                        <div className="dialogBackground">
                            <div className="dialog">
                                <h2 className="dialogTitle">Möchten Sie dieses Buch wirklich löschen?</h2>
                                <div className="dialogButtons">
                                    <button onClick={deleteBook}>Ja</button>
                                    <button className="closeButton" onClick={() => setShowSure(false)}>Nein</button>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }


                    <Header />
                    <h1 className="pageTitle">Kochbücher</h1>
                    {books.length > 0 ?
                        <div className="cardGrid">
                            {books.map((book) =>
                                <BookCard id={book.id} title={book.title} owner={book.owner.username} ownerId={book.owner.id} everybodyEdit={book.everybodyEdit} deleteFunction={configureDelete} editFunction={editConfig} />
                            )}
                        </div>
                        :
                        <p className={style.text}>No Books found</p>
                    }

                    <IconCirclePlus onClick={() => setShow(true)} className="addIcon" stroke={1.5} size={"4rem"} />
                </div>
            </div>
        </div>
    )
}