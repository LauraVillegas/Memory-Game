/*
 * Create a list that holds all of your cards
 */
const movesHTML = document.querySelector('.moves');
let moves = 0;
var cards = ['fa-diamond','fa-diamond',
            'fa-paper-plane-o','fa-paper-plane-o',
            'fa fa-anchor', 'fa fa-anchor',
            'fa-bolt', 'fa-bolt',
            'fa-cube','fa-cube',
            'fa-leaf', 'fa-leaf',
            'fa-bicycle', 'fa-bicycle',
            'fa-bomb' , 'fa-bomb'
            ];
let openCards = [];
let restartBtn = document.querySelector('.restart');
let clockOff = true;
           
function generateCards(card){
    return `<li class="card" data-card='${card}'><i class="fa ${card} "></i></li>`;
};      

function addMove (){
    moves++;
    movesHTML.innerHTML = moves;
}
function reveal(card) {
    card.classList.add('open','show');
 };

 function stageOpen (card) {
    openCards.push(card);
 };
 function matchCards(card) {
    if (openCards.length == 2) {
        if (openCards[0].dataset.card == openCards[1].dataset.card){
                openCards[0].classList.add('open','show','match');
                openCards[1].classList.add('open','show','match');
                openCards=[];
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
    };
 };

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

const timer = document.querySelector('.timer');

function t() {
    s ++ ; 
    if (s == 59) {
        m ++;
        if (m == 60){
            h ++;
            m = 0;
        };
        s = 0;
    };
    timer.innerHTML = h + ":" + m + ":" + s;
};

function initTimer() {
    clockOff 
    let s = 0;
    let m = 0;
    let h = 0;
  
   let clock = setInterval(() => {
        s ++ ; 
        if (s == 59) {
            m ++;
            if (m == 60){
                h ++;
                m = 0;
            };
            s = 0;
        };
        timer.innerHTML = (h > 9 ? h : '0' + h) + ':' + (m > 9 ? m : '0' + m) + ':' + (s > 9 ? s : '0' + s);
    } , 1000);

    var resetBtn = document.querySelector('.restart');

    resetBtn.addEventListener('click', reset);
   
   function reset () {
       clearInterval(clock);
       clockOff = true;
       timer.innerHTML = '00:00:00';
       initGame();
   };
};



function initGame(){
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

 



  



