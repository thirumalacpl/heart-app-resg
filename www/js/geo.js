// Copyright 2015 Tero Karvinen http://TeroKarvinen.com
// Free software under the BSD license

// debug

alert("ads ne geo");

function d(s) {
	console.log(s);
	alert("status");
	$("#status").text(s);
}


function geoWin(pos) {
	d("geoWin(): "+pos.coords.latitude+", "+pos.coords.longitude);
}

function geoFail(error) {
	d("geoFail(): "+error.code+": "+error.message);
}

function startGeoWatch() {
	d("startGeoWatch()");
	opt = {timeout: 1000, enableHighAccuracy: true};
	watchGeo = navigator.geolocation.watchPosition(geoWin, geoFail, opt);
}

function stopGeoWatch() {
	d("stopGeoWatch()");
	navigator.geolocation.clearWatch(watchGeo);
}

// life cycle

function onPause() {
	d("onPause()");
	stopGeoWatch();
}

function onResume() {
	d("onResume()");
	startGeoWatch();
}

// init

function onDeviceReady() {
	d("onDeviceReady()");
	document.addEventListener("pause", onPause, false);
	document.addEventListener("resume", onResume, false);
	startGeoWatch();
}

function main() {
	document.addEventListener('deviceready', onDeviceReady, false);
}

// main & globals
var watchGeo=null;
main();


