'use client'

import Header from "@/components/Header"
import { useEffect, useState } from 'react';
import style from './page.module.css'
import BookCard from "@/components/BookCard";

export default function bookPage() {
    const [books, setBooks] = useState([])

    useEffect(() => {
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
    }, []);

    function logBooks(books) {
        setBooks(books)
        console.log(books)
    }

    return(
        <div className="container">
            <Header />
            <h1>Kochbücher</h1>
            {books.length > 0 ? 
                <div className={style.books}>
                    {books.map((book) => 
                        <BookCard id={book.id} title={book.title} owner={book.owner.username}/>
                    )}
                </div>
                :
                <p className={style.text}>No Books found</p>
            }
        </div>
    )
}