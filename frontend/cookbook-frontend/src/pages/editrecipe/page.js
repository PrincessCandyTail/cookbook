import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchRecipeById, updateRecipe } from '../../services/api';
import RecipeForm from '../../components/RecipeForm';
import Header from '../../components/Header';

export default function EditRecipePage () {
    const router = useRouter();
    const { recipeId } = router.query;
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        if (recipeId) {
            const fetchRecipeData = async () => {
                try {
                    const recipeData = await fetchRecipeById(recipeId);
                    setRecipe(recipeData);
                } catch (error) {
                    console.error('Error fetching recipe:', error.message);
                }
            };

            fetchRecipeData();
        }
    }, [recipeId]);

    const handleUpdateRecipe = async (updatedRecipe) => {
        try {
            await updateRecipe(recipeId, updatedRecipe);
            router.push('/mainpage'); // Redirect to main page after successful update
        } catch (error) {
            console.error('Error updating recipe:', error.message);
        }
    };

    return (
        <div>
            <Header />
            <h1>Edit Recipe</h1>
            {recipe ? (
                <RecipeForm initialData={recipe} onSubmit={handleUpdateRecipe} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};


