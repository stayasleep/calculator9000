let result;
let inputArray=[];
let displayArray=[];
let tempNum;
let tempNums;
let tempOp;
$(document).ready(initialize);

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
    let modeTextValues = ['Scientific','Standard'];
    let modeTextPointer = 0;
$('.science').click(function(){
    $('.calc-container').toggleClass('widebody');
    modeTextPointer=1-modeTextPointer;
    $(this).text(modeTextValues[modeTextPointer]);
})}

function numInput(){
    if (typeof inputArray[inputArray.length-1] === 'number'){
        clearEverything();
    }
    if (isNaN(inputArray[inputArray.length-1])){
        inputArray.push("");
        displayArray.push("");
    }
    tempNum = $(this).text();
    if(inputArray[inputArray.length-1].length<10){
        inputArray[inputArray.length-1]=inputArray[inputArray.length-1]+tempNum;
        displayArray[displayArray.length-1]=displayArray[displayArray.length-1]+tempNum;

    }
    tempNums = inputArray[inputArray.length-1];
    displayInputs();
}
function operationInput(){
    tempOp=$(this).text();
    if(inputArray[inputArray.length-1].length>10){
        parseFloat(inputArray[inputArray.length-1]).toExponential(5);
    }
    if (inputArray.length === 3 ){
        equalsHandler();
        displayArray.push(tempOp);
        inputArray.push(tempOp);
    } else if (inputArray.length === 0){
        return;
    } else if (isNaN(inputArray[inputArray.length-1])){
        displayArray[displayArray.length-1]=tempOp;
        inputArray[inputArray.length-1]=tempOp;
    } else{
        displayArray.push(tempOp);
        inputArray.push(tempOp);
    }
    displayInputs();
    $('.inp2').text("");
};
function equalsHandler(){
    let numOne=inputArray[0];
    let numTwo=inputArray[2];
    let operator = inputArray[1];
    if (inputArray.length === 2){
        numTwo = numOne;
    }
    if (typeof(inputArray[inputArray.length-1]) === 'number'){
        numTwo = tempNums;
        operator = tempOp;
    }
    eqResult(numOne,numTwo,operator);
}
function eqResult(num1,num2, operator){
    let num1 = parseFloat(num1);
    let num2 = parseFloat(num2);
    switch (operator){
        case "+":
            result=num1 + num2;
            inputArray=[];
            inputArray.push(result);
            displayArray=[];
            checkResult(result);
            displayArray.push(result);
            break;
        case "−":
            result=num1-num2;
            inputArray=[];
            inputArray.push(result);
            displayArray=[];
            checkResult(result);
            displayArray.push(result);
            break;
        case "÷":
            if (num2 === 0){
                $('#disp-ans').text("Invalid Operation");
                setTimeout(function(){
                    clearEverything();
                },900);
                return
            } else {
                result = num1/num2;
                inputArray=[];
                inputArray.push(result);
                displayArray=[];
                checkResult(result);
                displayArray.push(result);
            }
            break;
        case "×":
            result=num1*num2;
            inputArray=[];
            inputArray.push(result);
            displayArray=[];
            checkResult(result);
            displayArray.push(result);
            break;
        default:
            break;
    }
    $('#disp-ans').text(result);
}
function checkResult(res){
    if(res.toString().length>10){
        result = res.toExponential(5);
    }
}
function displayInputs(){
    if(inputArray.length === 3){
        $('.inp2').text(displayArray[displayArray.length -1]);

    }else {
       $('.inp').text(displayArray.join(""));
    }
}
function clearEverything(){
    inputArray=[];
    displayArray=[];
    result = null;
    tempNum = "";
    tempNums = "";
    tempOp = "";
    //tempDec="";
    $('.screen').text("");
}
function clearPrevious(){
    if(inputArray.length === 3){
        inputArray.pop(); //adjust input field
        displayArray.pop();//adjust display view
        $('.inp2').text(""); //clear the second input
        tempNums = inputArray[0]; //let temp var for #+ operation be reset
    }else if(inputArray.length >1){
        inputArray.pop();
        displayArray.pop();
        $('.inp2').text("");
    } else {
        clearEverything();
    }
    displayInputs();
}
function decimals(){
    let tempDec = $(this).text();
    if (inputArray.length === 2) {
        inputArray.push("0.");
        displayArray.push("0.");
    } else if(inputArray.length === 0) {
        inputArray.push("0.");
        displayArray.push("0.");
    }else if (inputArray.length === 1 && typeof inputArray[0] === "number"){
        //operation result is of type number, so we erase the board as if new numerical input
        clearEverything();
        inputArray.push("0.");
        displayArray.push("0.");
    }else if (inputArray[inputArray.length-1].indexOf(".") === -1){
        displayArray[displayArray.length-1]=displayArray[displayArray.length-1]+tempDec;
        inputArray[inputArray.length-1] = inputArray[inputArray.length-1]+tempDec;
    } else {
        return
    }
    displayInputs();
}
function plusMinus(){
    let strToNum = inputArray[inputArray.length-1];
    if (!isNaN(strToNum)){
        strToNum*=-1;
        displayArray[displayArray.length-1]=strToNum.toString();
        inputArray[inputArray.length-1]=strToNum.toString();
    }
    displayInputs();
}
function squareRoot(){
    if (!isNaN(inputArray[inputArray.length-1]) && parseFloat(inputArray[inputArray.length-1])>=0){
        inputArray[inputArray.length-1]=Math.sqrt(inputArray[inputArray.length-1]);
        displayArray[displayArray.length-1]=Math.sqrt(displayArray[displayArray.length-1]);
    }
    displayInputs();
}
