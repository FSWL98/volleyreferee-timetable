import refLogo from '../../assets/logo_ref.jpg';
import { NavLink } from "react-router";
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header__content section">
                <img src={refLogo} alt="logo" className='header__logo' />
                <div className="nav-links">
                    <NavLink to="/universities" className="nav-links__item">
                        Чемпионат ВУЗов
                    </NavLink>
                    <NavLink to="/city" className="nav-links__item">
                        Первенство и Чемпионат Санкт-Петербурга
                    </NavLink>
                </div>
                <div className="request">
                    Запросить назначения
                </div>
            </div>
        </header>
    )
}

export default Header;