const API_URL = 'http://localhost:8080/api';

async function fetchAPI(endpoint) {
    const res = await fetch(`${API_URL}${endpoint}`);

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }

    return res.json();
}

export async function fetchBooks() {
    return fetchAPI('/books');
}

export async function fetchUsers() {
    return fetchAPI('/users');
}

export async function fetchGroups() {
    return fetchAPI('/groups');
}

export async function fetchRecipes() {
    return fetchAPI('/recipes');
}

export async function fetchIngredients() {
    return fetchAPI('/ingredients');
}

export async function fetchDescriptions() {
    return fetchAPI('/descriptions');
}

export async function fetchUnits() {
    return fetchAPI('/units');
}

export async function updateRecipe(recipeId, recipeData) {
    return fetchAPI(`/recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeData)
    });
}