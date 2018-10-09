//List 
let moves = 0;
let openCards = [];
let clockOff = true;
let matched = 0;
const movesHTML = document.querySelector('.moves');
const timer = document.querySelector('.timer');
var resetBtn = document.querySelector('.restart');
let clock;
let score = document.querySelector('.stars');
let stars = "3"; 
var cards = ['fa-diamond','fa-diamond',
            'fa-paper-plane-o','fa-paper-plane-o',
            'fa fa-anchor', 'fa fa-anchor',
            'fa-bolt', 'fa-bolt',
            'fa-cube','fa-cube',
            'fa-leaf', 'fa-leaf',
            'fa-bicycle', 'fa-bicycle',
            'fa-bomb' , 'fa-bomb'
            ];
  
//transform the cards array into card elements as a li

function generateCards(card){
    return `<li class="card" data-card='${card}'><i class="fa ${card} "></i></li>`;
};      

// adds a move to the moves html

function addMove() {
    moves++;
    movesHTML.innerHTML = moves;
}

//when cards are clicked their value is revealed by adding css classes

function reveal(card) {
    card.classList.add('open','show');
 };

 // adds open cards to the openCards array

 function stageOpen (card) {
    openCards.push(card);
 };

//remove score stars as the moves get higher 

 function removeStar() {
     let starList = document.querySelectorAll('.stars li');
    for (star of starList){
        if (star.style.display != 'none'){
            star.style.display = 'none';
            break;
        }
    }
 }

//shows stars back up once the game ends or user re-starts

 function showStars(){
    let starList = document.querySelectorAll('.stars li');
    for (star of starList){
            star.style.display = 'contents';
    }
 }

 //evaluates star scoring depending on amount of moves

function scoring(moves){
    if (moves === 22){
        removeStar();
        stars = "2";
    }
    if (moves == 40){
        removeStar();
        stars = "1";
       }
}

//evaluates if the values of the revealed cards are equal and adds the respective css class to make them look like a match

function matchCards(card) {
    if (openCards.length == 2) {
        if (openCards[0].dataset.card == openCards[1].dataset.card){
                openCards[0].classList.add('open','show','match');
                openCards[1].classList.add('open','show','match');
                openCards=[];
                matched ++;
                
        }
        else {
            (setTimeout(function(){
            openCards.forEach(function(card) {
            card.classList.remove('open','show');
            });
            openCards=[];
            }, 500));
        };
        addMove();
        scoring(moves);
    };
 };

 // shuffles the cards array 

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// timer function

function initTimer() {
    let s = 0;
    let m = 0;
    let h = 0;
   clock = setInterval(() => {
        s ++ ; 
        if (s == 59) {
            m ++;
            if (m == 60){
                h ++;
                m = 0;
            };
            s = 0;
        };
        timer.innerHTML = (h > 9 ? h : '0' + h) 
                            + ':' + (m > 9 ? m : '0' + m) 
                            + ':' + (s > 9 ? s : '0' + s);

    }    , 1000);
    resetBtn.addEventListener('click', reset);
   
};

// function stops and re-starts the clock;

function reset () {
    clearInterval(clock);
    clockOff = true;
    timer.innerHTML = '00:00:00';
    showStars();
    initGame();

};

//event listening for click on replay button

document.querySelector('.replay-modal').addEventListener('click', () =>{
    toggleModal();
    matched = 0;
    reset();
});

//event listening for modals x (close) and cancel buttons

document.querySelector('.close-modal').addEventListener('click', () =>{
    toggleModal();
    matched = 0;
});

document.querySelector('.cancel-modal').addEventListener('click', () =>{
    toggleModal();
    matched = 0;
});

//toggles the visibility (display) of the end of game modal

function toggleModal() {
    const modal = document.querySelector('.modal-background');
    modal.classList.toggle('hide');
}

//function verifies if the amount of cards open (or pairs) is equivalent to the total amount of pairs on the deck

function didWin() {
    const PAIRS = 8;
    let timeStat = document.querySelector('.show-time');
    let starStat = document.querySelector('.show-stars');
    let moveStat = document.querySelector('.show-moves');
    if (matched == PAIRS){
        toggleModal();
        clearInterval(clock);
        timeStat.innerHTML = timer.innerHTML;
        moveStat.innerHTML = movesHTML.innerHTML;
        starStat.innerHTML = stars;
    } 
}

//function for replay button



//Function starts when the user clicks on a card for first time, this starts the clock, counts the moves and finally makes sure we let the user know if they win

function initGame(){
    stars = "3";
    var deck = document.querySelector('.deck');
    deck.addEventListener('click', () => {
        if (clockOff == true){
            clockOff = false;
            initTimer() ;
        };
    });
    var cardHTML = shuffle(cards).map(function(card){
        return generateCards(card);
    });
    deck.innerHTML = cardHTML.join('');
    moves = 0;
    movesHTML.innerHTML = "0";
    let allCards = document.querySelectorAll('.card');
    allCards.forEach(function(card){
        card.addEventListener('click',function(e){
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
                stageOpen(card);
                reveal(card);
                matchCards (card);
                didWin();
            };

        });
    });
};   

initGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 



  



