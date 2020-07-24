
const questions = [
    "How has another person shown that they care about you, within the past week?",
    "Share the story of something exciting that happened this past week.",
    "Describe somethingfun you did today",
    "What was something nice you said in the past week?",
    "Describe something that made you laugh in the past week.",
    "Describe something you were thankfulfor today.",
    "Describe a challenge you overcame in the past week.",
    "Describe something that made you happy today.",
    "Share the story of something exciting that happened this past week.",
    "What was something nice you said in the past week?",
    "Describe something good that happened to you today.",
    "Describe a personal strength you used today.",
    "Describe something good you did for another person in the past week.",
    "Describe something beautiful or interesting you saw in the past week.",
    "Describe a moment when you felt calm, content, or relaxed today.",
    "Describe a nice moment spent with family or friends in the past week.",
    "Describe something kind you saw another person do in thepast week.",
    "Describe something that made this past week special.",
    "Describe something you did today that you can be proud of.",
    "Share the story of something interesting that happened today.",
    "Describe the best part of your day.",
    "Describe how you made someone else’s day better.",
    "Explain how someone has helped you in the past week.",
    "How have you shown someone that you care about them, within the past week?"
]

class AudioController {
    constructor() {
        this.bgMusic = new Audio('Assets/Audio/creepy.mp3');
        this.flipSound = new Audio('Assets/Audio/flip.wav');
        this.matchSound = new Audio('Assets/Audio/match.wav');
        this.victorySound = new Audio('Assets/Audio/victory.wav');
        this.gameOverSound = new Audio('Assets/Audio/gameOver.wav');
        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class MixOrMatch {
    constructor(totalTime, cards, thoughts, thoughtBox) {
        this.cardsArray = cards;
        this.thoughtsArray = thoughts;
        this.thoughtPlaceHolder = thoughtBox;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray, this.thoughtsArray);
            this.busy = false;
        }, 500)
        this.hideCards();
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countdown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            var i = this.cardsArray.indexOf(card);
            this.thoughtPlaceHolder[i].innerText = this.thoughtsArray[i];
            this.thoughtPlaceHolder[i].style.display = "block";
        }
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    shuffleCards(cardsArray, thoughtsArray) { // Fisher-Yates Shuffle Algorithm.
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cardsArray[randIndex].style.order = i;
            cardsArray[i].style.order = randIndex;
        }
        for (let i = thoughtsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [thoughtsArray[i], thoughtsArray[j]] = [thoughtsArray[j], thoughtsArray[i]];
        }
    }
    
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let thoughtBox = Array.from(document.getElementsByClassName('thought'));
    for (const t of thoughtBox) {
        t.style.display = "none";
    }
    let thoughts = questions;
    let game = new MixOrMatch(100, cards, thoughts, thoughtBox);


    game.startGame();
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}
