 javascript: (function (callback) {
     if (typeof jQuery == "undefined") {
         var element = document.createElement("script");
         element.type = "text/javascript";
         element.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js";
         element.onload = callback;
         document.body.appendChild(element)
     } else {
         callback()
     }
 })(function () {
     var i = 0;
     var totalDominanceFactor = 0;
     var averageDominanceFactor = 0;
     var lowestDominanceFactor = 0;
     var highestDominanceFactor = 0;
     $('.match_details:contains("5v5") .match_details_cell:contains("Kills") div').each(function () {
         var kills = $(this).children("strong:eq(0)").text();
         var deaths = $(this).children("strong:eq(1)").text();
         var assists = $(this).children("strong:eq(2)").text();
         var dominanceFactor = (kills * 2) - (deaths * 3) + (assists * 1);
         totalDominanceFactor += dominanceFactor;
         i++;
         averageDominanceFactor = Math.round(totalDominanceFactor / i, -1);
         if (lowestDominanceFactor == 0 || lowestDominanceFactor > dominanceFactor) {
             lowestDominanceFactor = dominanceFactor
         }
         if (highestDominanceFactor == 0 || highestDominanceFactor < dominanceFactor) {
             highestDominanceFactor = dominanceFactor
         }
     });
     alert("Score: " + totalDominanceFactor + "<br/>Average: " + averageDominanceFactor + "<br/>Lowest: " + lowestDominanceFactor + "<br/>Highest: " + highestDominanceFactor)
 });
