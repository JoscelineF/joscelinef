window.onload = function(){
  var monList = document.getElementsByTagName('td');
  var display = document.getElementById('display');
  var holidayMsg = display.getElementsByTagName('p')[0];
  var mon = display.getElementsByTagName('strong')[0];
  var holidayArr =[
    ['JAN','- The first day of January: 1 January'],
    ['FEB','- Lunar New Year: 16 February to 19 February'],
    ['MAR','- Good Friday: 30 March <br> - The day following Good Friday:	31 March'],
    ['APR','- Easter Monday: 2 April <br> - Ching Ming Festival: 5 April'],
    ['MAY','- Labour Day: 1 May <br> - The Birthday of the Buddha: 22 May'],
    ['JUN','- Tuen Ng Festival: 18 June'],
    ['JUL','- The day following Hong Kong Special Administrative Region Establishment Day: 2 July'],
    ['AUG','None'],
    ['SEP','- The day following the Chinese Mid-Autumn Festival: 25 September'],
    ['OCT','- National Day: 1 October <br> - Chung Yeung Festival: 17 October'],
    ['NOV','None'],
    ['DEC','- Christmas Day: 25 December <br> - The first weekday after Christmas Day: 26 December']
  ];
  for(let i=0;i<monList.length;i++){
    monList[i].onmouseover = function(){
      for(var j = 0; j < monList.length; j++){ monList[j].className = "";}
      this.className ='current';
      holidayMsg.innerHTML = holidayArr[i][1];
      mon.innerHTML = holidayArr[i][0];
    };
  }
}