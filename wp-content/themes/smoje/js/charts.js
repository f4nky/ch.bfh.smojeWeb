var types = [
	{
		"name": "Wassertemperatur",
		"minValue": 4,
		"range": 18,
		"unit": "°C"
	},
	{
		"name": "Lufttemperatur",
		"minValue": -20,
		"range": 55,
		"unit": "°C"
	},
	{
		"name": "Windgeschwindigkeit",
		"minValue": 0,
		"range": 200,
		"unit": " km/h"
	},
];

var smojes = [
	{
		"name": "Smoje 1",
		"bullet": "round",
		"color": "#FF6600"
	},
	{
		"name": "Smoje 2",
		"bullet": "square",
		"color": "#FCD202"
	},
	{
		"name": "Smoje 3",
		"bullet": "triangleUp",
		"color": "#B0DE09"
	},
	{
		"name": "Smoje 4",
		"bullet": "bubble",
		"color": "#FC02D2"
	},
	{
		"name": "Smoje 5",
		"bullet": "triangleDown",
		"color": "#B009DE"
	}
];

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
    "valueAxes": [{
        "id":"v",
        "axisColor": "#333333",
        "axisThickness": 1,
        "gridAlpha": 0,
        "axisAlpha": 1,
        "position": "left"
    }],
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

for (var i = 0; i < smojes.length; i++) {

	dataObj.graphs[i] = {
		"lineColor": smojes[i].color,
		"bullet": smojes[i].bullet,
        "valueAxis": "v",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 30,
        "title": smojes[i].name,
        "valueField": "value"+(i+1),
		"fillAlphas": 0,
		"type": "smoothedLine",
	};
}

chartData = generateChartData(5, types[0].minValue, types[0].range);
var chart = AmCharts.makeChart("chartdiv", dataObj);
chart.dataProvider = chartData;

chart.addListener("dataUpdated", zoomChart);

function setData (typeId) {
	
	var type = types[typeId];
	for (var i = 0; i < 5; i++) {

		dataObj.graphs[i].valueText = "[[value]]" + type.unit;
		dataObj.graphs[i].balloonText = "[[title]]:<b>[[value]]" + type.unit + "</b>";
	}
	chartData = generateChartData(5, type.minValue, type.range);
	chart.valueAxes[0].unit = type.unit;
	chart.dataProvider = chartData;
	chart.validateData();						
}

var typeSelector = "";
for (var i = 0; i < types.length; i++) {
	
	var className = "";
	if (i == 0) {
		
		className += " active"
	} 
	typeSelector += '<li role="presentation" class="' + className + '"><a href="#' + types[i].name.toLowerCase() + '" data-toggle="tab" onclick="setData(' + i + ');">' + types[i].name + '</a></li>';
}

jQuery("#smoje-sensors").html(typeSelector);

setData(0);

// generate some random data, quite different range
function generateChartData(n, min, range) {
    var chartData = [];
    var firstDate = new Date();
	console.log(firstDate);
    firstDate.setTime(firstDate.valueOf() - (1000 * 15 * 60 * 1000));
	console.log(firstDate);

    for (var i = 0; i < 1000; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
		var obj = {};
        var newDate = new Date(firstDate);
        newDate.setTime(newDate.valueOf() + (i * 15 * 60 * 1000));
		obj.date = newDate;
		
		for (var j = 0; j < n; j++) {
			
	        var v = ((Math.random() * range) + min).toFixed(2);
			obj["value"+(j+1)] = v
		}

        chartData.push(obj);
    }
    return chartData;
}

function zoomChart(){
	if (chart.dataProvider && chart.dataProvider.length >= 20) {
		
	    chart.zoomToIndexes(chart.dataProvider.length - 20, chart.dataProvider.length - 1);
	}
}
