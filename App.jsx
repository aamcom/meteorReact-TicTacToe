import React from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react'
//import './App.css';
import { Games } from './lib/collections';



class App extends TrackerReact(React.Component) {
    games(){
        return Games.find().fetch()[0];
    }
    constructor(props){
        super(props);
       
        this.state = {
            id : "",
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
        //console.log(this.games());
        //this.state= this.games();
    }
    componentWillMount(){
       // console.log(this.games());
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
        var gameOver = this.games().gameOver;
        //console.log(this.state.board);
        if (!this.state.gameOver) {
            var board = this.games().board;
            var currentTurn = this.games().currentTurn;
            var lastTurn = this.games().lastTurn;
            
            console.log(index, currentTurn);

            if (this.state.board[index] === "") {// controle si la case est vide : sinon on ne peut pas jouer
                this.state.board[index] = this.state.currentTurn;
                this.setState({
                    board: this.state.board,
                    lastTurn: this.state.currentTurn, 
                    currentTurn: (this.state.currentTurn === this.state.PLAYER_ONE_SYM) ? this.state.PLAYER_TWO_SYM : this.state.PLAYER_ONE_SYM
                })
                // update de la base mini mongo
                
                board[index] = this.games().currentTurn; 
                id = Games.findOne()._id;
                Games.update(
                    {_id:id},
                    {
                        $set: {
                            board: board,
                            currentTurn :  lastTurn,
                            lastTurn : currentTurn
                        }    
                    })
               // console.log(this.games().board);
            }
            if (this.checkForWinner()){
            this.setState({
                gameOver : true
            })
            alert (this.state.lastTurn + " a gagné ! ")
            }
        }
    }
    resetBoard(){
        console.log('reste');
        
        message= "Partie initialisée via Mongo";
        var gameOver= false;
        var currentTurn = "X";
        var lastTurn = "O";
        var board= [
                    "","","",
                    "","","",
                    "","",""
                ];
        id = Games.findOne()._id;
        Games.update(
            {_id:id},
            {
                $set: {
                    message : message,
                    board: board,
                    currentTurn :  lastTurn,
                    lastTurn : currentTurn,
                    gameOver: gameOver
            }    
        });
        this.state = {
            id : "",
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
    render(){
       //console.log("Games:",this.games());
        //console.log("FindOne:",Games.findOne());
        //this.setState({id:Games.findOne()});
        //console.log("id:",this.state.id);
        if (this.games()) {
           // console.log(this.games())
        return (
            <div>
                <button onClick={()=>this.resetBoard()}>Click Me</button>
                <div className="board">
                    {this.games().board.map((cell, index)=> {
                        return <div onClick={()=>this.handleClick(index)} data-cell-id={index} className="square">{cell}</div>
                    })}
                </div>
            </div>
        )
        }
        else 
        return (<div></div>);
    }
}
if(Meteor.isClient) {
    Meteor.startup(function(){
        ReactDom.render(<App />,document.getElementById("render-target"));
    })
    console.log("App.jsx        : Mon client demarré...!")
}
if(Meteor.isServer) {
    
    console.log("App.jsx        : Mon serveur demarré...!")
}