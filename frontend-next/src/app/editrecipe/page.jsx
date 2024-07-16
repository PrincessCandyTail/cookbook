'use client'
import { useEffect, useState } from 'react';
import { fetchRecipe, updateRecipe } from '../../services/api';
import RecipeForm from '../../components/RecipeForm';
import Header from '../../components/Header';

export default function EditRecipePage({ recipeId }) {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const recipeData = await fetchRecipe(recipeId);
                setRecipe(recipeData);
            } catch (error) {
                console.error('Error fetching recipe:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipeData();
    }, [recipeId]);

    const handleUpdateRecipe = async (recipeData) => {
        try {
            await updateRecipe(recipeId, recipeData);
            alert('Recipe updated successfully!');
        } catch (error) {
            console.error('Error updating recipe:', error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Header />
            <h1>Edit Recipe</h1>
            {recipe && <RecipeForm initialData={recipe} onSubmit={handleUpdateRecipe} />}
        </div>
    );
}
