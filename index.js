/*
*   Author: Andy Luu
*   Date: 10.13.21
*
*   Description: 
*
*/

let toggleHighlighting = function(){
    $('span').css("background-color", "green");
}

$(document).ready(function(){

    $('span').toggleHighlighting();

}