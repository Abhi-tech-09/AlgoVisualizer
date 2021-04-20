var stopMess = 0;

var nodes = [];
var lines = [] ; 
var p1 = new Point(0, 0);
var p2 = new Point(0, 0);
 Point.prototype.drawPoint = function(){
	 if(this.state == 'e'){
		stroke('#33ff33');
		fill(51);
	 }
	 else if(this.state == 'p'){
		fill('rgba(0,255,0, 0.25)');
	 }
	circle(this.x, this.y, 20);
 }

function Line(x1,y1,x2,y2){
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.state = 'e';
}

Line.prototype.drawLine = function(){
	line(this.x1 , this.y1 , this.x2 , this.y2);
}

function mouseclicked(e) {
	x = e.clientX - toolsWidth;
	y = e.clientY;
	nodes.push(new Point(x, y));
}

function reset() {
	stopMess = 1;
}

function check(e) {
	x = e.clientX - toolsWidth;
	y = e.clientY;
	var curr = new Point(x, y);
	for (var i = 0; i < nodes.length; i++) {
		if (dist(curr.x, curr.y, nodes[i].x, nodes[i].y) <= 10) {
			nodes[i].state = 'p';
			if (p1.x == 0 && p1.y == 0) {
				p1 = new Point(nodes[i].x, nodes[i].y);
			}
			else if (p2.x == 0 && p2.y == 0 && (nodes[i].x != p1.x && nodes[i].y != p1.y)) {
				p2 = new Point(nodes[i].x, nodes[i].y);
				lines.push(new Line(p1.x , p1.y , p2.x , p2.y));
				p1 = new Point(0, 0);
				p2 = new Point(0, 0);

			}
		}
	}

}

function setup() {
	let canvas = createCanvas(w - toolsWidth, h);
	canvas.parent("canvas");
	canvas.style("display", "block");
	getDefaultPoints();
	distance = calDistance(cities);
	for (var i = 0; i < cities.length; ++i) order[i] = i;
}

function draw() {
	background(0);
	frameRate(fr);
	if (!stopMess) {
		makeCities();
		if (!graphFlag && !BFSflag)
			makeConnection();
		else
			plotGraph();
		if (start)
			implementAlgo();
	}
	else{
		if (document.getElementById("interactive").checked == true) {
			canvas.addEventListener('mousedown', mouseclicked);
			canvas.removeEventListener('mousedown', check);
		}
		else {
			canvas.removeEventListener('mousedown', mouseclicked);
			canvas.addEventListener('mousedown', check);
		}

		
		for (var i = 0; i < nodes.length; i++) {
			nodes[i].drawPoint();
		}

		
		for(var i = 0 ; i < lines.length ; i++){
			lines[i].drawLine();
		}
	}



}
