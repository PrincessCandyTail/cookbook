import { IconChevronDown, IconChevronUp, IconEdit, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import style from './css/DescriptionCard.module.css'

export default function (props) {
    const [extend, setExtend] = useState(false)

    return (
        <div className={style.outter}>
            <div className={style.inner}>
                <div className={style.head}>
                    <p className={style.title}>{props.title}</p>
                    {extend ?
                        <IconChevronUp className={style.icon} stroke={1.5} onClick={() => setExtend(false)} />
                        :
                        <IconChevronDown className={style.icon} stroke={1.5} onClick={() => setExtend(true)} />
                    }
                </div>
                {props.editable ?
                    <div className={style.icons}>
                        <IconEdit stroke={1.5} onClick={() => props.editFunction(props.id, props.title, props.description)} />
                        <IconTrash stroke={1.5} onClick={() => props.deleteFunction(props.id)} />
                    </div>
                    :
                    <></>
                }
            </div>
            {extend ?
                <p className={style.descriptionOpen}>{props.description}</p>
                :
                <p className={style.descriptionClosed} onClick={() => setExtend(true)}>...</p>
            }
        </div>
    )
}