/*
*   Author: Andy Luu
*   Date: 10.13.21
*
*   Description: This is the javascript for the important parts 
*                of a document selector.
*
*/

//should take in a paragraph, which is then split into different sentences using some split function, make sure that you maintain ending punctuation, make sure to account for line breaks, Mr. , 

currentParagraph = "Note: Students entering the PhD program prior to Spring 2020 are eligible to follow the old rules shown here, but are almost certain to prefer the current rules shown on this page. A student pursuing the Ph.D. degree is expected to exhibit a comprehensive knowledge of a broad cross section of the computer science discipline and to contribute significant new knowledge to the discipline through the research contribution contained in the doctoral dissertation. A PhD student must complete a minimum of 90 credits of graduate study, of which at least 27 must derive from graded courses, with a minimum GPA of 3.0. The PhD program is intended to be completed in about five years from entering the graduate program with a BS degree in Computer Science or a related field, or about four years if the student already has an MS degree in Computer Science or a related field. This is possible because students who begin the PhD program already in possession of a Masters may be able to count as many as four courses toward their course requirement (see section Transfer Credits). To fulfill graduation requirements for the Ph.D. degree, students must satisfy the breadth requirement, adhere to an appropriate credit distribution, enroll in the graduate seminar, comply with the ethics requirement, and complete the major milestones for the degree, including the preliminary exam, research defense and final defense.";

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
    
    selectedSentences = "";

    spans = document.getElementsByTagName('span');

    for (i = 0; i < spans.length; i++) {
        spanClass = spans[i].getAttribute("class"); 
        if (spanClass == "selectable selected") { 
            console.log(spans[i]);
        }
    }
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

        $("#submit").prop('disabled', true);

    }
    else{
        alert("You may not select anymore sentences!");

        $("#submit").prop('disabled', false);
    }
}

$(document).ready(function(){

    putCurrentSection();

    $("#increase-text-size").click(increaseTextSize);

    $("#decrease-text-size").click(decreaseTextSize);

    $("#submit").click(submitButtonFunction);

    $("#submit").prop('disabled', true);

    $(".selectable").click(selectSentence);

})