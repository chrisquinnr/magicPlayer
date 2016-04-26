
GameState = new ReactiveVar([]);

Template.card.events({
  'click .card':(e)=>{
    let id = e.currentTarget.id;
    let gs = GameState.get();
    console.log(gs);
    if(gs[id]){
      var index = gs.indexOf(id);
      gs.splice(index, 1);
    } else {
      gs.push(id)
    }
    GameState.set(gs)
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