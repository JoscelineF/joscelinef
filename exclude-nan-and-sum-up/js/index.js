$(function(){
  var oInput = $('input');
  var oBtn = $('.btn');
  var oSum =$('#sum');
  var purInput;

  oBtn.click(function(){
    var sum = 0;
    purInput = oInput.val().replace(/[^(\d|,)]+/g,''); 
    var oValue = purInput.split(",");
   for(var i=0;i<oValue.length;i++){
     if(oValue[i]!=''){
      sum+=parseInt(oValue[i]);}
    }

    oSum.html(sum);
  });
});