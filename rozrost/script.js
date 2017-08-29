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

					var alive = !!this.board[y][x];
					var method = [];
					method = this.vonNeumann(this.prevBoard, x, y);


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

		vonNeumann: function (array, x, y) {

			var prevRow = array[y-1] || [];
			var nextRow = array[y+1] || [];

			var vN = [];

			if(!!prevRow[x]) {			
				vN[0] = true;
				vN[1] = [y-1, x]; 
				return vN;
			} else if(!!array[y][x-1]) {
				vN[0] = true;
				vN[1] = [y, x-1]; 
				return vN;
			} else if (!!array[y][x+1]) {
				vN[0] = true;
				vN[1] = [y, x+1]; 
				return vN;
			} else if (!!nextRow[x]) {
				vN[0] = true;
				vN[1] = [y+1, x]; 
				return vN;
			}
			else {
				return false;
			}

		},

		toString: function () {
			return this.board.map(function (row) { return row.join(' '); }).join('\n');
		}
	};

// 2D array cloner
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

			var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			x = w.innerWidth || e.clientWidth || g.clientWidth,
			y = w.innerHeight|| e.clientHeight|| g.clientHeight;

			if(x>y) {
				var o = (y-(y*0.2))/25;
			}
			else {
				var o = x/25;
				var marginSetter = document.createElement('style');
				marginSetter.type = 'text/css';
				marginSetter.innerHTML = '#grid {margin-left: 1em; margin-right: 1em}';
				document.getElementsByTagName('head')[0].appendChild(marginSetter);
			}

			var gridSetter = document.createElement('style');
			gridSetter.type = 'text/css';
			gridSetter.innerHTML = '#grid td { height: ' + o + 'px; width: ' + o + 'px';
			'#grid [color=c' + c + '] {	background-color: '+ colors[c] +';}';
			document.getElementsByTagName('head')[0].appendChild(gridSetter);

			var fragment = document.createDocumentFragment();
			this.grid.innerHTML = '';
			this.checkboxes = [];

			for (var y=0; y<this.size; y++) {
				var row = document.createElement('tr');
				this.checkboxes[y] = [];

				for (var x=0; x<this.size; x++) {
					var cell = document.createElement('td');
					cell.className = "row" + y + " col" + x;
					this.checkboxes[y][x] = cell;
					cell.coords = [y, x];
					cell.alive = false;
					row.appendChild(cell);			

				}
				fragment.appendChild(row);
			}



			this.grid.addEventListener("click", function(evt) {
				var cell = evt.target;

				var coords = cell.coords;
				cell.alive = true;

				var y = coords[0];
				var x = coords[1];
				var att = document.createAttribute("alive");
				att.value = "true"; 
				evt.target.setAttributeNode(att);
				var generatedColor = randomColor();
				colors.push(generatedColor);
				cell.color = c;
				style[c] = document.createElement('style');
				style[c].type = 'text/css';
				style[c].innerHTML = '#grid [color=c' + c + '] {	background-color: '+ colors[c] +';}';
				document.getElementsByTagName('head')[0].appendChild(style[c]);

				var att3 = document.createAttribute("color");
				att3.value = "c"+c;
				cell.setAttributeNode(att3);

				c++;
			});

			this.grid.addEventListener('change', function(evt) {
				if (evt.target.nodeName.toLowerCase() == 'input') {
					me.started = false;
				}
			});


			this.grid.appendChild(fragment);
		},

		get boardArray() {
			return this.checkboxes.map(function (row) {
				return row.map(function (cell) {
					if(cell.alive) {

					}
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
					this.checkboxes[y][x].alive = !!board[y][x];
				}
			}

			if (this.autoplay) {
				this.timer = setTimeout(function () {
					me.next();
				}, 1);
			}
		}
	};

})();

var lifeView = new LifeView(document.getElementById('grid'), 25);

(function() {

	var buttons = {
		next: $('button.next')
	};

	var tmp = document.getElementsByClassName("button");
	var widthSetter = tmp["0"].offsetWidth;
	
	var buttonSetter = document.createElement('style');
	buttonSetter.type = 'text/css';
	buttonSetter.innerHTML = 'button {width: '+widthSetter+'px;}'
	document.getElementsByTagName('head')[0].appendChild(buttonSetter);

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
