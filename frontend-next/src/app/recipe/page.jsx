'use client'

import Header from "@/components/Header"
import { useEffect, useState } from 'react';
import style from './page.module.css'
import RecipeCard from "@/components/RecipeCard";
import { IconCirclePlus } from '@tabler/icons-react';
import DescriptionCard from "@/components/DescriptionCard";
import IngredientCard from "@/components/IngredientCard";

// TODO: id problem: delete all in backend and rewrite all

export default function recipePage() {
    const [recipes, setRecipes] = useState([]);
    const [show, setShow] = useState(false);
    const [addIngredientShow, setAddIngredientShow] = useState(false);
    const [addDescriptionShow, setAddDescriptionShow] = useState(false);
    const [units, setUnits] = useState();
    const [imagePreview, setImagePreview] = useState('');
    const [showSure, setShowSure] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [editDescriptionShow, setEditDescriptionShow] = useState(false);
    const [editIngredientShow, setEditIngredientShow] = useState(false)

    const [recipeId, setRecipeId] = useState("")
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeDuration, setRecipeDuration] = useState();
    const [recipeDifficulty, setRecipeDifficulty] = useState();
    const [recipePortion, setRecipePortion] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [descriptions, setDescriptions] = useState([]);

    const [ingredientId, setIngredientId] = useState("");
    const [ingredientName, setIngredientName] = useState("");
    const [ingredientAmount, setIngredientAmount] = useState();
    const [ingredientUnit, setIngredientUnit] = useState("ml");

    const [descriptionId, setDescriptionId] = useState("");
    const [descriptionTitle, setDescriptionTitle] = useState("");
    const [descriptionDescription, setDescriptionDescription] = useState();

    useEffect(() => {
        fetchRecipes()
        fetchUnits()
    }, []);

    function resetInput() {
        setRecipeTitle("")
        setRecipeDuration()
        setRecipePortion()
        setRecipeDifficulty()
        setIngredients([])
        setDescriptions([])

        setIngredientId("")
        setIngredientName("")
        setIngredientAmount()
        setIngredientUnit("ml")

        setDescriptionId("")
        setDescriptionTitle("")
        setDescriptionDescription("")
    }

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
        resetInput()
    }

    function addRecipe() {
        setShow(false);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const raw = JSON.stringify({
            "title": recipeTitle,
            "duration": recipeDuration,
            "difficulty": recipeDifficulty,
            "portionAmount": recipePortion
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/recipes?bookId=" + localStorage.getItem("bookId"), requestOptions)
            .then((response) => response.json())
            .then((result) => addIngredients(result))
            .catch((error) => console.error(error));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview('');
        }
    }

    function addIngredients(result) {
        ingredients.map((ingredient) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

            const raw = JSON.stringify({
                "name": ingredient.name,
                "amount": ingredient.amount
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("http://localhost:8080/api/ingredients?unitName=" + ingredient.unit.name + "&recipeId=" + result.id, requestOptions)
                .then((response) => response.json())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));
        })

        addDescriptions(result)
    }

    function addDescriptions(result) {
        descriptions.map((description) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

            const raw = JSON.stringify({
                "title": description.title,
                "description": description.description
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("http://localhost:8080/api/descriptions?recipeId=" + result.id, requestOptions)
                .then((response) => response.json())
                .then((result) => fetchRecipes())
                .catch((error) => console.error(error));
        })
    }

    function addIngredient() {
        setAddIngredientShow(false)
        setEditIngredientShow(false)

        const unit = {
            name: ingredientUnit
        }

        const ingredientObject = {
            name: ingredientName,
            amount: ingredientAmount,
            unit: unit
        }

        ingredients.push(ingredientObject)
    }

    function addDescription() {
        setAddDescriptionShow(false)
        setEditDescriptionShow(false)

        const descriptionObject = {
            title: descriptionTitle,
            description: descriptionDescription
        }

        descriptions.push(descriptionObject)
    }

    function configureDelete(id) {
        setShowSure(true)
        setRecipeId(id)
    }

    function deleteRecipe() {
        setShowSure(false)

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/recipes/" + recipeId, requestOptions)
            .then((response) => response.text())
            .then((result) => fetchRecipes())
            .catch((error) => console.error(error));
    }

    function editConfig(id, name, duration, portion, difficulty) {
        setRecipeId(id)
        setRecipeTitle(name)
        setRecipeDuration(duration)
        setRecipePortion(portion)
        setRecipeDifficulty(difficulty)
        fetchIngredientsDescriptions(id)
        setShowEdit(true)
    }

    function fetchIngredientsDescriptions(id) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/recipes/" + id, requestOptions)
            .then((response) => response.json())
            .then((result) => saveIngredientsDescriptions(result))
            .catch((error) => console.error(error));
    }

    function saveIngredientsDescriptions(result) {
        setIngredients(result.ingredients)
        setDescriptions(result.descriptions)
    }

    function edit() {
        setShowEdit(false)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const raw = JSON.stringify({
            "title": recipeTitle,
            "duration": recipeDuration,
            "difficulty": recipeDifficulty,
            "portionAmount": recipePortion
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/recipes/" + recipeId, requestOptions)
            .then((response) => response.json())
            .then((result) => fetchRecipes()) //editIngredients()
            .catch((error) => console.error(error));
    }

    function editIngredients() {
        ingredients.map((ingredient) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

            const raw = JSON.stringify({
                "name": ingredient.name,
                "amount": ingredient.amount
            });

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("http://localhost:8080/api/ingredients" + ingredient.id + "?unitName=" + ingredient.unit.name, requestOptions)
                .then((response) => response.json())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));
        })

        editDerscriptions()
    }

    function editDerscriptions() {
        descriptions.map((description) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

            const raw = JSON.stringify({
                "title": description.title,
                "description": description.description
            });

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("http://localhost:8080/api/descriptions" + descriptionId, requestOptions)
                .then((response) => response.json())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));
        })
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

                            <label>Bild</label>
                            <input type="file" onChange={handleImageChange} />
                            {imagePreview &&
                                <img src={imagePreview} alt="Image Preview" style={{ width: '200px', marginTop: '10px' }} />
                            }

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
                                        <IngredientCard name={ingredient.name} amount={ingredient.amount} unit={ingredient.unit.name} />
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
                                        <DescriptionCard title={description.title} description={description.description} />
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

            {showEdit ?
                <div className={style.dialogBackground}>
                    <div className={style.dialog}>
                        <form onSubmit={edit}>
                            <h2 className={style.title}>Rezept editieren</h2>

                            <label className={style.label}>Rezepttitel</label>
                            <input value={recipeTitle} className={style.input} type="text" onChange={(e) => setRecipeTitle(e.target.value)} />

                            <label className={style.label}>Zeitaufwand</label>
                            <input value={recipeDuration} className={style.input} type="number" onChange={(e) => setRecipeDuration(e.target.value)} />

                            <label className={style.label}>Schwierigkeit (1-5)</label>
                            <input value={recipeDifficulty} className={style.input} type="number" onChange={(e) => setRecipeDifficulty(e.target.value)} />

                            <label className={style.label}>Für wie viele Personen ist eine Portion?</label>
                            <input value={recipePortion} className={style.input} type="number" onChange={(e) => setRecipePortion(e.target.value)} />

                            <label>Zutaten</label>
                            {editIngredientShow ?
                                <div className={style.dialogBackground}>
                                    <div className={style.dialog}>
                                        <h3 className={style.title}>Zutat editieren</h3>

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
                                            <button className={style.closeButton} onClick={() => setEditIngredientShow(false)}>Schliessen</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                            }

                            {ingredients &&
                                <div>
                                    {ingredients.map((ingredient) =>
                                        <IngredientCard id={ingredient.id} name={ingredient.name} amount={ingredient.amount} unit={ingredient.unit.name} />
                                    )}
                                </div>
                            }

                            <button className={style.addButton} type="button" onClick={() => setEditIngredientShow(true)}>Hinzufügen</button>



                            <label>Kochschritte</label>
                            {editDescriptionShow ?
                                <div className={style.dialogBackground}>
                                    <div className={style.dialog}>
                                        <h3 className={style.title}>Kochschritt editieren</h3>

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
                                            <button className={style.closeButton} onClick={() => setEditDescriptionShow(false)}>Schliessen</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                            }

                            {descriptions &&
                                <div>
                                    {descriptions.map((description) =>
                                        <DescriptionCard id={description.id}  title={description.title} description={description.description} />
                                    )}
                                </div>
                            }

                            <button className={style.addButton} type="button" onClick={() => setEditDescriptionShow(true)}>Hinzufügen</button>


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
                        <h2 className={style.title}>Möchten Sie dieses Rezept wirklich löschen?</h2>
                        <button onClick={deleteRecipe}>Ja</button>
                        <button className={style.closeButton} onClick={() => setShowSure(false)}>Nein</button>
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
                        <RecipeCard id={recipe.id} title={recipe.title} duration={recipe.duration} difficulty={recipe.difficulty} portion={recipe.portionAmount} deleteFunction={configureDelete} editFunction={editConfig} />
                    )}
                </div>
                :
                <p className={style.text}>Es wurden keine Rezepte gefunden.</p>
            }

            <IconCirclePlus onClick={() => setShow(true)} className={style.icon} stroke={1.5} size={"4rem"} />
        </div>
    )
}