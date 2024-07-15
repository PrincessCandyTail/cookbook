import React from 'react';

export default function RecipeDetails () {
    return (
        <div>
            <h2>{recipe.title}</h2>
            <p>Duration: {recipe.duration} minutes</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>Portion Amount: {recipe.portionAmount}</p>
            <p>Ingredients:</p>
            <ul>
                {recipe.ingredients.map(ingredient => (
                    <li key={ingredient.id}>
                        {ingredient.name} - {ingredient.amount} {ingredient.unit.name}
                    </li>
                ))}
            </ul>
            <p>Description:</p>
            <ol>
                {recipe.descriptions.map(description => (
                    <li key={description.id}>
                        <h4>{description.title}</h4>
                        <p>{description.description}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
};