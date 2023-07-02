let score=JSON.parse(localStorage.getItem('score'));
if(score===null){
    score={
        wins: 0,
        losses: 0,
        ties: 0
    };
}
  
updateScoreElement();
let isAutoPlaying=false;
let intervalID;

function setAutoPlayButton(){
    let autoButton = document.querySelector('.js-auto-play');
    let text = autoButton.innerHTML;
    if(text.trim() === "Auto Play"){
        text = "Stop";
        autoButton.classList.add("stop-play-button");
    }else{
        text = "Auto Play";
        autoButton.classList.remove("stop-play-button");
    }

    document.querySelector('.js-auto-play').innerHTML = text;
}

function autoPlay(){
    setAutoPlayButton();
    if(!isAutoPlaying){
        intervalID=setInterval(function(){
            const playerMove=pickComputerMove();
            playGame(playerMove);
        },1000);
        isAutoPlaying=true;
        
    }
    else{
        clearInterval(intervalID);
        isAutoPlaying=false;
    }
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }
        
    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }
    if(result==='You win.'){
        score.wins++;
    }
    else if(result==='You lose.'){
        score.losses++;
    }
    else{
        score.ties++;
    }

    localStorage.setItem('score',JSON.stringify(score));

    updateScoreElement();
    document.querySelector('.js-result')
        .innerHTML=`${result}`;

    document.querySelector('.js-moves')
        .innerHTML=`You
    <img src="images/${playerMove}-emoji.png" class="move-icon" alt=${playerMove}>
    <img src="images/${computerMove}-emoji.png" class="move-icon" alt=${playerMove}>
    Computer`;


}

function updateScoreElement(){
    document.querySelector('.js-score')
        .innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}

function resetScore(){
    score.wins=0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');
    document.querySelector('.js-result')
        .innerHTML=``;

    document.querySelector('.js-moves')
        .innerHTML=``;
    updateScoreElement();
}