import { IconBook } from '@tabler/icons-react'
import style from './css/BookCard.module.css'

export default function GroupCard(props) {
    function onClick() {
        console.log(props.id)
        localStorage.setItem("bookId", props.id)
        window.open("/recipe", "_self")
    }

    return (
        <div onClick={onClick} className={style.outter} id={props.id}>
            <IconBook stroke={1.5} size={"6rem"} />
            <div className={style.inner}>
                <p className={style.title}>{props.title}</p>
                <p className={style.owner}>{props.owner}</p>
            </div>
        </div>
    )
}