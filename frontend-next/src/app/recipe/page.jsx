'use client'

import Header from "@/components/Header"
import { useEffect, useState } from 'react';
import style from './page.module.css'
import RecipeCard from "@/components/RecipeCard";
import { IconCirclePlus } from '@tabler/icons-react';
import DescriptionCard from "@/components/DescriptionCard";

export default function bookPage() {
    const [recipes, setRecipes] = useState([]);
    const [show, setShow] = useState(false);
    const [addIngredientShow, setAddIngredientShow] = useState(false);
    const [addDescriptionShow, setAddDescriptionShow] = useState(false);
    const [units, setUnits] = useState();

    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeDuration, setRecipeDuration] = useState();
    const [recipeDifficulty, setRecipeDifficulty] = useState();
    const [recipePortion, setRecipePortion] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [descriptions, setDescriptions] = useState([]);

    const [ingredientName, setIngredientName] = useState("");
    const [ingredientAmount, setIngredientAmount] = useState();
    const [ingredientUnit, setIngredientUnit] = useState("ml");
    // add endpoint to add unit to ingredient

    const [descriptionTitle, setDescriptionTitle] = useState("")
    const [descriptionDescription, setDescriptionDescription] = useState()

    useEffect(() => {
        fetchRecipes()
        fetchUnits()
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

    function fetchUnits() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/units", requestOptions)
            .then((response) => response.json())
            .then((result) => setUnits(result))
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

    function addIngredient() {
        setAddIngredientShow(false)

        const ingredientObject = {
            name: ingredientName,
            amount: ingredientAmount,
            unit: ingredientUnit
        }

        ingredients.push(ingredientObject)
    }

    function addDescription() {
        setAddDescriptionShow(false)

        const descriptionObject = {
            title: descriptionTitle,
            description: descriptionDescription
        }

        descriptions.push(descriptionObject)
    }

    return (
        <div className="container">
            {show ?
                <div className={style.dialogBackground}>
                    <div className={style.dialog}>
                        <form onSubmit={addRecipe}>
                            <h2 className={style.title}>Rezept hinzufügen</h2>

                            <label className={style.label}>Rezepttitel</label>
                            <input value={recipeTitle} className={style.input} type="text" onChange={(e) => setRecipeTitle(e.target.value)} />

                            <label className={style.label}>Zeitaufwand</label>
                            <input value={recipeDuration} className={style.input} type="number" onChange={(e) => setRecipeDuration(e.target.value)} />

                            <label className={style.label}>Schwierigkeit (1-5)</label>
                            <input value={recipeDifficulty} className={style.input} type="number" onChange={(e) => setRecipeDifficulty(e.target.value)} />

                            <label className={style.label}>Für wie viele Personen ist eine Portion?</label>
                            <input value={recipePortion} className={style.input} type="number" onChange={(e) => setRecipePortion(e.target.value)} />

                            <label>Zutaten</label>
                            {addIngredientShow ?
                                <div className={style.dialogBackground}>
                                    <div className={style.dialog}>
                                        <h3 className={style.title}>Zutat hinzufügen</h3>

                                        <div className={style.inputs}>
                                            <div>
                                                <label>Name</label>
                                                <input value={ingredientName} className={style.titleInput} type="text" onChange={(e) => setIngredientName(e.target.value)} />
                                            </div>

                                            <div>
                                                <label>Menge</label>
                                                <input value={ingredientAmount} className={style.amountInput} type="number" onChange={(e) => setIngredientAmount(e.target.value)} />
                                            </div>

                                            <div>
                                                <label>Einheit</label>
                                                <select value={ingredientUnit} onChange={(e) => setIngredientUnit(e.target.value)}>
                                                    {units.map((unit) => 
                                                        <option value={unit.name}>{unit.name}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className={style.buttons}>
                                            <button type="button" onClick={addIngredient}>Speichern</button>
                                            <button className={style.closeButton} onClick={() => setAddIngredientShow(false)}>Schliessen</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                            }

                            {ingredients.length > 0 ?
                                <div>
                                    {ingredients.map((ingredient) =>
                                        <p className={style.ingredientEntry} >{ingredient.name} - {ingredient.amount} {ingredient.unit}</p>
                                    )}
                                </div>
                                :
                                <></>
                            }

                            <button className={style.addButton} type="button" onClick={() => setAddIngredientShow(true)}>Hinzufügen</button>



                            <label>Kochschritte</label>
                            {addDescriptionShow ?
                                <div className={style.dialogBackground}>
                                    <div className={style.dialog}>
                                        <h3 className={style.title}>Kochschritt hinzufügen</h3>

                                        <div className={style.inputs}>
                                            <div>
                                                <label>Titel</label>
                                                <input value={descriptionTitle} className={style.titleInput} type="text" onChange={(e) => setDescriptionTitle(e.target.value)} />
                                            </div>

                                            <div>
                                                <label>Beschreibung</label>
                                                <textarea value={descriptionDescription} className={style.description} onChange={(e) => setDescriptionDescription(e.target.value)} ></textarea>
                                            </div>
                                        </div>

                                        <div className={style.buttons}>
                                            <button type="button" onClick={addDescription}>Speichern</button>
                                            <button className={style.closeButton} onClick={() => setAddDescriptionShow(false)}>Schliessen</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                            }

                            {descriptions.length > 0 ?
                                <div>
                                    {descriptions.map((description) =>
                                        <DescriptionCard title={description.title} description={description.description}/>
                                    )}
                                </div>
                                :
                                <></>
                            }

                            <button className={style.addButton} type="button" onClick={() => setAddDescriptionShow(true)}>Hinzufügen</button>



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

            <IconCirclePlus onClick={() => setShow(true)} className={style.icon} stroke={1.5} size={"4rem"} />
        </div>
    )
}