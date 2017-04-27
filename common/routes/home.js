import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'game'});
  }
});
