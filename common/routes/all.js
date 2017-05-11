import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'home'});
  }
});

FlowRouter.route('/deckbuilder', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'deckbuilder'});
  }
});

FlowRouter.route('/game', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'game'});
  }
});
