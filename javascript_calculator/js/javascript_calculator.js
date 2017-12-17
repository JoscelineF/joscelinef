$(function(){
	var num ="";
	var num2 =""; // for saving the first number input
	var operator ="";
	var answer = $('#answer');
	
	// clear button
	$("[value='ac']").click(function(){
		num ="";
		num2 ="";
		operator="";
		answer.text("0");
	});

	// delete button
	$("[value='del']").click(function(){
		if(num2.length>0){
			num = num2;
			num2 ="";
			answer.text("0");
		}else if(num2.length===0 && operator !==""){
			operator = "";
			answer.text("0");
		}else{
			num ="";
			operator ="";
			num2 ="";
			answer.text("0"); // clear all
		}		
		//console.log("num: " + num);
		//console.log("num2: " + num2);
		//console.log("op: " + operator);
	});

	// +/- change
	$("[value='+/-']").click(function(){
		num *= -1;
		answer.text(num);
	});

	// % operation
	$("[value='%']").click(function(){
		num *= 0.01;
		answer.text(num);
	});

	// number entry
	$(".numBtn,#zeroBtn").click(function(){
		// prevent extra 0 at the start
		if($(this).text()==="0"){
			(num==="0")?num=num:num+="0";
		}else{
		num += $(this).text();	
		}
		//prevent number input length>9	
		if(num.length>9){
			num="";
			answer.html("<div style='font-size:20px;'>Digit Limit Met</div>");
		}else{
			answer.text(num);
		}		
	});	

	// prevent extra dot || input is 0. if the initial entry is a dot
	$("#dotBtn").click(function(){	
		if(num===""){
			num += "0.";
		}			
		(num.indexOf(".")===-1)?num+=$(this).text():num=num;
		answer.text(num);
	});

	// operator entry
	$(".operators").click(function(){
		operator = $(this).attr("value");		
		num2 = num;
		num ="";			
	});

	// calculation
	$("#equalBtn").click(function(){		
		if(operator === "+"){
			num = (parseFloat(num2) + parseFloat(num));
		}
		else if(operator === "-"){
			num = (parseFloat(num2) - parseFloat(num));
		}
		else if(operator === "*"){
			num = (parseFloat(num2) * parseFloat(num));
		}
		else if(operator === "/"){
			num = (parseFloat(num2) / parseFloat(num));
		}		
		num = num.toFixed(2);
		if(num.length>9){
			var roundNum = parseFloat(num);
			num = roundNum.toPrecision(3);
		}
		answer.text(num);
		num="";
		num2="";
	});
});
