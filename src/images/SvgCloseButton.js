import React from 'react';

function SvgCloseButton(props) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 19 19" fill="none" {...props}>
        <path
          stroke="#fff"
          strokeWidth={2}
          d="M4.903 4.904l9.193 9.192M4.904 14.096l9.193-9.192"
        />
      </svg>
    );
  }
  
  export default SvgCloseButton;
  