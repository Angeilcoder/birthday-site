document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     BIRTHDAY DATE
     ========================= */
  const birthday = new Date("2026-02-14T00:00:00");

  function lockHeartsByDate() {
    const now = new Date();
    const diff = birthday - now;
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    document.querySelectorAll(".heart").forEach(btn => {
      const day = parseInt(btn.dataset.day);
      if (day !== daysLeft) {
        btn.disabled = true;
        btn.style.opacity = "0.4";
        btn.style.cursor = "not-allowed";
      }
    });
  }

  lockHeartsByDate();

  /* =========================
     DAILY LOVE MESSAGES
     ========================= */
  const dailyMessages = {
    5: "HI PAPI...ITS 5 DAYS TILL YOUR BIRTHDAY!❤💋 najua huko excited but I am...about to make you laugh the entire week😂😂 in the meanwhile enjoy having a coding queen on your hands.. I love you MI REY💕🌹",
    4: "HEY MI AMOR...ITS 4 DAYS TILL YOUR BIRTHDAY!❤💋 najua unataka kusahau na mm siezi kubali usahau.... arghh I miss you my love ..if we were together we'd have bday sex for 7 days straight😂😂😂 I LOVE YOU MI CORAZON💕🌹",
    3: "HEY MI VIDA ... YES ITS 3 DAYS TILL YOUR BIRTHDAY!❤💋 lemme not lie it is very hard to come up with these little notes for you..but since you are always in my mind I dont mind 😂😂 ni kama na overdo sasa kaaiii😂😂considering january adi hukunipost anyway😂😂 I love you boo boo bear💕🌹",
    2: "HEY PAPISITO...ITS 2 DAYS TILL YOUR BIRTHDAY!❤💋 do you know I love you so much it took me 24 hours of pure code to make this website for you😂😂 hii weekend try getting some birthday kisses to say thanks adi msm😂😂 I LOVE YOU MI SENOR LUKA💕🌹",
    1: "HI MI CARINO...ITS 1 DAY TILL YOUR BIRTHDAY!❤💋 you may not be excited but I know you want to know what I have prepared for you...come back at midnight to see what I wrote for your birthday sweetheart😘 I love you MIS BEBES💕🌹"
  };

  /* =========================
     COUNTDOWN TIMER
     ========================= */
  const timerEl = document.getElementById("timer");
  const countdownSection = document.getElementById("countdown-section");
  const birthdaySection = document.getElementById("birthday-section");

  setInterval(() => {
    const now = new Date();
    const diff = birthday - now;

    if (diff <= 0) {
      countdownSection.classList.add("hidden");
      birthdaySection.classList.remove("hidden");
      launchConfetti();
      return;
    }

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff/(1000*60*60)) % 24);
    const minutes = Math.floor((diff/(1000*60)) % 60);
    const seconds = Math.floor((diff/1000) % 60);

    timerEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);

  /* =========================
     GAME SETUP
     ========================= */
  const emojis = ["💖","💖","🌹","🌹","😘","😘","🖤","🖤"];
  let flippedCards = [];
  let matchedPairs = 0;
  let currentDay = null;

  const gameSection = document.getElementById("game-section");
  const gameBoard = document.getElementById("game-board");

  document.querySelectorAll(".heart").forEach(btn => {
    btn.addEventListener("click", () => {
      currentDay = btn.dataset.day;
      startGame();
    });
  });

  function startGame() {
    gameSection.classList.remove("hidden");
    gameBoard.innerHTML = "";
    flippedCards = [];
    matchedPairs = 0;

    const shuffled = [...emojis].sort(() => 0.5 - Math.random());

    shuffled.forEach(emoji => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.emoji = emoji;
      card.innerText = "❓";
      card.addEventListener("click", () => flipCard(card));
      gameBoard.appendChild(card);
    });
  }

  function flipCard(card) {
    if (flippedCards.length === 2 || card.classList.contains("matched") || flippedCards.includes(card)) return;
    card.innerText = card.dataset.emoji;
    flippedCards.push(card);
    if (flippedCards.length === 2) checkMatch();
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedPairs++;
      flippedCards = [];
      if (matchedPairs === emojis.length/2) setTimeout(showMergedCard, 600);
    } else {
      setTimeout(() => { card1.innerText="❓"; card2.innerText="❓"; flippedCards=[]; }, 700);
    }
  }

  function showMergedCard() {
    gameBoard.innerHTML="";
    const bigCard=document.createElement("div");
    bigCard.classList.add("big-love-card");
    const message=dailyMessages[currentDay];
    let fontSize=18; if(message.length>200) fontSize=15; if(message.length>300) fontSize=14;
    bigCard.style.fontSize=fontSize+"px";
    bigCard.innerText=message;
    gameBoard.appendChild(bigCard);
  }

  window.closeGame = function(){ gameSection.classList.add("hidden"); }

  document.getElementById("birthday-button").addEventListener("click", ()=>{
    birthdaySection.classList.add("hidden");
    document.getElementById("content-section").classList.remove("hidden");
  });

  /* =========================
     CONTENT ICONS
     ========================= */
  window.openLetter = function() {
    document.getElementById("content-display").innerHTML="<h2>💌 My Letter</h2><p>You're the reason I believe in second chances. Thanks for loving me when I didn't love myself. You saw the broken pieces and helped me put them back together. Your love is my safe haven. Happy birthday to the one who saw me at my worst and wanted me at my best. I'm grateful for every laugh, every adventure, and every quiet moment we've shared. Here's to another year of love, growth, and making memories together. The lyrics to the song I upload always make me think of you. Long distance is a hard thing but Im willing to struggle, fix every fight, love you every way I can till your 1000th birthday. Praying for you to have very many birthday blessings and better lives with me obviously. I LOVE YOU SO MUCH MI CORAZON AND I HOPE YOU KNOW THAT❤❤💋FOREVER AND HAPPY HAPPY BIRTHDAY PAPIIII💕💕💕 </p>";
  }

  window.openRoses = function() {
    document.getElementById("content-display").innerHTML=`
      <button onclick="openRose('red')">🌹 Red Rose</button>
      <button onclick="openRose('pink')">🌸 Pink Rose</button>
      <button onclick="openRose('black')">🖤 Black Rose</button>
      <p>Tap a rose to see my love message</p>
    `;
  }

  window.openRose = function(color){
    const messages = {
      pink: "You are more than just a partner, you are my best friend. Thanks for being my rock, my confidant, and my partner in crime. I love our late-night talks, our silly jokes, and our deep conversations. You are the one I want to share all my secrets, dreams, and adventures with. I cherish the memories we have made and cant wait to make more. You are the friend everyone should be lucky to have and I am grateful you are mine 😊 I want to be your bestfriend in all your birthdays baby and I hope Im your bestfriend too.  ❤️",
      red: "My love, from the moment I met you, I knew you were mine. Your smile brightens my day, your touch sets my soul on fire, and your love fills my heart. You're the reason I believe in love, the reason I want to wake up every morning, and the reason I want to build a life with. I love the way you make me feel, the way you challenge me to be my best self, and the way you love me unconditionally. You're my forever, my always, and my everything. I love you more with each passing day, and forever won't be enough .Thank you for being my peace beiibyyyy🌸",
      black: "hii acha nisitumie english but I'll try😂Unfortunately you find me not a virgin BUT😂I have never seen anyone make me cum with just making out till I met my very hensamm man... I know I dont tell you this ever and you cant prove I didd but Im addicted to having sex with you...I mean unatoa wapi mtu wakukupea 5 orgasms.😂Like nimefika mahali I would be just happy having you inside me with your mouth all over my body or maybe my mouth full with you..I have so many sexual desires to try with you.. one of ur presents is you get anything you want in bed on sunday for 30 mins.DONT FORGET😂😜😘"
    };

    const petalsContainer = document.createElement("div");
    petalsContainer.classList.add("petals-container");
    for(let i=1;i<=5;i++){
      const petal=document.createElement("div");
      petal.classList.add("petal",color);
      petal.style.opacity=0;
      petal.style.transform="scale(0)";
      petalsContainer.appendChild(petal);
      setTimeout(()=>{ petal.style.opacity=1; petal.style.transform="scale(1)"; }, i*300);
    }

    const messageEl=document.createElement("p");
    messageEl.innerText=messages[color];

    const contentDisplay=document.getElementById("content-display");
    contentDisplay.innerHTML="";
    contentDisplay.appendChild(petalsContainer);
    contentDisplay.appendChild(messageEl);
  }

  window.playVoice = function(){
    document.getElementById("voiceNote").play();
  }

  window.openMusic = function(){
    window.open("https://youtu.be/1binSj1DYNo?si=LNJUYI5uCYMnrGku","_blank");
  }

});

function launchConfetti(){
  const canvas=document.getElementById("confetti");
  const ctx=canvas.getContext("2d");
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  const pieces=Array.from({length:150},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*6+4,dy:Math.random()*3+2}));
  function draw(){ ctx.clearRect(0,0,canvas.width,canvas.height); pieces.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=["#ff4d6d","#fff","#ffb3c1"][Math.floor(Math.random()*3)]; ctx.fill(); p.y+=p.dy; if(p.y>canvas.height) p.y=0; }); requestAnimationFrame(draw);}
  draw();
}
