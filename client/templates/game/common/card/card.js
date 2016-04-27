
GameState = new ReactiveVar([]);

Template.card.events({
  'click .card':(e)=>{
    console.log('Click card');
  }
});

Template.card.helpers({
  rotate: (id) =>{
    console.log(id);
    let arr = GameState.get();
    console.log(arr);
    if(_.contains(arr, id)){
      return 'rotate';
    }
  }
});