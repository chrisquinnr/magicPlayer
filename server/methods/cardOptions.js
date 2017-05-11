import {Meteor} from 'meteor/meteor';
import {cardFetcher} from '../cardManagement/cardFetcher';
import {cardSuggest} from '../cardManagement/cardSuggest';
import {checkCardDB} from '../cardManagement/checkCardDB';
import {check} from 'meteor/check';

Meteor.methods({
  findCard: (searchText) => {
    check(searchText, String)
    return cardFetcher(searchText, 'chris');
  },
  autocomplete: (partialQuery) => {
    check(partialQuery, String);
    let checkCard = checkCardDB(partialQuery);
    if(checkCard) return checkCard;
    return cardSuggest(partialQuery);
  }
});
