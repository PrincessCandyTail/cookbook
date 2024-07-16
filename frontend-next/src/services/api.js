const API_URL = 'http://localhost:8080/api';

async function fetchAPI(endpoint, options = {}) {
    const res = await fetch(`${API_URL}${endpoint}`, options);

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }

    return res.json();
}

export const fetchBooks = () => fetchAPI('/books');
export const fetchUsers = () => fetchAPI('/users');
export const fetchGroups = () => fetchAPI('/groups');
export const fetchRecipes = () => fetchAPI('/recipes');
export const fetchRecipe = (recipeId) => fetchAPI(`/recipes/${recipeId}`);
export const fetchIngredients = () => fetchAPI('/ingredients');
export const fetchDescriptions = () => fetchAPI('/descriptions');
export const fetchUnits = () => fetchAPI('/units');

export const updateRecipe = (recipeId, recipeData) => fetchAPI(`/recipes/${recipeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipeData)
});
