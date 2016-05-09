FlowRouter.route('/singledeck/:_id', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'singledeck'});
  }
});
