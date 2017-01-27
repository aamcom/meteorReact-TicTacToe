import { Mongo } from 'meteor/mongo';
 
export const Games = new Mongo.Collection('games');

console.log("Lib Collection : Mongo Games collection Instanciée")