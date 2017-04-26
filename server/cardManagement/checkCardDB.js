import {Cards} from '/common/collections/all';
export function checkCardDB (searchtext){

  // find on our db
  let res = Cards.find({name: /searchtext/}).fetch();

  if(res.length < 1){
    console.log('no match in cache');
    return false;
  } else {
    return res;
  }
  
}
