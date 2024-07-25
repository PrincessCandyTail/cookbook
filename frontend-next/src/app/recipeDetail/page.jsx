'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { IconFileTypePdf, IconArrowDown, IconArrowRight } from "@tabler/icons-react";

export default function InfoPage() {
    const [recipes, setRecipes] = useState([]);
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [checkedIngredients, setCheckedIngredients] = useState({});

    useEffect(() => {
        const fetchRecipes = async () => {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            try {
                const response = await fetch("http://localhost:8080/api/books/" + sessionStorage.getItem("bookId"), requestOptions);
                const result = await response.json();
                setRecipes(result.recipes || []);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    if (recipes.length === 0) {
        return <p>Loading...</p>;
    }

    const currentRecipe = recipes[currentRecipeIndex] || {};

    const handleIngredientCheck = (ingredientId) => {
        setCheckedIngredients(prev => ({
            ...prev,
            [ingredientId]: !prev[ingredientId]
        }));
    };

    return (
        <div className={styles.fff}>
            <div className={styles.cont_principal}>
                <div className={styles.cont_central}>
                    <div className={`${styles.cont_modal} ${isDetailsVisible ? styles.cont_modal_active : ''}`}>
                        <div className={styles.cont_photo}>
                            <div className={styles.cont_mins}>
                                <div className={styles.sub_mins}>
                                    <span>Duration</span>
                                    <h3>{currentRecipe.duration}</h3>
                                </div>
                                <div className={styles.cont_icon_right}>
                                    <IconFileTypePdf stroke={1.5} />
                                </div>
                            </div>
                            <div className={styles.cont_servings}>
                                <span>Portions</span>
                                <h3>{currentRecipe.portionAmount}</h3>
                            </div>
                            <div className={styles.cont_detalles}>
                                <h3>{currentRecipe.title || 'No Title'}</h3>
                                <p>{currentRecipe.description || 'No Description'}</p>
                            </div>
                        </div>
                        <div className={`${styles.cont_text_ingredients} ${isDetailsVisible ? styles.cont_text_ingredients_active : ''}`}>
                            <div className={styles.cont_over_hidden}>
                                <div className={styles.cont_tabs}>
                                    <ul>
                                        <li><h4>INGREDIENTS</h4></li>
                                        <li><h4>PREPARATION</h4></li>
                                    </ul>
                                </div>
                                <div className={styles.cont_text_det_preparation}>
                                    <ul className={styles.cont_ingredients_list}>
                                        {currentRecipe.ingredients && currentRecipe.ingredients.map(ingredient => (
                                            <li key={ingredient.id}>
                                                <input
                                                    type="checkbox"
                                                    checked={checkedIngredients[ingredient.id] || false}
                                                    onChange={() => handleIngredientCheck(ingredient.id)}
                                                />
                                                <span>{ingredient.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {currentRecipe.descriptions.map((step, index) => (
                                        <div key={step.id} className={styles.cont_title_preparation}>
                                            <p>STEP {index + 1}</p>
                                            <div className={styles.cont_info_preparation}>
                                                <p>{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.cont_btn_mas_dets}>
                                <IconArrowDown stroke={1.5} />
                            </div>
                        </div>
                        <div className={styles.cont_btn_open_dets}>
                            <a onClick={() => setIsDetailsVisible(!isDetailsVisible)}>
                                <IconArrowRight stroke={1.5} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
