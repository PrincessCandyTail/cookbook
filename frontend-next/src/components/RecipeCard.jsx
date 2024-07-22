import { IconBook, IconUsers, IconAlarm, IconChefHat, IconTrash, IconEdit } from '@tabler/icons-react'
import style from './css/RecipeCard.module.css'

export default function GroupCard(props) {
    const renderChefHat = () => {
        switch (props.difficulty) {
            case 1:
                return <IconChefHat stroke={1.5} />
            case 2:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>
            case 3:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>
            case 4:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>
            case 5:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>
        }
    }

    function onClick() {
        console.log("onClick")
    }

    return (
        <div className={style.outter} id={props.id}>
            <IconBook onClick={onClick} stroke={1.5} size={"6rem"} />
            <div className={style.inner}>
                <div className={style.head}>
                    <p className={style.title}>{props.title}</p>
                    <div>
                        <IconEdit onClick={() => props.editFunction(props.id, props.title, props.duration, props.portion, props.difficulty)} className={style.edit} stroke={1.5} />
                        <IconTrash onClick={() => props.deleteFunction(props.id)} className={style.trash} stroke={1.5} />
                    </div>
                </div>
                <div className={style.specifications}>
                    <div className={style.specification}>
                        <IconAlarm /> <p className={style.duration}>{props.duration}</p>
                    </div>
                    <div className={style.specification}>
                        <IconUsers /><p className={style.portion}>{props.portion}</p>
                    </div>
                    <div className={style.specification}>
                        {renderChefHat()}
                    </div>
                </div>
            </div>
        </div>
    )
}