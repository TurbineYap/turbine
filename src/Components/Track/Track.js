import React from 'react';

function Track ({ id, onClick, title, author }) {

    const handleClick = () => {
        onClick(id);
    }
    return(
        <span onClick={handleClick}>{author} — {title}</span>
    )
}

export default Track