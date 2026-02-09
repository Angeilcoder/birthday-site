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
     DAILY LOVE MESSAGES 💌
     ========================= */
  const dailyMessages = {
    5: "HI PAPI...ITS 5 DAYS TILL YOUR BIRTHDAY!❤💋 najua huko excited but I am...about to make you laugh the entire week😂😂 in the meanwhile enjoy having a coding queen on your hands.. I love you MI REY💕🌹",

    4: "HEY MI AMOR...ITS 4 DAYS TILL YOUR BIRTHDAY!❤💋 najua unataka kusahau na mm siezi kubali usahau.... arghh I miss you my love ..if we were together we'd have bday sex for 7 days straight😂😂😂 I LOVE YOU MI CORAZON💕🌹",

    3: "HEY MI VIDA ... YES ITS 3 DAYS TILL YOUR BIRTHDAY!❤💋 lemme not lie it is very hard to come up with these little notes for you..but since you are always in my mind I dont mind 😂😂 I love you boo boo bear💕🌹",

    2: "HEY PAPISITO...ITS 2 DAYS TILL YOUR BIRTHDAY!❤💋 do you know I love you so much it took me 24 hours of pure code to make this website for you😂😂 hii weekend try getting some birthday kisses to thank adi😂😂 I LOVE YOU MI SENOR LUKA💕🌹",

    1: "HI MI CARINO...ITS 1 DAY TILL YOUR BIRTHDAY!❤💋 you may not be excited but I know you want what I have prepared for you...lakini mbona uzaliwe valentines😂😂😂 sasa ntakuwish gani... I love you MIS BEBES💕🌹"
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

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

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

  /* =========================
     HEART BUTTONS ❤️
     ========================= */
  document.querySelectorAll(".heart").forEach(btn => {
    btn.addEventListener("click", () => {
      currentDay = btn.dataset.day;
      startGame();
    });
  });

  /* =========================
     START GAME
     ========================= */
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

  /* =========================
     CARD LOGIC
     ========================= */
  function flipCard(card) {
    if (
      flippedCards.length === 2 ||
      card.classList.contains("matched") ||
      flippedCards.includes(card)
    ) return;

    card.innerText = card.dataset.emoji;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedPairs++;
      flippedCards = [];

      if (matchedPairs === emojis.length / 2) {
        setTimeout(showMergedCard, 600);
      }
    } else {
      setTimeout(() => {
        card1.innerText = "❓";
        card2.innerText = "❓";
        flippedCards = [];
      }, 700);
    }
  }

  /* =========================
     MERGED MESSAGE 💖
     ========================= */
  function showMergedCard() {
  gameBoard.innerHTML = "";

  const bigCard = document.createElement("div");
  bigCard.classList.add("big-love-card");

  const message = dailyMessages[currentDay];

  // 🔥 Dynamic font size based on message length
  let fontSize = 18; // default size

  if (message.length > 200) fontSize = 15;
  if (message.length > 300) fontSize = 14;

  // Mobile-first styling
  bigCard.style.width = "90%";
  bigCard.style.maxWidth = "400px";
  bigCard.style.minHeight = "180px";
  bigCard.style.margin = "20px auto";
  bigCard.style.background = "#ff4d6d";
  bigCard.style.borderRadius = "20px";
  bigCard.style.display = "flex";
  bigCard.style.alignItems = "center";
  bigCard.style.justifyContent = "center";
  bigCard.style.textAlign = "center";
  bigCard.style.padding = "15px";
  bigCard.style.fontSize = fontSize + "px";
  bigCard.style.lineHeight = "1.4";
  bigCard.style.color = "white";
  bigCard.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
  bigCard.style.wordWrap = "break-word";

  // Insert the message
  bigCard.innerText = message;

  gameBoard.appendChild(bigCard);
}



  /* =========================
     CLOSE GAME
     ========================= */
  window.closeGame = function () {
    gameSection.classList.add("hidden");
  };

  /* =========================
     BIRTHDAY BUTTON 🎉
     ========================= */
  document.getElementById("birthday-button").addEventListener("click", () => {
    birthdaySection.classList.add("hidden");
    document.getElementById("content-section").classList.remove("hidden");
  });

  /* =========================
     CONTENT ICONS
     ========================= */
  window.openLetter = function () {
    document.getElementById("content-display").innerHTML =
      "<h2>💌 My Letter</h2><p>WRITE YOUR LETTER HERE</p>";
  };

  window.openRoses = function () {
  document.getElementById("content-display").innerHTML = `
    <div class="rose red" onclick="openRose('red')"></div>
    <div class="rose pink" onclick="openRose('pink')"></div>
    <div class="rose black" onclick="openRose('black')"></div>
    <p>Tap a rose 🌹</p>
  `;
};

window.openRose = function (color) {
  const messages = {
    red: "PUT RED ROSE MESSAGE HERE",
    pink: "PUT PINK ROSE MESSAGE HERE",
    black: "PUT BLACK ROSE MESSAGE HERE"
  };

  document.getElementById("content-display").innerHTML = `
    <div class="rose opened ${color}"></div>
    <p>${messages[color]}</p>
  `;
};

  window.openMusic = function () {
    window.open("https://www.youtube.chttps://youtu.be/1binSj1DYNo?si=LNJUYI5uCYMnrGku", "_blank");
  };

});

function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    dy: Math.random() * 3 + 2
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = ["#ff4d6d", "#fff", "#ffb3c1"][Math.floor(Math.random()*3)];
      ctx.fill();
      p.y += p.dy;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(draw);
  }

  draw();
}

