<?php
/*
Template Name: Details
*/
?>

<?php get_header(); ?>
		
		<div id="map-holder" class="banner"></div>
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<h1><?php the_title(); ?></h1>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<h2>Sensorwerte</h2>
					<form id="contact-form" role="form" novalidate="novalidate">
						<div class="form-group">
							<div class="checkbox">
								<label><input type="checkbox"> Smoje 1</label>
								<label><input type="checkbox"> Smoje 2</label>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<ul class="nav nav-pills">
						<li role="presentation" class="active"><a href="#lufttemperatur" data-toggle="tab">Lufttemperatur</a></li>
						<li role="presentation"><a href="#wassertemperatur" data-toggle="tab">Wassertemperatur</a></li>
						<li role="presentation"><a href="#">Windgeschwindigkeit</a></li>
					</ul>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<div class="tab-content">
						<div class="tab-pane active" id="lufttemperatur">
							<h3>Test</h3>
							<p>Lorem ipsum</p>
						</div>
						<div class="tab-pane" id="wassertemperatur">
							<h3>Lorem ipsum</h3>
							<p>Test</p>
						</div>
					</div>
				</div>
			</div>
		</div>

<?php get_footer(); ?>