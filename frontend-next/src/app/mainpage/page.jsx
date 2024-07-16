'use client'
import Header from '../../components/Header';
import RecipeList from '../../components/RecipeList';
import { useEffect, useState } from 'react';
import { fetchRecipes } from '../../services/api';

export default function MainPage() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipesData = async () => {
            try {
                const recipesData = await fetchRecipes();
                setRecipes(recipesData);
            } catch (error) {
                console.error('Error fetching recipes:', error.message);
            }
        };

        fetchRecipesData();
    }, []);

    return (
        <div className="container">
            <Header />
            <h1>Hauptseite</h1>
            <RecipeList recipes={recipes} />
        </div>
    );
};
