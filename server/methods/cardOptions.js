import {cardFetcher} from '../cardManagement/cardFetcher';
import {cardPredictiveFetcher} from '../cardManagement/typeAhead';
Meteor.methods({
  'findCard':(searchText)=>{
    return cardFetcher(searchText, 'chris');
  },
  findCardTypeAhead:(searchText)=>{
    return cardPredictiveFetcher(searchText);
  }
});