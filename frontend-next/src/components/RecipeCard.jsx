import { IconBook, IconUsers, IconAlarm, IconChefHat } from '@tabler/icons-react'
import style from './css/RecipeCard.module.css'

export default function GroupCard(props) {
    const renderChefHat = () => {
        switch(props.difficulty) {
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

    return (
        <div onClick={onClick} className={style.outter} id={props.id}>
            <IconBook stroke={1.5} size={"6rem"} />
            <div className={style.inner}>
                <p className={style.title}>{props.title}</p>
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