import React from 'react';

function PopupWithForm(props) {

    return (
        <div className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div className="popup__close-button">
                <button onClick={props.onClose} type="button" className="popup__close"/>
            </div>
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__save">{props.loadingInfo ? props.loadingButton: props.button}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;