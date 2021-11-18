/*
*   Author: Andy Luu
*   Date: 10.13.21
*
*   Description: This is the javascript for the important parts 
*                of a document selector.
*
*/

//should take in a paragraph, which is then split into different sentences using some split function, make sure that you maintain ending punctuation, make sure to account for line breaks, Mr. , 

currentParagraph = "On a film set, a real-life tragedy has happened. Police say US actor Alec Baldwin fired a prop gun that killed cinematographer Halyna Hutchins and wounded director Joel Souza on a film set in New Mexico.\r\n They were working on the film Rust. Tributes have been paid to Ms Hutchins, 42, while Mr Baldwin is said to be distraught. One local paper found him in tears outside Santa Fe County Sheriff's Office. An investigation is under way and we don't yet know what went wrong. A spokesman for Mr Baldwin said there had been an accident on the set involving the misfire of a prop gun with blanks. Such incidents are rare and the news has stunned the film industry. The use of firearms on set is subject to stringent safety standards. \"On the film I recently made, even my plastic gun, I had to sign out, sign in every day,\" said Australian actor Rhys Muldoon. \"So that's why this particular case is so incredibly baffling.\" Mr. Chu was going to bed to get his Ph.D. at the U.S.A.";

edgeCases = ["Mr.", "Mrs.", "Ms.", "Dr.", "St.", "Inc.", "Ltd.", "Jr.", "Sr.", "Co.", ".com", ".gov", ".net", ".org", ".io"];

currentSection = currentParagraph.match( /[^\.!\?]+[\.!\?]+/g);

//need to split a section and maintain the formatting

threshold = 0.2;

currentCharacterCount = 0;

sectionCharacterCount = currentParagraph.length;

currentThreshold = currentCharacterCount/sectionCharacterCount;

let putCurrentSection = function(){

    $("#current-section").empty();

    for(let currentSectionSentenceIndex = 0; currentSectionSentenceIndex < currentSection.length; currentSectionSentenceIndex++){
        //Add an ID here using the index of the sentence for each sentence
        currentSentenceHTML = "<span class = \"selectable\"" + "id = "+currentSectionSentenceIndex+">"+ currentSection[currentSectionSentenceIndex] + "</span>";

        $("#current-section").append(currentSentenceHTML + " ");
    }
}

let loadNextSection = function(){

}

let submitButtonFunction = function(){
// Check if the threshold has been reached, return text, and array of the ids?


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

    //check if the threshold has been reached for the total number of words, do not allow selection
    if(currentThreshold <= threshold || $(this).hasClass("selected")){
        $(this).toggleClass("selected");
        if($(this).hasClass("selected")){
            $(this).css("background-color", "chartreuse");
            //grabs sentence, get the number of words from the setence, update the total words selected
            currentCharacterCount += currentSection[parseInt($(this).attr('id'))].length;
            currentThreshold = currentCharacterCount/sectionCharacterCount;
        }
        else{
            $(this).css("background-color", "");
            //opposite of selecting
            currentCharacterCount -= currentSection[parseInt($(this).attr('id'))].length;
            currentThreshold = currentCharacterCount/sectionCharacterCount;
        }
    }
    else{
        alert("You may not select anymore sentences!");
    }
}

$(document).ready(function(){

    putCurrentSection();

    $("#increase-text-size").click(increaseTextSize);

    $("#decrease-text-size").click(decreaseTextSize);

    $(".selectable").click(selectSentence);

})