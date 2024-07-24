import { IconCrown } from "@tabler/icons-react";
import style from './css/JoinGroup.module.css'

export default function joinGroup(props) {
    function fetchJoinGroup() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/groups/join/" + props.id + "?userId=" + sessionStorage.getItem("userId"), requestOptions)
            .then((response) => response.text())
            .then((result) => props.fetchGroups())
            .catch((error) => console.error(error));
    }

    return (
        <div className={style.outter}>
            <p><strong>{props.name}</strong></p>
            <div className={style.inner}>
                <IconCrown className={style.icon} stroke={1.5} />
                <p>{props.owner}</p>
            </div>
            <button onClick={fetchJoinGroup} className="joinButton">Beitreten</button>
        </div>
    )
}