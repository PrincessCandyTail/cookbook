'use client'
import Header from '../../components/Header';
import RecipeList from '../../components/RecipeList';
import { useEffect, useState } from 'react';

export default function MainPage() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // fetch
    }, []);

    return (
        <div className="container">
            <Header />
            <h1>Home</h1>
            <RecipeList recipes={recipes} />
        </div>
    );
};
