import React from 'react';
import '../index.css';

import Square from '../components/Square'

class Board extends React.Component {
    Style = {
        background: '#ff522c',
    };

    renderWinSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                style={this.Style}
            />
        );
    }

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderBoard(k) {
        let items = [];
        for (let i = 0; i < k; i++) {
            items.push(<div className="board-row"/>);
            for (let j = 0; j < k; j++) {
                if (this.props.winNumbers) {
                    if (this.props.winNumbers.includes(i * 3 + j)) {
                        items.push(this.renderWinSquare(i * 3 + j))
                        continue;
                    }
                }
                items.push(this.renderSquare(i * 3 + j))

            }
        }
        return items;
    }

    render() {
        return (
            <div>
                {this.renderBoard(3)}
            </div>
        )
    }
}

export default Board;