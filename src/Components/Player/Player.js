import React, { useEffect, useState } from 'react';
import initialTracks from '../../utils/tracks.json';
//import getTracks from '../../utils/api'; //запрос трэков на сервер
import Track from '../Track/Track';
import { Howl } from 'howler';
import albumLogoPath from '../../images/Album.png';

function Player ( { isPlayerWrappedSetter, isPlayerWrapped } ) {
    const [ tracks, setTracks ] = useState([]);
    const [ selectedTrack, setSelectedTrack ] = useState({});
    const [ selectedAudio, setSelectedAudio ] = useState({});
    const [ isMusicPlaying, setIsMusicPlaying ] = useState(false);
    const [ timer, setTimer ] = useState(0);
    const [ timerToRender, setTimerToRender ] = useState('0:00');
    const [ progressBarPosition, setProgressBarPosition ] = useState(0);
    const [ renderSongText, setRenderSongText ] = useState(false);

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

    const onPlayerSwitcherClick = () => {
        const state = isPlayerWrapped ? false : true;
        isPlayerWrappedSetter(state);
    }

    const onTextSwitcherClick = () => {
        setRenderSongText(!renderSongText);
    }

    return(
        <section className={`player ${isPlayerWrapped ? '' : 'player_state_unwrapped'}`}>
            <div className={`player__wrapper ${isPlayerWrapped ? 'player__wrapper_wrapped' : ''}`}>
                    <button onClick={onPlayPauseClick}
                        className={`
                            player__play-button 
                            ${isMusicPlaying ? "player__play-button_clicked" : ""} 
                            ${isPlayerWrapped ? 'player__play-button_menu-state_wrapped' : ''}
                        `}
                    >
                    </button>
                        <div className={`player__current-track ${isPlayerWrapped ? 'player__current-track_player-state_wrapped' : ''}`}>
                            <h2 className="player__current-track-title">{selectedTrack.author} — {selectedTrack.title}</h2>
                            <p className="player__timer">{timerToRender}</p>
                        </div>
                        <button className={`player__switcher ${isPlayerWrapped ? '' : 'player__switcher_clicked'}`} onClick={onPlayerSwitcherClick}></button>
                        <div className={`player__progress-bar ${isPlayerWrapped ? 'player__progress-bar_player-state_wrapped' : ''}`} style={{backgroundImage: `linear-gradient(to right, white 0px ${progressBarPosition}%, rgba(255, 255, 255, 0.3) 0% 1150px)`}}></div>
                        { isPlayerWrapped ? '' :
                            <>
                                <img className={`player__album-logo`} src={albumLogoPath} alt="Логотип альбома" />
                                <div className={`player__track-content-btns `}>
                                    {selectedTrack.video !== '' && <a href={selectedTrack.video}><button className="player__clip-button"></button></a>}
                                    <button onClick={onTextSwitcherClick} className={`player__text-switcher `}>Текст песни</button>
                                </div>
                                <div className="player__text-window">
                                    <p className="player__text-window-header">{`${renderSongText ? 'Текст песни:' : 'Релизы'}`}</p>
                                    <p className={`player__text ${renderSongText ? '' : 'shroud'}`}>{selectedTrack.text}</p>
                                    <ul className={`player__track-list ${renderSongText ? 'shroud' : ''}`}>
                                        {tracks.map(track => <li className="player__track" key={track.id}><Track 
                                            author={track.author}
                                            title={track.title} 
                                            id={track.id}
                                            onClick={onTrackClick}
                                        /></li>)}
                                    </ul>
                                </div>
                            </>
                        }
                </div>
        </section>
    )
}

export default Player;
