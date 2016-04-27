export function addToDeck (id, card, quantity){
  if(!quantity){
    quantity = 1;
  }
  let deck = Decks.findOne({marker: id});
  let list = [];
  if(!deck){
    Decks.insert({marker:id});
  } else {
    if(deck.list){
      list = deck.list;
    }
  }
  card.quantity = quantity;

  list.push(card);

  Decks.update({_id:deck._id}, {$set:{list:_.uniq(list)}});

}