var circles = document.querySelectorAll(".circle");

letsGo();

function letsGo() {
	for(var i=0; i<circles.length; i++) {
		circles[i].addEventListener("click", function() {
			var clickedColor = this.style.background;
				this.style.color = "white";
		});
	}
}