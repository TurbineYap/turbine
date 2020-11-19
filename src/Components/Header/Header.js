import React, { useState } from 'react';
import SvgLogo from '../../images/SvgLogo.js';
import SvgProjectName from '../../images/SvgProjectName';
import Player from '../Player/Player';
import SvgCloseButton from '../../images/SvgCloseButton';
import streamings from '../../utils/streamings.json';

function Header () {
    const [ isMenuOpenned, setIsMenuOpenned ] = useState(false);
    const [ isPlayerWrapped, setIsplayerWrapped ] = useState(true);

    const onCloseOpenMenuClick = () => {
        setIsMenuOpenned(!isMenuOpenned);
    }
    const isPlayerWrappedSetter = (state) => {
        setIsplayerWrapped(state);
    }

    return (
    <header className={`header ${isPlayerWrapped ? '' : 'header_player-state_unwrapped'}`}>
        <div className={`links ${isPlayerWrapped ? '' : 'links_player-state_unwrapped'}`}>
            <a className="logo" href="https://marshakbooks.ru">
                <SvgLogo className="logo__img" />
            </a>
            <ul className={`links-list ${isMenuOpenned ? 'links-list_unwrapped' : ''}`}>
                <li key="close-button" className="links-list__item">
                    {isMenuOpenned ? <button onClick={onCloseOpenMenuClick} className="close-button"><SvgCloseButton className="close-button__img" /></button> : <button onClick={onCloseOpenMenuClick} className="links-list__btn">Стримминги</button>}
                </li>
                {streamings.map((streaming, index) => <li key={index} className="links-list__item"><a target="_blank" rel="noreferrer" className="links-list__btn" href={streaming.link}>{streaming.name}</a></li>)}
            </ul>
        </div>
        <h1 className={`header__project-name ${isPlayerWrapped ? '' : 'header__project-name_player-state_unwrapped'}`}>
           <SvgProjectName className="header__logo-img" />
        </h1>
        <Player isPlayerWrappedSetter={isPlayerWrappedSetter} isPlayerWrapped={isPlayerWrapped} />
    </header>
    )
}

export default Header;