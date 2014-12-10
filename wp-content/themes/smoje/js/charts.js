var chart;
var jsonData, tmpSensor, tmpMeasurement;
var smojes = [];

var styles = [
	{
		"bullet": "round",
		"color": "#FF6600"
	},
	{
		"bullet": "square",
		"color": "#FCD202"
	},
	{
		"bullet": "triangleUp",
		"color": "#B0DE09"
	},
	{
		"bullet": "bubble",
		"color": "#FC02D2"
	},
	{
		"bullet": "triangleDown",
		"color": "#B009DE"
	}
];

jQuery.getJSON( 
	"http://178.62.163.199/smoje/index.php/measurements/6", function( data ) {
	
	var i = 0;
	jsonData = data.stations;
	
	jQuery.each( jsonData, function( smojeKey, smoje ) {
		
		var id, name, lat, long;
		var smojeObj = {};
		
		for (var attr in styles[i]) {
			smojeObj[attr] = styles[i][attr];
		}
		
		smojeObj.name = smoje.name;
		smojeObj.sensors = {};
		
		jQuery.each( smoje.sensors, function( sensorKey, sensor ) {
			
			var sensorObj = {};
			sensorObj.name = sensor.sensorType;
			// Exclude camera and gps...
			if (sensor.Id != 8 && sensor.Id != 10) {
				
				i++;
				id = smoje.Id;
				name = smoje.name;
				sensorObj.measurements = {};
				sensorObj.chartData = [];
				jQuery.each( sensor.measurements, function( measurementKey, measurement ) {
			
					var obj = {};
					obj["date"] = new Date(measurement.timestamp);
					obj[measurement.name + "Value"] = measurement.valueFloat;
					sensorObj.chartData.unshift(obj);
					
					var measurementObj = {
						"name": measurement.name,
						"minValue": measurement.nalueFloat-5,
						"range": 10,
						"unit": measurement.unit.replace("^", ""),
					};
					sensorObj.measurements[measurement.name] = measurementObj;
				});
				if (lat > 0 && long > 0) {
					
					addSmoje(id, lat, long, name);
				}
				smojeObj.sensors[sensor.sensorType] = sensorObj;
			}
		});
		smojes.push(smojeObj);
		i++;
	});
	initChart();
});

/* jQuery.getJSON( 
	"http://178.62.163.199/smoje/index.php/Measurement", function( data ) {
	
	var i = 0;
	jsonData = data;
	jQuery.each( data, function( smojeKey, smoje ) {
		
		var id, name, lat, long;
		var smojeObj = {};
		
		for (var attr in styles[i]) {
			smojeObj[attr] = styles[i][attr];
		}
		
		smojeObj.name = smoje.Name;
		smojeObj.sensors = {};
		
		jQuery.each( smoje.Sensors, function( sensorKey, sensor ) {
			
			var sensorObj = {};
			sensorObj.name = sensor.Name;
			if (sensor.Id != 8) {
				
				id = smoje.Id;
				name = smoje.Name;
				sensorObj.measurements = {};
				jQuery.each( sensor.Mesaurements, function( measurementKey, measurement ) {
			
					var measurementObj = {
						"name": measurement.Name,
						"minValue": measurement.ValueFloat-5,
						"range": 10,
						"unit": measurement.Unit,
					};
					sensorObj.measurements[measurement.Name] = measurementObj;
				});
				if (lat > 0 && long > 0) {
					
					addSmoje(id, lat, long, name);
				}
				smojeObj.sensors[sensor.Name] = sensorObj;
			}
		});
		smojes.push(smojeObj);
		i++;
	});
	initChart();
}); */

var dataObj = {
    "type": "serial",
    "theme": "none",
	"language": "de",
	"graphs": [],
    "pathToImages": "http://www.amcharts.com/lib/3/images/",
    "legend": {
        "useGraphSettings": true,
		"valueWidth": 70
    },
    "valueAxes": [],
    "chartScrollbar": {},
    "chartCursor": {
        "cursorPosition": "mouse",
		"categoryBalloonDateFormat": "DD. MMMM YYYY JJ:NN:DD",
		"cursorColor": "#00bff3"
    },
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
		"minPeriod": "mm",
        "axisColor": "#DADADA",
        "minorGridEnabled": true,
		"dateFormats": [
			{period:'fff',format:'JJ:NN:SS'},
			{period:'ss',format:'JJ:NN'},
			{period:'mm',format:'JJ:NN'},
			{period:'hh',format:'JJ:NN'},
			{period:'DD',format:'DD. MMM'},
			{period:'WW',format:'DD. MMM'},
			{period:'MM',format:'MMM YYYY'},
			{period:'YYYY',format:'YYYY'}
		]
    }
};

