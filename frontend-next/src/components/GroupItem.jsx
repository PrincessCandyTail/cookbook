import { useState } from 'react';
import GroupBooks from './GroupBooks';

export default function GroupItem({ group }) {
    const [showBooks, setShowBooks] = useState(false);

    return (
        <div className="group-item">
            <h2>{group.name}</h2>
            <p>Owner: {group.owner.username}</p>
            <button onClick={() => setShowBooks(!showBooks)}>
                {showBooks ? 'Hide Books' : 'Show Books'}
            </button>
            {showBooks && <GroupBooks books={group.books} />}
        </div>
    );
};
