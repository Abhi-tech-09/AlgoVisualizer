var w = window.innerWidth,
	h = window.innerHeight,
	toolsWidth = document.querySelector(".tools-wrapper").offsetWidth;
toolsHeight = document.querySelector(".tools-wrapper").offsetHeight;

var cities = [];
var order = []; //order of cities will be here because nextpermutation ispe work karega
var distance = 0;
var bruteforceFlag = 0;
var fr = 10;
var bestEver = [];
var start = 1;
var BFSflag = 0;
var graphFlag = 0 ;
var adjlist = new Map();
//For graphs make two arrays to store which two nodes we must connect;
var node1 = [];
var node2 = [];

//Flag flipping functions

function play() {
	start ^= 1;
}

function flipBfs() {
	BFSflag ^= 1;
}

function flip() {
	bruteforceFlag ^= 1;
}

function flipgraph(){
  graphFlag ^= 1;
  
  document.getElementById("interactive").checked = true;
}


//Point plotting Functions

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function plot() {
	var f = document.getElementById("interactive").checked;
	distance = 0 ;
  if(bruteforceFlag == 1)bruteforceFlag = 0 ;
  else if(BFSflag == 1) BFSflag = 0;
	if (f) {
		bestEver = [];
		cities = [];
		order = [];
		node1 = [];
		node2 = [];
		document.getElementById("defaultSize").disabled = true;
		document.getElementById("defaultText").style.opacity = "0.5";
		document.getElementById("defaultSize").style.opacity = "0.5";
		document
			.getElementById("canvas")
			.addEventListener("mousedown", getPoints);
	} else {
		document.getElementById("defaultText").style.opacity = "1";
		document.getElementById("defaultSize").style.opacity = "1";
		document
			.getElementById("canvas")
			.removeEventListener("mousedown", getPoints);
	}
}

function getPoints(event) {
	cities.push(new Point(event.clientX - toolsWidth, event.clientY));
	order[cities.length - 1] = cities.length - 1;
	console.log(cities);
  
  distance = calDistance(cities);
  document.querySelector(".displayDistance").value = distance.toFixed(
    2
  );
}

function getRandom(x, y) {
	return Math.floor(Math.random() * (y - x + 1)) + x;
}

function getDefaultPoints() {
	bestEver = [];
	cities = [];
	order = [];
	document.getElementById("defaultSize").disabled = false;
	var n = document.getElementById("defaultSize").value;
	if (n == "") {
		for (var i = 0; i < 5; ++i) {
			cities.push(
				new Point(
					getRandom(toolsWidth, w - toolsWidth),
					getRandom(100, h - 100)
				)
			);
			order[i] = i;
		}
	}

	document
		.getElementById("defaultSize")
		.addEventListener("keyup", function () {
			cities = [];
			order = [];
			var n = document.getElementById("defaultSize").value;
			if (n == "") {
				for (var i = 0; i < 10; ++i) {
					cities.push(
						new Point(
							getRandom(toolsWidth, w - 100),
							getRandom(100, h - 100)
						)
					);
					order[i] = i;
				}
			} else {
				for (var i = 0; i <= parseInt(n); ++i) {
					cities.push(
						new Point(
							getRandom(toolsWidth, w - 100),
							getRandom(100, h - 100)
						)
					);
					order[i] = i;
				}
			}
		});
}

function plotEdge() {
	str = document.querySelector("#inputEdge").value;
  document.getElementById("interactive").checked = false;
	ind = str.split("-");
	node1.push(ind[0] - 1);
	node2.push(ind[1] - 1);
	var city1 = cities[ind[0] - 1];
	var city2 = cities[ind[1] - 1];
	if (adjlist[ind[0]] == null) {
		adjlist[ind[0]] = [];
		adjlist[ind[0]].push(parseInt(ind[1]));
	} else {
		adjlist[ind[0]].push(parseInt(ind[1]));
	}
	if (adjlist[ind[1]] == null) {
		adjlist[ind[1]] = [];
		adjlist[ind[1]].push(parseInt(ind[0]));
	} else {
		adjlist[ind[1]].push(parseInt(ind[0]));
	}
	console.log(adjlist);
  console.log("PlotEdge is working");
}

function plotGraph() {
	if (document.getElementById("interactive").checked == false)
		for (var i = 0; i < node1.length; ++i) {
			line(
				cities[node1[i]].x,
				cities[node1[i]].y,
				cities[node2[i]].x,
				cities[node2[i]].y
			);
		}
}

