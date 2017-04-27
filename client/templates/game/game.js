import {Template} from 'meteor/templating';
import {Decks, Library, Hand} from '/common/collections/all';

Template.game.events({
  'click .deal': () => {
    let deck = Decks.findOne({});

    if (deck) {
      let list = deck.list;

      let shuffle = _.shuffle(list);
      let hand = _.first(shuffle, 7);
      Hand.insert({cards: hand});
      Library.insert({
        cards: _.rest(list, 8)
      });
    }
  },
  'click .draw': () => {

    let l = Library.findOne({});

    let card = _.first(l.cards);

    let h = Hand.findOne({});

    let cards = h.cards;

    cards.push(card);

    Hand.update({
      _id: h._id
    }, {
      $set: {
        cards: cards
      }
    });
  }

});
