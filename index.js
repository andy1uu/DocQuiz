/*
*   Author: Andy Luu
*   Date: 10.13.21
*
*   Description: This is the javascript for the important parts 
*                of a document selector.
*
*/

currentSection = ["This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence.", "This is an example sentence."];

let putCurrentSection = function(){

    $("#current-section").empty();

    for(let currentSectionSentenceIndex = 0; currentSectionSentenceIndex < currentSection.length; currentSectionSentenceIndex++){
    
        currentSentenceHTML = "<span class = \"selectable\">" + currentSection[currentSectionSentenceIndex] + "</span>";

        $("#current-section").append(currentSentenceHTML + " ");
    }
}

let increaseTextSize = function(){
    
} 

let decreaseTextSize = function(){
    
}

let selectSentence = function(){
    $(this).toggleClass("selected");
}

$(document).ready(function(){

    putCurrentSection();

    $("#increase-text-size").click(increaseTextSize);

    $("#decrease-text-size").click(decreaseTextSize);

    $(".selectable").click(selectSentence);

})