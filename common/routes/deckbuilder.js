FlowRouter.route('/deckbuilder', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'deckbuilder'});
  }
});
