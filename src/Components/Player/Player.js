import React, { useEffect, useState } from 'react';
import initialTracks from '../../utils/tracks.json';
//import getTracks from '../../utils/api'; //запрос трэков на сервер

function Player () {
    const [ tracks, setTracks ] = useState([]);
    const [ selectedTrack, setSelectedTrack ] = useState({});

    useEffect(() => {
        /*const initialTracks = getTracks();*/ //загрузка с сервера
        // пока что треки локальные
        initialTracks.forEach((track, index) => {
            if (index === 0) {
                track.isSelected = true
            } else {
                track.isSelected = false;
            }
            
        });
        console.log(initialTracks)
        setTracks(initialTracks);
        setSelectedTrack(initialTracks[0]);
    }, [])

    const onTrackClick = (evt) => {
        const { key } = evt.target;
        const clickedTrack = tracks.filter((track) => {
            return track.id === key;
        })
        /*tracks.forEach

        setTracks*/

        setSelectedTrack({
            ...selectedTrack,
            clickedTrack
        })
        console.log(tracks)
    }

    return(
        <section className="player">
            <audio className="player__default-player">
                <source src={selectedTrack.src}></source>
            </audio>
            <div className="player__controls">
                <button className="player__play-button player__play-button_clicked"></button>
                <div className="player__envelope">
                    <div className="player__current-track">
                        <h2 className="player__current-track-title">Контур — Хадн Дадн feat. Варя Карпова и Федя Быстров</h2>
                        <p className="player__timer">2:24</p>
                    </div>
                    <div className="player__progress-bar"></div>
                    <button className="player__text-switcher player__text-switcher_type_mobile">Текст песни</button>
                </div>
                <button className="player__text-switcher shroud">Текст песни</button>
                <button className="player__switcher"></button>
            </div>
            <div className="player__text-window">
                <p className="player__text-window-header">Релизы</p>
                <p className="player__text shroud">Стихи</p>
                <ul className="player__track-list">
                    {tracks.map(track => <li className="player__track" key={track.id}><span onClick={onTrackClick} className={`player__track-title ${track.isSelected ? 'player__song_state_selected' : ''}`}>{track.trackName}</span></li>)}
                </ul>
            </div>
        </section>
    )
}

export default Player;
