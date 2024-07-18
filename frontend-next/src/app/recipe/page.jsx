'use client'

import Header from "@/components/Header"
import { useEffect, useState } from 'react';
import style from './page.module.css'
import RecipeCard from "@/components/RecipeCard";
import { IconCirclePlus } from '@tabler/icons-react';

export default function bookPage() {
    const [recipes, setRecipes] = useState([]);
    const [show, setShow] = useState(false);

    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeDuration, setRecipeDuration] = useState(20);
    const [recipeDifficulty, setRecipeDifficulty] = useState(3);
    const [recipePortion, setRecipePortion] = useState(4);
    const [ingredients, setIngredients] = useState([]);
    const [descriptions, setDescriptions] = useState([]);

    const [ingredientName, setIngredientName] = useState("");
    const [ingredientAmount, setIngredientAmount] = useState(200);
    const [ingredientUnit, setIngredientUnit] = useState();
    // add endpoint to add unit to ingredient

    const [descriptionTitle, setDescriptionTitle] = useState("")
    const [descriptionDescription, setDescriptionDescription] = useState("")<

    useEffect(() => {
        fetchRecipes()
    }, []);

    function fetchRecipes() {
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
    }

    function logRecipes(recipes) {
        setRecipes(recipes)
        console.log(recipes)
    }

    function addRecipe() {
        setShow(false)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const raw = JSON.stringify({
            "title": recipeTitle,
            "duration": recipeDuration,
            "difficulty": recipeDifficulty,
            "portionAmount": recipePortion,
            "ingredients": ingredients,
            "descriptions": descriptions
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/recipes?bookId=d09fc06f-0dda-4cc2-a174-e2657407a775", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    return (
        <div className="container">
            {show ?
                <div className={style.dialogBackground}>
                    <div className={style.dialog}>
                        <form onSubmit={addRecipe}>
                            <h2 className={style.title}>Rezept hinzufügen</h2>

                            <label className={style.label}>Rezepttitel</label>
                            <input className={style.input} type="text" onChange={(e) => setRecipeTitle(e.target.value)} />

                            <label className={style.label}>Zeitaufwand</label>
                            <input className={style.input} type="number" onChange={(e) => setRecipeDuration(e.target.value)} />

                            <label className={style.label}>Schwierigkeit (1-5)</label>
                            <input className={style.input} type="number" onChange={(e) => setRecipeDifficulty(e.target.value)} />

                            <label className={style.label}>Für wie viele Personen ist eine Portion?</label>
                            <input className={style.input} type="number" onChange={(e) => setRecipePortion(e.target.value)} />

                            <label>Zutaten</label>
                            { addIngredientShow ?
                                <div>
                                    <h3>Zutat hinzufügen</h3>
                                </div>
                                :
                                <></>
                            }

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
            <h1>Rezepte</h1>
            {recipes.length > 0 ?
                <div className={style.recipes}>
                    {recipes.map((recipe) =>
                        <RecipeCard id={recipe.id} title={recipe.title} duration={recipe.duration} difficulty={recipe.difficulty} portion={recipe.portionAmount} />
                    )}
                </div>
                :
                <p className={style.text}>Es wurden keine Rezepte gefunden.</p>
            }

            <IconCirclePlus onClick={() => setShow(true)} className={style.add} stroke={1.5} size={"4rem"} />
        </div>
    )
}