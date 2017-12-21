$(function(){
  // default time length
  var workLen = 25
  var breakLen = 5;
  var status = 1; // indicates the clock status, 1 is work pause, 2 is break pause,  3 is working, 4 is in break
  var sec = workLen * 60;// record remaining time in seconds
  var perc = 0; // percent of fill height
  
  // click or touch the clock to change the status
  $(document.body).on("touchstart click",".clock",function(event){
    event.preventDefault(); // prevent double click on mobile
    if(status === 1){
      status = 3;
      $("#status-text").html("Work"); 
    }else if(status === 3){
      status = 1;
    }else if(status === 2){
      status = 4;
    }else if(status === 4){
      status = 2;
    }
    changeTime();
  });
  
  // time control setting
  $(document.body).on("touchstart click",function(event){
    event.preventDefault();
    // break-minus button
    if(event.target.id==="break-minus"){
       if(status!==1 && status!==2){
            return; // if not in pause status, could not adjust time setting
          }
          breakLen--;
          if(breakLen<1){
            breakLen=1;
          }
          $("#breakLen").html(breakLen);
          if(status===2){
            // change breakLen will also change break seconds len in break pause
            sec = breakLen*60;
          }
          showTime(breakLen,2);
        }
    // break-plus button
    else if(event.target.id==="break-plus"){
       if(status!==1 && status!==2){
            return;
          }
          breakLen++;
          if(breakLen>30){
            breakLen=30;
          }
          $("#breakLen").html(breakLen);
          if(status===2){
            // change breakLen will also change break seconds len in break pause
            sec = breakLen*60;
          }
          showTime(breakLen,2);
        }
    //work-minus button
    else if(event.target.id==="work-minus"){
       if(status!==1 && status!==2){
            return;
          }
          workLen--;
          if(workLen<1){
            workLen=1;
          }
          $("#workLen").html(workLen);
          if(status===1){
            // change workLen will also change work seconds len in work pause
            sec = workLen*60;
          }
          showTime(workLen,1);
        }
    //work-plus button
    else if(event.target.id==="work-plus"){
       if(status!==1 && status!==2){
            return;
          }
          workLen++;
          if(workLen>90){
            workLen=90;
          }
          $("#workLen").html(workLen);
          if(status===1){
            // change workLen will also change work seconds len in work pause
            sec = workLen*60;
          }
          showTime(workLen,1);
        }
       });
    
  // showTime(): only change time when status is pause, hence need to check te status & the mm:ss to show 
  var showTime = function(min,checkStatus){
    if(checkStatus !== status){
       return;
    }
    var show ="";
    if(min>60){
      show += parseInt(min/60)+":";
      min = min%60;
    }
    if(min<10){
      show += "0";
    }
    show += min +":00";
    $('#time').html(show);
  };
       
 //changeTime(): show remaining seconds when in work or break
  var changeTime = function(){
    var tmp = sec;
    if(status===1||status===2){
      return;
    }
    if(sec===0){
      if(status===3){
        status = 4;
        sec = breakLen*60;
        $("#status-text").html("Break");
      }else if(status===4){
        status = 3;
        sec = workLen*60;
        $("#status-text").html("Work"); 
      }
    }
    // calculate and formulate the remaining time
    var remainTime = "";
    if(tmp>=3600){
      remainTime += parseInt(tmp/3600)+":";
      tmp = tmp%3600;
    }
    if(tmp<600){
       remainTime += "0";
    }
    remainTime += parseInt(tmp/60)+":";
    tmp = tmp%60;
    if(tmp<10){
       remainTime += "0";
    }
    remainTime += tmp;
    $("#time").html(remainTime);
    //change background color and fill
    if(status===3){
      // working
      $('#fillPerc').css('background-color','#6FDEAA');
      $(document.body).css('background-color','#CF4C4C');
      $('.break,.work').css('border','3px dotted #6FDEAA');
      $('.control p').css('color','#6FDEAA');
      $('.clock').addClass("clockWork");
      if(sec===0){
        perc = 100;
      }else{
        perc = 100*(workLen*60-sec)/(workLen*60);
      }
      $('#fillPerc').css('height',perc+"%");
    };
    if(status===4){
      // breaking
      $('#fillPerc').css('background-color','#CF4C4C');
      $(document.body).css('background-color','#6FDEAA');
      $('.break,.work').css('border','3px dotted #CF4C4C');
      $('.control p').css('color','#CF4C4C');
      $('.clock').addClass("clockBreak");
      if(sec===0){
        perc = 100;
      }else{
        perc = 100*(breakLen*60-sec)/(breakLen*60);
      }
      $('#fillPerc').css('height',perc+"%");
    };
    // end of change bgcolor and fill
    sec--;
    setTimeout(changeTime,1000);
  };
  
});