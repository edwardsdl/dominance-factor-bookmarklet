javascript: (function (callback) {
	if (typeof jQuery == "undefined") {
		var element = document.createElement("script");
		element.type = "text/javascript";
		element.onload = callback;
		element.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.9/jquery.min.js";
		document.body.appendChild(element);
	} else {
		callback();
	}
})(function () {
	if(window.location.hostname.toLowerCase().indexOf('lolking.net') < 0)
		return;

	var totalDominanceFactor = 0;
	var averageDominanceFactor = 0;
	var lowestDominanceFactor = 0;
	var highestDominanceFactor = 0;
	var $matches = $('.match_details:contains("5v5") .match_details_cell:contains("Kills") div');
	
	$matches.each(function () {
		var kills = $(this).children("strong:eq(0)").text();
		var deaths = $(this).children("strong:eq(1)").text();
		var assists = $(this).children("strong:eq(2)").text();
		var dominanceFactor = (kills * 2) - (deaths * 3) + (assists * 1);
		totalDominanceFactor += dominanceFactor;
		if (lowestDominanceFactor == 0 || lowestDominanceFactor > dominanceFactor) {
			lowestDominanceFactor = dominanceFactor;
		}
		if (highestDominanceFactor == 0 || highestDominanceFactor < dominanceFactor) {
			highestDominanceFactor = dominanceFactor;
		}
	});
	
	averageDominanceFactor = totalDominanceFactor / $matches.length;

	var totalRankedMatches = 0;
	var rankedTotalDominanceFactor = 0;
	var rankedAverageDominanceFactor = 0;
	var rankedBestCharacter = '';
	var rankedBestCharacterAverageDominanceFactor = 0;
	var rankedWorstCharacter = '';
	var rankedWorstCharacterAverageDominanceFactor = 0;
	/* Loop through for each character */
	$('#ranked_stats tbody tr').each(function () {
		var character = $(this).find("td").eq(0).attr('data-sortval');
		var wins = $(this).find("td").eq(1).html();
		var losses = $(this).find("td").eq(2).html();
		var rankedGames = Number(wins) + Number(losses);
		var kills = parseFloat($(this).find("td").eq(5).html());
		var deaths = parseFloat($(this).find("td").eq(6).html());
		var assists = parseFloat($(this).find("td").eq(7).html());
		var averageDominanceFactor = (kills * 2) - (deaths * 3) + (assists * 1);
		var dominanceFactor = rankedBestCharacterAverageDominanceFactor * rankedGames;
		rankedTotalDominanceFactor += dominanceFactor;
		totalRankedMatches += rankedGames;
		if(rankedWorstCharacterAverageDominanceFactor == 0 || rankedWorstCharacterAverageDominanceFactor > averageDominanceFactor)
		{
			rankedWorstCharacter = character;
			rankedWorstCharacterAverageDominanceFactor = averageDominanceFactor;
		}
		if(rankedBestCharacterAverageDominanceFactor == 0 || rankedBestCharacterAverageDominanceFactor < averageDominanceFactor)
		{
			rankedBestCharacter = character;
			rankedBestCharacterAverageDominanceFactor = averageDominanceFactor;
		}
	 });
	 
	rankedAverageDominanceFactor = rankedTotalDominanceFactor / totalRankedMatches;

	alert(
		'<ul class="tabs2">' +
			'<li class="selected" style="margin-left: 0px;"><a href="#" id="ShowRecentGames" class="StatsTab">Recent</a></li>' +
			'<li><a href="#" id="ShowRankedGames"class="StatsTab">Ranked</a></li>' +
		'</ul>' +
		'<div class="tabs2_container pane" style="text-align:left;">' + 
			'<div id="RecentGames" class="StatsPage" style="padding-left:10px; padding-bottom:3px;">' + 
				"Games: " + $matches.length + "<br/>" +
				"Score: " + totalDominanceFactor.toFixed(0) + "<br/>" +
				"Average: " + averageDominanceFactor.toFixed(0) + "<br/>" +
				"Lowest: " + lowestDominanceFactor.toFixed(0) + "<br/>" +
				"Highest: " + highestDominanceFactor.toFixed(0) + "<br/>" +
			'</div>' +
			'<div id="RankedGames" class="StatsPage" style="display: none; padding-left:10px; padding-bottom:3px;">' +
				"Ranked Games: " + totalRankedMatches + "<br/>" +
				"Ranked Score: " + rankedTotalDominanceFactor.toFixed(0) + "<br/>" +
				"Ranked Average: " + rankedAverageDominanceFactor.toFixed(0) + "<br/>" +
				"Ranked Best: " + rankedBestCharacter + " (" + rankedBestCharacterAverageDominanceFactor.toFixed(0) + ")<br/>" +
				"Ranked Worst: " + rankedWorstCharacter + " (" + rankedWorstCharacterAverageDominanceFactor.toFixed(0) + ")<br/>" +
			'</div>' +
		'</div>'
		);
});
 
$("#ShowRecentGames").live('click', function(event) {
	$('.StatsPage').hide();
	$('.StatsTab').parent().removeClass('selected');
	
	$('#RecentGames').show();
	$('#ShowRecentGames').parent().addClass('selected');
	
	event.preventDefault();
});
$("#ShowRankedGames").live('click', function(event) {
	$('.StatsPage').hide();
	$('.StatsTab').parent().removeClass('selected');
	
	$('#RankedGames').show();
	$('#ShowRankedGames').parent().addClass('selected');
	
	event.preventDefault();
});
