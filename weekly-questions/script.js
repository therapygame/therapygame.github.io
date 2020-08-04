const questions=["How has another person shown that they care about you, within the past week?","Share the story of something exciting that happened this past week.","Describe somethingfun you did today","What was something nice you said in the past week?","Describe something that made you laugh in the past week.","Describe something you were thankfulfor today.","Describe a challenge you overcame in the past week.","Describe something that made you happy today.","Share the story of something exciting that happened this past week.","What was something nice you said in the past week?","Describe something good that happened to you today.","Describe a personal strength you used today.","Describe something good you did for another person in the past week.","Describe something beautiful or interesting you saw in the past week.","Describe a moment when you felt calm, content, or relaxed today.","Describe a nice moment spent with family or friends in the past week.","Describe something kind you saw another person do in thepast week.","Describe something that made this past week special.","Describe something you did today that you can be proud of.","Share the story of something interesting that happened today.","Describe the best part of your day.","Describe how you made someone else’s day better.","Explain how someone has helped you in the past week.","How have you shown someone that you care about them, within the past week?"];class AudioController{constructor(){this.bgMusic=new Audio("Assets/Audio/creepy.mp3"),this.flipSound=new Audio("Assets/Audio/flip.wav"),this.matchSound=new Audio("Assets/Audio/match.wav"),this.victorySound=new Audio("Assets/Audio/victory.wav"),this.gameOverSound=new Audio("Assets/Audio/gameOver.wav"),this.bgMusic.volume=.5,this.bgMusic.loop=!0}startMusic(){this.bgMusic.play()}stopMusic(){this.bgMusic.pause(),this.bgMusic.currentTime=0}flip(){this.flipSound.play()}match(){this.matchSound.play()}victory(){this.stopMusic(),this.victorySound.play()}gameOver(){this.stopMusic(),this.gameOverSound.play()}}class MixOrMatch{constructor(e,t,s,i){this.cardsArray=t,this.thoughtsArray=s,this.thoughtPlaceHolder=i,this.totalTime=e,this.timeRemaining=e,this.timer=document.getElementById("time-remaining"),this.ticker=document.getElementById("flips"),this.audioController=new AudioController}startGame(){this.totalClicks=0,this.timeRemaining=this.totalTime,this.cardToCheck=null,this.matchedCards=[],this.busy=!0,setTimeout(()=>{this.audioController.startMusic(),this.shuffleCards(this.cardsArray,this.thoughtsArray),this.busy=!1},500),this.hideCards()}startCountdown(){return setInterval(()=>{this.timeRemaining--,0===this.timeRemaining&&this.gameOver()},1e3)}gameOver(){clearInterval(this.countdown),this.audioController.gameOver(),document.getElementById("game-over-text").classList.add("visible")}victory(){clearInterval(this.countdown),this.audioController.victory(),document.getElementById("victory-text").classList.add("visible")}hideCards(){this.cardsArray.forEach(e=>{e.classList.remove("visible"),e.classList.remove("matched")})}flipCard(e){if(this.canFlipCard(e)){this.totalClicks++;var t=this.cardsArray.indexOf(e);this.thoughtPlaceHolder[t].innerText=this.thoughtsArray[t],this.thoughtPlaceHolder[t].style.display="block"}}cardMatch(e,t){this.matchedCards.push(e),this.matchedCards.push(t),e.classList.add("matched"),t.classList.add("matched"),this.audioController.match(),this.matchedCards.length===this.cardsArray.length&&this.victory()}cardMismatch(e,t){this.busy=!0,setTimeout(()=>{e.classList.remove("visible"),t.classList.remove("visible"),this.busy=!1},1e3)}shuffleCards(e,t){for(let t=e.length-1;t>0;t--){let s=Math.floor(Math.random()*(t+1));e[s].style.order=t,e[t].style.order=s}for(let e=t.length-1;e>0;e--){const s=Math.floor(Math.random()*(e+1));[t[e],t[s]]=[t[s],t[e]]}}getCardType(e){return e.getElementsByClassName("card-value")[0].src}canFlipCard(e){return!this.busy&&!this.matchedCards.includes(e)&&e!==this.cardToCheck}}function ready(){Array.from(document.getElementsByClassName("overlay-text"));let e=Array.from(document.getElementsByClassName("card")),t=Array.from(document.getElementsByClassName("thought"));for(const e of t)e.style.display="none";let s=new MixOrMatch(100,e,questions,t);s.startGame(),e.forEach(e=>{e.addEventListener("click",()=>{s.flipCard(e)})})}"loading"==document.readyState?document.addEventListener("DOMContentLoaded",ready):ready();