import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';
import {mandatory, optional} from '../utils/validation';
import {Cards} from '/common/collections/all';
import {_} from 'meteor/underscore';
export function cardSuggest(partialQuery = mandatory('partialQuery')) {
  partialQuery = partialQuery.toLowerCase();
  let params = {
    q: partialQuery
  }
  console.log('calling autocomplete API...')
  let result = HTTP.call("GET", "https://api.deckbrew.com/mtg/cards/typeahead", {params: params});
  if (result && result.data) {
    let parsed = [];
    _.each(result.data, (r)=>{
      parsed.push({
        name:r.name,
        image_url: r.editions[0].image_url,
        multiverse_id: r.editions[0].multiverse_id
      })
    });
    console.log(parsed);
    return parsed;
  } else {
    return false;
  }
}
