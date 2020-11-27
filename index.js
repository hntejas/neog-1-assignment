var readlineSync = require('readline-sync');
var chalk = require('chalk');
var Table = require('cli-table');

var displayTheme = chalk.bgWhiteBright.bold.black;
var questionTheme = chalk.bgYellowBright.bold.black;
var rightAnswerTheme = chalk.bgGreenBright.bold.black;
var wrongAnswerTheme = chalk.bgRedBright.bold.white;

var scoreBoard = [{
  userName: 'Dummy',
  score: 2
}];
var userScore = 0;
var userName = '';

getUserName(true);

console.clear();
console.log(displayTheme('\nHi ' + userName + ', Welcome to the India Quiz \n'));

console.log(displayTheme(`Rules: 
  1) 5 Questions to answer 
  2) Every right answer scores 1 point. 
  3) Every wrong answer deducts 1 point. 
  4) You can skip the questions. (Press q to skip)
`));

readlineSync.question('Press any key to start the quiz');

console.clear();

var questionBank = [
  {
    question: 'What is the National Capital of India? \n',
    answer: 'Delhi'
  },
  {
    question: 'What is the National Animal of India? \n',
    answer: 'Tiger'
  },
  {
    question: 'What is the National Bird of India? \n',
    answer: 'Peacock'
  },
  {
    question: 'Who is the President of India? \n',
    options: ['Ram Nath Kovind', 'Narendra Modi', 'Donald Trump'],
    answer: 'Ram Nath Kovind'
  },
  {
    question: 'Who is the Prime Minister of India? \n',
    options: ['Ram Nath Kovind', 'Narendra Modi', 'Donald Trump'],
    answer: 'Narendra Modi'
  }
]

questionBank.forEach(function(questionObj){
  var userAnswer = '';
  if(questionObj.options && questionObj.options.length > 0){
    var userAnswerIndex = readlineSync.keyInSelect(questionObj.options, questionTheme(questionObj.question));
    userAnswer = userAnswerIndex == -1 ? 'q' : questionObj.options[userAnswerIndex];
  }else{
    userAnswer = readlineSync.question(questionTheme(questionObj.question), {hideEchoBack: false});
  }
 

  if(userAnswer.toLowerCase() === 'q'){
    //do nothing
  }else if(userAnswer.toLowerCase() === questionObj.answer.toLowerCase()){
    console.log(rightAnswerTheme('Yay!! You got it right \n'));
    userScore++;
  }else {
    console.log(wrongAnswerTheme(`Ops!! That's a wrong answer`));
    console.log(displayTheme('The right answer is ' + questionObj.answer + '\n'))
    if(userScore > 0){
      userScore--;
    }
  }
});

addUserToScoreBoardAndSort();

console.log(displayTheme(`You're total score is ` + userScore));

if(scoreBoard[0].userName === userName){
  console.log(displayTheme(`Congratulations, You've got the higest score!!`));
}

displayScoreBoard();

function displayScoreBoard(){
  var table = new Table({
    head: ['User', 'Score']
  });

  scoreBoard.forEach(function(scoreObj){
    table.push([scoreObj.userName, scoreObj.score])
  });

  console.log(table.toString());
}

function getUserName(isFirstTimeAsk){
  if(!userName && !isFirstTimeAsk){
    userName = readlineSync.question(questionTheme('Please enter your name to continue \n'));
    getUserName();
  }else if(!userName && isFirstTimeAsk) {
    userName = readlineSync.question(questionTheme('Hello! May I know your name? \n'));
    getUserName();
  }
}

function addUserToScoreBoardAndSort(){
  scoreBoard.push({
    userName: userName,
    score: userScore
  });

  scoreBoard.sort(compareScore);
}

function compareScore( a, b ) {
  if ( a.score < b.score ){
    return 1;
  }
  if ( a.score > b.score ){
    return -1;
  }
  return 0;
}