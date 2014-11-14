function initialize() {
   var smoje1 = new google.maps.LatLng(47.066614 , 7.116051);
   var smoje2 = new google.maps.LatLng(47.082981 , 7.158966);
   var smoje3 = new google.maps.LatLng(47.056324 , 7.144203);
   var smoje4 = new google.maps.LatLng(47.102382 , 7.196388);
   var smoje5 = new google.maps.LatLng(47.083215 , 7.192955);
   var mapOptions = {
      center: { lat: 47.077370 ,lng: 7.161026},
      zoom: 12
   };
   var map = new google.maps.Map(document.getElementById('map-holder'), mapOptions);

   var infowindow = new google.maps.InfoWindow();

   var contentString1 = '<div class="smoje-info">'+
         '<h1 class="mapHeading">Smoje One</h1>'+
         '<p><b>Position:</b><br />Latitude: 47.066614<br />Longitude: 7.116051</p> ' +
         '<p><b>Air Temperature:</b> 11°C</p> ' +
         '<p><b>Water Temperature:</b> 9°C</p> ' +
         '<p><b>Wind: </b><br /> Direction: West<br />Speed: 3m/s</p> ' +
         '</div>';

   var contentString2 = '<div class="smoje-info">'+
         '<h1 class="mapHeading">Smoje Two</h1>'+
         '<p><b>Position:</b><br />Latitude: 47.082981<br />Longitude: 7.158966</p> ' +
         '<p><b>Air Temperature:</b> 11°C</p> ' +
         '<p><b>Water Temperature: </b> 9°C</p> ' +
         '<p><b>Wind: </b><br /> Direction: Nort West<br />Speed: 5m/s</p> ' +
         '</div>';

   var contentString3 = '<div class="smoje-info">'+
         '<h1 class="mapHeading">Smoje Three</h1>'+
         '<p><b>Position: </b><br />Latitude: 47.056324<br />Longitude: 7.144203</p> ' +
         '<p><b>Air Temperature: </b> 10°C</p> ' +
         '<p><b>Water Temperature: </b> 8°C</p> ' +
         '<p><b>Wind: </b><br /> Direction: Nort<br />Speed: 4m/s</p> ' +
         '</div>';

   var contentString4 = '<div class="smoje-info">'+
         '<h1 class="mapHeading">Smoje Four</h1>'+
         '<p><b>Position: </b><br />Latitude: 47.102382<br />Longitude: 7.196388</p> ' +
         '<p><b>Air Temperature: </b> 10°C</p> ' +
         '<p><b>Water Temperature: </b> 7°C</p> ' +
         '<p><b>Wind: </b><br /> Direction: Nort West<br />Speed: 5m/s</p> ' +
         '</div>';

   var contentString5 = '<div class="smoje-info">'+
         '<h1 class="mapHeading">Smoje Five</h1>'+
         '<p><b>Position: </b><br />Latitude: 47.083215<br />Longitude: 7.192955</p> ' +
         '<p><b>Air Temperature: </b> 12°C</p> ' +
         '<p><b>Water Temperature: </b> 10°C</p> ' +
         '<p><b>Wind: </b><br /> Direction: Nort West<br />Speed: 6m/s</p> ' +
         '</div>';

   var image = {
      url: 'http://www.smoje.ch/theme/default/images/map-marker.png',
      // This marker is 20 pixels wide by 32 pixels tall.
      size: new google.maps.Size(45, 44),
      // The origin for this image is 0,0.
      origin: new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      anchor: new google.maps.Point(16, 44)
   };

   var marker1 = new google.maps.Marker({
      position: smoje1,
      icon: image,
      map: map,
      title: 'Smoje1'
   });
   var marker2 = new google.maps.Marker({
      position: smoje2,
      icon: image,
      map: map,
      title: 'Smoje2'
   });
   var marker3 = new google.maps.Marker({
      position: smoje3,
      icon: image,
      map: map,
      title: 'Smoje3'
   });
   var marker4 = new google.maps.Marker({
      position: smoje4,
      icon: image,
      map: map,
      title: 'Smoje4'
   });
   var marker5 = new google.maps.Marker({
      position: smoje5,
      icon: image,
      map: map,
      title: 'Smoje5'
   });
   
   //open Smoje1 infowindow at default on startsite
            
   infowindow.setContent(contentString1);
   infowindow.close();
   //infowindow.open(map,marker1);
         
   google.maps.event.addListener(marker1, 'click', function() {
      infowindow.setContent(contentString1);
      infowindow.close();
      infowindow.open(map,marker1);
   });
   google.maps.event.addListener(marker2, 'click', function() {
      infowindow.setContent(contentString2);
      infowindow.close();
      infowindow.open(map,marker2);
   });
   google.maps.event.addListener(marker3, 'click', function() {
      infowindow.setContent(contentString3);
      infowindow.close();
      infowindow.open(map,marker3);
   });
   google.maps.event.addListener(marker4, 'click', function() {
      infowindow.setContent(contentString4);
      infowindow.close();
      infowindow.open(map,marker4);
   });
   google.maps.event.addListener(marker5, 'click', function() {
      infowindow.setContent(contentString5);
      infowindow.close();
      infowindow.open(map,marker5);
   });
}

google.maps.event.addDomListener(window, 'load', initialize);