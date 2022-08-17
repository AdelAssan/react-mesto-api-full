import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const inputRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: inputRef.current.value
        })

    }

    React.useEffect(() => {
        inputRef.current.value = "";
    }, [props.isOpen]);

    const [errors, setErrors] = React.useState({});

    const handleChange = (evt) => {
        const name = evt.target.name;
        const message = evt.target.validationMessage
        setErrors({...errors, [name] : message});
    }



    return (
        <PopupWithForm name="edit-avatar" title="Обновить Аватар" button="Сохранить" loadingButton="Сохранение..."
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
                       loadingInfo={props.loadingInfo}>
            <input type="url" name="avatar" className="popup__input" id="avatar" required onChange={handleChange}
                   placeholder="Ссылка на картинку" ref={inputRef}/>
            <span id="error-avatar" className={errors.avatar ? 'error error_visible' : 'error'}>{errors.avatar}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;