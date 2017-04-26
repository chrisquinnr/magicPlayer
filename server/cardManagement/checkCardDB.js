import {Cards} from '/common/collections/all';
export function checkCardDB (searchtext){
  console.log('searching for ' + searchtext + ' on cache...')
  // find on our db
  let res = Cards.find({name: searchtext, image_url:{$ne:'https://image.deckbrew.com/mtg/multiverseid/0.jpg'}}).fetch();

  if(res.length < 1){
    console.log('no match in cache');
    return false;
  } else {
    console.log(res.length + ' cache matches found');
    return res;
  }

}
