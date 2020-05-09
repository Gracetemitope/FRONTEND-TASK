
let options=document.querySelector(".options").children;
let answerTrackerContainer=document.querySelector(".answers-tracker");
let questionNumberSpan=document.querySelector(".question-num-value");
let totalQuestionSpan=document.querySelector(".total-question");
let correctAnswerSpan=document.querySelector(".correct-answers");
let totalQuestionSpan2=document.querySelector(".total-question2");
let percentage=document.querySelector(".percentage");
let questionBoard=document.querySelector(".question");
let Answer1=document.querySelector(".option1");
let Answer2=document.querySelector(".option2");
let Answer3=document.querySelector(".option3");
let Answer4=document.querySelector(".option4");


let questionIndex;
let index=0;
let myArray=[];
let myArr=[];
let score=0;

// Array of questions

const questions = [
    {
        q:'Movement of a body in a specified direction is referred to as',
        options: ['Speed','Acceleration','Velocity','Projectile'],
        answer: 2 
    },
    {
        q:'The theory of Special Relativity was propounded by',
        options: ['Stephen Hawkins','Albert Einstein','Thomas Edison','Marie Curie'],
        answer: 1 
    },
    {
        q:'Which of the following Scientists is a nobel laurette in Physics and Chemistry?',
        options: ['Marie Curie','Perrie Currie','John Nash','All of the Above'],
        answer: 0 
    },
    {
        q:'Which of the following tech demigod is not too different from an alien? ',
        options: ['Elon Musk','Mark Essein','Seyi Onifade','Eniola Agboola'],
        answer: 0 
    },
    {
        q:'In not so distant time, time travel would be possible',
        options: ['That is ridiculous','Maybe','Not so soon','Ofcourse yes'],
        answer: 3 
    }
]
// getting questions and options
totalQuestionSpan.innerHTML=questions.length;
function load(){
         questionNumberSpan.innerHTML=index+1;
         questionBoard.innerHTML=questions[questionIndex].q;
         Answer1.innerHTML=questions[questionIndex].options[0];
         Answer2.innerHTML=questions[questionIndex].options[1];
         Answer3.innerHTML=questions[questionIndex].options[2];
         Answer4.innerHTML=questions[questionIndex].options[3];
         index++;
}
// Check correct options
function check(element){
   if(element.id==questions[questionIndex].answer){
      element.classList.add("correct");
      updateAnswerTracker("correct");
      score++;
      console.log("score:"+score);
   }
   else{
       element.classList.add("wrong");
       updateAnswerTracker("wrong");
   }
//    Once an option is clicked, disable all other options
   disabledOptions()
}
function disabledOptions(){
    for(let i=0; i<options.length; i++) {
        options[i].classList.add("disabled");
        // A correct answer to be displayed
        if(options[i].id==questions[questionIndex].answer) {
            options[i].classList.add("correct");   
        }
    }
}
function enableOptions(){
    for(let i=0; i<options.length; i++) {
        options[i].classList.remove("disabled","correct","wrong");
    }
}
   //for the next action button;but first le me check if the user clicked an option,if not,i give alert
   function ValidityState(){
       if(!options[0].classList.contains("disabled")) {
       //if options[0] does not have class"disabled" then alert
       alert("Huh! Ogbeni, select an option first")
       }
       else{
        enableOptions();
        randomQuestion();
       }
   }

   function next(){
       ValidityState();
       //let me check for question duplicacy
   }

function randomQuestion(){
    let randomNumber=Math.floor(Math.random()*questions.length);
    let hitDuplicate=0;  
    if(index==questions.length) {
            quizOver();
        }
        else {
            if(myArray.length>0){
            for(let i=0; i<myArray.length; i++) {
            if(myArray[i]==randomNumber){
                hitDuplicate=1;
                break;
            }
        }
        if(hitDuplicate==1){
            randomQuestion();
        }
        else{
            questionIndex=randomNumber;
            load();
            myArr.push(questionIndex);
        }
    }
            if(myArray.length==0){
            questionIndex=randomNumber;
            load();
            myArr.push(questionIndex);
            }
        
        myArray.push(randomNumber);       
        }
}
function answerTracker() {
    for(let i=0; i<questions.length; i++) {
        const div=document.createElement("div");
        answerTrackerContainer.appendChild(div);
    }
}
function updateAnswerTracker(classNam) {
  answerTrackerContainer.children[index-1].classList.add(classNam);
}
// When there is no more questions left
function quizOver(){
  document.querySelector(".quiz-over").classList.add("show");
  correctAnswerSpan.innerHTML=score;
  totalQuestionSpan2.innerHTML=questions.length;
  percentage.innerHTML=(score/questions.length)*100 + "%";
}
function tryAgain(){
    window.location.reload();
}
 window.onload=function(){
     randomQuestion();
     this.answerTracker();
}