import React , { Component } from 'react';
import ReactDOM  from 'react-dom';

class App extends React.Component {
    render(){
        return (
            <div><h1>Hello Andy</h1></div>
        )
    }
}
if(Meteor.isClient) {
    Meteor.startup(function(){
        ReactDOM.render(<App />,document.getElementById("render-target"));
    });
}