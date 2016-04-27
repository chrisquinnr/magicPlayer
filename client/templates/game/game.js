Template.game.events({
  'click .deal':()=>{
    let deck = Decks.findOne({});

    if(deck){
      let list = deck.list;

      let shuffle = _.shuffle(list);
      let hand = _.first(shuffle, 7);
      Hand.insert({cards:hand});
      Library.insert({cards:_.rest(list, 8)});
    }
  }

});