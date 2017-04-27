import {Meteor} from 'meteor/meteor';
import {Decks} from '/common/collections/all';
Meteor.startup(() => {
  let d = Decks.find({}).fetch();
  if(d.length < 1){
    Decks.insert({
      name:'Test Deck',
      marker:'id',
      list:[]
    })
  }
});
