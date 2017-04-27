import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
let GameState = new ReactiveVar([]);

Template.card.events({
  'click .card': (e) => {
    console.log('Click card');
    console.log(e.currentTarget.id);
  }
});

Template.card.helpers({
  rotate: (id) => {}
});
