import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../../services/api';
import RecipeList from '../../components/RecipeList';
import Header from '../../components/Header';

export default function MainPage ()  {
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
        <div>
            <Header />
            <h1>Main Page</h1>
            <RecipeList recipes={recipes} />
        </div>
    );
};

