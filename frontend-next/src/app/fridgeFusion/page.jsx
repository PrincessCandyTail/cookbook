'use client'

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import style from '../recipe/page.module.css'

export default function fridgeFusion() {
    const [addIngredientShow, setAddIngredientShow] = useState(false)
    const [units, setUnits] = useState();
    const [ingredients, setIngredients] = useState([])
    const [ingredientName, setIngredientName] = useState("");
    const [ingredientAmount, setIngredientAmount] = useState();
    const [ingredientUnit, setIngredientUnit] = useState("Stück");

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

    function addIngredient() {
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


    return (
        <div className="background">
            <div className="container">
                <div className="inner">
                    <Header />
                    <h1 className="pageTitle">
                        Fridge Fusion
                        <div className="inputPair">
                            <label>Zutaten</label>
                            {addIngredientShow ?
                                <div className="dialogBackground">
                                    <div className="dialog">
                                        <h3 className="dialogTitle">Zutat hinzufügen</h3>

                                        <div className={style.inputs}>
                                            <div className="inputPair">
                                                <label>Name</label>
                                                <input required value={ingredientName} className={style.titleInput} type="text" onChange={(e) => setIngredientName(e.target.value)} />
                                            </div>

                                            <div className="inputPair">
                                                <label>Menge</label>
                                                <input required value={ingredientAmount} className={style.amountInput} type="number" onChange={(e) => setIngredientAmount(e.target.value)} />
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
                                            <button type="button" onClick={addIngredient}>Speichern</button>
                                            <button className="closeButton" onClick={() => setAddIngredientShow(false)}>Schliessen</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                            }

                            {ingredients.length > 0 ?
                                <div>
                                    {ingredients.map((ingredient) =>
                                        <IngredientCard name={ingredient.name} amount={ingredient.amount} unit={ingredient.unit.name} />
                                    )}
                                </div>
                                :
                                <></>
                            }

                            <button className="addButton" type="button" onClick={() => setAddIngredientShow(true)}>Hinzufügen</button>

                        </div>
                    </h1>
                </div>
            </div>
        </div>
    )
}