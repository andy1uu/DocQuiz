/*
*   Author: Andy Luu
*   Date: 12.23.21
*
*   Description: This is the javascript for the important sentences in the 
*                paragraphs of a document selector. It takes in arrays of 
*                sentences and creates sections that users can click and submit
*                with button functions.
*
*/

// 2D array that holds the arrays of sentences
paragraphs = [["Note: Students entering the PhD program prior to Spring 2020 are eligible to follow the old rules shown here, but are almost certain to prefer the current rules shown on this page.", "A student pursuing the Ph.D. degree is expected to exhibit a comprehensive knowledge of a broad cross section of the computer science discipline and to contribute significant new knowledge to the discipline through the research contribution contained in the doctoral dissertation.", "A PhD student must complete a minimum of 90 credits of graduate study, of which at least 27 must derive from graded courses, with a minimum GPA of 3.0. The PhD program is intended to be completed in about five years from entering the graduate program with a BS degree in Computer Science or a related field, or about four years if the student already has an MS degree in Computer Science or a related field.", "This is possible because students who begin the PhD program already in possession of a Masters may be able to count as many as four courses toward their course requirement (see section Transfer Credits)."],["To fulfill graduation requirements for the Ph.D. degree, students must satisfy the breadth requirement, adhere to an appropriate credit distribution, enroll in the graduate seminar, comply with the ethics requirement, and complete the major milestones for the degree, including the preliminary exam, research defense and final defense.", "To encourage Ph.D. graduates to exhibit sufficient breadth of computer science areas, Ph.D. students must take CS courses at the 5000 and 6000 levels that span four (4) different areas.", "Transfer courses may be used to satisfy the breadth requirement. The available courses and areas are listed here."]]

// Threshold of how much of a section can be selected, currently is 20% of the
// section
threshold = 0.2;

// Stores the current section number
currentSectionNum = 0;

// Stores the current number or characters selected
currentCharacterCount = 0;

// Stores the number of characters in the section
sectionCharacterCount = 0;

// Stores the decimal representation of the percentage of characters that are
// selected
percentageOfCharactersSelected = 0;

// Function that puts in the current section that we need into the web page
let putCurrentSection = function(sectionNum){

    // Empties the current section and resets the variables
    $("#current-section").empty();

    currentCharacterCount = 0;

    sectionCharacterCount = 0;

    percentageOfCharactersSelected = 0;

    // If there is still a section that can be put in for the user to select
    // sentences from
    if(sectionNum < paragraphs.length){

        // For loop that puts in each sentence into the HTML with a class that 
        // makes it selectable and an ID to represent the index of the sentence 
        // in the current array
        for(let currentSectionSentenceIndex = 0; currentSectionSentenceIndex < paragraphs[sectionNum].length; currentSectionSentenceIndex++){

            currentSentenceHTML = "<span class = \"selectable\"" + "id = "+currentSectionSentenceIndex+">"+ paragraphs[sectionNum][currentSectionSentenceIndex] + "</span>";

            $("#current-section").append(currentSentenceHTML + " ");

            // Updates the character count of the section
            sectionCharacterCount += paragraphs[sectionNum][currentSectionSentenceIndex].length;
        }

        // Disables the submit button initally
        $("#submit").prop('disabled', true);

        // Sets the function of the sentences to be able to be selected
        $(".selectable").click(function(){
    
            selectSentence($(this), currentSectionNum);
    
        });

    }
    else{
        
        // Tells the user that there is no more text to select and disables all
        // the buttons
        currentSentenceHTML = "<div class = \"no-more-sections\">There are no more sections to select.</div>";

        $("#current-section").append(currentSentenceHTML);

        $("#submit").prop('disabled', true);

        $("#increase-text-size").prop('disabled', true);

        $("#decrease-text-size").prop('disabled', true);

    }
}

let submitButtonFunction = function(){
    
    if(currentSectionNum < paragraphs.length){
        
        selectedSentences = new Map();

        currentSection = document.getElementsByClassName("selectable");

        console.log(paragraphs[currentSectionNum]);

        for (i = 0; i < currentSection.length; i++) {

            if(currentSection[i].classList.contains("selected")){
                selectedSentences.set(i, currentSection[i].innerText);
            }

        }

        console.log(selectedSentences);

        currentSectionNum++;

        putCurrentSection(currentSectionNum);
    }
    else{
        
        alert("There are no longer any sections of the document.");
        $("#submit").prop('disabled', true);
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

let selectSentence = function(element, sectionNum){

    //check if the threshold has been reached for the total number of words, do not allow selection
    if(percentageOfCharactersSelected <= threshold || element.hasClass("selected")){
        element.toggleClass("selected");

        if(element.hasClass("selected")){

            element.css("background-color", "yellow");
            //grabs sentence, get the number of characters from the setence, update the total characters selected
            currentCharacterCount += (paragraphs[sectionNum][parseInt(element.attr('id'))]).length;
            
            percentageOfCharactersSelected = currentCharacterCount/sectionCharacterCount;

            if(percentageOfCharactersSelected > threshold){
                $("#submit").prop('disabled', false);
            }
        }
        else{
            element.css("background-color", "");
            //opposite of selecting
            currentCharacterCount -= (paragraphs[sectionNum][parseInt(element.attr('id'))]).length;
            percentageOfCharactersSelected = currentCharacterCount/sectionCharacterCount;

            if(percentageOfCharactersSelected <= threshold){
                $("#submit").prop('disabled', true);
            }
        }

    }
    else{
        
        $("#no-more-selecting-warning").animate({opacity: 1}, 500);
        $("#no-more-selecting-warning").animate({opacity: 0}, 500);
    }
}

$(document).ready(function(){

    putCurrentSection(currentSectionNum);

    $("#increase-text-size").click(increaseTextSize);

    $("#decrease-text-size").click(decreaseTextSize);

    $("#submit").click(submitButtonFunction);

});