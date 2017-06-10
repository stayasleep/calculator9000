$(document).ready(initialize);

var result;
var inputArray=[];

function initialize(){
    $('.operand').click(numInput);
    $('.operator').click(operationInput);
    $('.equals').click(equalsHandler);
    $('.clear-every').click(clearEverything);
    $('.clear-field').click(clearPrevious);
    $('.decpoint').click(decimals);
    $('.plusmin').click(plusMinus);
    $('.sqroot').click(squareRoot);
    //remember to work
    scienceMode();
}

function scienceMode(){
    var modeTextValues = ['Scientific','Standard'];
    var modeTextPointer = 0;
$('.science').click(function(){
    $('.calc-container').toggleClass('widebody');
    modeTextPointer=1-modeTextPointer;
    $(this).text(modeTextValues[modeTextPointer]);
})};

function numInput(){
    if (typeof inputArray[inputArray.length-1] === 'number'){
        clearEverything();
    }
    if (isNaN(inputArray[inputArray.length-1])){
        inputArray.push("");
    }
    tempNum = $(this).text();
    inputArray[inputArray.length-1]=inputArray[inputArray.length-1]+tempNum;
    displayInputs();
}
function operationInput(){
    tempOp=$(this).text();
    if (inputArray.length === 3 ){
        equalsHandler();
        inputArray.push(tempOp);
    } else if (inputArray.length === 0){
        return;
    } else if (isNaN(inputArray[inputArray.length-1])){
        inputArray[inputArray.length-1]=tempOp;
    } else{
        inputArray.push(tempOp);
    }
    displayInputs();
};
function equalsHandler(){
    var numOne=inputArray[0];
    var numTwo=inputArray[2];
    var operator = inputArray[1];
    if (inputArray.length === 2){
        numTwo = numOne;
    }
    if (typeof(inputArray[inputArray.length-1]) === 'number'){
        numTwo = tempNum;
        operator = tempOp;
    }
    eqResult(numOne,numTwo,operator);
}
function eqResult(num1,num2, operator){
    var num1 = parseFloat(num1);
    var num2 = parseFloat(num2);
    switch (operator){
        case "+":
            result=num1 + num2;
            inputArray=[];
            inputArray.push(result);
            break;
        case "−":
            result=num1-num2;
            inputArray=[];
            inputArray.push(result);
            break;
        case "÷":
            if (num2 === 0){
                $('#disp-ans').val("Invalid Operation");
                setTimeout(function(){
                    clearEverything();
                },900);
                return
            } else {
                result = num1/num2;
                inputArray=[];
                inputArray.push(result);
            }
            break;
        case "×":
            result=num1*num2;
            inputArray=[];
            inputArray.push(result);
            break;
        default:
            break;
    }
    if(result>99999999){
        result = result.toExponential(5);
    }
    // result = result.toExponential(3);
    $('#disp-ans').val(result);
}
function displayInputs(){
    $('#disp-inp').val(inputArray.join(""));
}
function clearEverything(){
    inputArray=[];
    result = null;
    tempNum = "";
    tempOp = "";
    tempDec="";
    $('#disp-inp').val("");
    $('#disp-ans').val("");
}
function clearPrevious(){
    if (inputArray.length >1){
        inputArray.pop();
    } else {
        clearEverything();
    }
    displayInputs();
}
function decimals(){
    var tempDec = $(this).text();
    if (inputArray.length === 2) {
        inputArray.push("0.");
    } else if (inputArray[inputArray.length-1].indexOf(".") === -1){
        inputArray[inputArray.length-1] = inputArray[inputArray.length-1]+tempDec;
    } else {
        return
    }
    displayInputs();
}
function plusMinus(){
    var strToNum = inputArray[inputArray.length-1];
    if (!isNaN(strToNum)){
        strToNum*=-1;
        inputArray[inputArray.length-1]=strToNum.toString();
    }
    displayInputs();
}
function squareRoot(){
    if (!isNaN(inputArray[inputArray.length-1]) && parseFloat(inputArray[inputArray.length-1])>=0){
        inputArray[inputArray.length-1]=Math.sqrt(inputArray[inputArray.length-1]);
    }
    displayInputs();
}
//format the results for later time