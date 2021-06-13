/*
  input form was found on Google
  http://jsfiddle.net/polaszk/1oyfxoor/
*/
function incrementValue(e) {
  e.preventDefault();
  var fieldName = $(e.target).data('field');
  var parent = $(e.target).closest('div');
  var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

  if (!isNaN(currentVal)) {
    parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
  } else {
    parent.find('input[name=' + fieldName + ']').val(0);
  }
}

function decrementValue(e) {
  e.preventDefault();
  var fieldName = $(e.target).data('field');
  var parent = $(e.target).closest('div');
  var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

  if (!isNaN(currentVal) && currentVal > 0) {
    parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
  } else {
    parent.find('input[name=' + fieldName + ']').val(0);
  }
}

// shirt 1
$('#shirt1_input').on('click', '.button-plus', function(e) {
  incrementValue(e);
});

$('#shirt1_input').on('click', '.button-minus', function(e) {
  decrementValue(e);
});

// shirt 2
$('#shirt2_input').on('click', '.button-plus', function(e) {
  incrementValue(e);
});

$('#shirt2_input').on('click', '.button-minus', function(e) {
  decrementValue(e);
});

// shirt 3
$('#shirt3_input').on('click', '.button-plus', function(e) {
  incrementValue(e);
});

$('#shirt3_input').on('click', '.button-minus', function(e) {
  decrementValue(e);
});

// shirt 4
$('#shirt4_input').on('click', '.button-plus', function(e) {
  incrementValue(e);
});

$('#shirt4_input').on('click', '.button-minus', function(e) {
  decrementValue(e);
});

// shirt 4
$('#shirt5_input').on('click', '.button-plus', function(e) {
  incrementValue(e);
});

$('#shirt5_input').on('click', '.button-minus', function(e) {
  decrementValue(e);
});
