//setting up constant variables for commonly used values to reduce typo errors
//DAVID: good global variables best practices
const COM_SCISSORS = `scissors`;
const COM_PAPER = `paper`;
const COM_STONE = `stone`;
const NORMAL = `normal`;
const REVERSE = `reverse`;
const KOREAN = `korean`;
const COMPUTER = `computer`;
const comSPS_Array = [COM_SCISSORS, COM_PAPER, COM_STONE];
//Setting up array to control input
//DAVID: good job using arrays!
const correctInputArray = [
  "scissors",
  "paper",
  "stone",
  "normal",
  "reverse",
  "korean",
  "computer",
];

//setting up global states
let gameMode = `waiting for username`;
let userName = ``;
let numOfWin = 0;
let numOfLose = 0;
let numOfDraw = 0;
//DAVID: there is an constant argument between using null and undefined that you can read here
//DAVID: https://stackoverflow.com/questions/6604749/what-reason-is-there-to-use-null-instead-of-undefined-in-javascript#:~:text=For%20those%20variables%20for%20whom,as%20having%20%22no%20value%22.
//DAVID: over here, it is normally best practice to define a programatically empty variable with null!
let previousWinner = undefined;

//Setting up computer scissors paper stone generator function
const generateComSPS = () => {
  //DAVID: nice use of ES6 JS, do note that if you know that the variable you're declaring is not going to change in value that you can use const instead of let
  let randomNum = Math.floor(Math.random() * 3);
  let chosenSPS = comSPS_Array[randomNum];
  return chosenSPS;
};

//Setting up game mode message function
const gameModeMsg = function (gameMode) {
  return `Hi ${userName}. Current game mode is ${gameMode}. Please input "scissors", "paper" or "stone" to begin.<br><br>To change game mode, please input "Normal", "Reverse", "Korean", "Computer".`;
};
const executeSPS = function (input, com_Answer) {
  if (input == com_Answer) {
    //DAVID: remember that if you're not using template literals, you should declare your strings using quotation marks ("")
    //DAVID: you can read more about using backticks and quotation marks here https://stackoverflow.com/questions/47067319/back-tick-vs-single-quote-in-js#:~:text=For%20me%2C%20I%20generally%20follow,reserved%20for%20JSON%20and%20HTML.
    return `draw`;
  } else if (
    (com_Answer == COM_SCISSORS && input == COM_STONE) ||
    (com_Answer == COM_STONE && input == COM_PAPER) ||
    (com_Answer == COM_PAPER && input == COM_SCISSORS)
  ) {
    return `win`;
  } else {
    return `lose`;
  }
};

