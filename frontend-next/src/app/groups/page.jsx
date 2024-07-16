'use client'

import GroupList from '../../components/GroupList';
import Header from '../../components/Header';

export default function GroupsPage() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroupsData = async () => {
            try {
                const groupsData = await fetchGroups();
                setGroups(groupsData);
            } catch (error) {
                console.error('Error fetching groups:', error.message);
            }
        };

        fetchGroupsData();
    }, []);

    return(
        <div>
            <Header/>
            <h1>Groups</h1>
            <GroupList groups={groups}/>
        </div>
    );
};
