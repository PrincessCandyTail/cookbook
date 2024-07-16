'use client'
import { fetchUsers } from '../../services/api';
import UserList from '../../components/UserList';
import Header from '../../components/Header';

export default function UserProfilePage  ()  {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };
        fetchUsersData();
    }, []);

    return (
        <div>
            <Header />
            <h1>User Profile</h1>
            <UserList users={users} />
        </div>
    );
};
