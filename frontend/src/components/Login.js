import React from "react";

function Login(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleLogin(email, password)
    }

    return (
        <div className="forms forms_login">
            <div className="forms__container">
                <h2 className="forms__title">Вход</h2>
                <form className="forms__form" onSubmit={handleSubmit}>
                    <input required type="email" className="forms__input" placeholder="Email"
                           onChange={handleEmailChange} value={email} autoComplete="off"/>
                    <input required type="password" className="forms__input" placeholder="Пароль"
                           onChange={handlePasswordChange} value={password} autoComplete="off"/>
                    <button className="forms__button">Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Login;