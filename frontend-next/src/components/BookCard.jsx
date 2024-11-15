import { IconBook, IconEdit, IconTrash } from '@tabler/icons-react';
import style from './css/BookCard.module.css';

export default function BookCard(props) {
    function onClick() {
        sessionStorage.setItem("bookId", props.id);
        window.open("/recipe", "_self");
    }

    return (
        <div className={style.cardContainer} id={props.id}>
            {props.allowed ?
                <>
                    <div className={style.info}>
                        <IconBook className={style.cardIcon} onClick={onClick} stroke={1.5} size={"6rem"} />
                        <div className={style.specifications}>
                            <p className={style.title}>{props.title}</p>
                            <p className={style.owner}>{props.owner}</p>
                        </div>
                    </div>
                    <div className={style.icons}>
                        <IconEdit onClick={() => props.editFunction(props.id, props.title, props.everybodyEdit)} className={style.icon} stroke={1.5} />
                        <IconTrash onClick={() => props.deleteFunction(props.id)} className={style.icon} stroke={1.5} />
                    </div>
                </>
                :
                <div className={style.infoFull}>
                    <IconBook className={style.cardIcon} onClick={onClick} stroke={1.5} size={"6rem"} />
                    <div className={style.specifications}>
                        <p className={style.title}>{props.title}</p>
                        <p className={style.owner}>{props.owner}</p>
                    </div>
                </div>
            }
        </div>
    );
}
