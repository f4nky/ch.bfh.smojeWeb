<?

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
			<h1><?= $smoje->name ?></h1>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<h2>Current measurements</h2>
		</div>
	</div>
	<div class="row">
		<?
	
		foreach($smoje->sensors as $sensor) {
	
			if ($sensor["measurements"] && $sensor["name"] != "gps") {

		?>
			<div class="col-md-6">
				<h3><?= $sensor["name"] ?></h3>
				<table class="details">
					<?
					
					foreach($sensor["measurements"] as $measurement) {
					
					?>
					<tr>
						<th><?= $measurement["name"] ?>:</th>
						<td><?= $measurement["value"] ?><?= $measurement["unit"] ?></td>
					</tr>
					<?
				
					}
				
					?>
				</table>
			</div>
		<?
	
			}
			else {
				
				// Get LatLong values
				$latlong = array();
				foreach($sensor["measurements"] as $measurement) {
					
					$latlong[$measurement["name"]] = $measurement["value"];
				}
				
				?>
			<div class="col-md-12">
				<div id="map-holder-detail" data-param="<?= $latlong["Latitude"]."|".$latlong["Longitude"] ?>"></div>
				<div class="map-details">
					<h3><?= $sensor["name"] ?></h3>
					<table class="details">
						<tr>
							<th>Latitude:</th>
							<td><?= $latlong["Latitude"] ?></td>
						</tr>
						</tr>
							<th>Longitude:</th>
							<td><?= $latlong["Longitude"] ?></td>
						</tr>
					</table>
				</div>
			</div>
				<?				
			}
		}
	
		?>
	</div>
	<div></div>
</div>