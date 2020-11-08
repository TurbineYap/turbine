import React from 'react';
import logoPath from '../../images/logo.svg';
import projectNamePath from '../../images/project-name.svg';
import Player from '../Player/Player';
import closeButtonPath from '../../images/close-button.svg';

function Header () {
    return (
    <header className="header">
        <div className="links">
            <a className="logo" href="p">
                <img className="logo__img" src={logoPath} alt="Крепость"></img>
            </a>
            <button className="list-switcher shroud">Стриминги</button>
            <ul className="links-list">
                <li className="links-list__item">
                    <button className="close-button">
                        <img className="close-button__img" src={closeButtonPath} alt="Крестик"></img>
                    </button>
                </li>
                <li className="links-list__item">
                    <a className="links-list__link" href="https://music.yandex.ru/home">Яндекс.Музыка ↗</a>
                </li>
                <li className="links-list__item">
                    <a className="links-list__link" href="https://www.spotify.com">Spotify ↗</a>
                </li>
                <li className="links-list__item">
                    <a className="links-list__link" href="https://music.apple.com/us/browse">Apple Music ↗</a>
                </li>
                <li className="links-list__item">
                    <a className="links-list__link" href="https://vk.com/vkmusic">VK Music ↗</a>
                </li>
            </ul>
        </div>
        <h1 className="header__project-name">
            <img className="header__logo-img" src={projectNamePath} alt="Название проекта"></img>
        </h1>
        <Player></Player>
    </header>
    )
}

export default Header;