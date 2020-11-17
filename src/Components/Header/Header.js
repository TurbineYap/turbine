import React, { useState } from 'react';
import SvgLogo from '../../images/SvgLogo.js';
import SvgProjectName from '../../images/SvgProjectName';
import Player from '../Player/Player';
import SvgCloseButton from '../../images/SvgCloseButton';
import streamings from '../../utils/streamings.json';

function Header () {
    const [ isMenuOpenned, setIsMenuOpenned ] = useState(false);
    const onCloseOpenMenuClick = () => {
        setIsMenuOpenned(!isMenuOpenned);
    }
    return (
    <header className="header">
        <div className="links">
            <a className="logo" href="https://marshakbooks.ru">
                <SvgLogo className="logo__img" />
            </a>
            <ul className="links-list">
                <li key="close-button" className="links-list__item">
                    {isMenuOpenned ? <button onClick={onCloseOpenMenuClick} className="close-button"><SvgCloseButton className="close-button__img" /></button> : <button onClick={onCloseOpenMenuClick} className="links-list__btn">Стримминги</button>}
                </li>
                {streamings.map((streaming, index) => <li key={index} className="links-list__item"><a target="_blank" rel="noreferrer" className="links-list__btn" href={streaming.link}>{streaming.name}</a></li>)}
            </ul>
        </div>
        <h1 className="header__project-name">
           <SvgProjectName className="header__logo-img" />
        </h1>
        <Player />
    </header>
    )
}

export default Header;