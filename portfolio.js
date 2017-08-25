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
