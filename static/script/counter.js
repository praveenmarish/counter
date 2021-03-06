//Initiate the timer
function initiatedown(){
    document.getElementById("count").disabled=true
    var val=document.getElementById("time").value
    countDown(val) 
    
}

//Add 0's to the begining for better look
function pad(num) {
  if (num<10){
    return "0"+num
  }
  else{
      return num
  }
}
//Start the clock
function countDown(val){
    document.getElementById("add").disabled=false
    document.getElementById("reduce").disabled=false
    
    x=setInterval(() => {
        var min=parseInt(val/60)
        var sec=val%60
        val -= 1
        document.getElementById("clock").innerHTML=pad(min)+":"+pad(sec)
        if (val<0){
            clearInterval(x)
            document.getElementById("clock").innerHTML='00:00'
            document.getElementById("count").disabled=false
            document.getElementById("add").disabled=true
            document.getElementById("reduce").disabled=true
        }
    }, 1000)
} 
//Add more time to clock
function add(){
    clearInterval(x)
    var val=document.getElementById("clock").innerText
    var sec=val.split(":")[1]
    var min=val.split(":")[0]
    var addedVal=document.getElementById("time").value
    countDown((parseInt(min)*60)+parseInt(sec)+parseInt(addedVal))
}
//Reduce time from clock
function reduce(){
    clearInterval(x)
    var val=document.getElementById("clock").innerText
    var sec=val.split(":")[1]
    var min=val.split(":")[0]
    var reduceVal=document.getElementById("time").value
    countDown((parseInt(min)*60)+parseInt(sec)-parseInt(reduceVal))
}

function intiateUp(){
    var operation=document.getElementById("Start")
    if (operation.value == "Start"){
        document.getElementById("Stop").disabled=false
        countUp(0)
    }
    else{
        clearInterval(y)
        countUp(0)
    }
}

function countUp(time){
    document.getElementById("Start").value="Reset"
        y=setInterval(()=>{
            var min=parseInt(time/60)
            var sec=time%60
            time += 1
            document.getElementById("upclock").innerHTML=pad(min)+":"+pad(sec)
        },1000)
}

function stop(){
    clearInterval(y)
    document.getElementById("Resume").disabled=false
    document.getElementById("Stop").disabled=true
}

function resume(){
    document.getElementById("Resume").disabled=true
    document.getElementById("Stop").disabled=false
    var val=document.getElementById("upclock").innerText
    var sec=val.split(":")[1]
    var min=val.split(":")[0]
    countUp((parseInt(min)*60)+parseInt(sec))
}

function call(){
    $.ajax({
        type        : 'POST',
        url         : location.origin +"/",
        data        : $('#form').serialize(),
        dataType    : 'json',
        success     : successFunction
    });

    function successFunction(msg) {
        alert(msg['message']+'!')
        console.log(msg['name'])
    }
}
