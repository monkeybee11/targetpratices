var counter = 0;
var timerr = 60;
var bigtop;

const CLIENT_ID = "1458866454769303716";
let discordSdk = null;

// If you bundle the SDK (or include the UMD build from the same origin), DiscordSDK will be a global.
// If not present, we still run the game without SDK features.
if (window.DiscordSDK) {
  try {
    discordSdk = new window.DiscordSDK(CLIENT_ID);
  } catch (err) {
    console.warn("DiscordSDK exists but could not be constructed:", err);
  }
} else {
  console.info("DiscordSDK not found on window. Continuing without Discord integration.");
}

async function initDiscord() {
  if (!discordSdk) return;
  try {
    await discordSdk.ready();
    console.log("Discord Activity Ready!");

    const { code } = await discordSdk.commands.authorize({
      client_id: CLIENT_ID,
      response_type: "code",
      state: "",
      prompt: "none",
      scope: ["identify", "guilds", "applications.commands"],
    });

    const auth = await discordSdk.commands.authenticate({ code });
    console.log("Authenticated:", auth);

    const { input } = await discordSdk.commands.requestInput({ type: "mouse" });
    console.log("Mouse input enabled:", input);
    if (!input) {
      console.warn("Mouse input was not enabled. Clicks may not reach the activity in Discord.");
    }
  } catch (err) {
    console.error("Discord SDK init error:", err);
  }
}

// Game logic functions (no change in behavior)
function squrt(target) {
  if (!target) return;
  target.classList.add("wet");
  new Audio("sounds/398704__inspectorj__water-swirl-small-15.wav").play();
  counter += 1;
  const element = document.getElementById("score");
  if (element) element.innerHTML = counter;
}

function bounes(catus) {
  if (!catus) return;
  catus.classList.add("catuswet");
  new Audio("sounds/341488__rocotilos__woo-hoo.wav").play();
  counter += 5;
  const element = document.getElementById("score");
  if (element) element.innerHTML = counter;
}

function splash(mirror) {
  if (!mirror) return;
  mirror.classList.add("wet");
  new Audio("sounds/352105__inspectorj__splash-jumping-e.wav").play();
  counter -= 1;
  const element = document.getElementById("score");
  if (element) element.innerHTML = counter;
}

function targetup(target) {
  if (!target) return;
  target.classList.add("up");
  setTimeout(() => {
    target.classList.remove("up");
    target.classList.remove("wet");
  }, 3000);
}

function catusup(catus) {
  if (!catus) return;
  catus.classList.add("catusup");
  setTimeout(() => {
    catus.classList.remove("catusup");
    catus.classList.remove("catuswet");
  }, 3000);
}

function mirrorup(mirror) {
  if (!mirror) return;
  mirror.classList.add("up");
  setTimeout(() => {
    mirror.classList.remove("up");
    mirror.classList.remove("wet");
  }, 3000);
}

function drytargets() { return document.querySelectorAll(".target:not(.wet)"); }
function drymirror() { return document.querySelectorAll(".mirror:not(.wet)"); }
function drycatus() { return document.querySelectorAll(".catus:not(.catuswet)"); }

function randomtargetup() {
  const list = drytargets();
  if (list.length === 0) return;
  const idx = Math.floor(Math.random() * list.length);
  const target = list[idx];
  const delay = Math.random() * 2000 + 1000;
  setTimeout(() => {
    targetup(target);
    randomtargetup();
  }, delay);
}

function randommirrorup() {
  const list = drymirror();
  if (list.length === 0) return;
  const idx = Math.floor(Math.random() * list.length);
  const mirror = list[idx];
  const delay = Math.random() * 1000 + 6000;
  setTimeout(() => {
    mirrorup(mirror);
    randommirrorup();
  }, delay);
}

function randomcatusup() {
  const list = drycatus();
  if (list.length === 0) return;
  const idx = Math.floor(Math.random() * list.length);
  const catus = list[idx];
  const delay = Math.random() * 30000 + 15000;
  setTimeout(() => {
    catusup(catus);
    randomcatusup();
  }, delay);
}

function gametimer() {
  setTimeout(() => {
    timerr -= 1;
    const element = document.getElementById("timer");
    if (element) element.innerHTML = timerr;
    gametimer();
  }, 1000);

  if (timerr <= 0) {
    timerr = 0;
    const background = document.getElementById("background");
    if (background) background.classList.add("end");
    const topcurten = document.getElementById("topcurten");
    if (topcurten) {
      topcurten.classList.remove("topstart");
      topcurten.classList.add("topend");
    }
    const leftcurten = document.getElementById("leftcurten");
    if (leftcurten) {
      leftcurten.classList.remove("leftstart");
      leftcurten.classList.add("leftend");
    }
    const rightcurten = document.getElementById("rightcurten");
    if (rightcurten) {
      rightcurten.classList.remove("rightstart");
      rightcurten.classList.add("rightend");
    }
    const endboard = document.getElementById("endboard");
    if (endboard) endboard.classList.add("showend");
    const infoboard = document.getElementById("infoboard");
    if (infoboard) {
      infoboard.classList.remove("infostart");
      infoboard.classList.add("infoend");
    }
    const timerElem = document.getElementById("timer");
    if (timerElem) {
      timerElem.classList.remove("timerstarting");
      timerElem.classList.add("timerendding");
    }
    const score = document.getElementById("score");
    const score1 = document.getElementById("score1");
    if (score) {
      score.classList.remove("scorestart");
      score.classList.add("scorestart1");
    }
    if (score1) score1.innerHTML = counter;
  }
}

function start() {
  const startbutton = document.getElementById("startbutton");
  if (startbutton) {
    startbutton.classList.remove("prestart");
    startbutton.classList.add("poststart");
  }
  const startboard = document.getElementById("startboard");
  if (startboard) startboard.classList.add("starting");
  const infoboard = document.getElementById("infoboard");
  if (infoboard) infoboard.classList.add("infostart");
  if (bigtop) {
    bigtop.play();
    bigtop.volume = 0.5;
  }
  const score = document.getElementById("score");
  if (score) score.classList.add("scorestart");
  const timerElem = document.getElementById("timer");
  if (timerElem) timerElem.classList.add("timerstarting");
}

function volMAX() { if (bigtop) bigtop.volume = 1; }
function volMID() { if (bigtop) bigtop.volume = 0.5; }
function volMUTE() { if (bigtop) bigtop.volume = 0.0; }

// Attach listeners and initialize
document.addEventListener("DOMContentLoaded", () => {
  bigtop = document.getElementById("bigtop");

  // Start the random pop-ups
  randomtargetup();
  randommirrorup();
  randomcatusup();

  // Start game timer (do not start countdown until user presses start if desired)
  gametimer();

  // Delegated click handler (allowed by CSP)
  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".target, .mirror, .catus, #startbutton, .vol-max, .vol-mid, .vol-mute");
    if (!btn) return;
    if (btn.classList.contains("target")) return squrt(btn);
    if (btn.classList.contains("mirror")) return splash(btn);
    if (btn.classList.contains("catus")) return bounes(btn);
    if (btn.id === "startbutton" || btn.classList.contains("startbutton")) return start();
    if (btn.classList.contains("vol-max")) return volMAX();
    if (btn.classList.contains("vol-mid")) return volMID();
    if (btn.classList.contains("vol-mute")) return volMUTE();
  });

  // Initialize Discord SDK (if available)
  initDiscord();
});
