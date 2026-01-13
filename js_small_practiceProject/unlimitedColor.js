var start=document.querySelector("#start")
var stop=document.querySelector("#stop")

var changeColor=function(){
    document.body.style.backgroundColor=randomColor();

}
let interval;
function StartChangeColor (){
    interval=setInterval(changeColor,200);
}
var randomColor = function(){
    var textColor='0123456789abcdef';
    let randomNum="#";
    for(let i=0;i<6;i++)
    {
        randomNum=randomNum+textColor.charAt(Math.floor(Math.random()*textColor.length))
    }
    return randomNum;
}
var StopChangeColor=function(){
    clearInterval(interval);
    interval=null;
}
start.addEventListener("click",StartChangeColor)
stop.addEventListener("click",StopChangeColor)
