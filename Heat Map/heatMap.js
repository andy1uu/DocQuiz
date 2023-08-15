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
paragraphs = [["Note: Students entering the PhD program prior to Spring 2020 are eligible to follow the old rules shown here, but are almost certain to prefer the current rules shown on this page.", "A student pursuing the Ph.D. degree is expected to exhibit a comprehensive knowledge of a broad cross section of the computer science discipline and to contribute significant new knowledge to the discipline through the research contribution contained in the doctoral dissertation.", "A PhD student must complete a minimum of 90 credits of graduate study, of which at least 27 must derive from graded courses, with a minimum GPA of 3.0.", "The PhD program is intended to be completed in about five years from entering the graduate program with a BS degree in Computer Science or a related field, or about four years if the student already has an MS degree in Computer Science or a related field.", "This is possible because students who begin the PhD program already in possession of a Masters may be able to count as many as four courses toward their course requirement (see section Transfer Credits)."],["To fulfill graduation requirements for the Ph.D. degree, students must satisfy the breadth requirement, adhere to an appropriate credit distribution, enroll in the graduate seminar, comply with the ethics requirement, and complete the major milestones for the degree, including the preliminary exam, research defense and final defense.", "To encourage Ph.D. graduates to exhibit sufficient breadth of computer science areas, Ph.D. students must take CS courses at the 5000 and 6000 levels that span four (4) different areas.", "Transfer courses may be used to satisfy the breadth requirement. The available courses and areas are listed here."]]

let currentSectionNum = 0;

// Benefit of Context
// divide all by the max num of hits for one sentence, white is least important, black is most importance 
// after the first sentence question is made, recalculate

// database has sentence, num times hit, importance

// Function that puts in the current section that we need into the web page
let putCurrentSection = function(sectionNum){

    // For loop that puts in each sentence into the HTML with a class that 
    // makes it selectable and an ID to represent the index of the sentence 
    // in the current array
    for(let currentSectionSentenceIndex = 0; currentSectionSentenceIndex < paragraphs[sectionNum].length; currentSectionSentenceIndex++){

        currentSentenceHTML = "<span id = "+currentSectionSentenceIndex+">"+ paragraphs[sectionNum][currentSectionSentenceIndex] + "</span>";

        $("#heat-map").append(currentSentenceHTML + " ");

    }
}

$(document).ready(function(){

    putCurrentSection(currentSectionNum);

    $("#increase-text-size").click(increaseTextSize);

    $("#decrease-text-size").click(decreaseTextSize);

});