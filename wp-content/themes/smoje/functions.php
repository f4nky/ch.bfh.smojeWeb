<?php

function include_scripts() {
	wp_enqueue_script('jquery');
	wp_enqueue_script('jquery.validate', get_template_directory_uri() . '/js/jquery.validate.min.js');
	wp_enqueue_script('maps.googleapi', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDjzb731OMCmBZDYBSuXB0y1yN5srAzqvM');
	wp_enqueue_script('maps.google.marker', get_template_directory_uri() . '/js/googleMaps.js');
	wp_enqueue_script('custom.functions', get_template_directory_uri() . '/js/functions.js');
	wp_enqueue_script('custom.functions.contact', get_template_directory_uri() . '/js/functionsContact.js');
}

function include_styles() {
	wp_enqueue_style('style', get_template_directory_uri() . '/style.css');
	wp_enqueue_style('font.awesome', 'http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
}

add_action('wp_enqueue_scripts', 'include_scripts');
add_action('wp_print_styles', 'include_styles');