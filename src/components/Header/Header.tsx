import { useState, useCallback, useMemo } from "react";
import refLogo from '../../assets/logo_ref.jpg';
import { NavLink } from "react-router";
import './Header.css';
import { useMatches } from "../../context/matchesContext.tsx";
import Modal from "../Modal/Modal.tsx";
import type { CalendarEvent } from "../../utils/types.ts";
import closeIcon from "../../assets/Close.svg";
import {parseMatchesToMessage} from "../../utils/parsers.ts";

const Header = () => {
    const {
        totalSelectedMatches,
        unselectMatch,
        unselectAllInTournament,
        getSelectedMatchesByTournament
    } = useMatches();
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const cityMatches: CalendarEvent[] = useMemo(() => {
        return getSelectedMatchesByTournament('city');
    }, [getSelectedMatchesByTournament]);

    const uniMatches: CalendarEvent[] = useMemo(() => {
        return getSelectedMatchesByTournament('universities');
    }, [getSelectedMatchesByTournament]);

    const handleUnselectMatch = (matchId: string, tournamentId: string) => {
        unselectMatch(matchId,tournamentId);
    }

    const handleClearAll = useCallback((tournamentId: string) => {
        unselectAllInTournament(tournamentId);
    }, [unselectAllInTournament]);

    const handleConfirmClick = (tournamentId: string) => {
        const message = parseMatchesToMessage(getSelectedMatchesByTournament(tournamentId));
        navigator.clipboard.writeText(message)
            .then(() => {
                alert('Сообщение скопировано в буфер');
                handleClearAll(tournamentId);
            });
    }

    return (
        <header className="header">
            <div className="header__content section">
                <img src={refLogo} alt="logo" className='header__logo'/>
                <div className="nav-links">
                    <NavLink to="/universities" className="nav-links__item">
                        Чемпионат ВУЗов
                    </NavLink>
                    <NavLink to="/city" className="nav-links__item">
                        Первенство и Чемпионат Санкт-Петербурга
                    </NavLink>
                </div>
                <button className="request" onClick={handleOpen}>
                    Запросить назначения
                    {totalSelectedMatches > 0 && (
                        <span className="request__total">
                            {totalSelectedMatches}
                        </span>
                    )}
                </button>
                <Modal isOpen={open} title='Выбранные назначения' onClose={handleClose}>
                    {cityMatches.length > 0 && (
                        <div className="selected-matches">
                            <h4 className="selected-matches__tournament">Чемпионат и Первенство Санкт-Петербурга</h4>
                            {cityMatches.map((el) => (
                                <div className="selected-matches__item" key={el.id}>
                                    <span>
                                        {el.date} в {el.startTime} {el.homeTeam} — {el.awayTeam} ({el.address}) {el.gamesCount} игры
                                    </span>
                                    <button className="modal__close" onClick={() => {handleUnselectMatch(el.id, 'city')}}>
                                        <img src={closeIcon} alt='close'/>
                                    </button>
                                </div>
                            ))}
                            <div className="selected-matches__buttons">
                                <button className="button button_confirm" onClick={() => handleConfirmClick('city')}>Подтвердить</button>
                                <button className="button button_reject" onClick={() => handleClearAll('city')}>Отменить все</button>
                            </div>
                        </div>
                    )}
                    {uniMatches.length > 0 && (
                        <div className="selected-matches">
                            <h4 className="selected-matches__tournament">Чемпионат ВУЗов</h4>
                            {uniMatches.map((el) => (
                                <div className="selected-matches__item" key={el.id}>
                                    <span>
                                        {el.date} в {el.startTime} {el.homeTeam} — {el.awayTeam} ({el.address})
                                    </span>
                                    <button className="modal__close" onClick={() => {handleUnselectMatch(el.id, 'universities')}}>
                                        <img src={closeIcon} alt='close'/>
                                    </button>
                                </div>
                            ))}
                            <div className="selected-matches__buttons">
                                <button className="button button_confirm" onClick={() => handleConfirmClick('universities')}>Подтвердить</button>
                                <button className="button button_reject" onClick={() => handleClearAll('universities')}>Отменить все</button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </header>
    )
}

export default Header;