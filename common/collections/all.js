import { Mongo } from 'meteor/mongo';

export let Cards = new Mongo.Collection('cards');
export let Decks = new Mongo.Collection('decks');
export let Game = new Mongo.Collection('game');
export let Hand = new Mongo.Collection('hand');
export let Library = new Mongo.Collection('library');
