FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'game'});
  }
});
