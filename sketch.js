var stopMess = 0;

var nodes = [];
var lines = [] ; 
var index = 0 ; 
var nodeSelected = 0 ; 
var startNode = new Point(0 , 0); 
var finishNode = new Point(0 ,0); 
var p1 = new Point(0, 0);
var p2 = new Point(0, 0);

Point.prototype.drawPoint = function(){
	 if(this.state == 'e'){
		stroke('#33ff33');
		fill(51);
	 }
	 else if(this.state == 's'){
		 fill('#00FF00');
	 }
	 else if(this.state == 'f'){
		 fill('#FF0000');
	 }
	 
	circle(this.x, this.y, 20);
}

function Line(p1,p2,d){ 
	this.p1 = p1 ; 
	this.p2 = p2 ; 
	this.state = 'e';
	this.weight = Math.floor(d % 10) + 1;
}

Line.prototype.drawLine = function(){
	if(this.state == 'e'){
		stroke('#AAAAAA');
		strokeWeight(1);
	}
	else if (this.state == 'p'){
		stroke('#FFD700');
		strokeWeight(3);
	}
	line(this.p1.x , this.p1.y , this.p2.x , this.p2.y);
	var mx = floor((this.p1.x + this.p2.x)/2) + 5;
	var my = floor((this.p1.y + this.p2.y)/2) + 10;
	textSize(20);
	fill(0, 102, 153);
	text(this.weight ,mx , my);
}

function mouseclicked(e) {
	x = e.clientX - toolsWidth;
	y = e.clientY;
	nodes.push(new Point(x, y , index++));
}

function reset() {
	stopMess = 1;
	nodes = [] ; 
	lines = [] ; 	
	nodeSelected = 0 ; 
}

function check(e) {
	x = e.clientX - toolsWidth;
	y = e.clientY;
	var curr = new Point(x, y);
	for (var i = 0; i < nodes.length; i++) {
		if (dist(curr.x, curr.y, nodes[i].x, nodes[i].y) <= 10) {
			if(!nodeSelected){
				if (p1.x == 0 && p1.y == 0) {
					p1 = new Point(nodes[i].x, nodes[i].y);
				}
				else if (p2.x == 0 && p2.y == 0 && (nodes[i].x != p1.x && nodes[i].y != p1.y)) {
					p2 = new Point(nodes[i].x, nodes[i].y);
					lines.push(new Line(p1 , p2 , dist(p1.x,p1.y,p2.x,p2.y)));
					p1 = new Point(0, 0);
					p2 = new Point(0, 0);

				}
			}
			else{
				if(startNode.x == 0 && startNode.y == 0){
					startNode = nodes[i];
					startNode.state = 's'  ;
				}
				else{
					finishNode = nodes[i] ; 
					finishNode.state = 'f' ; 
					nodeSelected = 0 ; 
				}
			}
		}
	}

}

function searchNode(point){
	for(var i = 0 ; i < nodes.length ; i++){
		if(point.x == nodes[i].x && point.y == nodes[i].y){
			return nodes[i] ; 
		}
	}
}

function updateNeighbors(){
    
    for(var i = 0 ; i < nodes.length ; i++){
		for(var j = 0 ; j < lines.length ; j++){
			if((lines[j].p1.x == nodes[i].x && lines[j].p1.y == nodes[i].y)){
					nodes[i].neighbors.push(searchNode(lines[j].p2)) ; 
			}
			else if((lines[j].p2.x == nodes[i].x && lines[j].p2.y == nodes[i].y)){
				nodes[i].neighbors.push(searchNode(lines[j].p1)) ; 
			}
		}
	}
    
}

function selectNode(){
	if(startNode.x == 0 && startNode.y == 0){
		nodeSelected = 1 ; 
		document.getElementById("selectNode").classList.remove("btn-success");
		document.getElementById("selectNode").classList.add("btn-danger");
		document.getElementById("selectNode").innerHTML = "RESET" ; 
	}
	else{
		nodeSelected = 0 ; 
		document.getElementById("selectNode").classList.remove("btn-danger");
		document.getElementById("selectNode").classList.add("btn-success");
		document.getElementById("selectNode").innerHTML = "Start-Finish" ;
		startNode.state = 'e' ; 
		finishNode.state = 'e' ;
		startNode = new Point(0 , 0 ) ; 
		finishNode = new Point(0 , 0) ;
		for(var i = 0 ; i < lines.length ; i++){
			lines[i].state = 'e' ; 
		} 
	
	}
}

function callDijkstra(){							
	for(var i =0  ; i < nodes.length ; i++){
		nodes[i].neighbors = [] ; 
		nodes[i].distance = Infinity ; 
	}
	updateNeighbors() ; 
	console.log("startNode",startNode) ; 
	console.log("finishNode",finishNode) ; 

	var parent = lineDijkstra(startNode , finishNode , lines , nodes) ; 
	// console.log(parent); 
}

function setup() {
	let canvas = createCanvas(w - toolsWidth, h);
	canvas.parent("canvas");
	canvas.style("display", "block");
	distance = calDistance(cities);
	for (var i = 0; i < cities.length; ++i) order[i] = i;
}

function draw() {
	// console.log(startNode);
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
			index = 0 ; 
			canvas.removeEventListener('mousedown', mouseclicked);
			canvas.addEventListener('mousedown', check);
		}

		for (var i = 0; i < nodes.length; i++) {
			nodes[i].drawPoint();
		}
		
		for(var i = 0 ; i < nodes.length ; i++) {
			textSize(15);
			stroke(255);
			strokeWeight(1);
			fill(0);
			text(i , nodes[i].x - 20 , nodes[i].y - 20);
		}
		
		
		for(var i = 0 ; i < lines.length ; i++){
			lines[i].drawLine();
		}
		
	}



}
