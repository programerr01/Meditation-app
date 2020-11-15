//the time remaining 
let TIME_LIMIT = 0;
const FULL_DASH_ARRAY = 283;
let time_rem = document.querySelector("#base-time-label");
let input_field = document.querySelector("#input_val")
let bird_sound = new Audio("public/Bird.mp3");
let sea_sound = new Audio("public/Sea.mp3"); 

let timeInterval = 0;
//Initially, no time has passed, but this will count up 
// and subtract from total_time;
let timePassed = 0;
let timeleft = TIME_LIMIT;

//Loop the sound so that it can play continuous
// bird_sound.loop();

bird_sound.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
sea_sound.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

//Sound to be played when clicked on button 
function sound_play(which){
    if(timeleft){
    if(which =="sea"){
        sea_sound.paused ? sea_sound.play() : sea_sound.pause();
        sea_sound.paused? document.querySelector("#sea-sound").style.opacity=0.6:document.querySelector("#sea-sound").style.opacity=1;
    }
    else if(which == 'bird'){
        bird_sound.paused ? bird_sound.play() : bird_sound.pause();
        bird_sound.paused? document.querySelector("#bird-sound").style.opacity=0.6:document.querySelector("#bird-sound").style.opacity=1;

        console.log("bird sound");
    }
}
}
//When the time is added
function handleSubmit(e){
    clearInterval(timeInterval);
    console.log(e)
    TIME_LIMIT = input_field.value;
    if(!TIME_LIMIT){
        alert("Enter Value");
        return false ;
    }
    TIME_LIMIT *= 60;
    timePassed = 0;
    timeleft = TIME_LIMIT;
    startTimer();
    return false;
}

//Starting  the timer 
function  startTimer(){
    timeInterval = setInterval(() =>{
        if(timeleft == 0){
            bird_sound.pause();
            sea_sound.pause();
            clearInterval(timeInterval);
            document.querySelector('.base-timer__path-remaining').style.color="red";
            return;
        }
        //The amount of time passed increments by one 
        timePassed = timePassed + 1;
        timeleft = TIME_LIMIT -timePassed;

        //The time left label is updated
        time_rem.innerHTML = formatTimeLeft(timeleft);
        setCircleDasharray();
    },1000)
}

//Formatting time that left 
function formatTimeLeft(time){
    //The longest round integer less than or equal to the time divided by 60
    const minute = Math.floor(time/60);

    //Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60

    //If the value of seconds is less than 10, then displays seconds with leading zero 
    if(seconds < 10){
        seconds = `0${seconds}`;
    }
    //The output in MM:SS format
    return `${minute}: ${seconds}`;
}
// Divides time left by the defined time limit
function calculateTimeFraction(){
    const rawTimeFraction = timeleft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

//Update the dasharray value as time passes, starting with 283
function setCircleDasharray(){
    const circleDasharray =    `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);

}


//the time remaining 

time_rem.innerText = formatTimeLeft(timeleft);


