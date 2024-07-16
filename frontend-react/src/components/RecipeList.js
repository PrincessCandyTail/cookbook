import React from 'react';

export default function RecipeList({ recipes }) {
    return (
        <ul>
            {recipes.map(recipe => (
                <li key={recipe.id}>{recipe.title}</li>
            ))}
        </ul>
    );
};
