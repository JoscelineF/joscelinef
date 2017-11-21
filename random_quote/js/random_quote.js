$(function() {
  function randomColor() {
    var rColor1, rColor2, rGradient;
    rColor1 =
      "#" +
      Math.random()
        .toString(16)
        .slice(2, 8);
    rColor2 =
      "#" +
      Math.random()
        .toString(16)
        .slice(2, 8);
    rGradient = "linear-gradient(to right," + rColor1 + "," + rColor2 + ")";
    return [rGradient,rColor1,rColor2];
  }
  $("#new-quote").on("click", function() {
    $("body").css("background", randomColor()[0]);
    //$(".button").css("background", randomColor()[2]);
    $("i,.button").css("color", randomColor()[1]);
    getQuote();
  });
  var content="";
	var author="";
	var getQuote = function(){
		$.getJSON("https://sslapi.hitokoto.cn/?encode=json",function(json){
			content = json["hitokoto"];
			author = json["from"];
      $(".quote-text,.quote-author").animate({
          opacity: 0
        }, 300,
        function() {
          $(this).animate({
            opacity: 1
          }, 300);
			$(".text").html(content);
			$(".author").html(author);
             });
  	});
	}
  //end
  getQuote();
  $('#tweet-quote').on('click', function() {  window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + content + '" ' + author));    
  });
  $('#tumblr-quote').on('click', function() {  window.open('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(author)+'&content=' + encodeURIComponent(content)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');    
  });
   $('#weibo-quote').on('click',  
  function(event) {          window.open('http://v.t.sina.com.cn/share/share.php?title=' + encodeURIComponent(content + ' by ' + author));  
  })  
  
  $("#qq-quote").on("click",function(){
		console.log(content+author);
		window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http://www.baidu.com&desc='+content+'——'+author+'&title=吟游佳句&summary=我发现了一句很漂亮的话，快来看看吧&pics=&site=bshare');
	});
});
