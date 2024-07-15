
import React, { useState } from 'react';
import { fetchIngredients, fetchUnits, fetchDescriptions } from '../services/api';

export default function RecipeForm () {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [portionAmount, setPortionAmount] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [description, setDescription] = useState('');

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
