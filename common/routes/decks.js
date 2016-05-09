FlowRouter.route('/decks', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'decks'});
  }
});
