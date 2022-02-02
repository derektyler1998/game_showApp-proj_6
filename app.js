const qwerty = document.getElementById('qwerty');
const getPhrase = document.getElementById('phrase');
const startGame = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const lives = document.querySelector('.tries');
const lostLife = document.querySelector('.lost');

let missed = 0;
let resetGame = 0;

// Create and declare five phrases and label them //

let phrases =  [
  "The only easy day was yesterday",
  "Full stack vs Front-End Development",
  "When we first met",
  "I remember it like it was yesterday",
  "Nothing like a hot summer day"
];

// Add event listner and hide overlay //

startGame.addEventListener('click', e => {
  overlay.style.display = 'none';
});

// Get random array function //

function getRandomPhraseArray(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  const randomPhrase = arr[randomNumber];
  const splitPhrase = randomPhrase.split('');
  return splitPhrase;
}

// Create an addPhrasetoDisplay and create li list //

  function addPhraseToDisplay(arr) {
    const ul = document.querySelector("#phrase ul")
    for (let i =0; i < arr.length; i ++) {
        const li = document.createElement("li");
        li.textContent = arr[i];
  // Append list item to #phrase ul //
      ul.appendChild(li);

      // Create an else-if variable for characters inside the array//
      if(arr[i] === " ") {
        li.className = "space";
      } else {
        li.className = "letter";
      }
    }
  }

   const randomPhrase = getRandomPhraseArray(phrases);
   addPhraseToDisplay(randomPhrase);

// Create a checkLetter function //

function checkLetter(button) {
 const letterLi = document.querySelectorAll('li');
 let match = null;

 for( let i = 0; i < letterLi.length; i ++) {
   if ( button.textContent === letterLi[i].textContent.toLowerCase() ) {
     letterLi[i].classList.add("show");
     match = button.textContent;

   }
 }
 return match;
}


//Add event listener to the keyboard that targets the on screen keyboard and not the physical keyboard//

  qwerty.addEventListener('click', (event) => {
  if ( event.target.tagName === 'BUTTON' || event.target.className === 'chosen' ) {
    const button = event.target;
    button.classList.add('chosen');
    button.setAttribute('disabled', '');
    const letterCheck = checkLetter(button);

    if (letterCheck === null) {
      const lost = document.querySelectorAll('.tries img')[missed];
      lost.src='images/lostHeart.png';
      lost.className = 'lost';
      missed++;
    }
    else {
      won();
    }
  }
});


// Create a function if you win or lose //

  function won() {
  const showed = document.querySelectorAll('.show');
  const phraseLetter = document.querySelectorAll('.letter');
  const title = document.querySelector('.title');

  if (phraseLetter.length === showed.length) {
    overlay.style.display = 'flex';
    overlay.className = 'win';
    title.textContent = 'You won!';
    gameReset();
} else if (missed === 5) {
  overlay.className = 'lose';
  overlay.style.display = 'flex';
  title.textContent = 'Try again!';
    gameReset();
  }
}

// Game reset //

function gameReset() {
  missed = 0;
  resetGame = 0;
  const ul = document.querySelector("#phrase ul");
  ul.textContent = '';

  const chosenLetters = Array.from(document.querySelectorAll('.chosen'));
  chosenLetters.forEach(function(letter) {
    letter.classList.remove('chosen');
    letter.disabled = false;
  });

  const finalPhrase = getRandomPhraseArray(phrases);
  addPhraseToDisplay(finalPhrase);

  // Add new hearts to screen once game is restarted //
  const refillHearts = document.querySelectorAll('.tries img');
  for(let i = 0; i < refillHearts.length; i ++){
    refillHearts[i].src = 'images/liveHeart.png';
  }
}
// Reset the phrases when game resets//
