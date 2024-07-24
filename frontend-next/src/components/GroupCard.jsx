import { IconEdit, IconTrash, IconUsersGroup } from "@tabler/icons-react";
import style from './css/GroupCard.module.css'

export default function GroupCard(props) {

    const isUserAllowed = () => {
        return props.ownerId == sessionStorage.getItem("userId")
    }

    function onClick() {
        console.log(props.id)
        sessionStorage.setItem("groupId", props.id)
        window.open("/book", "_self")
    }

    return (
        <div className={style.cardContainer} key={props.id}>
            <div className={style.info}>
                <IconUsersGroup className={style.cardIcon} onClick={onClick} stroke={1.5} size={"6rem"} />
                <p className={style.name}>{props.name}</p>
            </div>
            {isUserAllowed() ?
                <div className={style.icons}>
                    <IconEdit onClick={() => props.editFunction(props.id, props.name)} className={style.icon} stroke={1.5} />
                    <IconTrash onClick={() => props.deleteFunction(props.id)} className={style.icon} stroke={1.5} />
                </div>
                :
                <div className={style.outOwner}>
                    <p className={style.owner}>{props.owner}</p>
                </div>
            }
        </div>
    )
}