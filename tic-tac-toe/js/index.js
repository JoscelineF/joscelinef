$(function(){
  var userChoice = "";
  var aiChoice = "";
  var whosTurn = 1; // 1 for player, 0 for computer
  var count = 0;
  var grids = [
        ['','',''],
        ['','',''],
        ['','','']
  ];
  
  // get player's choice
  $(document.body).on('touchstart click',"#choose-panel span",function(e){
    e.preventDefault();
    userChoice = $(this).text();
    if(userChoice !== ""){
      userChoice==="X"?aiChoice="O":aiChoice="X";
      }
    $('#choose-panel').fadeOut();
    $('div.grid').fadeIn(3000);
    $('#display-panel').fadeIn(2000);
    //console.log(userChoice + " " + aiChoice);
  });
  
  // game start
  if(whosTurn === 1){ 
    // record user's steps
    $(document.body).on('touchstart click', ".grid",function(e){
      e.preventDefault();
     // checkWinOrNot();
      var userStep = $(this);
      userStep.prop("disabled", false);       
      userStep.html(userChoice);      
      // update grids array
      var index1 = userStep.attr('class').charAt(9);
      var index2 = userStep.attr('class').charAt(11);
      grids[index1][index2]=userChoice;
      
      $('.grid').prop("disabled", true); 
      count++;
      whosTurn = 0;
      $('#turnInfo').html("AI is thinking..");
     });
  }else{
    // record AI's step
    aiStep = aiMove();
    grids[aiStep.i][aiStep.j] = aiChoice;
    $('.grid').prop("disabled", false); 
    let aiGrid = $('.grid'+ aiStep.i + '-' + aiStep.j)
    setTimeout(()=>{
      aiGrid.html(aiChoice);
      $('.grid').prop("disabled", true); 
      $('#turnInfo').html("It's your turn.");  
      count++;
      whosTurn = 1;
    },1000);
    checkWinOrNot();
  }
  // check winner
  
});
