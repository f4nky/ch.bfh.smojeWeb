<?php

function include_scripts() {
	wp_register_script('jquery.validate', get_template_directory_uri() . '/js/jquery.validate.min.js');
	wp_register_script('maps.googleapi', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDjzb731OMCmBZDYBSuXB0y1yN5srAzqvM');
	wp_register_script('maps.google.marker', get_template_directory_uri() . '/js/googleMaps.js');
	wp_register_script('custom.functions', get_template_directory_uri() . '/js/functions.js');
	wp_register_script('custom.functions.contact', get_template_directory_uri() . '/js/functionsContact.js');

	//wp_enqueue_scripts('jquery.validate');
	//wp_enqueue_scripts('maps.googleapi');
	//wp_enqueue_scripts('maps.google.marker');
	//wp_enqueue_scripts('custom.functions');
	//wp_enqueue_scripts('custom.functions.contact');
}

function include_styles() {
	wp_register_style('style', get_template_directory_uri() . '/style.css');
	wp_register_style('font.awesome', 'http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
	
	wp_enqueue_style('style');
	wp_enqueue_style('font.awesome');
}

add_action('wp_enqueue_scripts', 'include_scripts');
add_action('wp_print_styles', 'include_styles');