var measurement_tag = "";
document.getElementById('record').onchange = function() {
if(this.checked) {
    measurement_tag = Math.floor(Date.now() / 1000) + "";
  } else {
    // ...
  }
}
if (window.DeviceOrientationEvent) {
  document.getElementById("debug").innerHTML = "Not recording."
  // Listen for the deviceorientation event and handle the raw data
  window.addEventListener('deviceorientation', deviceOrientationHandler);
} else {
  document.getElementById("debug").innerHTML = "Not supported."
}
function deviceOrientationHandler(event) {
  // gamma is the left-to-right tilt in degrees, where right is positive
    var tiltLR = event.gamma;
    // beta is the front-to-back tilt in degrees, where front is positive
    var tiltFB = event.beta;
    // alpha is the compass direction the device is facing in degrees
    var dir = event.alpha
    if (document.getElementById('record').checked) {
		document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
		document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
		document.getElementById("doDirection").innerHTML = Math.round(dir);
		
		tag = document.getElementById("label").value;
		writePoint(tiltLR, tiltFB, dir, tag);
		document.getElementById("debug").innerHTML = "Recording..."
    } else {
        document.getElementById("debug").innerHTML = "Not recording."
    }
}
function writePoint(x, y, z, tag) {
	influent
		.createHttpClient({
			server: [
				{
					protocol: "http",
					host:     "192.168.99.100",
					port:     8086
				}
			],
			username: "thomcz",
			password: "password",
			
			database: "training"
		})
		.then(function(client) {
			// more explicit point
			client
				.write({
					key: "data",
					tags: {
						label: tag,
						id: measurement_tag
					},
					fields: {
						gamma: x,
						beta: y,
						alpha: z
					},
					timestamp: Date.now()
				})
				.then(function() {
					// ...
				});
		});
}
	