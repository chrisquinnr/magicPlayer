import {addToDeck} from '../../../../common/lib/deck'

Template.singledeck.events({
    'keyup .cardname':(e)=>{
      if(e.keyCode === 13){
        clientSideFetcher();
      }
    },
    'click .find':()=>{
      clientSideFetcher();
    },
    'click .add':()=>{
      let curr = Session.get('result');
      console.log(curr);
      let quantity = $('.quantity').val();
      addToDeck('id', curr, quantity);
      Session.set('result', '');
    }
  });

Template.singledeck.helpers({
   result:()=>{
     return Session.get('result');
   },
   decklist:()=>{
     return Decks.findOne({user:Meteor.userId()});
   }
 });

clientSideFetcher = function (){
  Session.set('result', '');
  let search = $('.cardname').val();
  console.log(search);
  if(search){
    Meteor.call('findCard', search, function(err, resp){
      if(!err){
        if(resp){
          console.log(resp);
          Session.set('result', resp);
        }
      }
    });
  }
};