import {Decks} from '/common/collections/all';

export function addToDeck(deckId, cardID, quantity) {
  if (!quantity) {
    quantity = 1;
  }
  let deckID;
  let deck = Decks.findOne({marker:deckId});
  if (!deck) {
    deckID = Decks.insert({list: []});
  } else {
    deckID = deck._id;
  }
  let obj = {};
  obj.cardID = cardID;
  obj.quantity = quantity;

  Decks.update({
    _id: deckID
  }, {
    $addToSet: {
      list: obj
    }
  });

}
