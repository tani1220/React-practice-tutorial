import React from 'react';

//React がコンポーネントを見つけた場合、JSX に書かれている属性と子要素を単一のオブジェクトとして該当するコンポーネントに渡します。このオブジェクトのことを “props” と呼びます。

function Square(props) {　//React.Componentを拡張する代わりに、レンダリングする必要がある関数を受け取る必要があるので、function コンポーネント名(props)←これ
    return(
        <button className="square"　onClick={props.onClick}> 
        {props.value}
        </button> 
    );
}//onClick={props.onClick} === onClick={()=> props.onClick()}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null), //9個の配列を生成して、値をnullで初期化している
             xIsNext: true,
        };
    }
    
  handleClick(i) {　//sliceを使用してコピー(新squares)を作る理由は基になるデータを変更しないことで機能がシンプルに、また後で再利用(古squares)できるため
      const squares = this.state.squares.slice(); //slice();でthis.state.squaresをコピーして新しく定義したsquaresにペーストしている
      if (calculateWinner(squares) || squares[i]) {　// A||B  AまたはB、どちらかが成立でtrue
        return;　//クリックを無視　
      }
      squares[i] = this.state.xIsNext ? 'X':'O'; //?は三項演算子（条件演算子）条件に基づいて2つの値のうち1つを選択
      this.setState({
          squares:squares,
          xIsNext: !this.state.xIsNext, //論理否定(!)論理否定では演算子の後ろの値がtrueの場合はfalse,falseの場合はtrueとなる
        }); //handleClickでsetStateが呼び出された時に新squaresを出力
  }　

  renderSquare(i) {
    return (
     <Square
      value={this.state.squares[i]}
      onClick={()=>this.handleClick(i)}
     />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {　//if文の条件がfalseの場合、elseの処理が実行
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game-foo">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

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
        return squares[a]; //このreturn squaresの[]はaでなくても良い。ただ、if()の式が成立した時にtrueとなりreturnすることでhandleClickメゾット内のif文が認知する
      }
    }
    return null;
  }
  
export default Game;