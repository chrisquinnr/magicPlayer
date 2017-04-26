import {Meteor} from 'meteor/meteor';
import {levenshtein} from './levenstein';
import {checkCardDB} from './checkCardDB';
import {mandatory} from '../utils/validation';
import {optional} from '../utils/validation';

export function cardFetcher(searchText = mandatory('searchText'), user = mandatory('user'), options = optional()) {

  searchText = searchText.toLowerCase();

  let params = {
    name: searchText
  };

  if (options && options.type) {
    params.type = options.type;
  }
  if (options && options.color) {
    params.color = options.color;
  }

  let check = checkCardDB(searchText);
  if(check) {
    console.log('returning from cache');
    console.log('----------');
    console.log(check);
    console.log('----------');
    return cardBuilder(check, searchText, user, false)

  } else {
    console.log('fetching from deck brew')
    let result = HTTP.call("GET", "https://api.deckbrew.com/mtg/cards", {
      params: params
    });
    console.log('----------');
    console.log(result.data);
    console.log('----------');
    return cardBuilder(result.data, searchText, user, true)
  }
}

cardBuilder = function(data = mandatory('data'), searchText = mandatory('searchText'), user = mandatory('user'), editionCheck){

  let card = false;

  if (data.length > 1) {
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

    card = data[closest.count];

  } else {
    console.log('Pow, right in the kisser');
    card = data[0];
  }

  let results = [];
  if(editionCheck){
    let edition = false;
    if (card) {
      edition = editionFinder(card, user);
    }
    console.log(edition, 'is edition');
    if (edition === undefined || !edition) {
      return {
        text: "Sorry we couldn't work that one out."
      };
    }
    _.each(edition, (e)=>{
      let response = {
        image_url: e.image_url,
        edition: e.set,
        name: card.name
      }
      results.push(response)
    });
    console.log(results);
    return results;
  } else {
    return [card];
  }

};

editionFinder = function(card, user){

  let editions = card.editions;
  console.log(editions);
  _.each(editions, (ed)=>{
    console.log(ed, 'is single edition');
    ed.name = card.name.toLowerCase();
    Cards.insert(ed);
  });
  return editions;
};
