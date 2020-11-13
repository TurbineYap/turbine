import React from 'react';
import SvgLogo from '../../images/SvgLogo.js';
import SvgProjectName from '../../images/SvgProjectName';
import Player from '../Player/Player';
import SvgCloseButton from '../../images/SvgCloseButton';
import streamings from '../../utils/streamings.json';



function Header () {



    return (
    <header className="header">
        <div className="links">
            <a className="logo" href="https://marshakbooks.ru">
                <SvgLogo className="logo__img" />
            </a>
            <button className="list-switcher">Стриминги</button>
            <ul className="links-list">
                <li key="close-button" className="links-list__item">
                    <button className="close-button">
                        <SvgCloseButton className="close-button__img" />
                    </button>
                </li>
                {streamings.map((streaming, index) => <li key={index} className="links-list__item"><a target="_blank" rel="noreferrer" className="links-list__link" href={streaming.link}>{streaming.name}</a></li>)}
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