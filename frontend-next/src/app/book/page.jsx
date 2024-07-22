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

    function configureDelete(id) {
        setShowSure(true)
        setBookId(id)
    }

    function deleteBook() {
        setShowSure(false)

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        
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
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        
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

            {showEdit ?
                <div className={style.dialogBackground}>
                    <div className={style.dialog}>
                        <form onSubmit={edit}>
                            <h2 className={style.title}>Buch editieren</h2>

                            <label className={style.label}>Buchtitel</label>
                            <input value={title} className={style.input} type="text" onChange={(e) => setTitle(e.target.value)} />

                            <label className={style.label}>Jeder darf editieren</label>
                            <input checked={everybodyEdit} className={style.input} type="checkbox" onChange={(e) => setEverybodyEdit(e.target.checked)} />

                            <div className={style.buttons}>
                                <button type="submit">Speichern</button>
                                <button className={style.closeButton} onClick={() => setShowEdit(false)}>Schliessen</button>
                            </div>
                        </form>
                    </div>
                </div>
                :
                <></>
            }

            {showSure ?
                <div className={style.dialogBackground}>
                    <div className={style.dialog}>
                        <h2 className={style.title}>Möchten Sie dieses Buch wirklich löschen?</h2>
                        <button onClick={deleteBook}>Ja</button>
                        <button className={style.closeButton} onClick={() => setShowSure(false)}>Nein</button>
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
                        <BookCard id={book.id} title={book.title} owner={book.owner.username} ownerId={book.owner.id} everybodyEdit={book.everybodyEdit} deleteFunction={configureDelete} editFunction={editConfig} />
                    )}
                </div>
                :
                <p className={style.text}>No Books found</p>
            }

            <IconCirclePlus onClick={() => setShow(true)} className={style.icon} stroke={1.5} size={"4rem"} />
        </div>
    )
}