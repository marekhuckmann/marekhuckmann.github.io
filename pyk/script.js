var c = 0;
var colors = [];
var style = [];

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb("+ r + "," + g + "," + b + ")"; 
}

function $(selector, container) {
	return (container || document).querySelector(selector);
}

(function() {

var _ = self.Life = function(seed) {
	this.seed = seed;
	this.height = seed.length;
	this.width = seed[0].length;
	
	this.prevBoard = [];
	this.board = cloneArray(seed);
};

_.prototype = {
	next: function () {
		this.prevBoard = cloneArray(this.board);
		
		for (var y=0; y<this.height; y++) {
			for (var x=0; x<this.width; x++) {

				var neighbors = this.aliveNeighbors(this.prevBoard, x, y);
				var alive = !!this.board[y][x];
				var method = [];
				method = this.vonNeumann(this.prevBoard, x, y, neighbors);
				

				if(!alive) {
					if(method[0])
								{
						this.board[y][x] = 1;
						var coords = method[1];
						var y1 = coords[0];
						var x1 = coords[1];

						var colorGetter = document.querySelector(".row" + y1 + ".col" + x1);
						var color = colorGetter.getAttribute("color");

						var colorSetter = document.querySelector(".row" + y + ".col" + x);
						var att3 = document.createAttribute("color");
    					att3.value = color;
    					colorSetter.setAttributeNode(att3);
    					
					}
					else
						this.board[y][x] = 0;
							}			
				
			}
		}
	},
	
	aliveNeighbors: function (array, x, y) {

		var prevRow = array[y-1] || [];
		var nextRow = array[y+1] || [];
		
		return [
			prevRow[x-1], prevRow[x], prevRow[x+1],
			array[y][x-1], array[y][x+1],
			nextRow[x-1], nextRow[x], nextRow[x+1]
		].reduce(function (prev, cur) {
			return prev + +!!cur;
		}, 0);
	},

	vonNeumann: function (array, x, y, neighbors) {

		var prevRow = array[y-1] || [];
		var nextRow = array[y+1] || [];

		var sth = [];

		if(!!prevRow[x]) {			
			sth[0] = true;
			sth[1] = [y-1, x]; 
			return sth;
		} else if(!!array[y][x-1]) {
			sth[0] = true;
			sth[1] = [y, x-1]; 
			return sth;
		} else if (!!array[y][x+1]) {
			sth[0] = true;
			sth[1] = [y, x+1]; 
			return sth;
		} else if (!!nextRow[x]) {
			sth[0] = true;
			sth[1] = [y+1, x]; 
			return sth;
		}
		else {
			return false;
	}

	},
	
	toString: function () {
		return this.board.map(function (row) { return row.join(' '); }).join('\n');
	}
};

// Helpers
// Warning: Only clones 2D arrays
function cloneArray(array) {
	return array.slice().map(function (row) { return row.slice(); });
}

})();

