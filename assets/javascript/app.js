//data structure to store the info about the questions
var quiz = [
    {question:"Which is the deepest lake in US?",
    options:["Lake Michigan","Crater Lake","Lake Tahoe","Lake Clark"],
    answer:"Crater Lake"},
    {question:"Which is the largest state in US?",
    options:["Alaska","California","New Mexico","Arizona"],
    answer:"Alaska"},
    {question:"Who was the third president of US?",
    options:["Andrew Jackson","James Monroe","Thomas Jefferson","George Washington"],
    answer:"Thomas Jefferson"},
    {question:"Which is the least populated state in US?",
    options:["Rhode Island","Delaware","North Dakota","Wyoming"],
    answer:"Wyoming"},
    {question:"Which is the largest art meuseum in US?",
    options:["National Gallery of Art","Minneapolis Institute of Art","Metropolitan Museum of Art","San Francisco Museum of Modern Art"],
    answer:"Metropolitan Museum of Art"},
    {question:"Which is the largest baseball stadium in US?",
    options:["Coors Field, Denver","Safeco Field, Seattle","AT&T Park, SF","Dodger Stadium, LA"],
    answer:"Dodger Stadium,LA"},
    {question:"Which is the most populated state in US?",
    options:["Florida","California","New York","Texas"],
    answer:"California"},
    {question:"Which is the hottest state in US?",
    options:["Florida","Texas","Arizona","Georgia"],
    answer:"Florida"}
    
];

//global counters
var currentTime =120;
var updateTime;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

//when the page loads
$(document).ready(function(){
    //reset the game
    resetGame();
});

//when user clicks start game button
$("#start-game").on("click",function(){

    //show/hide appropriate divs
    $("#start-game").hide();
    $("#time-remaining").show();
    $("#question-area").show();
    $("#finish-game").show();
    //show timer
    $("#time-remaining").append("<p>" + timeConvert(currentTime)+"</p>");

    //start the timer
    clearInterval(updateTime);
    updateTime = setInterval(decrementTime,1000);

    //for each question
    for(var i =0; i<quiz.length;i++){

        //create a div for showing the question
        var questionDiv = $("<div>");
        questionDiv.html(i+1 + ". " +quiz[i]["question"]);
        //append the newly created question div to question-area
        $("#question-area").append(questionDiv);

        //for each of the four options
        for(var j =0; j<4 ;j++){

            //create a radio button with id=option1, option2
            var optionRadio = $("<input type='radio'>");
            optionRadio.attr("id","option"+parseInt(j+1));
            //give the radio button name of option1 for first question, option2 for second..
            optionRadio.attr("name","question"+parseInt(i+1));
            //give it the value from the option array
            optionRadio.val(quiz[i]["options"][j]);

            //craete a label and give it text from the option array
            var label = $("<label for=option"+parseInt(j+1)+">"); 
            label.text(quiz[i]["options"][j]);

            //create a new div and append radio button to it and give it the label created earlier
            var optionDiv = $("<div>");
            optionDiv.append(optionRadio);
            optionDiv.append(label);
            
            //append the new div to the question-area after the question
            $("#question-area").append(optionDiv);

        }
        $("#question-area").append("<br>");
    }
});

//when questions are submitted
$("#finish-game").on("click", function(){
    //evaluate how the player did
    evaluateAnswers();
});

//decrements the time remaining every second
function decrementTime(){
    //decrement the current time by 1 second
    currentTime--;
    //remove the previous time from the time-remaining div
    $("#time-remaining > p").remove();
    //add the new time to the time-remaining div
    $("#time-remaining").append("<p>" + timeConvert(currentTime)+"</p>");

    if(currentTime <=20)
    {
        $("#time-remaining").css("color","red");
    }
    //if time becomes 0, your time is up and the evaluation of the game is shown
    if(currentTime === 0){
        //evaluate how the player did
        evaluateAnswers();
    }
}

//evaluates the answers after player submits it or when time is up
function evaluateAnswers(){

    //stop the timer
    clearInterval(updateTime);

    //hide/show appropriate divs
    $("#evaluation-area").show();
    $("#time-remaining").hide();
    $("#question-area").hide();
    $("#finish-game").hide();

    //for each of the question
    for(var i =0; i<quiz.length;i++){

        //if the answer matches with the user input
        if(quiz[i]["answer"] ===  $("input[name=question"+parseInt(i+1)+"]:checked").val()){
            //increment the correct counter
            correct++;
        }
        //if user did not answer
        else if (!$("input[name=question"+parseInt(i+1)+"]:checked").val())
        {
            //increment the unanswered counter
            unanswered++;
        }
        //if  the answer does not match user input increment the incorrect counter
        else
        incorrect++;
    }
    //create a new div to show the evaluation
    var correctDiv = $("<div>");
    correctDiv.html("Correct Answers: " + correct);

    //create a new div to show the evaluation
    var incorrectDiv = $("<div>");
    incorrectDiv.html("Incorrect Answers: " + incorrect);

    //create a new div to show the evaluation
    var unansweredDiv = $("<div>");
    unansweredDiv.html("Unanswered: " + unanswered);

    //append the three newly created divs to result div
    $("#evaluation-area").append(correctDiv);
    $("#evaluation-area").append(incorrectDiv);
    $("#evaluation-area").append(unansweredDiv);

}

//resets the game 
function resetGame(){
    //start the game and show /hide appropriate areas
    $("#start-game").show();
    $("#time-remaining").hide();
    $("#question-area").hide();
    $("#finish-game").hide();
    $("#evaluation-area").hide();
}

//converts the time into required format to show in the time-remaining div
function timeConvert(currentTime){
    var minutes = Math.floor(currentTime / 60);
    var seconds = currentTime - (minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }