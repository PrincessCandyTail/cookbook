'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import style from './page.module.css';
import Link from 'next/link';

export default function InfoPage() {
    const [recipes, setRecipes] = useState([]);
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        fetchRecipes();
    }, []);

    function fetchRecipes() {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch('http://localhost:8080/api/books/' + localStorage.getItem('bookId'), requestOptions)
            .then((response) => response.json())
            .then((result) => setRecipes(result.recipes))
            .catch((error) => console.error('Error fetching recipes:', error));
    }

    function handleDelete() {
        if (window.confirm('Möchten Sie dieses Rezept wirklich löschen?')) {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow',
            };

            fetch(`http://localhost:8080/api/recipes/${recipes[currentRecipeIndex]?.id}`, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        alert('Rezept erfolgreich gelöscht');
                        setRecipes((prevRecipes) => prevRecipes.filter((_, index) => index !== currentRecipeIndex));
                        if (currentRecipeIndex >= recipes.length - 1) {
                            setCurrentRecipeIndex((prevIndex) => prevIndex - 1);
                        }
                    } else {
                        alert('Fehler beim Löschen des Rezepts');
                    }
                })
                .catch((error) => alert('Fehler: ' + error.message));
        }
    }

    function handleEdit() {
        // Edit functionality implementation here
    }

    function showNextRecipe() {
        setIsFlipped(true);
        setTimeout(() => {
            setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
            setIsFlipped(false);
        }, 400); // Zeit für das Umblättern
    }

    const currentRecipe = recipes[currentRecipeIndex];

    return (
        <div className={style.container}>
            <Header />
            <h1 className={style.pageTitle}>Rezeptinformationen</h1>
            <div className={`${style.flipbook} ${isFlipped ? style.flip : ''}`}>
                <div className={`${style.page} ${style.front}`}>
                    {currentRecipe ? (
                        <div className={style.pageContent}>
                            <h2 className={style.recipeTitle}>{currentRecipe.title}</h2>
                            <p><strong>Dauer:</strong> {currentRecipe.duration} Minuten</p>
                            <p><strong>Schwierigkeit:</strong> {currentRecipe.difficulty}</p>
                            <p><strong>Portionen:</strong> {currentRecipe.portionAmount}</p>
                            <div className={style.ingredients}>
                                <h3>Zutaten:</h3>
                                {currentRecipe.ingredients.length > 0 ? (
                                    <ul>
                                        {currentRecipe.ingredients.map((ingredient) => (
                                            <li key={ingredient.id}>
                                                {ingredient.name}: {ingredient.amount} {ingredient.unit.name}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Keine Zutaten vorhanden</p>
                                )}
                            </div>
                            <div className={style.descriptions}>
                                <h3>Kochschritte:</h3>
                                {currentRecipe.descriptions.length > 0 ? (
                                    <ol>
                                        {currentRecipe.descriptions.map((description) => (
                                            <li key={description.id}>
                                                <strong>{description.title}:</strong> {description.description}
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <p>Keine Kochschritte vorhanden</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className={style.text}>Es wurden keine Rezepte gefunden.</p>
                    )}
                </div>
                <div className={`${style.page} ${style.back}`}>
                    <p>Back Side Content Here</p>
                </div>
            </div>
            <button onClick={handleEdit} className={style.button}>Rezept bearbeiten</button>
            <button onClick={handleDelete} className={style.button}>Rezept löschen</button>
            <button onClick={showNextRecipe} className={style.button}>Nächstes Rezept</button>
            <Link href={'/shoppingList'}>Shoppinglist</Link>
        </div>
    );
}