function makeCities() {
	for (var i = 0; i < cities.length; ++i) {
		stroke(255);
		strokeWeight(1);
		text(i + 1, cities[i].x - 30, cities[i].y - 20);
		stroke("#35d925");
		strokeWeight(4);
		circle(cities[order[i]].x, cities[order[i]].y, 20);
	}
}

function makeConnection(){
  stroke(255);
		strokeWeight(4);
		noFill();
		beginShape();
		for (var i = 0; i < cities.length; i++) {
			vertex(cities[order[i]].x, cities[order[i]].y);
		}
		endShape();
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


	makeCities();
  if(!graphFlag && !BFSflag)
    makeConnection();
  else 
    plotGraph();
 
  

	if (start) {
		implementAlgo();
	}
}

function displayBestEver() {
	beginShape();
	for (var i = 0; i < bestEver.length; i++) {
		strokeWeight(4);
		stroke(100);
		vertex(bestEver[i].x, bestEver[i].y);
	}
	endShape();
}

function implementAlgo() {
	if (bruteforceFlag && !graphFlag) {
		document.getElementById("interactive").checked = false;
      displayBestEver();
      bruteforce(cities);
		  
	}
	if (BFSflag) {
			breadthFirstSearch(cities, 1, 7);
		
	}
}

function swap(a, i, j) {
	var temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}

function next_permutation(temp) {
	const swap = (i, j) => ([temp[i], temp[j]] = [temp[j], temp[i]]);

	let len = temp.length - 1,
		i;
	for (i = len - 1; temp[i] >= temp[i + 1]; ) i--;
	let j = i + 1,
		k = len;
	while (j < k) swap(j++, k--);
	if (i >= 0) {
		for (j = i + 1; temp[i] >= temp[j]; ) j++;
		swap(i, j);
	}
	// console.log("Cities" , cities);
	return temp;
}

function bruteforce(cities) {
	order = next_permutation(order);
	d = calDistance(cities);
  console.log("D ----> ",d);
  console.log("Distance ---> ",distance);
  console.log("working brutefore");
	if (d < distance) {
		distance = d;
    console.log("Displaying best-Ever");
		bestEver = cities.slice();
		document.querySelector(".displayDistance").value = distance.toFixed(2);
	}
}

function increment() {
	fr += 10;
	console.log(fr);
}
function decrement() {
	if (fr - 1 > 0) fr -= 1;
	console.log(fr);
}

function calDistance(points) {
	var sum = 0;
	for (var i = 0; i < points.length - 1; i++) {
		var distance = dist(
			points[order[i]].x,
			points[order[i]].y,
			points[order[i + 1]].x,
			points[order[i + 1]].y
		);
		sum += distance;
	}
	return sum;
}

function breadthFirstSearch(cities, x, y) {
  graphFlag ^= 1;
	q = [];
	q.push(x);
	visited = [];
	pred = [];
	for (var i = 0; i < cities.length; ++i) {
		visited[i + 1] = 0;
		pred[i + 1] = -1;
	}
	distance = [];
	distance[x] = 0;
	var brk = 0;
	visited[x] = 1;
	console.log("Working.");
	while (q.length != 0) {
		s = q[0];
		q.shift();

		for (var i = 0; i < adjlist[s].length; ++i) {
			if (visited[adjlist[s][i]] == 0) {
				visited[adjlist[s][i]] = 1;
				distance[adjlist[s][i]] = distance[s] + 1;
				q.push(adjlist[s][i]);
				pred[adjlist[s][i]] = s;

				// if(adjlist[s][i] == y){
				//   brk = 1;
				//   break;
				// }
			}
		}
		// if(brk)break;
	}
	console.log(distance);
	console.log(visited);
	path = [];
	var crawl = y;
	path.push(crawl);
	while (pred[crawl] != -1) {
		path.push(pred[crawl]);
		crawl = pred[crawl];
	}
	console.log("here is your path ", reverse(path));
	stroke(4);
	for (var i = 0; i < path.length - 1; ++i) {
		line(
			cities[path[i] - 1].x,
			cities[path[i] - 1].y,
			cities[path[i + 1] - 1].x,
			cities[path[i + 1] - 1].y
		);
	}
}
