import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Decks,Cards} from '/common/collections/all';
import {addToDeck} from '/common/lib/deck'
import {$} from 'meteor/jquery';
import {ReactiveVar} from 'meteor/reactive-var';

let timer;
let searchString = new ReactiveVar();
let suggestions = new ReactiveVar();

Template.deckbuilder.onRendered(() => {
  $('.cardname').focus();
})

Template.deckbuilder.events({
  'click .add': (e) => {
    let cardID = e.currentTarget.id;
    let quantity = $('.quantity').val();
    if(!cardID || !quantity)
    addToDeck('id', cardID, quantity);
    searchString.set();
    suggestions.set();
  },
  'keyup .cardname': (e) => {
    clearTimeout(timer);
    let str = e.currentTarget.value;
    if(str === searchString.get()) return;
    if (str.length >= 3) {
      timer = setTimeout(()=>{
        console.log('search threshold achieved...');
        Meteor.call('autocomplete', str, function(err, resp) {
          if (!err) {
            if (resp) {
              console.log('...response recieved');
              searchString.set(str);
              suggestions.set(resp);
            }
          } else {
            console.error(err);
          }
        });
      },1000);
    } else {
      if(str.length === 0){
        searchString.set();
        suggestions.set();
      }
    }
  }
});

Template.deckbuilder.helpers({
  decklist: () => {
    let d = Decks.findOne({_id: 'Gbvbj84DxapH2f3rH'});
    console.log(d);
    return d;
  },
  suggestions: () => {
    return suggestions.get();
  },
  getCard:(mvId)=>{
    console.log(mvId);
    let c = Cards.findOne({multiverse_id:+mvId});
    console.log(c);
    return c;
  }
});
