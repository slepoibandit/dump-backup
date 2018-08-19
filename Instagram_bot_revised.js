// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/explore/tags/*
// @grant        none
// ==/UserScript==

// start and stop home feed actions by pressing 'Shift+K'
// start and stop tagged recent posts actions by pressing 'Shift+L'
(function() {
  'use strict';

  function executeUserOrder(){
    let actionsPerCycle = 15; // amount of posts to interact with per cycle
    let currentStep = 0;
    let completed = JSON.parse(window.sessionStorage.getItem("completed")) || false; // read state if available
    let toggledOn = Boolean(window.sessionStorage.getItem("toggledOn")) || false;
    let options = JSON.parse(window.sessionStorage.getItem("options")) || 0;
    let orderComplete = Boolean(window.sessionStorage.getItem("orderComplete")) || false;
    function takeAction(){
      toggledOn = Boolean(window.sessionStorage.getItem("toggledOn")) || false;
      if (toggledOn && currentStep <= actionsPerCycle) {
        if (options.like && completed.likes*1.5 <= options.orderedTotal*1.5) {
          window.setTimeout(options.interval*1000, (e)=>{
            document.getElementsByClassName('coreSpriteHeartOpen')[0].click();
            completed.likes = JSON.parse(window.sessionStorage.getItem("completed"))["likes"]++;
            window.sessionStorage.setItem("completed", JSON.stringify(completed));
          });
        }
        if (options.follow && completed.follows <= options.orderedTotal) {
          if (document.getElementsByTagName("button")[0].innerHTML !== "Following") {
            document.getElementsByTagName("button")[0].click();
            completed.follows = JSON.parse(window.sessionStorage.getItem("completed"))["follows"]++;
            window.sessionStorage.setItem("completed", JSON.stringify(completed));
          }
        }
        if (options.comment && completed.comments <= options.orderedTotal) {
          window.setTimeout(options.interval*1000, (e)=>{
            // input comment
            completed.comments = JSON.parse(window.sessionStorage.getItem("completed"))["comments"]++;
            window.sessionStorage.setItem("completed", JSON.stringify(completed));
            window.setTimeout(options.interval*1000, (e)=>{
              document.getElementsByClassName('coreSpriteRightPaginationArrow')[0].click();
            });
          });
        }
        currentStep++;
      }
      else if (toggledOn) {
        window.getElementsByTagName("button")[5].click();
        let orderedOptions = Number(options.like) + Number(options.follow) + Number(options.comment);
        let completedOptions = 0;
        if (options.like && completed.likes === orderedTotal) {
          completedOptions++;
        }
        if (options.follow && completed.follows === orderedTotal) {
          completedOptions++;
        }
        if (options.comment && completed.comments === orderedTotal) {
          completedOptions++;
        }
        if (completedOptions === orderedOptions) {
          orderComplete = true;
          window.sessionStorage.setItem("orderComplete", true);
        }
        else {
          window.setTimeout(options.interval*1000, (e)=>{window.location.reload();});
        }
      }
    }
    if(!orderComplete && toggledOn && options){
      document.querySelectorAll('div[role=button]')[10].click();
      window.setInterval(options.interval*1000, takeAction);
    }
    window.addEventListener("storage", (e)=>{executeUserOrder();});
  }
  function handleUserOrder(){
    function registerToggle(e){
      if (e.shiftKey){
        if(e.key === "L" || e.key === "Д"){
          console.log("keydown registered!");
          let options = {
            like: true,
            follow: true,
            comment: false,
            orderedTotal: 30
          };
          let toggledOn = window.sessionStorage.getItem("toggledOn") || false;
          toggledOn = !toggledOn;
          window.sessionStorage.setItem("toggledOn", JSON.stringify(toggledOn));
          window.sessionStorage.setItem("options", JSON.stringify(options));
        }
      }
    }
    window.addEventListener("keydown", registerToggle);

  }

  executeUserOrder();
  handleUserOrder();
  // Your code here...
})();
