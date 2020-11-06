import React from 'react';
import audioPath from '../../audio/example.mp3';

function Player () {

    return(
        <section className="player">
            <audio controls className="default-player">
                <source src={audioPath}></source>
            </audio>
            <div className="controls">
                <button className="controls__play-button"></button>
                <div className="controls__envelope">
                    <div className="controls__text">
                        <h2 className="controls__name">Контур — Хадн Дадн feat. Варя Карпова и Федя Быстров</h2>
                        <p className="controls__timer">2:24</p>
                    </div>
                    <div className="controls__progress-bar"></div>
                    <button className="controls__text-switcher controls__text-switcher_type_mobile">Текст песни</button>
                </div>
                <button className="controls__text-switcher">Текст песни</button>
                <button className="controls__switcher"></button>
            </div>
            <div className="text-window">
                <p className="text-window__header">Релизы</p>
                <p className="text-window__text">Лодка — СБПЧ feat. Маруся Романова</p>
            </div>
        </section>
    )
}

export default Player;
