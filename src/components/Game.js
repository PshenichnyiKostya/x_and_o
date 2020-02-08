import React from "react";
import Board from '../components/Board'
import Switch from '../components/Switch'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            fields: Array(10).fill(null),
            xIsNext: true,
            stepNumber: 0,
            isInc: true,
            switchValue: 'Increase',
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const fields = this.state.fields.slice(0, this.state.stepNumber + 2);
        fields[this.state.stepNumber + 1] = i;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = (this.state.xIsNext ? 'X' : 'O');
        this.setState({
            history: history.concat([{squares: squares}]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
            fields: fields,
        });
    }

    handleSwitch() {
        this.setState({
            isInc: !this.state.isInc,
            switchValue: !this.state.isInc ? 'Increase' : 'Decrease',
        })
    }

    jumpTo(index) {
        this.setState({
            stepNumber: index,
            xIsNext: (index % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const fields = this.state.fields;
        const isInc = this.state.isInc;
        const moves = history.map((value, index) => {
            const desc = index ?
                'Перейти к ходу #' + index :
                'К началу игры';
            const line = Math.floor(fields[index] / 3) + 1;
            const col = fields[index] % 3 + 1;
            const stringLine = `Line is: ${line}`;
            const stringCol = `Column is: ${col}`;
            return (
                <li key={index}>
                    <button
                        onClick={() => this.jumpTo(index)}>{desc} {desc !== 'К началу игры' ? stringCol : undefined} {desc !== 'К началу игры' ? stringLine : undefined} {isInc}
                    </button>
                </li>
            );
        });
        let status;
        if (winner === 'draw') {
            status = "Draw";
        } else if (winner) {
            status = 'Winner is ' + current.squares[winner[0]];
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
                           onClick={(i) => this.handleClick(i)}
                           winNumbers={winner}/>
                </div>

                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <div>
                    <Switch onClick={() => this.handleSwitch()} value={this.state.switchValue}/>
                </div>
            </div>
        );
    }
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }
    if (squares.filter(value => !value).length === 0) {
        return 'draw';
    } else {
        return null;
    }

}

export default Game;