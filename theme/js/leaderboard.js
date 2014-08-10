/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
/*jshint unused: false*/
(function( $ ) {
"use strict";

var isFrench = document.documentElement.lang === "fr",
	$leaderboard = $( "#leaderboard" ),
	table = "<table class='table table-bordered table-striped' data-wb-tables='{\"order\": [[ 2, \"desc\" ]]}'></table>",

	display = function() {
		var $leaderboardTable = $( table );

		$leaderboard.empty().append( $leaderboardTable );

		$leaderboardTable
			.sheetrock({
				url: "https://docs.google.com/spreadsheets/d/1IuFFuJQ3GUunynj4sw-8DfgHzsy_5Cn9a3-P3mCCuAI/gid=892764133",
				sql: "select A," + ( isFrench ?  "C" : "B" ) + ",D order by D desc",
				headers: 1,
				labels: [
					isFrench ? "Nom d'utilisateur GitHub" : "GitHub user name",
					isFrench ? "Type de contributeur" : "Contributor type",
					"Points"
				],
				resetStatus: true,
				userCallback: function() {
					var $tableBody = $leaderboardTable.children( "tbody" ),
						$firstColumnTd = $tableBody.find( "td:first-child" ),
						len = $firstColumnTd,
						td, tdHtml, i;

					// Make user names into links
					for ( i = 0; i !== len; i += 1 ) {
						td = $firstColumnTd[ i ];
						if ( td ) {
							tdHtml = td.innerHTML;
							td.innerHTML = "<a href='https://github.com/" + tdHtml + "'>" + tdHtml + "</a>";
						}	
					}
					$leaderboardTable
						.addClass( "wb-tables" )
						.trigger( "wb-init.wb-tables" );
				}
			});
	};

display();
//setInterval( display, 300000 );

})( jQuery );
