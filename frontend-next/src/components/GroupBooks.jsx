export default function GroupBooks({ books }) {
    return (
        <div className="group-books">
            <h3>Books in this Group:</h3>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <h4>{book.title}</h4>
                        <p>Owner: {book.owner.username}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
