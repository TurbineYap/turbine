import React from 'react';

function Track ({ trackName, isSelected }) {

    return(
        <span className={`text-window__song ${isSelected && 'text-window__song_state_selected'}`}>{trackName}</span>
    )
}

export default Track