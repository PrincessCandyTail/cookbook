import { IconCrown } from "@tabler/icons-react";
import style from './css/JoinGroup.module.css'

export default function joinGroup(props) {
    return(
        <div className={style.outter}>
            <p>{props.name}</p>
            <p> <IconCrown stroke={1.5} /> {props.owner}</p>
            <button>Beitreten</button>
        </div>
    )
}