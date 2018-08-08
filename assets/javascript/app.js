var quiz = [
    {question:"what is 2+2?",
    options:[4,6,8,9],
    answer:4},
    {question:"what is 20-10?",
    options:[4,6,8,10],
    answer:10},
    {question:"what is 2*7?",
    options:[4,14,8,9],
    answer:14},
    {question:"what is 6*6?",
    options:[4,6,36,9],
    answer:36},
    {question:"what is 2+2?",
    options:[4,6,8,9],
    answer:4},
    {question:"what is 20-10?",
    options:[4,6,8,10],
    answer:10},
    {question:"what is 2*7?",
    options:[4,14,8,9],
    answer:14},
    {question:"what is 6*6?",
    options:[4,6,36,9],
    answer:36}
];

var currentTime =10;
var updateTime;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

$(document).ready(function(){
    resetGame();
});

$("#start-game").on("click",function(){
    $("#start-game").hide();
    $("#time-remaining").show();
    $("#question-area").show();
    $("#finish-game").show();
    $("#time-remaining").append("<p>" + timeConvert(currentTime)+"</p>");

    clearInterval(updateTime);
    updateTime = setInterval(decrementTime,1000);

    for(var i =0; i<quiz.length;i++){

        var questionDiv = $("<div>");
        questionDiv.html(i+1 + ". " +quiz[i]["question"]);
        $("#question-area").append(questionDiv);
        for(var j =0; j<4 ;j++){

            var optionRadio = $("<input type='radio'>");
            optionRadio.attr("id","option"+parseInt(j+1));
            optionRadio.attr("name","question"+parseInt(i+1));
            optionRadio.val(quiz[i]["options"][j]);

            var label = $("<label for=option"+parseInt(j+1)+">"); 
            label.text(quiz[i]["options"][j]);

            var optionDiv = $("<div>");
            optionDiv.append(optionRadio);
            optionDiv.append(label);
            
            $("#question-area").append(optionDiv);

        }
    }
});

$("#finish-game").on("click", function(){
    evaluateAnswers();
});

function decrementTime(){
    currentTime--;
    $("#time-remaining > p").remove();
    $("#time-remaining").append("<p>" + timeConvert(currentTime)+"</p>");
    if(currentTime == 0){
        evaluateAnswers();
    }
}

function evaluateAnswers(){

    clearInterval(updateTime);

    $("#evaluation-area").show();
    $("#time-remaining").hide();
    $("#question-area").hide();
    $("#finish-game").hide();

    for(var i =0; i<quiz.length;i++){

        if(quiz[i]["answer"] ===  parseInt($("input[name=question"+parseInt(i+1)+"]:checked").val())){
            correct++;
        }
        else if (!$("input[name=question"+parseInt(i+1)+"]:checked").val())
        {
            unanswered++;
        }
        else
        incorrect++;
    }
    var correctDiv = $("<div>");
    correctDiv.html("Correct Answers: " + correct);

    var incorrectDiv = $("<div>");
    incorrectDiv.html("Incorrect Answers: " + incorrect);

    var unansweredDiv = $("<div>");
    unansweredDiv.html("Unanswered: " + unanswered);

    $("#evaluation-area").append(correctDiv);
    $("#evaluation-area").append(incorrectDiv);
    $("#evaluation-area").append(unansweredDiv);

}
function resetGame(){
    $("#start-game").show();
    $("#time-remaining").hide();
    $("#question-area").hide();
    $("#finish-game").hide();
    $("#evaluation-area").hide();
}
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