import {Meteor} from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import {levenshtein} from './levenstein';
import {checkCardDB} from './checkCardDB';
import {mandatory} from '../utils/validation';
import {optional} from '../utils/validation';
import {Cards} from '/common/collections/all';

export function cardFetcher(searchText = mandatory('searchText'), user = mandatory('user'), options = optional()) {

  console.log('');
  console.log('');
  console.log('');
  console.log('### New search request for ' + searchText);
  // standardised, lowercase for searching
  searchText = searchText.toLowerCase();
  let params = {
    name: searchText
  }
  // first, check our cache to avoid swamping API
  let check = checkCardDB(searchText);
  if(check) {
    return cardBuilder(check, searchText, user, false)
  } else {
    console.log('calling API...')
    let result = HTTP.call("GET", "https://api.deckbrew.com/mtg/cards", {
      params: params
    });
    if(result && result.data){
      return cardBuilder(result.data, searchText, user, true)
    } else {
      return false;
    }
  }
}

/**
 * Parses response from deckbrew or local collection
 */
cardBuilder = function(data = mandatory('data'), searchText = mandatory('searchText'), user = mandatory('user'), newSearch){

  let card = false;

  // Do we have multiple results?
  if (data.length > 1) {
    card = findClosest(data, searchText)
  } else {
    console.log('Pow, right in the kisser');
    card = data[0];
  }
  // console.log('-=-=-=-=-=-=-==-=');
  // console.log(card)
  // console.log('-=-=-=-=-=-=-==-=');
  let results = [];
  if(newSearch){
    console.log('is new search, so save pls')
    let editions = saveCardsToCache(card, user);
    _.each(editions, (e)=>{
      let response = {
        multiverse_id: card.multiverse_id,
        image_url: e.image_url,
        edition: e.set,
        name: card.name
      }
      results.push(response)
    });
    return results;
  } else {
    return [card];
  }

};

saveCardsToCache = function(card, user){

  let editions = card.editions;
  _.each(editions, (ed)=>{
    ed.name = card.name.toLowerCase();
    Cards.insert(ed);
  });
  return editions;

};

findClosest = function(data, searchText){
  console.log('Running levenstein');
  let leven = [];
  let i = 0;
  _.each(data, function (dt) {
    console.log('checking ' + dt.name);
    let dist = levenshtein(searchText, dt.name);
    leven.push({count: i, card: dt.name, dist: dist});

    i++;
  });

  let closest = _.min(leven, function (elem) {
    return elem.dist;
  });

  console.log('...Closest match is ' + closest.card + ', distance of ' + closest.dist);

  return data[closest.count];
}
