'use client'

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import style from '../recipe/page.module.css'
import Showdown from "showdown";

export default function fridgeFusion() {
    const [addIngredientShow, setAddIngredientShow] = useState(false)
    const [units, setUnits] = useState();
    const [ingredients, setIngredients] = useState([])
    const [ingredientName, setIngredientName] = useState("");
    const [ingredientAmount, setIngredientAmount] = useState("");
    const [ingredientUnit, setIngredientUnit] = useState("Stück");
    const [response, setResponse] = useState("")
    const [loading, setLoading] = useState(false)

    const converter = new Showdown.Converter();

    useEffect(() => {
        fetchUnits()
    }, []);

    function fetchUnits() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

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

    function resetInput() {
        setIngredientName("")
        setIngredientAmount()
        setIngredientUnit("Stück")
    }

    function addIngredient() {
        if (inputValid()) {
            setAddIngredientShow(false)

            const unit = {
                name: ingredientUnit
            }

            const ingredientObject = {
                name: ingredientName,
                amount: ingredientAmount,
                unit: unit
            }

            ingredients.push(ingredientObject)

            resetInput()
        }
    }

    function inputValid() {
        if (ingredientAmount > -1 && ingredientName.length <= 25) {
            return true;
        } else {
            return false;
        }
    }

    function generateRecipe() {
        let message = "Generiere ein Rezept mit diesen Zutaten: "
        ingredients.map((ingredient) => message = message + ingredient.name + " " + ingredient.amount + " " + ingredient.unit.name + ", ")

        const apiKey = 'sk-proj-ShpkvfYBshDFa42DO2ZKT3BlbkFJczYU3TOaA6oftcjTrbkm';
        const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'user', content: message }
                ],
                max_tokens: 500
            })
        })
            .then((response) => response.json())
            .then((data) => handleResponse(data));

        setLoading(true)
    }

    function handleResponse(data) {
        const md = data.choices[0].message.content
        const html = converter.makeHtml(md)
        setResponse(html)
        setLoading(false)
    }

    return (
        <div className="background">
            <div className="container">
                <div className="inner">
                    <Header />
                    <h1 className="pageTitle">Fridge Fusion</h1>
                    <label>Zutaten</label>
                    {addIngredientShow ?
                        <div className="dialogBackground">
                            <div className="dialog">
                                <h3 className="dialogTitle">Zutat hinzufügen</h3>
                                <form onSubmit={addIngredient}>
                                    <div className={style.inputs}>
                                        <div className="inputPair">
                                            <label>Name</label>
                                            <input required value={ingredientName} className={style.titleInput} type="text" onChange={(e) => setIngredientName(e.target.value)} />
                                        </div>

                                        <div className="inputPair">
                                            <label>Menge</label>
                                            <input required value={ingredientAmount} className={style.amountInput} type="number" min={1} onChange={(e) => setIngredientAmount(e.target.value)} />
                                        </div>

                                        <div className="inputPair">
                                            <label>Einheit</label>
                                            <select className={style.select} value={ingredientUnit} onChange={(e) => setIngredientUnit(e.target.value)}>
                                                {units.map((unit) =>
                                                    <option value={unit.name}>{unit.name}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="dialogButtons">
                                        <button className="closeButton" onClick={() => setAddIngredientShow(false)}>Schliessen</button>
                                        <button type="submit">Speichern</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        :
                        <></>
                    }

                    {ingredients.length > 0 ?
                        <>
                            {ingredients.map((ingredient) =>
                                <p>{ingredient.name} - {ingredient.amount} {ingredient.unit.name}</p>
                            )}
                        </>
                        :
                        <></>
                    }

                    <div className={style.buttons}>
                        <button className="addButton" type="button" onClick={() => setAddIngredientShow(true)}>Hinzufügen</button>
                        <button type="button" onClick={generateRecipe}>Generieren</button>
                    </div>

                    {loading ?
                        <p>Loading...</p>
                        :
                        <></>
                    }

                    <div className={style.gptResponse} dangerouslySetInnerHTML={{ __html: response }}></div>
                </div>
            </div>
        </div>
    )
}