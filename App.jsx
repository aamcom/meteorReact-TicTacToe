import React from 'react';
import ReactDom from 'react-dom';
//import './App.css';

class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            message: "A toi de jouer !!",
            PLAYER_ONE_SYM : "X",
            PLAYER_TWO_SYM : "O",
            gameOver: false,
            currentTurn : "X",
            lastTurn : "O",
            board: [
                "","","",
                "","","",
                "","",""
            ]
        }
    }

    checkForWinner() {
      var symbols = this.state.board;
      var winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];
      return winningCombos.find((combo)=>{
        if ((symbols[combo[0]] == symbols[combo[1]]) && (symbols[combo[1]] == symbols[combo[2]])) {
          return symbols[combo[0]];
        } else {
          return false; 
        }
      })
      //console.log(s);
    }

    handleClick(index){
        console.log(index,this.state.currentTurn);
        if (!this.state.gameOver) {
            if (this.state.board[index] === "") {// controle si la case est vide : sinon on ne peut pas jouer
                this.state.board[index] = this.state.currentTurn;
                this.setState({
                    board: this.state.board,
                    lastTurn: this.state.currentTurn, 
                    currentTurn: (this.state.currentTurn === this.state.PLAYER_ONE_SYM) ? this.state.PLAYER_TWO_SYM : this.state.PLAYER_ONE_SYM
                })
            }
            if (this.checkForWinner()){
            this.setState({
                gameOver : true
            })
            alert (this.state.lastTurn + " a gagné ! ")
            }
        }
    }
    render(){
        return (
            <div className="board">
                {this.state.board.map((cell, index)=> {
                    return <div onClick={()=>this.handleClick(index)} data-cell-id={index} className="square">{cell}</div>
                })}
            </div>
        )
    }
}
if(Meteor.isClient) {
    Meteor.startup(function(){
        ReactDom.render(<App />,document.getElementById("render-target"));
    })
}