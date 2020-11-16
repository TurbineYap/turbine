import React, { useEffect, useState } from 'react';
import initialTracks from '../../utils/tracks.json';
//import getTracks from '../../utils/api'; //запрос трэков на сервер
import Track from '../Track/Track';
import { Howl } from 'howler';
import albumLogoPath from '../../images/Album.png';

function Player () {
    const [ tracks, setTracks ] = useState([]);
    const [ selectedTrack, setSelectedTrack ] = useState({});
    const [ selectedAudio, setSelectedAudio ] = useState({});
    const [ isMusicPlaying, setIsMusicPlaying ] = useState(false);
    const [ timer, setTimer ] = useState(0);
    const [ timerToRender, setTimerToRender ] = useState('0:00');
    const [ progressBarPosition, setProgressBarPosition ] = useState(0);

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

        setTracks(initialTracks);
        setSelectedTrack(initialTracks[0]);
        setSelectedAudio(createAudio(initialTracks[0]));
    }, [])

    useEffect(() => {
        if (isMusicPlaying) {
            let currentTime = timer;
            const interval = setInterval(() => {
                currentTime = currentTime + .01;
                const currentStage = currentTime/selectedAudio.duration()*100;
                setProgressBarPosition(currentStage);
                setTimer(currentTime);
                setTimerToRender(formatTime(currentTime));
            }, 10);
            return () => clearInterval(interval);
        }
    }, [isMusicPlaying, selectedAudio, timer])

    useEffect(() => {
        if (progressBarPosition !== 0) {
            setTimer(0);
            setTimerToRender('0:00');
            selectedAudio.load();
            selectedAudio.play();
    }
    }, [selectedAudio])

    const onTrackClick = (id) => {
        if (isMusicPlaying) {
            selectedAudio.stop();
        }
        const clickedTrack = tracks.filter((track) => {
            return track.id === id;
        })[0]
        const newAudio = createAudio(clickedTrack);

        setSelectedAudio(newAudio);
        
        setSelectedTrack({
            ...selectedTrack,
            ...clickedTrack,
            isSelected: true
        })
    }

    const onPlayPauseClick = (evt) => {
        if (!evt.target.classList.contains('player__play-button_clicked')) {
            selectedAudio.load();
            selectedAudio.play();
        } else {
            selectedAudio.pause();
        }
    }

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60) || 0;
        const seconds = (Math.floor(secs) - minutes * 60) || 0;

        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }

    const createAudio = (track) => {
        const audio = new Howl({
            src: [track.src],
            onplay: function () {
                setIsMusicPlaying(this.playing());
            },
            onpause: function () {
                setIsMusicPlaying(this.playing());
            },
            preload: false,
            onend: function () {
                this.stop();
                setIsMusicPlaying(this.playing());
                setProgressBarPosition(100);
            },
            onstop: function () {
                setIsMusicPlaying(this.playing());
                setTimer(0);
                setTimerToRender('0:00');
                setProgressBarPosition(0);
            }
        });
        return audio;
    }

    return(
        <section className="player">
            <img className={`player__album-logo ${selectedTrack.video !== '' ? 'player__album-logo_position_video' : ''}`} src={albumLogoPath} alt="Логотип альбома" />
                <button onClick={onPlayPauseClick}
                    className={`player__play-button ${isMusicPlaying ? "player__play-button_clicked" : ""} ${selectedTrack.video !== '' ? 'player__play-button_position_video' : ''}`}
                >
                </button>
                    <div className={`player__current-track ${selectedTrack.video !== '' ? 'player__current-track_position_video' : ''}`}>
                        <h2 className="player__current-track-title">{selectedTrack.author} — {selectedTrack.title}</h2>
                        <p className="player__timer">{timerToRender}</p>
                    </div>
                    <div className={`player__track-content-btns ${selectedTrack.video !== '' ? 'player__track-content-btns_position_video' : ''}`}>
                        {selectedTrack.video !== '' && <button className="player__clip-button"></button>}
                        <button className={`player__text-switcher ${selectedTrack.video !== '' ? 'player__text-switcher_position_video' : ''}`}>Текст песни</button>
                    </div>
                    <div className={`player__progress-bar ${selectedTrack.video === '' ? 'player__progress-bar_state_long' : ''} ${selectedTrack.video !== '' ? 'player__progress-bar_position_video' : ''}`} style={{backgroundImage: `linear-gradient(to right, white 0px ${progressBarPosition}%, rgba(255, 255, 255, 0.3) 0% 1150px)`}}></div>
                    <div className={`player__text-window ${selectedTrack.video !== '' ? 'player__text-window_position_video' : ''}`}>
                        <p className="player__text-window-header">Релизы</p>
                        <p className="player__text shroud">Стихи</p>
                        <ul className="player__track-list">
                            {tracks.map(track => <li className="player__track" key={track.id}><Track 
                                author={track.author}
                                title={track.title} 
                                id={track.id}
                                onClick={onTrackClick}
                            /></li>)}
                        </ul>
                    </div>
            <button className="player__switcher"></button>
        </section>
    )
}

export default Player;
