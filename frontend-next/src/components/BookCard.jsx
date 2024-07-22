import { IconBook, IconEdit, IconTrash } from '@tabler/icons-react'
import style from './css/BookCard.module.css'
import { useState, useEffect } from 'react'

export default function GroupCard(props) {
    const [allowed, setAllowed] = useState(false)

    useEffect(() => {
        if (props.everybodyEdit) {
            setAllowed(true)
        }else if (props.ownerId === localStorage.getItem("userId")) {
            setAllowed(true)
        }
    }, [])

    function onClick() {
        console.log(props.id)
        localStorage.setItem("bookId", props.id)
        window.open("/recipe", "_self")
    }

    return (
        <div className={style.outter} id={props.id}>
            <IconBook onClick={onClick} stroke={1.5} size={"6rem"} />
            <div className={style.inner}>
                <p className={style.title}>{props.title}</p>
                <p className={style.owner}>{props.owner}</p>
            </div>
            {allowed ?
                <div className={style.icons}>
                    <IconEdit onClick={() => props.editFunction(props.id, props.title, props.everybodyEdit)} className={style.edit} stroke={1.5} />
                    <IconTrash onClick={() => props.deleteFunction(props.id)} className={style.trash} stroke={1.5} />
                </div>
                :
                <></>
            }
        </div>
    )
}