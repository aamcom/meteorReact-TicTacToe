//import Moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Games } from '../lib/collections';
//startup
Meteor.startup(function() {
    if (Games.find().count() === 0) {
        const games = [
            {
                message: "Partie initialisée via Mongo",
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
        ]
        games.forEach((game)=>{
            const gameId = Games.insert(game);
        })
        console.log("Meteor startup : La collection games vient d'etre créée : ", Games.find().count())
    } else if (Games.find().count() === 1) {
        var board = [
                    "","","",
                    "","","",
                    "","",""
                ];
        
        id = Games.findOne()._id;
        Games.update({_id:id},{$set:{board: board}})
        console.log("Meteor startup : La collection games vient d'etre initialisée");
    } else {
        console.log("Meteor startup : Collection Games non vide :",Games.find().count()) 
        return;
    }
})