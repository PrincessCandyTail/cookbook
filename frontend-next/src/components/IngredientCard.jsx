import { IconEdit, IconTrash } from "@tabler/icons-react";
import style from './css/IngredientCard.module.css'

export default function IngredientCard(props) {
    return (
        <div className={style.outter}>
            <p>{props.name} - {props.amount}{props.unit}</p>
            <div className={style.icons}>
                <IconEdit stroke={1.5} onClick={() => props.editFunction(props.id, props.name, props.amount, props.unit)}/>
                <IconTrash stroke={1.5} onClick={() => props.deleteFunction(props.id)}/>
            </div>
        </div>
    )
}