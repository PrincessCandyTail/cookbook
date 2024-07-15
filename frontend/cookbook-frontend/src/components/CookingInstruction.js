import React from 'react';

export default function CookingInstructions (){
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
