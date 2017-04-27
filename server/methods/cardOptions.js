import {cardFetcher} from '../cardManagement/cardFetcher';
Meteor.methods({
  'findCard': (searchText) => {
    return cardFetcher(searchText, 'chris');
  }
});
