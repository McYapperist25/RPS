
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};


updateScoreElement();

let isAutoPlaying = false;
let intervalID;

// const autoPlay = () => {}
function autoPlay() {
  let autoPlayStop = document.querySelector('.js-auto-play');
  console.log(autoPlayStop)
  
  if (!isAutoPlaying) {

    intervalID = setInterval(() => {
      autoPickPlayerMove();
      
      autoPlayStop.innerHTML = "Stop Auto Play";
    }, 1000)
    isAutoPlaying = true

    
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    autoPlayStop.innerHTML = "Auto Play";
  }

}

function resetScore () {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.location.reload();
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => playGame('Rock'));

document.querySelector('.js-paper-button')
  .addEventListener('click', () => playGame('Paper'));

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => playGame('Scissors'));

document.querySelector('.reset-score-button')
  .addEventListener('click', () => {
    let resultP = document.querySelector('.js-result')
    resultP.innerHTML = `Are you sure you want to reset score? <button class="js-yes-button yes-button"> Yes</button> <button class="js-no-button no-button"> No</button>`

    document.querySelector('.js-yes-button')
  .addEventListener('click', () => {
    resetScore();
  })

  document.querySelector('.js-no-button')
    .addEventListener('click', () => {
      document.location.reload()
  })

});



// ['click', 'keydown'].forEach( eventType => {
//   document.body.addEventListener(eventType, () => {
//     if (eventType.key === 'Backspace' || eventType === 'click') {
//       let resultP = document.querySelector('.js-result')
//       resultP.innerHTML = `Are you sure you want to reset score? <button class="js-yes-button yes-button"> Yes</button> <button class="js-no-button no-button"> No</button>`

//       document.querySelector('.js-yes-button')
//       .addEventListener('click', () => {
//         score.wins = 0;
//         score.losses = 0;
//         score.ties = 0;
//         localStorage.removeItem('score');
//         updateScoreElement();
//         document.location.reload();
//       })

//       document.querySelector('.js-no-button')
//         .addEventListener('click', () => {
//           document.location.reload()
//       })
//     }

//   });
// });


document.querySelector('.js-auto-play')
  .addEventListener('click', () => autoPlay());

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock')
  } else if (event.key === 'p') {
    playGame('Paper')
  } else if (event.key === 's') {
    playGame('Scissors')
  } else if (event.key === 'Backspace') {
    let resultP = document.querySelector('.js-result')
    resultP.innerHTML = `Are you sure you want to reset score? <button class="js-yes-button yes-button"> Yes</button> <button class="js-no-button no-button"> No</button>`

    document.querySelector('.js-yes-button')
    .addEventListener('click', () => {
      resetScore();
    })

    document.querySelector('.js-no-button')
      .addEventListener('click', () => {
        document.location.reload()
    })

  } else if (event.key === 'a') {
    autoPlay();
  } else {
    return
  }
})

function playGame(playerMove) {
  let computerMove = pickComputerMove();
  
  let result = '';
  
  if (playerMove === 'Rock') {
    
    if (computerMove === 'Rock' ) {
      result = 'You Tie';
    } else if (computerMove === 'Scissors') {
      result = 'You Win';
    } else if (computerMove === 'Paper') {
      result = 'You Lose'
    }
    
  } else if (playerMove === 'Paper') {
    
  
  if (computerMove === 'Rock' ) {
    result = 'You Win';
  } else if (computerMove === 'Scissors') {
    result = 'You Lose';
  } else if (computerMove === 'Paper') {
    result = 'You Tie'
  }
  
  } else if (playerMove === 'Scissors') {
    
    if (computerMove === 'Rock' ) {
      result = 'You Lose';
    } else if (computerMove === 'Scissors') {
      result = 'You Tie';
    } else if (computerMove === 'Paper') {
      result = 'You Win'
    }      
  }
  
  if (result === 'You Win') {
    score.wins++
    // score.wins += 1;
  } else if (result === 'You Lose') {
    score.losses++
    // score.losses += 1;
  } else if (result === 'You Tie') {
    score.ties++
    // score.ties += 1;
  }
  
  localStorage.setItem('score', JSON.stringify(score));
  

  
  updateScoreElement();

  document.querySelector('.js-result')
  .innerHTML = result;

  document.querySelector('.js-moves')
  .innerHTML = `You
<img src="../Images/${playerMove}-emoji.png" alt="Your Move" class="move-icon">
<img src="../Images/${computerMove}-emoji.png" alt="Computer Move" class="move-icon">
Computer`;
}
  

function pickComputerMove() {
  let randomNumber = Math.floor(Math.random()*3);
  
  let computerMove = '';
  
  if (randomNumber >= 0 && randomNumber < 1) {
    computerMove = 'Rock'; 
  } else if (randomNumber >= 1  && randomNumber < 2 ) {
    computerMove = 'Paper'; 
  } else if (randomNumber >= 2  && randomNumber < 3 ) {
    computerMove = 'Scissors';
  }
  console.log(computerMove);
  
  return computerMove;
}

function autoPickPlayerMove() {
  let randomNumber = Math.floor(Math.random()*3);
  
  let autoPlayerMove = '';
  
  if (randomNumber >= 0 && randomNumber < 1) {
    autoPlayerMove = 'Rock'; 
  } else if (randomNumber >= 1  && randomNumber < 2 ) {
    autoPlayerMove = 'Paper'; 
  } else if (randomNumber >= 2  && randomNumber < 3 ) {
    autoPlayerMove = 'Scissors';
  }
  console.log(autoPlayerMove);

  playGame(autoPlayerMove)
  
  
  return autoPlayerMove;
}


function clearHandler() {
  localStorage.clear();
  document.location.reload();
};

function updateScoreElement()  {
  document.querySelector('.js-score')
  .innerHTML = `Wins : ${score.wins} Losses : ${score.losses} Ties : ${score.ties}`;
};
  

  