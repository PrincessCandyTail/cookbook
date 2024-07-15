import React, { useState, useEffect } from 'react';
import { fetchIngredients, fetchUnits } from '../services/api';

const RecipeForm = ({ initialData = {}, onSubmit }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [duration, setDuration] = useState(initialData.duration || '');
    const [difficulty, setDifficulty] = useState(initialData.difficulty || '');
    const [portionAmount, setPortionAmount] = useState(initialData.portionAmount || '');
    const [ingredients, setIngredients] = useState(initialData.ingredients || []);
    const [description, setDescription] = useState(initialData.description || '');

    useEffect(() => {
        setTitle(initialData.title || '');
        setDuration(initialData.duration || '');
        setDifficulty(initialData.difficulty || '');
        setPortionAmount(initialData.portionAmount || '');
        setIngredients(initialData.ingredients || []);
        setDescription(initialData.description || '');
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const recipeData = {
            title,
            duration,
            difficulty,
            portion_amount: portionAmount,
            ingredients,
            description
        };
        onSubmit(recipeData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Duration</label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
            <div>
                <label>Difficulty</label>
                <input type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
            </div>
            <div>
                <label>Portion Amount</label>
                <input type="text" value={portionAmount} onChange={(e) => setPortionAmount(e.target.value)} />
            </div>
            <div>
                <label>Ingredients</label>
                <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
            </div>
            <div>
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default RecipeForm;
