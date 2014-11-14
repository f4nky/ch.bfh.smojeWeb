jQuery(document).ready(function() {
	fadeContainer();
});

/* ****************************************
	Fade Toggle container when opening menu
**************************************** */
function fadeContainer($) {
	jQuery('.navbar-toggle').click(function() {
		jQuery('.container').toggleClass('faded');
		jQuery('.map-holder-big, .map-holder-small').toggleClass('faded');
	});
}