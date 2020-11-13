import React from 'react';

function Track(props){



console.log(props.src);
    return(
        
     <li className="player__track">
         <span className="player__track-title" >
             {props.title}
         </span>
     </li>
    )
}
export default Track;