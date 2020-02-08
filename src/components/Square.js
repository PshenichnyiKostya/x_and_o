import React from 'react';
import '../index.css';

function Square(props) {
    return (
        <button className="square"
                onClick={props.onClick}
                style={props.style}>
            {props.value}
        </button>
    );
}

export default Square;
