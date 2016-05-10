import {addToDeck} from '../../../common/lib/deck'

Template.navBar.events({
 'keyup .cardname':(e)=>{
   e.preventDefault();
   if(e.keyCode === 13){
     searchBarTrigger();
   }
 },
 'click .searcher':(e)=>{
   e.preventDefault();
   FlowRouter.go('/searchresults');
   searchBarTrigger();
 },
 'click .add':()=>{
   let curr = Session.get('result');
   console.log(curr);
   let quantity = $('.quantity').val();
   addToDeck('id', curr, quantity);
   Session.set('result', '');
 }
});

Template.navBar.helpers({
  results:()=>{
    return Session.get('results');
  }
});

searchBarTrigger = function (){
  console.log('triggggggggerrrrr');
  Session.set('result', '');
  let search = $('.cardsearch').val();
  console.log(search);
  if(search){
    Meteor.call('findCard', search, function(err, resp){
      if(!err){
        if(resp){
          console.log(resp);
          Session.set('results', resp);
        }
      }
    });
  }
};