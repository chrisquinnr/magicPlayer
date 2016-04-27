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
    return cardBuilder(check, searchText, user)

  } else {
    console.log('fetching from deck brew')
    let result = HTTP.call("GET", "https://api.deckbrew.com/mtg/cards", {
      params: params
    });
    console.log('----------');
    console.log(result.data);
    console.log('----------');
    return cardBuilder(result.data, searchText, user)
  }
}

cardBuilder = function(data = mandatory('data'), searchText = mandatory('searchText'), user = mandatory('user')){

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

    console.log(leven);

    let closest = _.min(leven, function (elem) {
      return elem.dist;
    });

    console.log('...Closest match is ' + closest.card + ', distance of ' + closest.dist);

    card = data[closest.count];

  } else {

    console.log('Pow, right in the kisser');
    card = data[0];

  }

  if (card) {
    var edition = editionFinder(card, user);

  }

  if (!card || !edition) {
    return {
      text: "Sorry we couldn't work that one out."
    };
  }

  let response = {
    image: edition.image_url,
    edition: edition.set,
    name: card.name
  }

  return response;

};

editionFinder = function(card){

  let editions = card.editions;
  _.each(editions, function(ed){
    ed.name = card.name.toLowerCase();
    Cards.insert(ed);
  });
  return _.last(editions);
};