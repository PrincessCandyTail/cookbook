import { useState, useEffect } from 'react';

const RecipeForm = ({ initialData = {}, onSubmit }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [duration, setDuration] = useState(initialData.duration || '');
    const [difficulty, setDifficulty] = useState(initialData.difficulty || '');
    const [portionAmount, setPortionAmount] = useState(initialData.portionAmount || '');
    const [ingredients, setIngredients] = useState(initialData.ingredients || []);
    const [description, setDescription] = useState(initialData.description || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        setTitle(initialData.title || '');
        setDuration(initialData.duration || '');
        setDifficulty(initialData.difficulty || '');
        setPortionAmount(initialData.portionAmount || '');
        setIngredients(initialData.ingredients || []);
        setDescription(initialData.description || '');
    }, [initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = '';
        if (image) {
            const formdata = new FormData();
            formdata.append("image", image);

            const requestOptions = {
                method: "POST",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJSZWxvYXNoZWQiLCJpYXQiOjE3MjExMjc2MDEsImV4cCI6MTcyMTIxNDAwMX0.9_unJCswwy_CU6qf6kzXW5pAviA2q0hPj9Lu1uUbPYbI8qj4Dyw0ZOYUeZZ0FpXw"
                },
                body: formdata,
                redirect: "follow"
            };

            try {
                const response = await fetch("http://localhost:8080/api/images", requestOptions);
                const result = await response.json();
                imageUrl = result.imageUrl;
            } catch (error) {
                console.error('Error uploading image:', error);
                return;
            }
        }

        const recipeData = {
            title,
            duration,
            difficulty,
            portion_amount: portionAmount,
            ingredients,
            description,
            image_url: imageUrl
        };

        onSubmit(recipeData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Image</label>
                <input type="file" onChange={handleImageChange}/>
                {imagePreview &&
                    <img src={imagePreview} alt="Image Preview" style={{width: '200px', marginTop: '10px'}}/>}
            </div>
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>Duration</label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}/>
            </div>
            <div>
                <label>Difficulty</label>
                <input type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}/>
            </div>
            <div>
                <label>Portion Amount</label>
                <input type="text" value={portionAmount} onChange={(e) => setPortionAmount(e.target.value)}/>
            </div>
            <div>
                <label>Ingredients</label>
                <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)}/>
            </div>
            <div>
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default RecipeForm;
