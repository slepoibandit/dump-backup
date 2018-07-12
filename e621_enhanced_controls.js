// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *621.net/*
// @include      *621.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const input_field = document.getElementById('tags');
    const fav_btn = document.getElementById('add-to-favs');
    const vote_btn = document.getElementById('voteup');

    function returnArtistName(){
        if(document.getElementsByClassName('tag-type-artist')){
            if(document.getElementsByClassName('tag-type-artist')[0].children[1].innerHTML !== 'conditional dnp'){
                const artist_page = document.getElementsByClassName('tag-type-artist')[0].children[1].href + '+-fav:blindvolk';
                return artist_page;
            }
            else{
                const artist_page = document.getElementsByClassName('tag-type-artist')[1].children[1].href + '+-fav:blindvolk';
                return artist_page;
            }
        }
    }

    function handleKeyDown(e){
    if(e.ctrlKey && e.shiftKey && e.key === "ArrowUp"){
        fav_btn.children[0].click();
        vote_btn.click();
        }
    if(e.ctrlKey && e.shiftKey && e.key === "Home"){
        document.location = "https://e621.net/post/index/1/score:%3E100%20-fav:blindvolk";
       }
    if(e.ctrlKey && e.shiftKey && e.key === "End"){
        console.log(returnArtistName());
        document.location = returnArtistName();
       }
    }

    document.addEventListener('keydown', handleKeyDown);
    // Your code here...
})();