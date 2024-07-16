'use client'

export default function CookingInstructions ({instructions}){
    return (
        <div>
            <h3>Cooking Instructions</h3>
            <ol>
                {instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
        </div>
    );
};
