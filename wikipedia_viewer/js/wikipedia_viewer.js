$(function(){
  $("#searchSubmit").click(function(){
  var rhtml = "";
  var searchStr=$("#input").val();
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+searchStr+"&callback=?";
  
  $.getJSON(url,function(resp){
    var rTitle = resp[1];
    var rDesc = resp[2];
    var rLink = resp[3];
    if(rTitle.length>0){
      $("#resultNum").html("We find <strong>"+ rTitle.length + "</stong> results about <strong>"+searchStr+"</stong>.")
      for(var i=0, len=rTitle.length;i<len;i++){
        rhtml+="<div><hr></div>"+"<h4><a target='_blank' href='" + rLink[i] + "'>" + rTitle[i] + "</a></h4>" + rDesc[i];
      }
      $("#results").html(rhtml);
    }else{
      $("#resultNum").html("We find nothing about <strong>"+searchStr+"</stong>.")
    }
  });
 });
});