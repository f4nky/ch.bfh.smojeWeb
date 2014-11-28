<?php

header('Content-Type: text/html; charset=utf-8');
require_once("smoje.class.php");
	
$smoje = new Smoje($_GET["id"]);

?>

<div class="container">
	<div class="row">
		<div class="col-xs-12">
			<div id="btn-close-detail-holder">
				<button class="btn btn-default" id="btn-close-detail" name="btnCloseDetail">Close</button>
			</div>
			<h1><?= $smoje->Name ?></h1>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<h2>Current measurements</h2>
		</div>
	</div>
	<div class="row">
		<?php
	
		foreach($smoje->Sensors as $sensor) {
	
			if ($sensor["Mesaurements"] && $sensor["Name"] == "gps") {
				
				$latlong = array();
				foreach($sensor["Mesaurements"] as $measurement) {
					
					$latlong[$measurement["Name"]] = $measurement["ValueFloat"];
				}

		?>
			<div class="col-md-12">
				<div id="map-holder-detail" data-param="<?= $latlong["latitude"]."|".$latlong["longitude"] ?>"></div>
				<div class="map-details">
					<h3><?= $sensor["Name"] ?></h3>
					<table class="details">
						<tr>
							<th>Latitude:</th>
							<td><?= $latlong["latitude"] ?></td>
						</tr>
						</tr>
							<th>Longitude:</th>
							<td><?= $latlong["longitude"] ?></td>
						</tr>
					</table>
				</div>
			</div>
		<?php
		
			}
		}
	
		foreach($smoje->Sensors as $sensor) {
	
			if ($sensor["Mesaurements"] && $sensor["Name"] != "gps") {

		?>
			<div class="col-md-6">
				<h3><?= $sensor["Name"] ?></h3>
				<table class="details">
					<?php
					
					foreach($sensor["Mesaurements"] as $measurement) {
					
					?>
					<tr>
						<th><?= $measurement["Name"] ?>:</th>
						<td><?= $measurement["ValueFloat"] ?> <?= $measurement["Unit"] ?></td>
					</tr>
					<?php
				
					}
				
					?>
				</table>
			</div>
		<?php
	
			}
		}
	
		?>
	</div>
	<div></div>
</div>