var main = function (input) {
  let myOutputValue;
  if (gameMode == `waiting for username`) {
    userName = input;
    gameMode = `normal`;
    return `Hello ${userName}.<br><br>Welcome to the Scissors Paper Stone game.<br><br>Current game mode is ${gameMode}. Please input "scissors", "paper" or "stone" to begin.<br><br>To change game mode, please input "Normal", "Reverse", "Korean", "Computer".`;
  }

  input = input.toLowerCase();

  //To validate input.
  if (gameMode == COMPUTER) {
  } else if (correctInputArray.indexOf(input) == -1) {
    return `Hi ${userName}. Please input "scissors", "paper" or "stone" only.<br><br>To change game mode, please input "Normal", "Reverse", "Korean", "Computer".`;
  }

  //setting up win, draw, reverse states within function so that the states revert to default for every new round
  //DAVID: you could try refactoring by declaring a single variable flag and assigning the different values to it rather than having 3 seperate variables to manage.
  //DAVID: for e.g. flag = "draw" OR flag = "win"
  //DAVID: you could check or change the value of flag accordingly
  let drawFlag = false;
  let winFlag = false;
  let reversedFlag = false;

  //setting up game mode per input
  switch (input) {
    case "normal":
      gameMode = NORMAL;
      return gameModeMsg(gameMode);
    case "reverse":
      gameMode = REVERSE;
      return gameModeMsg(gameMode);
    case "korean":
      gameMode = KOREAN;
      return gameModeMsg(gameMode);
    case "computer":
      gameMode = COMPUTER;
      return (
        gameModeMsg(gameMode) +
        `<br><br>For Computer Mode, we will choose your SPS for you. You may press submit without an input.`
      );
  }
  //once game mode is determined, computer will generate its SPS
  let com_Answer = generateComSPS();
  var outPut1 = function () {
    return `Hi ${userName}. You choose ${input} and the COM choose ${com_Answer}.`;
  };
  var playAnotherRdmsg = `<br><br>Now you can type "scissors" "paper" or "stone" to play another round.<br><br>To change game mode, please input "Normal", "Reverse", "Korean", "Computer".`;
  let result;

  //executes each game mode by comparing user SPS and com SPS
  switch (gameMode) {
    case NORMAL:
      result = executeSPS(input, com_Answer);
      break;
    case REVERSE:
      reversedFlag = true;
      result = executeSPS(input, com_Answer);
      break;
    case COMPUTER:
      input = generateComSPS();
      result = executeSPS(input, com_Answer);
      break;
    case KOREAN:
      result = executeSPS(input, com_Answer);
      if (result == `draw` && previousWinner == undefined) {
        numOfDraw += 1;
        return `${outPut1()} It is a draw! Your W-D-L record is ${numOfWin}-${numOfDraw}-${numOfLose}. ${playAnotherRdmsg}`;
      } else if (
        (result == `win` && previousWinner == undefined) ||
        (result == `win` && previousWinner == `user`) ||
        (result == `win` && previousWinner == `com`)
      ) {
        previousWinner = `user`;
        return `${outPut1()} Muk-Jji-Ppa! Make it a draw in the next round to win. ${playAnotherRdmsg}`;
      } else if (
        (result == `lose` && previousWinner == undefined) ||
        (result == `lose` && previousWinner == `user`) ||
        (result == `lose` && previousWinner == `com`)
      ) {
        previousWinner = `com`;
        return `${outPut1()} Muk-Jji-Ppa! Avoid a draw in the next round to survive. ${playAnotherRdmsg}`;
      } else if (result == `draw` && previousWinner == `user`) {
        previousWinner = undefined;
        numOfWin += 1;
        return `${outPut1()} You win Muk-Jji-Ppa! Your W-D-L record is ${numOfWin}-${numOfDraw}-${numOfLose}. ${playAnotherRdmsg}`;
      } else if (result == `draw` && previousWinner == `com`) {
        previousWinner = undefined;
        numOfLose += 1;
        return `${outPut1()} You lose Muk-Jji-Ppa! Your W-D-L record is ${numOfWin}-${numOfDraw}-${numOfLose}. ${playAnotherRdmsg}`;
      }
  }

  //DAVID: in some cases, using if else can be shorter and cleaner to read
  /*
    if (result == 'draw'){
      drawFlag = true
    } else if (result == 'win'){
      winFlag = true
    }
    */

  switch (result) {
    case `draw`:
      drawFlag = true;
      break;
    case `win`:
      winFlag = true;
      break;
  }

  if (reversedFlag == true) {
    winFlag = !winFlag;
  }

  if (drawFlag == true) {
    numOfDraw += 1;
    myOutputValue = `${outPut1()} It is a draw! Your W-D-L record is ${numOfWin}-${numOfDraw}-${numOfLose}. ${playAnotherRdmsg}`;
  } else if (winFlag == true) {
    numOfWin += 1;
    myOutputValue = `${outPut1()} You win! Your W-D-L record is ${numOfWin}-${numOfDraw}-${numOfLose}. ${playAnotherRdmsg}`;
  } else {
    numOfLose += 1;
    myOutputValue = `${outPut1()} You lose! Your W-D-L record is ${numOfWin}-${numOfDraw}-${numOfLose}. ${playAnotherRdmsg}`;
  }

  return myOutputValue;
};

//DAVID: well done on your first project! great to see you implementing new concepts such as ES6 JS and arrays into your project, do try and stay consistent throughout the file if you're using ES6! I've added some links for you to check out in the comments above regarding some best practices in JS, do give them a read if you have the time!
