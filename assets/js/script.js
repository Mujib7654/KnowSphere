'use strict';



/**
 * element toggle function
 */

const toggleElem = function (elem) { elem.classList.toggle("active"); }



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

for (let i = 0; i < navTogglers.length; i++) {
  navTogglers[i].addEventListener("click", function () {
    toggleElem(navbar);
    toggleElem(overlay);
  });
}



/**
 * header sticky & back to top button
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    header.classList.add("header-anim");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
    header.classList.remove("header-anim");
  }
});



/**
 * search box toggle
 */

const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const searchBox = document.querySelector("[data-search-box]");

for (let i = 0; i < searchTogglers.length; i++) {
  searchTogglers[i].addEventListener("click", function () {
    toggleElem(searchBox);
  });
}



/**
 * whishlist button toggle
 */

const whishlistBtns = document.querySelectorAll("[data-whish-btn]");

for (let i = 0; i < whishlistBtns.length; i++) {
  whishlistBtns[i].addEventListener("click", function () {
    toggleElem(this);
  });
}


// login and dashboard hidden function
//middleware

const loginBtn = document.getElementById("login-btn");
const dashboardBtn = document.getElementById("dashboard-btn");
const checkAuthLive = document.getElementById("checkAuthLive");
const checkAuthBot = document.getElementById("myButtonLink");
const checkauthMentor = document.getElementById("myButtonLink1");

//quiz
const blockchain = document.getElementById("blockchain");
const graphic = document.getElementById("graphic");
const react = document.getElementById("react");
const fullstack = document.getElementById("fullstack");
const mern = document.getElementById("mern");
const android = document.getElementById("android");

const isLoggedIn = window.localStorage.getItem("user");

if (isLoggedIn) {

  loginBtn.style.display = "none";
  dashboardBtn.style.display = "block";
  checkAuthLive.href = './SphereMeet/lobby.html';
  checkAuthBot.href = "./chatbot/chatbot.html";
  checkauthMentor.href = "./mentor_doubt/doubt.html";

  //quiz
  blockchain.href = "./quiz/blockchain.html";
  graphic.href = "./quiz/graphic.html";
  react.href = "./quiz/react.html";
  fullstack.href = "./quiz/fullstack.html";
  mern.href = "./quiz/mern.html";
  android.href = "./quiz/android.html";
} else {

  loginBtn.style.display = "block";
  dashboardBtn.style.display = "none";
  checkAuthLive.href = 'login.html';
  checkAuthBot.href = 'login.html';
  checkauthMentor.href = 'login.html';

  //quiz
  blockchain.href = "login.html";
  graphic.href = "login.html";
  react.href = "login.html";
  fullstack.href = "login.html";
  mern.href = "login.html";
  android.href = "login.html";
}





