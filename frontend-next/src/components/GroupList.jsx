import GroupItem from "./GroupItem";

export default function GroupList({ groups }) {
    return (
        <div>
            {/*groups.map(group => (
                <GroupItem key={group.id} group={group} />
            )) */}

            {

                groups.map( group =>
               <GroupItem group={group}/>
                )
            }
        </div>
    );
};
