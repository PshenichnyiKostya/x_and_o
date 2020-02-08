import React from 'react';
import '../index.css';

function Switch(props) {
    return (
        <button onClick={props.onClick}>{props.value}</button>
    )
}

export default Switch;