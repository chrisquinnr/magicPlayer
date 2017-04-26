import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Decks } from '/common/collections/all';
import {addToDeck} from '/common/lib/deck'

Template.deckbuilder.events({
  'click .find':()=>{
    Session.set('result', '');
    let search = $('.cardname').val();
    console.log(search);
    if(search){
      Meteor.call('findCard', search, function(err, resp){
        if(!err){
          if(resp){
            Session.set('result', resp);
          }
        }
      });
    }
  },
  'click .add':(e)=>{
    let curr = Session.get('result');
    console.log(curr);
    curr.multiverse_id = e.currentTarget.id;
    let quantity = $('.quantity').val();
    addToDeck('id', curr, quantity);
    Session.set('result', '');
  }
});

Template.deckbuilder.helpers({
  result:()=>{
    return Session.get('result');
  },
  decklist:()=>{
    return Decks.findOne({marker:'id'});
  }
});