function initChart() {
	
	var typeSelector = "";
	var measurementSelector = "";
	var i = 0;
	jQuery.each( smojes[0].sensors, function( sensorKey, sensor ) {
		
		if (sensor.name.toLowerCase().indexOf("camera") == -1 && sensor.chartData.length > 0) {
			
			var innerClassName = "";
			if (i == 0) {
			
				innerClassName = "active";
				i++;
			}
			var measurement = sensor.measurements[Object.keys(sensor.measurements)[0]];
			measurementSelector += '<li role="presentation" class="' + innerClassName + '"><a href="#' + measurement.name.toLowerCase() + '" data-toggle="tab" onclick="setMeasurement(\'' + sensor.name + '\', \'' + measurement.name + '\');">' + sensor.name.replace("_", " ") + '</a></li>';
		}
	});

	jQuery("#smoje-sensors").html(typeSelector);
	jQuery("#smoje-measurements").html(measurementSelector);
	var sensorKey = Object.keys(smojes[0].sensors)[0];
	var measurementKey = Object.keys(smojes[0].sensors[sensorKey].measurements)[0];
	setMeasurement(sensorKey, measurementKey);
}

function setSensor (sensorKey) {
	
	var measurementSelector = "";
	var i = 0;
	var sensor = smojes[0].sensors[sensorKey];
	if (sensor.name == "geiger-counter") {
		
		jQuery("#chartdiv").html('<img src="https://scontent-a.xx.fbcdn.net/hphotos-xpa1/v/l/t1.0-9/10846279_10152868678517290_1350059466261271515_n.jpg?oh=09602779338e85e72788a02e95158b4e&oe=550D8DA3" />');
	}
	else {
		
		jQuery.each( smojes[0].sensors[sensorKey].measurements, function( measurementKey, measurement ) {
		
			var className = "";
			if (i == 0) {
		
				className += " active";
				setMeasurement(sensorKey, measurement.name)
			} 
			i++;
			measurementSelector += '<li role="presentation" class="' + className + '"><a href="#' + measurement.name.toLowerCase() + '" data-toggle="tab" onclick="setMeasurement(\'' + sensorKey + '\', \'' + measurement.name.toLowerCase() + '\');">' + measurement.name + '</a></li>';
		});
	}
	jQuery("#smoje-sensors").html(measurementSelector);
}

function setMeasurement (sensorKey, measurementKey) {

	var measurement = smojes[0].sensors[sensorKey].measurements[measurementKey];
	var myData = dataObj;
	myData.graphs = [];
	myData.valueAxes[0] = {
		"id":"v",
		"axisColor": "#333333",
		"axisThickness": 1,
		"gridAlpha": 0,
		"axisAlpha": 1,
		"position": "left",
		"unit": " " + measurement.unit
	};
	for (var i = 0; i < smojes.length; i++) {

		var graph = {
			"lineColor": smojes[i].color,
			"bullet": smojes[i].bullet,
			"valueAxis": "v",
			"bulletBorderThickness": 1,
			"hideBulletsCount": 30,
			"title": smojes[i].name,
			"valueField": measurement.name + "Value",
			"fillAlphas": 0,
			"type": "smoothedLine",
		};
		graph.valueText = "[[value]] " + measurement.unit;
		graph.balloonText = "[[title]]:<b>[[value]] " + measurement.unit + "</b>";
		graph.valueField = measurement.name + "Value";
		myData.graphs.push(graph);
	}
	// var chartData = generateChartData(1000, measurement.minValue, measurement.range, measurement.name);
	chart = AmCharts.makeChart("chartdiv", myData);
	chart.valueAxes[0].unit = " " + measurement.unit;
	chart.dataProvider = smojes[0].sensors[sensorKey].chartData;
	chart.validateData();
	zoomChart();
	chart.validateNow();
}

// generate some random data, quite different range
function generateChartData(samples, min, range, label) {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setTime(firstDate.valueOf() - (samples * 15 * 60 * 1000));

    for (var i = 0; i < samples; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
		var obj = {};
        var newDate = new Date(firstDate);
        newDate.setTime(newDate.valueOf() + (i * 15 * 60 * 1000));
		obj.date = newDate;
		
		for (var j = 0; j < smojes.length; j++) {
			
	        var v = ((Math.random() * range) + min).toFixed(2);
			if (i == samples-1) {
				
				v = getMeasurement(smojes[j], label);
			}
			obj[label + "Value" + (j+1)] = v;
		}

        chartData.push(obj);
    }
    return chartData;
}

function getMeasurement(targetSmoje, measurementLabel) {
	
	var value = 0;
	jQuery.each( jsonData, function( smojeKey, smoje ) {
		
		if (smoje.Name == targetSmoje.name) {
		
			jQuery.each( smoje.Sensors, function( sensorKey, sensor ) {
		
				jQuery.each( sensor.Mesaurements, function( measurementKey, measurement ) {
			
					if (measurement.Name == measurementLabel) {
				
						value = measurement.ValueFloat;
					}
				});
			});
		}
	});
	return value;
}

function zoomChart(){
	
	if (chart.dataProvider && chart.dataProvider.length >= 50) {
	
	    chart.zoomToIndexes(chart.dataProvider.length - 50, chart.dataProvider.length - 1);
	}
}
