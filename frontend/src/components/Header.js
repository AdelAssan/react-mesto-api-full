import logo from "../images/header-logo.svg";
import React from "react";
import {Link, useLocation} from "react-router-dom";

function Header(props) {

    const [activeHamburger, setActiveHamburger] = React.useState(false);
    const location = useLocation();

    function handleMenuOpen() {
        setActiveHamburger(!activeHamburger);
    }

    return (
        <header className={props.loggedIn ? 'header header_active' : 'header'}>
            <nav className="header__nav">
                <img alt="Логотип" className="header__logo" src={logo}/>
                {props.loggedIn &&
                    (
                        <button
                            className={activeHamburger ? 'header__menu-button header__menu-button_active' : 'header__menu-button'}
                            type="button"
                            aria-label="кнопка меню"
                            onClick={handleMenuOpen}
                        />)}
                {!props.loggedIn &&
                    (<div>
                            {location.pathname === '/register' &&
                                (
                                    <Link to="/login" className="header__link">Войти</Link>
                                )}
                            {location.pathname === '/login' &&
                                (
                                    <Link to="/register" className="header__link">Регистрация</Link>
                                )}
                        </div>
                    )}
            </nav>
            {props.loggedIn &&
                (
                    <div className={activeHamburger ? 'header__menu header__menu_active' : 'header__menu'}>
                        <p className="header__email">{props.userEmail}</p>
                        <a onClick={props.onSignOut} className="header__link header__link-grey">
                            Выйти
                        </a>
                    </div>
                )}
        </header>
    );
}

export default Header;