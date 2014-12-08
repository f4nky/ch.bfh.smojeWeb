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
	
		$file = "http://tracker.xrj.ch/smoje-api/v1/1001/status";
		$data = json_decode(file_get_contents($file), true);
		
	
		if ($data["lastPosition"]) {
				
			$latlong = array(
				"latitude" => $data["lastPosition"]["latitude"],
				"longitude" => $data["lastPosition"]["longitude"]
			);

		?>
			<div class="col-md-12">
				<div id="map-holder-detail" data-param="<?= $latlong["latitude"]."|".$latlong["longitude"] ?>"></div>
				<div class="map-details">
					<h3>GPS</h3>
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
		
		foreach($smoje->Sensors as $sensor) {
			
			if (stristr($sensor["Name"], "camera")) {
				
				$value = "";
				foreach($sensor["Mesaurements"] as $measurement) {
					
					$value = $measurement["ValueString"];
				}
			?>
			<div class="col-md-12">
				<h3><?= $sensor["Name"] ?></h3>
				<img src="<?= str_replace("/var/www", "http://178.62.163.199", $value) ?>" />
			</div>
			<?php
				
			}
		}
	
		foreach($smoje->Sensors as $sensor) {
	
			if (
				($sensor["Mesaurements"] && $sensor["Name"] != "gps") &&
				(!stristr($sensor["Name"], "camera"))) {

		?>
			<div class="col-md-6">
				<h3><?= $sensor["Name"] ?></h3>
				<table class="details">
					<?php
					
					$name = "";
					$value = "";
					
					foreach($sensor["Mesaurements"] as $measurement) {
					
						if ($name != "" && $name != $measurement["Name"]) {
							
							?>
					<tr>
						<th><?= $name ?>:</th>
						<td><?= $value ?></td>
					</tr>
							<?php

						}
						$name = $measurement["Name"];
						$value = $measurement["ValueFloat"]." ".$measurement["Unit"];
					}
					
					if ($name != "") {
						
					?>
					<tr>
						<th><?= $name ?>:</th>
						<td><?= $value ?></td>
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