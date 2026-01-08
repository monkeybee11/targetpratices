var counter = 0
var timerr = 60
var bigtop = document.getElementById("bigtop");

import { DiscordSDK } from "https://cdn.jsdelivr.net/npm/@discord/embedded-app-sdk@latest/dist/embedded.esm.js";

const discordSdk = new DiscordSDK("1458866454769303716");

async function init() {
    await discordSdk.ready();
    console.log("Discord Activity Ready!");
}

init();

function squrt(target) {
	
	target.classList.add("wet");
	var splash = new Audio("sounds/398704__inspectorj__water-swirl-small-15.wav");
	splash.play();
	counter += 1
	const element = document.getElementById("score"); //JS is very stupid
	element.innerHTML = counter;

}

function bounes(catus) {
	catus.classList.add("catuswet");
	var splash = new Audio("sounds/341488__rocotilos__woo-hoo.wav");
	splash.play();
	counter += 5
	const element = document.getElementById("score");
	element.innerHTML = counter;
}

function splash(mirror) {
	mirror.classList.add("wet");
	var splash = new Audio("sounds/352105__inspectorj__splash-jumping-e.wav");
	splash.play();
	counter -= 1
	const element = document.getElementById("score"); //JS is very stupid
	element.innerHTML = counter;
}

function targetup(target) {

	target.classList.add("up");
	setTimeout( ()=> {
		target.classList.remove("up");
		target.classList.remove("wet");
	}, 3000);
}

function catusup(catus) {
	
	catus.classList.add("catusup");
	setTimeout( ()=> {
		catus.classList.remove("catusup");
		catus.classList.remove("catuswet");
	}, 3000);
}

function mirrorup(mirror) {

	mirror.classList.add("up");
	setTimeout( ()=> {
		mirror.classList.remove("up");
		mirror.classList.remove("wet");
	}, 3000);
}


//see what targets arnt soaked
function drytargets() {
	return document.querySelectorAll(".target:not(.wet)");
}

function drymirror() {
	return document.querySelectorAll(".mirror:not(.wet)");
}

function randomtargetup() {
	var randomtarget = Math.random() * drytargets().length; //randomly picks a dry taget
	randomtarget = Math.floor(randomtarget);
	var target = drytargets()[randomtarget];
	
	var randomDelay = Math.random() *2000 + 1000;
	
	setTimeout( ()=> {
		targetup(target);
		randomtargetup();
	}, randomDelay);
	
}

function randommirrorup() {
	var randommirror = Math.random() * drymirror().length;
	randommirror = Math.floor(randommirror);
	var mirror = drymirror()[randommirror];
	
	var randomDelay = Math.random() *1000 + 6000;
	
	setTimeout( ()=> {
		mirrorup(mirror);
		randommirrorup();
	}, randomDelay);
}

function drycatus() {
	return document.querySelectorAll(".catus:not(.catuswet)");
}

function randomcatusup() {
	var randomcatus = Math.random() * drycatus().length;
	randomcatus = Math.floor(randomcatus);
	var catus = drycatus()[randomcatus];
	
	var randomcatusDelay = Math.random() *30000 + 15000;
	
	setTimeout( ()=> {
		catusup(catus);
		randomcatusup();
	}, randomcatusDelay);
}


function gametimer() {
	setTimeout ( ()=> {
		timerr -=1
		const element = document.getElementById("timer"); //JS is very stupid
		element.innerHTML = timerr;
		gametimer()
	}, 1000);
	if (timerr <= 0) {
		timerr = 0
		background.classList.add("end");
		topcurten.classList.remove("topstart");
		topcurten.classList.add("topend");
		leftcurten.classList.remove("leftstart");
		leftcurten.classList.add("leftend");
		rightcurten.classList.remove("rightstart");
		rightcurten.classList.add("rightend");
		endboard.classList.add("showend");
		infoboard.classList.remove("infostart");
		infoboard.classList.add("infoend");
		timer.classList.remove("timerstarting");
		timer.classList.add("timerendding");
		score.classList.remove("scorestart");
		score1.classList.add("scoreendding");
		score.classList.add("scorestart1");
		const element = document.getElementById("score1"); //JS is very stupid
		element.innerHTML = counter;
	};
}

function start(prestart){
	startbutton.classList.remove("prestart");
	startbutton.classList.add("poststart");
	startboard.classList.add("starting");
	infoboard.classList.add("infostart");
	bigtop.play();
	bigtop.bolume= 0.5;
	score.classList.add("scorestart");
	timer.classList.add("timerstarting");
}

function volMAX(volMAX){
	bigtop.volume=1;
}

function volMID(volMID) {
	bigtop.volume = 0.5;
}

function volMUTE(volMUTE) {
	bigtop.volume= 0.0;
}


