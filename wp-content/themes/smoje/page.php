<?php get_header(); ?>
		
		<div id="map-holder" class="map-holder-small"></div>
		<div class="container">
			<?php if (have_posts()) : while(have_posts()) : the_post(); ?>
			<div class="row">
				<div class="col-xs-12">
					<h1><?php the_title(); ?></h1>
				</div>
			</div>
			<div class="row">
				<p><?php the_content(); ?></p>
			</div>
			<?php endwhile; endif; ?>
		</div>

<?php get_footer(); ?>