const theinput = document.querySelector("#theinput")
const numbtns = document.querySelectorAll(".nums > button")
const opbtns = document.querySelectorAll(".ops > button")

let operator = "";
let highlight = false;
let dotted = false;
let pastNum = 0;
let equal = document.querySelector("#equal")

for (numbtn of numbtns) {
    numbtn.addEventListener ("click",(event)=>{
        pressnum(event.currentTarget.value);
    })
}

for (opbtn of opbtns){
    opbtn.addEventListener ("click", (event) => {
        pressop(event.currentTarget)
    })
}

equal.addEventListener ("click",()=>{
    if(operator && !highlight) {
        let res = operate (pastNum,Number(theinput.textContent),operator)
        displayNum(res,0);
    }
    unhighlight();
    operator = "";
})

function pressnum (value) {
    if (highlight&&value!=="-"){
        pastNum = Number(theinput.textContent);
        displayNum(0);
        dotted=false;
    }

    if(value!=="-") unhighlight();
    if(theinput.textContent==="ERROR") reset();

    if(theinput.textContent === "0"){
        if(value==="."){
            theinput.textContent = theinput.textContent+value
            dotted = true;
        }
        else if(value!=="-") theinput.textContent = value;
    } else {
        if(value==="."){
            if(!dotted) theinput.textContent = theinput.textContent+value
            dotted = true;
        } else if (value==="-"){
            if(theinput.textContent[0]==="-") theinput.textContent = theinput.textContent.substring(1);
            else theinput.textContent = "-"+theinput.textContent
        } else {
            theinput.textContent = theinput.textContent+value;
        }
    }
}

function pressop (target) {
    let value = target.value;
    if(theinput.textContent==="ERROR"||value === "cl") reset()
    else if (value === "back"){
        if(theinput.textContent.slice(-1)===".") dotted=false;
        if(theinput.textContent[0]==="-"){
            if (theinput.textContent.length>2) theinput.textContent=theinput.textContent.substring(0,theinput.textContent.length-1)
            else theinput.textContent = "0"
        } else {
            theinput.textContent=theinput.textContent.substring(0,theinput.textContent.length-1);
            if(theinput.textContent==="") theinput.textContent="0";
        }
        unhighlight();
    } else if (value === "sqrt"){
        if(Number(theinput.textContent)<0) theinput.textContent = "ERROR";
        else displayNum(Math.sqrt(Number(theinput.textContent)));
        unhighlight();
    } else {
        if (operator && !highlight) {
            let res = operate (pastNum,Number(theinput.textContent),operator)
            displayNum(res,res);
        }
        if(highlight && target.value === operator){
            unhighlight();
            operator = "";
            return;
        }
        unhighlight();
        target.classList.add("active");
        highlight=true;
        operator = value;
    }
}

function operate (a,b,operator) {
    if(operator==="mod") return b!=0? a%b: "ERROR";
    if(operator==="minus") return a-b;
    if(operator==="div") return b!=0? a/b: "ERROR";
    if(operator==="plus") return a+b;
    if(operator==="mult") return a*b;
}

function unhighlight () {
    for (opbtn of opbtns){ 
        opbtn.classList.remove("active");
    }
    highlight=false;
}

function displayNum (res,store) {
    res = Number(res.toFixed(8))
    dotted = Number.isInteger(res)? false: true;
    theinput.textContent = isNaN(res)? "ERROR":res;
    if(store!=undefined) pastNum = store;  
}

function reset () {
    dotted = false;
    theinput.textContent = "0";
    pastNum = 0;
    unhighlight();
    operator = "";
}