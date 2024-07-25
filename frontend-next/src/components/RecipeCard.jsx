import { useState, useEffect } from 'react';
import { IconUsers, IconAlarm, IconChefHat, IconTrash, IconEdit, IconFileText } from '@tabler/icons-react';
import style from './css/RecipeCard.module.css';

export default function GroupCard(props) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (props.image) {
            fetchImage();
        }
    }, [props.image]);

    const fetchImage = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/images/" + props.image, requestOptions)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            })
            .catch(error => console.error(error));
    }

    const renderChefHat = () => {
        switch (props.difficulty) {
            case 1:
                return <IconChefHat stroke={1.5} />;
            case 2:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>;
            case 3:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>;
            case 4:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>;
            case 5:
                return <><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /><IconChefHat stroke={1.5} /></>;
            default:
                return null;
        }
    }

    function onClick() {
        console.log("onClick");
    }

    return (
        <div className={style.cardContainer} id={props.id}>
            <div className={style.iconContainer}>
                {props.image == null ?
                    <IconFileText className={style.cardIcon} onClick={onClick} stroke={1.5} />
                    :
                    <img src={imageUrl} alt={props.title || "Recipe Image"} className={style.cardIcon} />
                }
            </div>
            <div className={style.info}>
                <div className={style.head}>
                    <p className={style.title}>{props.title}</p>
                    {props.allowed &&
                        <div className={style.icons}>
                            <IconEdit onClick={() => props.editFunction(props.id, props.title, props.duration, props.portion, props.difficulty)} className={style.icon} stroke={1.5} />
                            <IconTrash onClick={() => props.deleteFunction(props.id)} className={style.icon} stroke={1.5} />
                        </div>
                    }
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
    );
}
