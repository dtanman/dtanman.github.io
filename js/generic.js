var names = ['Nick', 'Andre', 'Mark', 'Judy', 'Brent', 'Nicole', 'Rick', 'Neil', 'Cecil', 'Bevs'];
var labelUpdater;

function randFromArray() {
  return Math.floor((Math.random()*100)%names.length);
}

function testing() {
  document.getElementById('genericWinner').innerHTML = names[randFromArray()]
  clearInterval(labelUpdater);
}

function spin2() {
  theWheel.startAnimation();
  labelUpdater = setInterval(updateObject, 100);
}

function updateObject() {
  document.getElementById('genericWinner').innerHTML = theWheel.getIndicatedSegment().text;
}
