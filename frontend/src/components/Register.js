import React from "react";
import {Link} from "react-router-dom";

function Register(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
    };

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleRegister(email, password);
    };

    return (
        <div className="forms forms_registration">
            <div className="forms__container">
                <h2 className="forms__title">Регистрация</h2>
                <form className="forms__form" onSubmit={handleSubmit}>
                    <input required type="email" className="forms__input" name="email" onChange={handleEmailChange}
                           value={email} placeholder="Email" autoComplete="off"/>
                    <input required type="password" className="forms__input" name="password" value={password}
                           onChange={handlePasswordChange} placeholder="Пароль" autoComplete="off"/>
                    <button type="submit" className="forms__button">Зарегистрироваться</button>
                </form>
                <div className="forms__signup">
                    <p className="forms__signup-text">Уже зарегистрированы?</p>
                    <Link to="/login" className="forms__signup-link">Войти</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;