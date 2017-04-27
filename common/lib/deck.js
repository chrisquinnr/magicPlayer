import {Decks} from '/common/collections/all';

export function addToDeck(deckId, cardID, quantity) {
  if (!quantity) {
    quantity = 1;
  }

  let deck = Decks.findOne({marker:deckId});
  if (!deck) {
    deck = Decks.insert({list: []});
  }
  let obj = {};
  obj.cardID = cardID;
  obj.quantity = quantity;

  Decks.update({
    _id: deck._id
  }, {
    $addToSet: {
      list: obj
    }
  });

}
