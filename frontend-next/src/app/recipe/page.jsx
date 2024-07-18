'use client'

import Header from "@/components/Header"
import { useEffect, useState } from 'react';
import style from './page.module.css'
import RecipeCard from "@/components/RecipeCard";

export default function bookPage() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/books/" + localStorage.getItem("bookId"), requestOptions)
            .then((response) => response.json())
            .then((result) => logRecipes(result.recipes))
            .catch((error) => console.error(error));
    }, []);

    function logRecipes(recipes) {
        setRecipes(recipes)
        console.log(recipes)
    }

    return(
        <div className="container">
            <Header />
            <h1>Kochbücher</h1>
            {recipes.length > 0 ? 
                <div className={style.recipes}>
                    {recipes.map((recipe) => 
                        <RecipeCard id={recipe.id} title={recipe.title} duration={recipe.duration} difficulty={recipe.difficulty} portion={recipe.portionAmount} />
                    )}
                </div>
                :
                <p className={style.text}>No Books found</p>
            }
        </div>
    )
}