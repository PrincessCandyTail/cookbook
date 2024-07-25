import { IconEdit, IconTrash } from "@tabler/icons-react";
import style from './css/IngredientCard.module.css'

export default function IngredientCard(props) {
    return (
        <div className={style.outter}>
            <p className={style.info}>{props.name} - {props.amount} {props.unit}</p>
            {props.editable ?
                <div className={style.icons}>
                    <IconEdit stroke={1.5} onClick={() => props.editFunction(props.id, props.name, props.amount, props.unit)} />
                    <IconTrash stroke={1.5} onClick={() => props.deleteFunction(props.id, props.name)} />
                </div>
                :
                <></>
            }
        </div>
    )
}