// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/*
// @grant        none
// ==/UserScript==

// start and stop by pressing 'Shift+K'
(function() {
    'use strict';

    let toggled;
    let tickInterval;
    let actionsCounter = 0;
    function scrollFeed(interval=1000){
        let articleElement = document.getElementsByTagName('article')[0];
        function moveArticle(){
            articleElement = articleElement.nextElementSibling;
            articleElement.scrollIntoView();
        }
        let tickInterval = window.setInterval(moveArticle, interval);
        return tickInterval;
    }
    function stopScroll(interval){
        window.clearInterval(interval);
    }
    function slideRecentPosts(tag='moscow', interval=1000){
        function startExploring(){
            function slideRight(){
                function clickTheArrow(){
                    rightArrow.click();
                    console.log('Clicked the arrow!');
                    actionsCounter++;
                    console.log(actionsCounter);
                    if(actionsCounter === 14){
                        stopScroll(tickInterval);
                        let actionsCount = sessionStorage.getItem('actionsCount');
                        actionsCount = Number(actionsCount) + actionsCounter + 1;
                        sessionStorage.setItem('actionsCount', actionsCount);
                        console.log(`This cycle's count is: ${actionsCount}`);
                        window.location = "https://www.instagram.com/explore/tags/москва";
                    }
                }
                let rightArrow = document.getElementsByClassName('coreSpriteRightPaginationArrow')[0];
                tickInterval = window.setInterval(clickTheArrow, interval);
            }
            console.log('Page successfully opened! Clicking the image..');
            let image = document.querySelectorAll('div[role=button]')[10];
            image.click();
            console.log('Clicked the image successfully! Starting to slide..');
            let pauseBit = window.setTimeout(slideRight, 10000);
        }
        console.log('starting...');
        //         window.location = `https://www.instagram.com/explore/tags/${tag}`;
        let timeOut = window.setTimeout(startExploring, 10000);
    }
    function toggleBot(e){
        if(e.shiftKey){
            //             if(e.key === 'K' || e.key === 'Л'){
            //                 if(!toggled){
            //                     tickInterval = scrollFeed(3000);
            //                     toggled = true;
            //                 }
            //                 else{
            //                     stopScroll(tickInterval);
            //                 }
            //             }
            if(e.key === 'L' || e.key === 'Д'){
                if(!toggled){
                    toggled = true;
                    sessionStorage.setItem('toggled', toggled);
                    slideRecentPosts('москва', 5000);
                }
                else{
                    toggled = false;
                    sessionStorage.setItem('toggled', toggled);
                    stopScroll(tickInterval);
                }
            }
        }
    }
    if(!sessionStorage.getItem('toggled')){
        toggled = false;
    }
    else{
        toggled = Boolean(sessionStorage.getItem('toggled'));
    }
    if(toggled){
        slideRecentPosts('москва', 5000);
    }
    else{
        stopScroll(tickInterval);
    }
    document.addEventListener('keydown', toggleBot);
    // Your code here...
})();