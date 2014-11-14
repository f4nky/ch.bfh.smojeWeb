jQuery(document).ready(function() {
	fadeContainer();
});

/* ****************************************
	Fade Toggle container when opening menu
**************************************** */
function fadeContainer() {
	jQuery('.navbar-toggle').click(function($) {
		$('.container').toggleClass('faded');
		$('.map-holder-big, .map-holder-small').toggleClass('faded');
	});
}