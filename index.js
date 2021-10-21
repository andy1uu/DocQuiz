/*
*   Author: Andy Luu
*   Date: 10.13.21
*
*   Description: This is the javascript for the important parts 
*                of a document selector.
*
*/

currentSection = ["This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence."];

currentCharacterCount = 0;

sectionCharacterCount = 0;

defaultTextSize = 16;

let putCurrentSection = function(){

    $("#current-section").empty();

    for(let currentSectionSentenceIndex = 0; currentSectionSentenceIndex < currentSection.length; currentSectionSentenceIndex++){
    
        currentSentenceHTML = "<span class = \"selectable\">" + currentSection[currentSectionSentenceIndex] + "</span>";

        $("#current-section").append(currentSentenceHTML + " ");
    }
}

let loadNextSection = function(){

}

let submitButtonFunction = function(){

}

let increaseTextSize = function(){
    var text = document.getElementById('current-section');
    var style = window.getComputedStyle(text, null).getPropertyValue('font-size');
    var currentSize = parseFloat(style);
    text.style.fontSize = (currentSize + 1) + 'px';
} 

let decreaseTextSize = function(){
    var text = document.getElementById('current-section');
    var style = window.getComputedStyle(text, null).getPropertyValue('font-size');
    var currentSize = parseFloat(style);
    text.style.fontSize = (currentSize - 1) + 'px';

}

let selectSentence = function(){

    $(this).toggleClass("selected");
    if($(this).hasClass("selected")){
        $(this).css("background-color", "chartreuse");
    }
    else{
        $(this).css("background-color", "");
    }
}

$(document).ready(function(){

    putCurrentSection();

    $("#increase-text-size").click(increaseTextSize);

    $("#decrease-text-size").click(decreaseTextSize);

    $(".selectable").click(selectSentence);

})