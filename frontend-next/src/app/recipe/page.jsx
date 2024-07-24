'use client'

import Header from "@/components/Header"
import { useEffect, useState } from 'react';
import style from './page.module.css'
import RecipeCard from "@/components/RecipeCard";
import { IconCirclePlus } from '@tabler/icons-react';
import DescriptionCard from "@/components/DescriptionCard";
import IngredientCard from "@/components/IngredientCard";

export default function recipePage() {
    const [bookTitle, setBookTitle] = useState()
    const [bookConstraints, setBookConstraints] = useState(false)
    const [bookOwnerId, setBookOwnerId] = useState()
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
    const [recipeDifficulty, setRecipeDifficulty] = useState(3);
    const [recipePortion, setRecipePortion] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [descriptions, setDescriptions] = useState([]);

    const [ingredientId, setIngredientId] = useState("");
    const [ingredientName, setIngredientName] = useState("");
    const [ingredientAmount, setIngredientAmount] = useState();
    const [ingredientUnit, setIngredientUnit] = useState("Stuck");

    const [descriptionId, setDescriptionId] = useState("");
    const [descriptionTitle, setDescriptionTitle] = useState("");
    const [descriptionDescription, setDescriptionDescription] = useState();

    useEffect(() => {
        fetchRecipes()
        fetchUnits()
    }, []);

    function openAdd() {
        resetInput()
        setShow(true)
    }

    function resetInput() {
        setRecipeTitle("")
        setRecipeDuration()
        setRecipePortion()
        setRecipeDifficulty(3)
        setIngredients([])
        setDescriptions([])

        setIngredientId("")
        setIngredientName("")
        setIngredientAmount()
        setIngredientUnit("Stuck")

        setDescriptionId("")
        setDescriptionTitle("")
        setDescriptionDescription("")
    }

    function fetchRecipes() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/books/" + sessionStorage.getItem("bookId"), requestOptions)
            .then((response) => response.json())
            .then((result) => logRecipes(result))
            .catch((error) => console.error(error));
    }

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

    function logRecipes(result) {
        setBookTitle(result.title)
        setBookConstraints(result.everybodyEdit)
        setBookOwnerId(result.owner.id)
        setRecipes(result.recipes)
        console.log(result.recipes)
        resetInput()
    }

    function addRecipe() {
        setShow(false);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

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

        fetch("http://localhost:8080/api/recipes?bookId=" + sessionStorage.getItem("bookId"), requestOptions)
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
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

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
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

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
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

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
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

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
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

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
            .then((result) => fetchRecipes())
            .catch((error) => console.error(error));
    }

    function editIngredientConfig(id, name, amount, unitName) {
        setIngredientId(id)
        setIngredientName(name)
        setIngredientAmount(amount)
        setIngredientUnit(unitName)
        setEditIngredientShow(true)
    }

    function editIngredient() {
        setEditIngredientShow(false)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const raw = JSON.stringify({
            name: ingredientName,
            amount: ingredientAmount
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/ingredients/" + ingredientId + "?unitName=" + ingredientUnit, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    function deleteIngredient(id) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/ingredients/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    function editDescriptionConfig(id, title, description) {
        setDescriptionId(id)
        setDescriptionTitle(title)
        setDescriptionDescription(description)
        setEditDescriptionShow(true)
    }

    function editDescription() {
        setEditDescriptionShow(false)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const raw = JSON.stringify({
            title: descriptionTitle,
            description: descriptionDescription
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/descriptions/" + descriptionId, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    function deleteDescription(id) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/descriptions/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    const isUserAllowed = () => {
        if (bookConstraints) {
            return true;
        } else if (bookOwnerId === sessionStorage.getItem("userId")) {
            return true;
        }
        return false;
    };

    const allowed = isUserAllowed()

    return (
        <div className="background">
            <div className="container">
                <div className="inner">
                    {show ?
                        <div className="dialogBackground">
                            <div className="dialog">
                                <form onSubmit={addRecipe}>
                                    <h2 className="dialogTitle">Rezept hinzufügen</h2>

                                    <div className="inputPair">
                                        <label className={style.label}>Rezepttitel</label>
                                        <input required value={recipeTitle} className={style.input} type="text" onChange={(e) => setRecipeTitle(e.target.value)} />
                                    </div>

                                    <div className="inputPair">
                                        <label className={style.label}>Zeitaufwand</label>
                                        <input required value={recipeDuration} className={style.input} type="number" onChange={(e) => setRecipeDuration(e.target.value)} />
                                    </div>

                                    <div className="inputPair">
                                        <label className={style.label}>Schwierigkeit</label>
                                        <input required value={recipeDifficulty} className={style.input} type="range" min={1} max={5} onChange={(e) => setRecipeDifficulty(e.target.value)} />
                                    </div>

                                    <div className="inputPair">
                                        <label className={style.label}>Für wie viele Personen ist eine Portion?</label>
                                        <input required value={recipePortion} className={style.input} type="number" onChange={(e) => setRecipePortion(e.target.value)} />
                                    </div>

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

                                    <div className="inputPair">
                                        <label>Kochschritte</label>
                                        {addDescriptionShow ?
                                            <div className="dialogBackground">
                                                <div className="dialog">
                                                    <h3 className="dialogTitle">Kochschritt hinzufügen</h3>

                                                    <div className={style.inputs}>
                                                        <div className="inputPair">
                                                            <label>Titel</label>
                                                            <input required value={descriptionTitle} className={style.titleInput} type="text" onChange={(e) => setDescriptionTitle(e.target.value)} />
                                                        </div>

                                                        <div className="inputPair">
                                                            <label>Beschreibung</label>
                                                            <textarea className={style.text} required value={descriptionDescription} onChange={(e) => setDescriptionDescription(e.target.value)} ></textarea>
                                                        </div>
                                                    </div>

                                                    <div className="dialogButtons">
                                                        <button type="button" onClick={addDescription}>Speichern</button>
                                                        <button className="closeButton" onClick={() => setAddDescriptionShow(false)}>Schliessen</button>
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

                                        <button className="addButton" type="button" onClick={() => setAddDescriptionShow(true)}>Hinzufügen</button>

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
                                    <h2 className="dialogTitle">Rezept editieren</h2>

                                    <div className="inputPair">
                                        <label className={style.label}>Rezepttitel</label>
                                        <input required value={recipeTitle} className={style.input} type="text" onChange={(e) => setRecipeTitle(e.target.value)} />
                                    </div>

                                    <div className="inputPair">
                                        <label className={style.label}>Zeitaufwand</label>
                                        <input required value={recipeDuration} className={style.input} type="number" onChange={(e) => setRecipeDuration(e.target.value)} />
                                    </div>

                                    <div className="inputPair">
                                        <label className={style.label}>Schwierigkeit (1-5)</label>
                                        <input required value={recipeDifficulty} className={style.input} type="number" onChange={(e) => setRecipeDifficulty(e.target.value)} />
                                    </div>

                                    <div className="inputPair">
                                        <label className={style.label}>Für wie viele Personen ist eine Portion?</label>
                                        <input required value={recipePortion} className={style.input} type="number" onChange={(e) => setRecipePortion(e.target.value)} />
                                    </div>

                                    <label>Zutaten</label>
                                    {editIngredientShow ?
                                        <div className="dialogBackground">
                                            <div className="dialog">
                                                <h3 className="dialogTitle">Zutat editieren</h3>

                                                <div className={style.inputs}>
                                                    <div className="inputPair">
                                                        <label>Name</label>
                                                        <input required value={ingredientName} className={style.titleInput} type="text" onChange={(e) => setIngredientName(e.target.value)} />
                                                    </div>

                                                    <div className="inputPair">
                                                        <label>Menge</label>
                                                        <input required value={ingredientAmount} className={style.amountInput} type="number" onChange={(e) => setIngredientAmount(e.target.value)} />
                                                    </div>

                                                    <div>
                                                        <label>Einheit</label>
                                                        <select className={style.select} value={ingredientUnit} onChange={(e) => setIngredientUnit(e.target.value)}>
                                                            {units.map((unit) =>
                                                                <option value={unit.name}>{unit.name}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="dialogButtons">
                                                    <button type="button" onClick={editIngredient}>Speichern</button>
                                                    <button className="closeButton" onClick={() => setEditIngredientShow(false)}>Schliessen</button>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <></>
                                    }

                                    {ingredients &&
                                        <div>
                                            {ingredients.map((ingredient) =>
                                                <IngredientCard id={ingredient.id} name={ingredient.name} amount={ingredient.amount} unit={ingredient.unit.name} editFunction={editIngredientConfig} deleteFunction={deleteIngredient} editable />
                                            )}
                                        </div>
                                    }


                                    <label>Kochschritte</label>
                                    {editDescriptionShow ?
                                        <div className="dialogBackground">
                                            <div className="dialog">
                                                <h3 className="dialogTitle">Kochschritt editieren</h3>

                                                <div className={style.inputs}>
                                                    <div className="inputPair">
                                                        <label>Titel</label>
                                                        <input required value={descriptionTitle} className={style.titleInput} type="text" onChange={(e) => setDescriptionTitle(e.target.value)} />
                                                    </div>

                                                    <div className="inputPair">
                                                        <label>Beschreibung</label>
                                                        <textarea className={style.text} required value={descriptionDescription} onChange={(e) => setDescriptionDescription(e.target.value)} ></textarea>
                                                    </div>
                                                </div>

                                                <div className="dialogButtons">
                                                    <button type="button" onClick={editDescription}>Speichern</button>
                                                    <button className="closeButton" onClick={() => setEditDescriptionShow(false)}>Schliessen</button>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <></>
                                    }

                                    {descriptions &&
                                        <div>
                                            {descriptions.map((description) =>
                                                <DescriptionCard id={description.id} title={description.title} description={description.description} editFunction={editDescriptionConfig} deleteFunction={deleteDescription} editable />
                                            )}
                                        </div>
                                    }

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
                                <h2 className="dialogTitle">Möchten Sie dieses Rezept wirklich löschen?</h2>
                                <button onClick={deleteRecipe}>Ja</button>
                                <button className="closeButton" onClick={() => setShowSure(false)}>Nein</button>
                            </div>
                        </div>
                        :
                        <></>
                    }

                    <Header />
                    <h1 className="pageTitle">Rezepte</h1>
                    <p className="dialogTitle">Buch: {bookTitle}</p>
                    {recipes.length > 0 ?
                        <div className={style.recipes}>
                            {recipes.map((recipe) =>
                                <RecipeCard id={recipe.id} title={recipe.title} duration={recipe.duration} difficulty={recipe.difficulty} portion={recipe.portionAmount} deleteFunction={configureDelete} editFunction={editConfig} />
                            )}
                        </div>
                        :
                        <p>Es wurden keine Rezepte gefunden.</p>
                    }

                    {allowed &&
                        <IconCirclePlus onClick={openAdd} className="addIcon" stroke={1.5} size={"4rem"} />
                    }
                </div>
            </div>
        </div>
    )
}