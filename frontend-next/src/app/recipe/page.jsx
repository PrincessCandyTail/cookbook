'use client'
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import { IconBook, IconUsers, IconAlarm, IconChefHat } from '@tabler/icons-react';
import style from '@/components/css/RecipeCard.module.css';
import './styles.css';
import BookCard from "@/components/BookCard";

export default function BookPage() {
    const [recipes, setRecipes] = useState([]);
    const [bookTitle, setBookTitle] = useState("");
    const [bookAutor,setBookAutor] = useState("");

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`http://localhost:8080/api/books/${localStorage.getItem("bookId")}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setRecipes(result.recipes);
                setBookTitle(result.title);
                setBookAutor(result.owner.username)
            })
            .catch((error) => console.error(error));
    }, []);

    const renderChefHat = (difficulty) => {
        switch(difficulty) {
            case 1:
                return <IconChefHat stroke={1.5} />;
            case 2:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>;
            case 3:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>;
            case 4:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>;
            case 5:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>;
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <Header />

            <div className="main">
                <div className="book">
                    <div className="book-cover">
                        <div>
                            {bookTitle}
                            <div className="separator"></div>
                            {bookAutor}
                        </div>
                    </div>
                    <div className="book-content">
                        {recipes.length > 0 ? (
                            recipes.map((recipe) => (
                                <div key={recipe.id} onClick={() => {
                                    localStorage.setItem("bookId", recipe.id);
                                    window.open("/recipe", "_self");
                                }} className={style.outter} id={recipe.id}>
                                    <IconBook stroke={1.5} size={"6rem"} />
                                    <div className={style.inner}>
                                        <p className={style.title}>{recipe.title}</p>
                                        <div className={style.specifications}>
                                            <div className={style.specification}>
                                                <IconAlarm /> <p className={style.duration}>{recipe.duration}</p>
                                            </div>
                                            <div className={style.specification}>
                                                <IconUsers /><p className={style.portion}>{recipe.portionAmount}</p>
                                            </div>
                                            <div className={style.specification}>
                                                {renderChefHat(recipe.difficulty)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={style.text}>No Recipes found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
