'use client'

export default function GroupList ({ groups }) {
    {
        return (
            <ul>
                {groups.map(group => (
                    <li key={group.id}>
                        {group.name}
                        <ul>
                            {group.books.map(book => (
                                <li key={book.id}>
                                    {book.title}
                                    <ul>
                                        {book.recipes.map(recipe => (
                                            <li key={recipe.id}>{recipe.title}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        );
    }

}