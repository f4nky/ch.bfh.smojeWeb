var contentStrings = {};
var markers = {};
var image, map, infoWindow, mapOptions, isDetailOpen, detailContainer, mapHolder, headerContainer, detailMap, detailMapOptions;
;

function initialize() {
	
	mapHolder = jQuery("#map-holder");
	headerContainer = jQuery("header");
	detailContainer = jQuery("#detail-container");

	mapOptions = {
		center: { lat: 47.077370 ,lng: 7.161026},
		zoom: 12
	};
	map = new google.maps.Map(mapHolder.get(0), mapOptions);

	image = {
		url: 'http://www.smoje.ch/theme/default/images/map-marker.png',
		// This marker is 20 pixels wide by 32 pixels tall.
		size: new google.maps.Size(45, 44),
		// The origin for this image is 0,0.
		origin: new google.maps.Point(0,0),
		// The anchor for this image is the base of the flagpole at 0,32.
		anchor: new google.maps.Point(16, 44)
	};
	jQuery.getJSON( 
		"http://178.62.163.199/smoje/index.php/Measurement" /* "wp-content/themes/smoje/test-data.json" */, function( data ) {
		
		jQuery.each( data, function( smojeKey, smoje ) {
			
			var id, name, lat, long;
			jQuery.each( smoje.Sensors, function( sensorKey, sensor ) {
				
				if (sensor.Id == 8) {
					
					id = smoje.Id;
					name = smoje.Name;
					jQuery.each( sensor.Mesaurements, function( measurementKey, measurement ) {
				
						console.log(measurement);
						switch (measurement.Name) {
							
							case "latitude":
								lat = measurement.ValueFloat;
								break;
							case "longitude":
								long = measurement.ValueFloat;
								break;
						}
					});
					if (lat > 0 && long > 0) {
						
						addSmoje(id, lat, long, name);
					}
				}
			});
		});
	});
}

jQuery(window).resize(function() {
	
	resize();
});

function addSmoje(id, lat, long, name) {

	markers[id] = new google.maps.Marker({
		position: new google.maps.LatLng(lat , long),
		icon: image,
		map: map,
		title: name
	});

	google.maps.event.addListener(markers[id], 'click', function() {
		openDetail(id);
	});
}

function resize() {
	
	map.setOptions(mapOptions);
	if (isDetailOpen) {
		
		detailContainer.css({
			
			top: headerContainer.height()+"px",
			width: jQuery(window).width()+"px"
		});
		if (detailMap) {
			
			detailMap.setOptions(detailMapOptions);
		}
	}
	else {
		
		detailContainer.css({
			
			top: jQuery(window).height()+"px",
			width: jQuery(window).width()+"px"
		});
	}
}

function openDetail(id) {
	
	detailContainer.css({
		"top": mapHolder.height()+"px"
	});
	jQuery.ajax({
		
		url: "/ch.bfh.smojeWeb/wp-content/themes/smoje/detail.php",
		type: "get",
		dataType: "html",
		data: {"id" : id},
		success: function(returnData){
			
			detailContainer.html(returnData);
			// jQuery("#detail-container").slideUp(1000);
			detailContainer.css({
				
				width: mapHolder.width()+"px"
			});
			detailContainer.show();
			isDetailOpen = true;
			var detailMapContainer = jQuery("#map-holder-detail");
			var params = detailMapContainer.attr("data-param").split("|");
			detailMapOptions = {
				center: { lat: parseFloat(params[0]) ,lng: parseFloat(params[1])},
				zoom: 12
			};
			detailMap = new google.maps.Map(detailMapContainer.get(0), detailMapOptions);
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(params[0], params[1]),
				icon: image,
				map: detailMap,
				title: name
			});
			detailContainer.css({
				top: (mapHolder.offset().top-detailContainer.height()-300)+"px"
			});
			detailContainer.animate({

				top: (headerContainer.height())+"px"
			}, 1000, function() {
				
				jQuery("#btn-close-detail").click(function() {
					
					detailContainer.animate({

						top: (headerContainer.height()-detailContainer.height())+"px"
					}, 1000, function() {
						
						detailContainer.hide();
					});
					isDetailOpen = false;
				});
			});
		},
		error: function(e){
			
			alert(e);
		}
	});
}

google.maps.event.addDomListener(window, 'load', initialize);
