Template.decks.events({
});

Template.decks.helpers({
  decks:()=>{
    return Decks.find({user:Meteor.userId()});
  }
});
