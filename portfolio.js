$('#fullpage').fullpage({
  anchors: ['main', 'about', 'projects', 'contact'],
  sectionsColor: ['white']
});

var circles = document.querySelectorAll(".circle");

(function() {
	for(var i=0; i<circles.length; i++) {
		circles[i].addEventListener("click", function() {
			var clickedColor = this.style.background;
				this.style.color = "white";
		});
	}
}());

function myMap() {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(50.065, 19.945), zoom: 13,
    styles: [{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"weight":1}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"weight":0.8}]},{"featureType":"landscape","stylers":[{"color":"#ffffff"}]},{"featureType":"water","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"labels.text","stylers":[{"visibility":"on"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]}]

  };
  var map = new google.maps.Map(mapCanvas, mapOptions);
}