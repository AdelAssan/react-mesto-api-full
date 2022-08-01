import React from "react";
import PopupWithForm from "./PopupWithForm";
import {defaultKeyMap} from "@testing-library/user-event/dist/keyboard/keyMap";

function AddPlacePopup(props) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");
    const [errors, setErrors] = React.useState({});
    //const [values, setValues] = React.useState({});

    /*const handleChange = (evt) => {
        const { name, value } = evt.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))

        const message = evt.target.validationMessage
        setErrors({...errors, [name] : message});
    }*/

    function handleSubmit(evt) {

        evt.preventDefault();
        props.onAddPlace({name, link})
    }

    function handleChangeName(evt) {
        setName(evt.target.value);
        const name = evt.target.name;
        const message = evt.target.validationMessage
        setErrors({...errors, [name] : message});
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
        const name = evt.target.name;
        const message = evt.target.validationMessage
        setErrors({...errors, [name] : message});
    }

    React.useEffect(() => {
        setName("");
        setLink("");
        //setValues("");
    }, [props.isOpen]);

    return (
        <PopupWithForm name="add" title="Новое место" button="Создать" loadingButton="Сохранение..."
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
                       loadingInfo={props.loadingInfo}>
            <input required type="text" name="name" className="popup__input" id="cardName"
                   placeholder="Название" minLength="2" maxLength="30" onChange={handleChangeName} value={name || ""}/>
            <span id="error-cardName" className={errors.name ? 'error error_visible' : 'error'}>{errors.name}</span>
            <input required type="url" name="link" className="popup__input" id="link"
                   placeholder="Ссылка на картинку" onChange={handleChangeLink} value={link || ""}/>
            <span id="error-link" className={errors.name ? 'error error_visible' : 'error'}>{errors.link}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;