import { Decks } from '/common/collections/all';

export function addToDeck (deckId, card, quantity){
  if(!quantity){
    quantity = 1;
  }

  let deck = Decks.findOne({});
  if(!deck){
    deck = Decks.insert({list:[]});
  }
  let obj = {};
  obj.card = card[0];
  obj.quantity = quantity;

  Decks.update({_id:deck._id}, {$addToSet:{list:obj}});

}
