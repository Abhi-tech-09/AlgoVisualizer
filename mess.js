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
var graphFlag = 0;
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

function flipgraph() {
	if (graphFlag == 0) {
		document.querySelector("#plotGraphBtn").classList.remove("btn-dark");
		document.querySelector("#plotGraphBtn").classList.add("btn-danger");
		document.querySelector("#plotGraphBtn").innerHTML = "PlotCities";
	}
	else {
		document.querySelector("#plotGraphBtn").classList.remove("btn-danger");
		document.querySelector("#plotGraphBtn").classList.add("btn-dark");
		document.querySelector("#plotGraphBtn").innerHTML = "PlotGraph";
	}
	graphFlag ^= 1;

	document.getElementById("interactive").checked = true;

}


//Point plotting Functions

function Point(x, y , i = -1) {
	this.x = x;
	this.y = y;
	this.index = i ; 
	this.state = 'e';
	this.neighbors = [];
	this.distance = Infinity;
}

function plot() {
	var f = document.getElementById("interactive").checked;
	distance = 0;
	//   if(bruteforceFlag == 1)bruteforceFlag = 0 ;
	//   else if(BFSflag == 1) BFSflag = 0;
	if (f) {
		bestEver = [];
		cities = [];
		order = [];
		node1 = [];
		node2 = [];
		document
			.getElementById("canvas")
			.addEventListener("mousedown", getPoints);
	} else {
		document
			.getElementById("canvas")
			.removeEventListener("mousedown", getPoints);
	}
}

function getPoints(event) {
	cities.push(new Point(event.clientX - toolsWidth, event.clientY));
	order[cities.length - 1] = cities.length - 1;

	distance = calDistance(cities);
	document.querySelector(".displayDistance").value = distance.toFixed(
		2
	);
}

function getRandom(x, y) {
	return Math.floor(Math.random() * (y - x + 1)) + x;
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

}

function plotGraph() {
	stroke(150);
	strokeWeight(2);
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
	}
	for (var i = 0; i < cities.length; ++i) {
		stroke("#800080");
		fill("#800080");
		strokeWeight(2);
		circle(cities[order[i]].x, cities[order[i]].y, 10);
	}
}

function makeConnection() {
	strokeWeight(2);
	noFill();
	beginShape();
	for (var i = 0; i < cities.length; i++) {
		stroke("#ff0000")
		vertex(cities[order[i]].x, cities[order[i]].y);
	}
	endShape();
}


function displayBestEver() {
	beginShape();
	for (var i = 0; i < bestEver.length; i++) {
		strokeWeight(6);
		stroke("#4D33ff33");
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
		var temp = document.querySelector("#src-dest").value.split("-");
		var src = parseInt(temp[0]);
		var dest = parseInt(temp[1]);
		if (src && dest)
			breadthFirstSearch(cities, src, dest);

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
	for (i = len - 1; temp[i] >= temp[i + 1];) i--;
	let j = i + 1,
		k = len;
	while (j < k) swap(j++, k--);
	if (i >= 0) {
		for (j = i + 1; temp[i] >= temp[j];) j++;
		swap(i, j);
	}
	// console.log("Cities" , cities);
	return temp;
}

function bruteforce(cities) {
	order = next_permutation(order);
	d = calDistance(cities);
	if (d < distance) {
		distance = d;
		bestEver = cities.slice();
		document.querySelector(".displayDistance").value = distance.toFixed(2);
	}
}

function increment() {
	fr += 10;
}
function decrement() {
	if (fr - 1 > 0) fr -= 1;
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
	while (q.length != 0) {
		s = q[0];
		q.shift();

		for (var i = 0; i < adjlist[s].length; ++i) {
			if (visited[adjlist[s][i]] == 0) {
				visited[adjlist[s][i]] = 1;
				distance[adjlist[s][i]] = distance[s] + 1;
				q.push(adjlist[s][i]);
				pred[adjlist[s][i]] = s;
			}
		}
	}
	path = [];
	var crawl = y;
	path.push(crawl);
	while (pred[crawl] != -1) {
		path.push(pred[crawl]);
		crawl = pred[crawl];
	}
	stroke("#33ff33");
	strokeWeight(3);
	for (var i = 0; i < path.length - 1; ++i) {
		line(
			cities[path[i] - 1].x,
			cities[path[i] - 1].y,
			cities[path[i + 1] - 1].x,
			cities[path[i + 1] - 1].y
		);
	}
}
