import React, { useEffect, useState } from 'react';
import initialTracks from '../../utils/tracks.json';
//import getTracks from '../../utils/api'; //запрос трэков на сервер
import Track from '../Track/Track';

function Player() {
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState({});

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
        // console.log(tracks)
    }

const urls = initialTracks.map((track) =>  track.src);


    const [players, toggle] = useMultiAudio(urls);
    
    return (
        <section className="player">            
            <div className="player__controls">
                <button className="player__play-button player__play-button_clicked" ></button>


                
                <div className="player__envelope">
                    <div className="player__current-track">
                        <audio className="player__current-trac" src={selectedTrack.src}></audio>
                        <h2 className="player__current-track-title">{selectedTrack.trackAuthor} - {selectedTrack.trackName}</h2>
                        <p className="player__timer">{selectedTrack.src}</p>
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
                <div  className={"try__now"}>
      {players.map((player, i) => (
        <Playeer key={i} player={player} toggle={toggle(i)} />
      ))}
    </div>
                </ul>
            </div>
        </section>
    )
}

export default Player;

const useMultiAudio = urls => {
    const [sources] = useState(
      urls.map(url => {
        return {
          url,
          audio: new Audio(url),
        }
      }),
    )
  
    const [players, setPlayers] = useState(
      urls.map(url => {
        return {
          url,
          playing: false,
        }
      }),
    )
  
    function toggle(targetIndex) {
        return  () => {
 
      const newPlayers = [...players]
      console.log(newPlayers);
      const currentIndex = players.findIndex(p => p.playing === true)
      if (currentIndex !== -1 && currentIndex !== targetIndex) {
        newPlayers[currentIndex].playing = false
        newPlayers[targetIndex].playing = true
      } else if (currentIndex !== -1) {
        newPlayers[targetIndex].playing = false
      } else {
        newPlayers[targetIndex].playing = true
      }
      setPlayers(newPlayers)
    }
}
    useEffect(() => {
      sources.forEach((source, i) => {
        players[i].playing ? source.audio.play() : source.audio.pause()
      })
    }, [sources, players])
  
    useEffect(() => {
      sources.forEach((source, i) => {
        source.audio.addEventListener('ended', () => {
          const newPlayers = [...players]
          newPlayers[i].playing = false
          setPlayers(newPlayers)
        })
      })
      return () => {
        sources.forEach((source, i) => {
          source.audio.removeEventListener('ended', () => {
            const newPlayers = [...players]
            newPlayers[i].playing = false
            setPlayers(newPlayers)
          })
        })
      }
    }, [])
  
    return [players, toggle]
  }
  
  const Playeer = ({ player, toggle }) => (
    <div>
      <p>Stream URL: {player.url}</p>
      <button onClick={toggle}>{player.playing ? 'Pause' : 'Play'}</button>
    </div>
  )