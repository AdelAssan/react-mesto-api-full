import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [errors, setErrors] = React.useState({});
    const [values, setValues] = React.useState({});

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))

        const message = evt.target.validationMessage
        setErrors({...errors, [name] : message});
    }

    React.useEffect(() => {
        setValues(currentUser);
    }, [currentUser, props.isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser(values);
    }

    return (
        <PopupWithForm name="edit" title="Редактировать профиль" button="Сохранить" loadingButton="Сохранение..."
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
                       loadingInfo={props.loadingInfo}>
            <input type="text" name="name" className="popup__input" id="name" minLength="2" maxLength="40"
                   placeholder="Имя"
                   required onChange={handleChange} value={values.name || ""}/>
            <span id="error-name" className={errors.name ? 'error error_visible' : 'error'}>{errors.name}</span>
            <input type="text" name="about" className="popup__input" id="description" minLength="2"
                   placeholder="Занятие"
                   maxLength="200" required onChange={handleChange} value={values.about || ""}/>
            <span id="error-description" className={errors.about ? 'error error_visible' : 'error'}>{errors.about}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;