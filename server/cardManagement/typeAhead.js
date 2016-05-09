export function cardPredictiveFetcher(searchText = mandatory('searchText')) {

  searchText = searchText.toLowerCase();

  let params = {
    name: searchText
  };

  //let check = checkCardDB(searchText);
  //if(check) {
  //  console.log('returning from cache');
  //  console.log('----------');
  //  console.log(check);
  //  console.log('----------');
  //  return cardBuilder(check, searchText, user)
  //
  //} else {
    console.log('fetching from deck brew')
    let result = HTTP.call("GET", "https://api.deckbrew.com/mtg/cards/typeahead", {
      params: params
    });
    console.log('----------');
    console.log(result.data);
    console.log('----------');
    return result.data;
  //}
}