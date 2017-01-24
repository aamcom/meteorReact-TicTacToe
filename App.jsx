import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
    render(){
        return (
            <div><h1>Hello mon tictactoe!</h1></div>
        )
    }
}
if(Meteor.isClient) {
    Meteor.startup(function(){
        ReactDom.render(<App />,document.getElementById("render-target"));
    })
}