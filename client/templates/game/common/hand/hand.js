import { Template } from 'meteor/templating';
import { Hand } from '/common/collections/all';

Template.hand.helpers({
  hand:()=>{
    let hand = Hand.find({}).fetch();
    let data = _.pluck(hand, 'cards');
    console.log(data[0]);
    return data[0];
  }
});
