export function checkCardDB (searchtext){
  let res = Cards.find({name:searchtext}).fetch();
  if(res.length < 1){
    console.log('no match in cache');
    return false;
  }

  if(res.length === 1){
    console.log('Found match in cache');
    return res;
  }

 if(res.length > 1) {
   // lots of editions;
   return res;
 }

}