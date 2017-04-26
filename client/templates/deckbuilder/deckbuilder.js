import {addToDeck} from '../../../common/lib/deck'

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
  'click .add':()=>{
    let curr = Session.get('result');
    console.log(curr);
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