(function(){

var _ = self.LifeView = function (table, size) {
	this.grid = table;
	this.size = size;
	this.started = false;
	this.autoplay = false;
	
	this.createGrid();
};

_.prototype = {

	

	createGrid: function () {
		var me = this;
		
		var fragment = document.createDocumentFragment();
		this.grid.innerHTML = '';
		this.checkboxes = [];
		
		for (var y=0; y<this.size; y++) {
			var row = document.createElement('tr');
			this.checkboxes[y] = [];
			
			for (var x=0; x<this.size; x++) {
				var cell = document.createElement('td');
				cell.className = "row" + y + " col" + x;
				// var att = document.createAttribute("alive");
    // 				att.value = "false"; 
    // 				cell.setAttributeNode(att);
				//var checkbox = document.createElement('input');
				//checkbox.type = 'checkbox';
				this.checkboxes[y][x] = cell;
				//alert(cell);
				cell.coords = [y, x];
				cell.alive = false;
				//cell.appendChild(checkbox);
				row.appendChild(cell);			

			}
			fragment.appendChild(row);
		}
		


		this.grid.addEventListener("click", function(evt) {
				var cell = evt.target;
    				//document.getElementsByClassName("row" + y).innerHTML = "o";
    				var coords = cell.coords;
    				cell.alive = true;
    				//cell.color = 
    				var y = coords[0];
    				var x = coords[1];
    				var att = document.createAttribute("alive");
    				att.value = "true"; 
    				evt.target.setAttributeNode(att);
    				var generatedColor = randomColor();
					colors.push(generatedColor);
					cell.color = c;
					//alert(c);
					style[c] = document.createElement('style');
					style[c].type = 'text/css';
					style[c].innerHTML = '#grid [color=c' + c + '] {	background-color: '+ colors[c] +';}';
					document.getElementsByTagName('head')[0].appendChild(style[c]);

					var att3 = document.createAttribute("color");
					att3.value = "c"+c;
					cell.setAttributeNode(att3);

					c++;
    				//alert(this.board[y][x]);

    				//$('row' + y + ' col' + x).attr('alive', 'true' );
    				//if (evt.target.nodeName.toLowerCase() == 'td')
    				//alert("???");
    				//alert(board[y][x]);

    			//	me.started = false;
				});

		this.grid.addEventListener('change', function(evt) {
			if (evt.target.nodeName.toLowerCase() == 'input') {
				me.started = false;
			}
		});
		
		this.grid.addEventListener('keyup', function(evt) {
			var checkbox = evt.target;
			
			if (checkbox.nodeName.toLowerCase() == 'input') {
				var coords = checkbox.coords;
				var y = coords[0];
				var x = coords[1];
				
				switch (evt.keyCode) {
					case 37: // left
						if (x > 0) {
							me.checkboxes[y][x-1].focus();
						}
						break;
					case 38: // up
						if (y > 0) {
							me.checkboxes[y-1][x].focus();
						}
						break;
					case 39: // right
						if (x < me.size - 1) {
							me.checkboxes[y][x+1].focus();
						}
						break;
					case 40: // bottom
						if (y < me.size - 1) {
							me.checkboxes[y+1][x].focus();
						}
						break;
				}
			}
		});
		
		this.grid.appendChild(fragment);
	},
	
	get boardArray() {
		return this.checkboxes.map(function (row) {
			return row.map(function (cell) {
				if(cell.alive) {
					// var att = document.createAttribute("alive");
    	// 			att.value = "true"; 
    	// 			cell.setAttributeNode(att);


    				// var att2 = document.createAttribute("color");
    				// att2.value = "c" + cell.color;
    				// cell.setAttributeNode(att2);

				}
				//alert(cell.alive);
				return +cell.alive;
			});
		});
	},
	
	play: function () {
		this.game = new Life(this.boardArray);
		this.started = true;
	},
	
	next: function () {
		var me = this;
		
		if (!this.started || this.game) {
			this.play();
		}
		
		this.game.next();
		
		var board = this.game.board;
		
		for (var y=0; y<this.size; y++) {
			for (var x=0; x<this.size; x++) {
				//if(board[y][x])
					//alert("aha");
				//	alert(board[y][x]);
					this.checkboxes[y][x].alive = !!board[y][x];
			}
		}
		
		if (this.autoplay) {
			this.timer = setTimeout(function () {
				me.next();
			}, 1000);
		}
	}
};

})();

var lifeView = new LifeView(document.getElementById('grid'), 25);

(function() {

var buttons = {
	next: $('button.next')
};

buttons.next.addEventListener('click', function() {
	lifeView.next();
});

$('#autoplay').addEventListener('change', function() {
	buttons.next.disabled = this.checked;
	
	if (this.checked) {
		lifeView.autoplay = this.checked;
		lifeView.next();
	}
	else {
		clearTimeout(lifeView.timer);
	}
});
	
})();