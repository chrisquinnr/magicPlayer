FlowRouter.route('/searchresults', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'searchresults'});
  }
});
