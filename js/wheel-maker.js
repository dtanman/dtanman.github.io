var paceColors = [
  '#64001B', // pldt colors
  '#F80010',
  '#A3001B',
  '#E10020',
  '#009D45', // smart colors
  '#74D039',
  '#00B54C',
  '#28C74C'
];

var paceColorsAlternating = [
  '#28C74C',
  '#64001B',
  '#009D45',
  '#F80010',
  '#74D039',
  '#A3001B',
  '#00B54C',
  '#E10020'
];

// list of colors and names to use.
// have to make this dynamic in the future!
// var colors = ['#ff8800', '#5F4B8B', '#44ff44', '#6495ed', '#0000ff', '#885500', '#000077', '#ffff56', '#ff0000', '#ffffff'];
var names = [
  "Prescott J. Owen",
  "Halla V. Slater",
  "Aretha A. Sosa",
  "Zephania G. Greer",
  "Amanda M. Edwards",
  "Norman W. Kane",
  "Erica T. Berg",
  "Sylvia J. Oliver",
  "Micah W. Carlson",
  "Stone L. Rosario",
  "Briar B. Benjamin",
  "Jillian W. Santiago",
  "Gary J. Bruce",
  "Unity W. Boyer",
  "Chelsea N. Snow",
  "Wynne V. Stone",
  "Hasad R. Hayes",
  "Maggy L. Mcgowan",
  "Jelani M. Leach",
  "Petra X. Kirby",
  "Lars B. Mack",
  "Emily G. Flowers",
  "Tyrone B. Graves",
  "Peter Z. Mcfadden",
  "Damian C. Mccormick",
  "Katell Z. Ortega",
  "Chaim R. Douglas",
  "Ruby G. Whitehead",
  "Ivana M. Shelton",
  "Dustin D. Strickland",
  "Alyssa L. Howe",
  "Portia L. Boyer",
  "Jarrod V. Garcia",
  "Anne Y. Daniels",
  "McKenzie K. Mcgee",
  "Iola Y. Wood",
  "Fatima I. Powell",
  "Lawrence H. Velez",
  "Henry D. Rosales",
  "Indira U. Petersen",
  "Paki F. Haney",
  "Ignatius H. Bailey",
  "Alfonso T. Mendoza",
  "Dexter M. Bowman",
  "Peter N. Neal",
  "Kimberley P. Crane",
  "Laith O. Ramos",
  "Preston P. Norton",
  "McKenzie H. Snider",
  "Leslie Z. Guy",
  "Stella F. Raymond",
  "Patricia B. Roman",
  "Adara Y. Sanders",
  "Darrel B. Duncan",
  "Jack R. Paul",
  "Cora O. Wong",
  "Iona Q. Crane",
  "Chloe H. Goff",
  "Channing L. Nicholson",
  "Kenneth Y. Barr",
  "Sydney P. Morin",
  "Aurelia N. Jackson",
  "Abra L. Sykes",
  "Tobias C. Orr",
  "Burton B. Riggs",
  "Jasmine V. Palmer",
  "Quentin H. Foreman",
  "Edward J. Bender",
  "Jelani W. Castro",
  "Yuli Z. Carrillo",
  "Doris W. Alvarado",
  "Kevyn Q. Swanson",
  "Jolene M. Bernard",
  "Kaden Q. Conrad",
  "Paki L. Franklin",
  "Hermione Z. Frazier",
  "Bell J. Talley",
  "Odette U. Cain",
  "Lisandra G. Thornton",
  "Delilah K. Estes",
  "Tyrone Q. Roman",
  "Chastity F. Washington",
  "Idona D. Walls",
  "Jenna O. Davenport",
  "Silas X. Vargas",
  "Caleb A. Powers",
  "Meredith C. Ryan",
  "Drew I. Bates",
  "Deirdre T. Vance",
  "Coby C. Talley",
  "Cyrus W. Bates",
  "Nelle Z. Best",
  "Virginia Q. Jarvis",
  "Jennifer J. Peck",
  "Daniel E. Shannon",
  "Erin Q. Case",
  "Sarah T. Barnes",
  "Inez W. Goff",
  "Alexander B. Rocha",
  "Honorato L. Newton",
  "Knox V. Willis",
  "Arsenio Z. Green",
  "Abra K. Henson",
  "Nita S. Rich",
  "Lavinia H. Turner",
  "Herrod P. Barton",
  "Joel D. Durham",
  "Flavia J. Saunders",
  "Avram Y. Parker",
  "Fritz J. Morales",
  "Madison P. Foley",
  "Charlotte S. James",
  "Renee V. Haley",
  "Shaine L. Weber",
  "Kiona B. Marks",
  "Phoebe H. Barr",
  "Amber V. Banks",
  "Jordan K. Roman",
  "Desirae A. Garrison",
  "Lana E. Macias",
  "Herrod O. Jenkins",
  "Meghan F. Park",
  "Hayden X. Jones",
  "Daniel H. Hodge",
  "Lee L. Ferrell",
  "Leonard G. Huffman",
  "Wynne H. Tucker",
  "Iliana C. Holt",
  "Wesley X. Campbell",
  "Roanna N. Herman",
  "Naida N. Vance",
  "Sam P. Person",
  "Andre T. Tan",
];

var colors = makeColorList(names.length);
var intervals = [];
var numbers = prepareWheelNumbers(names.length);

// prepare the segments
var segments = [];
for(var i=0; i<colors.length; i++) {
  segments.push({
    'fillStyle'      : colors[i],
    'text'           : (numbers[i]+1)+'',
    'textFontStyle'  : 'Raleway',
    'textFontWeight' : 2,
    'textFontSize'   : 10,
    'textFillStyle'  : 'white'
  });
}

// animation of wheel
var animation = {
  'type'             : 'spinToStop',
  'duration'         : 10,
  'spins'            : 3,
  'callbackFinished' : 'alertPrize()'
};

var pointerGuide = {
  'display'     : true,
  'strokeStyle' : 'black',
  'lineWidth'   : 1
};

// prepare the wheel
var theWheel = new Winwheel({
  'canvasId'     : 'myCanvas',
  'lineWidth'    : 0.25,
  'numSegments'  : segments.length,
  'textAlignment': 'outer',
  'textMargin'   : 10,
  'segments'     : segments,
  'animation'    : animation,
  'pointerGuide' : pointerGuide
});

var labelUpdater;

function redraw() {
  theWheel.draw();
}

function resetWheel()
{
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.

    intervals.forEach(clearInterval);
    document.getElementById('aboveWheelValue').innerHTML = '???';
    clearInterval(labelUpdater);
}

function spin2() {
  theWheel.startAnimation();
  labelUpdater = setInterval(updateObject, 10);
}

function updateObject() {
  // document.getElementById('aboveWheelValue').innerHTML = names[parseInt(theWheel.getIndicatedSegment().text)-1];
  document.getElementById('aboveWheelValue').innerHTML = '# '+theWheel.getIndicatedSegment().text;
}

function makeColorList(length) {
  var colors = [];
  for(let i=0; i<length; i++)
    colors.push(paceColorsAlternating[i%(paceColorsAlternating.length+1)]);
    // colors.push(paceColors[Math.floor(Math.random()*10)]);
  return colors;
}

function prepareWheelNumbers(length) {
  let array = []
  for(let i=0; i<length; i++)
    array.push(i);

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function alertPrize() {
  alert('Congratulations, '+names[parseInt(theWheel.getIndicatedSegment().text)-1]+'!');
}
