import React from "react";
import successImg from "../images/ok.svg";
import errorImg from "../images/Error.svg";

function InfoTooltip(props) {
    return (
        <div className={`popup popup__infoTooltip ${props.isOpen ? "popup_opened" : ''}`}>
            <div className="popup__close-button">
                <button onClick={props.onClose} type="button" className="popup__close"/>
            </div>
            <div className="popup__container">
                <img className="popup__infoTooltip-img" src={props.infoTooltip ? successImg : errorImg}
                     alt="Статус регистрации"/>
                <h2 className="popup__title">
                    {props.infoTooltip ?
                        "Вы успешно зарегестрировались"
                        : "Что-то пошло не так! Попробуйте ещё раз."}
                </h2>
            </div>
        </div>
    )
}

export default InfoTooltip;