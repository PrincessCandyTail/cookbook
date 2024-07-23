import { IconEdit, IconTrash, IconUsersGroup } from "@tabler/icons-react";
import style from './css/GroupCard.module.css'
import { useEffect, useState } from "react";

export default function GroupCard(props) {
    const [allowed, setAllowed] = useState(false)

    useEffect(() => {
        if (props.ownerId === localStorage.getItem("userId")) {
            setAllowed(true)
        }
    }, [])

    function onClick() {
        console.log(props.id)
        localStorage.setItem("groupId", props.id)
        window.open("/book", "_self")
    }

    return (
        <div className={style.outter} key={props.id}>
            <IconUsersGroup onClick={onClick} stroke={1.5} size={"6rem"} />
            <p className={style.name}>{props.name}</p>
            {allowed ?
                <div className={style.icons}>
                    <IconEdit onClick={() => props.editFunction(props.id, props.name)} className={style.edit} stroke={1.5} />
                    <IconTrash onClick={() => props.deleteFunction(props.id)} className={style.trash} stroke={1.5} />
                </div>
                :
                <></>
            }
        </div>
    )
}