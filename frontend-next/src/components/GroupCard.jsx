import { IconUsersGroup } from "@tabler/icons-react";
import style from './css/GroupCard.module.css'

export default function GroupCard(props) {
    function onClick() {
        console.log(props.id)
        localStorage.setItem("groupId", props.id)
        window.open("/book", "_self")
    }

    return(
        <div onClick={onClick} className={style.outter} key={props.id}>
            <IconUsersGroup stroke={1.5} size={"6rem"}/>
            <p className={style.name}>{props.name}</p>
        </div>
    )
}