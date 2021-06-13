// <p>
//   Are you sure you want to buy: <br>
//     <span id="bai" class="big_text">1&nbsp;</span>Bái,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//     <span id="hei" class="big_text">2&nbsp;</span>Hēi,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//     <span id="zong" class="big_text">3&nbsp;</span>Zōng,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//     <span id="hong" class="big_text">4&nbsp;</span>Hóng,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//     <span id="zhe" class="big_text">5&nbsp;</span>Zhě,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//     <br><br>
//   For a total of: <br>
//     <span class="big_text">₱69,000.00?</span>
// </p>

let params = new URLSearchParams(window.location.search);
let purchases = [
  parseInt(params.get('bai')),
  parseInt(params.get('hei')),
  parseInt(params.get('zong')),
  parseInt(params.get('hong')),
  parseInt(params.get('zhe')),
];

let prices = [1200, 1900, 3000, 8000, 69000];
let total = 0;

for(let i=0; i<purchases.length; i++)
  total += purchases[i] * prices[i];

total_prettified = (total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

let new_body = '<p>Are you sure you want to buy: <br>';

if(total==0) {
  new_body+= '<span class="big_text">Nothing???</span> <br><br><br> Please go back and buy something to help feed my family :('
} else {
  if(purchases[0] > 0) new_body += `<span id="bai" class="big_text">${purchases[0]}&nbsp;</span>Bái,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n`;
  if(purchases[1] > 0) new_body += `<span id="hei" class="big_text">${purchases[1]}&nbsp;</span>Hēi,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n`;
  if(purchases[2] > 0) new_body += `<span id="zong" class="big_text">${purchases[2]}&nbsp;</span>Zōng,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n`;
  if(purchases[3] > 0) new_body += `<span id="hong" class="big_text">${purchases[3]}&nbsp;</span>Hóng,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n`;
  if(purchases[4] > 0) new_body += `<span id="zhe" class="big_text">${purchases[4]}&nbsp;</span>Zhě,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n`;
  new_body += '<br><br>';
  new_body += 'for a total of: <br>';

  // code from https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
  new_body += `<span class="big_text">₱${total_prettified}?</span>`
  new_body += '</p>';
}

let new_footer = '';

if(total>0) {
  new_footer += "<a href='done.htm'>Hell yeah, I'm sure!</a>";
}

document.getElementById('body').innerHTML = new_body;
document.getElementById('footer').innerHTML = new_footer;
