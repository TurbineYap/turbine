import React from 'react';

function Track ({ id, onClick, title, author, feat }) {

    const handleClick = () => {
        onClick(id);
    }
    return(
        <span onClick={handleClick}> {title} — {author} {feat ? <span className="feat">feat</span> : ''} {feat ? feat : ''} </span>
    )
}

export default Track