var contentStrings = {};
var markers = {};
var image, map, infoWindow, mapOptions;

function initialize() {
	
	mapOptions = {
		center: { lat: 47.077370 ,lng: 7.161026},
		zoom: 12
	};
	map = new google.maps.Map(document.getElementById('map-holder'), mapOptions);

	infowindow = new google.maps.InfoWindow();

	image = {
		url: 'http://www.smoje.ch/theme/default/images/map-marker.png',
		// This marker is 20 pixels wide by 32 pixels tall.
		size: new google.maps.Size(45, 44),
		// The origin for this image is 0,0.
		origin: new google.maps.Point(0,0),
		// The anchor for this image is the base of the flagpole at 0,32.
		anchor: new google.maps.Point(16, 44)
	};
	
	//open Smoje1 infowindow at default on startsite
	
	addSmoje('smoje1', 47.066614 , 7.116051, "Smoje One", 11, 9, "West", 3);
	addSmoje('smoje2', 47.082981 , 7.158966, "Smoje Two", 10, 8, "North West", 5);
	addSmoje('smoje3', 47.056324 , 7.144203, "Smoje Three", 10, 7, "North", 4);
	addSmoje('smoje4', 47.102382 , 7.196388, "Smoje Four", 12, 6, "North West", 5);
	addSmoje('smoje5', 47.083215 , 7.192955, "Smoje Five", 13, 9, "North West", 6);
				
	infowindow.setContent(contentStrings['smoje1']);
	infowindow.close();
	infowindow.open(map,markers['smoje1']);
}

jQuery(window).resize(function() {
	
	map.setOptions(mapOptions);
});

function addSmoje(id, lat, long, titleString, airTemperature, waterTemperature, windDirection, windSpeed) {
	
	contentStrings[id] = '<div id="mapContent" style="width: 300px; height: 160px; margin-right: -20px;">'+
			'<h1 class="mapHeading">' + titleString + '</h1>'+
			'<div id="mapContent">'+
				'<a class="measurementDetailLink" href="detail.html?id=' + id + '">Details</a>' +
				'<table class="details">' +
					'<tr>' +
						'<th>' +
							'Position:' +
						'</th>' +
						'<td>' +
							'<table class="details">' +
								'<tr>' +
									'<td>' +
										'Latitude:' +
									'</td>' +
									'<td>' +
										lat +
									'</td>' +
								'<tr>' +
								'<tr>' +
									'<td>' +
										'Longitude:' +
									'</td>' +
									'<td>' +
										long +
									'</td>' +
								'<tr>' +
							'</table>' +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<th>' +
							'Air Temperature:' +
						'</th>' +
						'<td>' +
							airTemperature + '°C' +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<th>' +
							'Water Temperature:' +
						'</th>' +
						'<td>' +
							waterTemperature + '°C' +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<th>' +
							'Wind:' +
						'</th>' +
						'<td>' +
							'<table class="details">' +
								'<tr>' +
									'<td>' +
										'Direction:' +
									'</td>' +
									'<td>' +
										windDirection +
									'</td>' +
								'<tr>' +
								'<tr>' +
									'<td>' +
										'Direction:' +
									'</td>' +
									'<td>' +
										windSpeed + 'm/s' +
									'</td>' +
								'<tr>' +
							'</table>' +
						'</td>' +
					'</tr>' +
				'</table>' +
			'</div>';

	markers[id] = new google.maps.Marker({
		position: new google.maps.LatLng(lat , long),
		icon: image,
		map: map,
		title: titleString
	});

	google.maps.event.addListener(markers[id], 'click', function() {
		infowindow.setContent(contentStrings[id]);
		infowindow.close();
		infowindow.open(map,markers[id]);
	});
}

google.maps.event.addDomListener(window, 'load', initialize);
