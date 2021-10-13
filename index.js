/*
*   Author: Andy Luu
*   Date: 10.13.21
*
*   Description: 
*
*/

$(document).ready(function(){

    $('span').hover(function(){
        $(this).parent().children('span').css("background-color", "green");
    }, function(){
        $(this).parent().children('span').css("background-color", "none");
    });

})