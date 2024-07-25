'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { IconFileTypePdf, IconArrowDown, IconArrowRight, IconChefHat } from "@tabler/icons-react";

export default function InfoPage() {
    const [recipe, setRecipe] = useState({});
    const [imageId, setImageId] = useState("")
    const [isDetailsVisible, setIsDetailsVisible] = useState(true);
    const [checkedIngredients, setCheckedIngredients] = useState({});
    const [showIngredients, setShowIngredients] = useState(false)
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        fetchRecipe();
    }, []);

    function fetchRecipe() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/recipes/" + sessionStorage.getItem("recipeId"), requestOptions)
            .then((response) => response.json())
            .then((result) => afterRecipe(result))
            .catch((error) => console.error(error));
    }

    function afterRecipe(result) {
        console.log(result)
        setRecipe(result)
        fetchImage(result.image.id)
    }

    const fetchImage = (id) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/images/" + id, requestOptions)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            })
            .catch(error => console.error(error));
    }

    const handleIngredientCheck = (ingredientId) => {
        setCheckedIngredients(prev => ({
            ...prev,
            [ingredientId]: !prev[ingredientId]
        }));
    };

    const renderChefHat = () => {
        switch (recipe.difficulty) {
            case 1:
                return <IconChefHat stroke={1.5} />;
            case 2:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>;
            case 3:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>;
            case 4:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat
                    stroke={1.5} /></>;
            case 5:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat
                    stroke={1.5} /><IconChefHat stroke={1.5} /></>;
            default:
                return null;
        }
    }

    return (
        <div className={"background"}>
            <div className={styles.inner}>
                <div className={styles.fff}>
                    <div className={styles.cont_principal}>
                        <div className={styles.cont_central}>

                            <div className={`${styles.cont_modal} ${isDetailsVisible ? styles.cont_modal_active : ''}`}>
                                <div className={styles.cont_photo}>
                                    <div className={styles.cont_img_back}>
                                        <img
                                            src={imageUrl}
                                            alt="E" />
                                    </div>
                                    <div className={styles.cont_mins}>
                                        <div className={styles.sub_mins}>
                                            <span>Duration</span>
                                            <h3>{recipe.duration}</h3>
                                        </div>
                                    </div>
                                    <div className={styles.cont_servings}>
                                        <span>Portion</span>
                                        <h3>{recipe.portionAmount}</h3>
                                    </div>
                                    <div className={styles.cont_detalles}>
                                        <h3>{recipe.title}</h3>
                                        <p>{renderChefHat()}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`${styles.cont_text_ingredients} ${isDetailsVisible ? styles.cont_text_ingredients_active : ''}`}>
                                    <div className={styles.cont_over_hidden}>
                                        <div className={styles.cont_tabs}>
                                            <ul>
                                                <li><a><h4 onClick={() => setShowIngredients(true)}>INGREDIENTS</h4></a></li>
                                                <li><a><h4 onClick={() => setShowIngredients(false)}>PREPARATION</h4></a></li>
                                            </ul>
                                        </div>
                                        {showIngredients ?
                                            <div className={styles.cont_text_det_preparation}>
                                                <ul className={styles.cont_ingredients_list}>
                                                    {recipe.ingredients && recipe.ingredients.map(ingredient => (
                                                        <li key={ingredient.id}>
                                                            <input
                                                                type="checkbox"
                                                                checked={checkedIngredients[ingredient.id] || false}
                                                                onChange={() => handleIngredientCheck(ingredient.id)}
                                                            />
                                                            <span>{ingredient.name} - {ingredient.amount} {ingredient.unit.name}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            :
                                            <div className={styles.cont_text_det_preparation}>
                                                {recipe.descriptions && recipe.descriptions.map((step, index) => (
                                                    <div key={step.id} className={styles.cont_title_preparation}>
                                                        <p>STEP {index + 1} {step.title}</p>
                                                        <div className={styles.cont_info_preparation}>
                                                            <p>{step.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </div>

                                </div>
                                <div className={styles.cont_btn_open_dets}>
                                    <a onClick={() => setIsDetailsVisible(!isDetailsVisible)}></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}