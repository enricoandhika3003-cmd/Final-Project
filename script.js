var credit_button = document.getElementById("credit");
var debit_button = document.getElementById("debit");

credit_button.addEventListener('click', function(){
	var current_balance_el = document.getElementById('balance');
	var entered_amount_el = document.getElementById("amount").value;
	var message_el = document.getElementById('message');
	var account_balance = parseInt(current_balance_el.innerText) + parseInt(entered_amount_el);
	if(!entered_amount_el){
		message_el.innerText = "Please enter amount.";
		message_el.style.color = "#ff0000";
	}
	else{
		if(parseInt(entered_amount_el) > 0 ){
			current_balance_el.innerText = parseInt(account_balance); 
			message_el.innerText = "";
		}
		else{
			message_el.innerText = "Please enter amount greater than 0";
			message_el.style.color = "#ff0000";
		}
	}
	entered_amount_el.value = "0"; 
});

debit_button.addEventListener('click', function(){
	var current_balance_el = document.getElementById('balance');
	var entered_amount_el = document.getElementById("amount").value;
	var message_el = document.getElementById('message');
	var account_balance = parseInt(current_balance_el.innerText) - parseInt(entered_amount_el);
	
	if(!entered_amount_el){
		message_el.innerText = "Please enter amount.";
		message_el.style.color = "#ff0000";
	}
	else if(parseInt(entered_amount_el) > parseInt(current_balance_el.innerText)){
		message_el.innerText = "You don't have balance.Please enter lesser amount.";
		message_el.style.color = "#ff0000";
	}
	else{
		current_balance_el.innerText = parseInt(account_balance);  
		message_el.innerText = "";
	}
	entered_amount_el.value = "0"; 
});

function getHistory(){
    return document.getElementById("history-value").innerText;
}

function printHistory(num){
    document.getElementById("history-value").innerText=num;
}
function getOutput(){
    return document.getElementById("output-value").innerText;
}
function printOutput(num){
    if(num==""){
        document.getElementById("output-value").innerText=num;
    }
    else{
        document.getElementById("output-value").innerText=getFormattedNumber(num);
    }
}
function getFormattedNumber(num){
    if(num=="-"){
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}
function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
    operator[i].addEventListener('click',function(){
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id=="backspace"){
            var output=reverNumberFormat(getOutput()).toString();
            if(output){
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        }
        else{
            var output = getOutput();
            var history = getHistory();
            if (output == "" && history != "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if (output != "" || history != "") {
                output = output == "" ? output : reverseNumberFormat(output);
                history = history + output;
                if (this.id == "=") {
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        var output = reverseNumberFormat(getOutput());
        if (output != NaN) {
            output = output + this.id;
            printOutput(output);
        }
    });
}