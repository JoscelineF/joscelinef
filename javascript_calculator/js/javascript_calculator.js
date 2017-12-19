$(function(){
	var num ="";
	var num2 ="";
	var operator ="";
	var answer = $('#answer');
	//var eqBtn = false;

	$(document.body).on("touchstart click", "button", function(event){
		// prevent conflict of touchstart & click events
		 event.preventDefault();
		// clear button
		if($(this).attr('value')==="ac"){
			num ="";
			num2 ="";
			operator="";
			answer.text("0");
		}// delete button
		else if($(this).attr('value')==="del"){
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
		}// +/- change
		else if($(this).attr('value')==="+/-"){
			num *= -1;
			answer.text(num);
		}// % operation
		else if($(this).attr('value')==="%"){
			num *= 0.01;
			answer.text(num);
		}// number entry
		else if($(this).attr('class')==="numBtn"||$(this).attr('id')==="zeroBtn"){
			if($(this).text()==="0"){
				// prevent extra 0 at the beginning
				(num==="0")?num=num:num+="0"; 
			} // remove the initial 0 once 1-9 input
			else if(num==="0"&&$(this).text()!=="0"){
				num = "" +$(this).text();	
			}
			else{
				num += $(this).text();	
			}
			//prevent number input length>9	
			if(num.length>9){
				num="";
				answer.html("<div style='font-size:20px;'>Digit Limit Met</div>");
			}else{
				answer.text(num);
			}		
		}// prevent extra dot || input is 0. if the initial entry is a dot
		else if($(this).attr('id')==="dotBtn"){
			if(num===""){
			num += "0.";
			}			
			(num.indexOf(".")===-1)?num+=$(this).text():num=num;
			answer.text(num);
		}// operator entry
		else if($(this).attr('class')==="operators"){
			if(num!==""&&operator!==""){
				calc();
				num = answer.text();
				num2= num;
				operator = $(this).attr("value");
				num = "";
				console.log("num: " + num);
				console.log("num2: " + num2);
				console.log("op: " + operator);	
			}else{
				operator = $(this).attr("value");		
				num2 = num;
				num ="";					
			}
		}// calculation
		else if($(this).attr('id')==="equalBtn"){
			calc();
		}

		function calc(){		
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
	}
	});
/*
	// clear button
	$("[value='ac']").on("click touchstart",function(){
		num ="";
		num2 ="";
		operator="";
		answer.text("0");
	});

	// delete button
	$("[value='del']").on("click touchstart",function(){
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
	$("[value='+/-']").on("click touchstart",function(){
		num *= -1;
		answer.text(num);
	});

	// % operation
	$("[value='%']").on("click touchstart",function(){
		num *= 0.01;
		answer.text(num);
	});

	// number entry
	$(".numBtn,#zeroBtn").on("click touchstart",function(){
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
	$("#dotBtn").on("click touchstart",function(){	
		if(num===""){
			num += "0.";
		}			
		(num.indexOf(".")===-1)?num+=$(this).text():num=num;
		answer.text(num);
	});

	// operator entry
	$(".operators").on("click touchstart",function(){
		// for sequential calculations
		if(num!==""&&operator!==""){
			calc();
			num = answer.text();
			num2= num;
			operator = $(this).attr("value");
			num = "";
			console.log("num: " + num);
			console.log("num2: " + num2);
			console.log("op: " + operator);	
		}else{
		operator = $(this).attr("value");		
		num2 = num;
		num ="";					
		}
	});

	// calculation
	$("#equalBtn").on("click touchstart",calc);

	function calc(){		
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
	} */
});
