var cities = [];
var totalCities = 8;
var distance = 0;
var bestEver;



function setup() {
   let canvas = createCanvas(w - toolsWidth , h);
   canvas.parent('canvas');
   canvas.style('display', 'block');

   //Initialising cities array using random points
   for(var i = 0;i<totalCities ;i++){
     var temp = getPoints();
     var v = createVector(temp[0] , temp[1]);
     cities[i] = v;
     text(i.toString() , cities[i].x + 1 , cities[i].y + 1);
   }
   bestEver = cities.slice();
   noLoop();
   distance = calDistance(cities);
   document.querySelector('.displayDistance').value = distance.toFixed(4);

}

document.querySelector('#start').onclick = function(){
  loop();
}
document.querySelector('#stop').onclick = function(){
  noLoop();
}
var f = 1;
document.body.onkeyup = function(e){
  if(e.keyCode == 32 && f == 1){
    loop();
    f ^= 1;
  }
  else if(e.keyCode == 32 && f == 0){
    noLoop();
    f ^= 1;
  }
}

function draw() {
  background('#0F2027');
  frameRate(5);
  
  //Creating points.
  fill(255);
  for(var i=0;i<cities.length;i++){
    ellipse(cities[i].x , cities[i].y , 12 , 12);
    text(i.toString() , cities[i].x + 10 , cities[i].y + 10);
  }

  //Creating Paths 
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for(var i =0;i<cities.length;i++){
    vertex(cities[i].x , cities[i].y);
  }
  endShape();

  //Displaying bestEver cities
  stroke(0 , 100 , 0);
  strokeWeight(3);
  noFill();
  beginShape();
  for(var i =0;i<bestEver.length;i++){
    vertex(bestEver[i].x , bestEver[i].y);
  }
  endShape();

  var i = floor(random(cities.length));
  var j = floor(random(cities.length));
  swap(cities , i , j);

  //Displaying Distance
  var d = calDistance(cities);
  if(d < distance){
    distance = d;
    bestEver = cities.slice();
  document.querySelector('.displayDistance').value = distance.toFixed(4);
  }
}

function calDistance(points){
  var sum = 0;
  for(var i=0;i<points.length-1;i++){
    var distance = dist(points[i].x , points[i].y , points[i+1].x , points[i+1].y);
    sum += distance;
  }
  return sum;
}

function swap(a ,i, j){
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

