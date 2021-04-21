var canvas ; 
var ctx ;
var WIDTH = 800 ; 
var HEIGHT = 800 ;

var startNode ; 
var finishNode ; 

var gap = 20 ; 

var total_rows = 30 ; 
var total_cols = 52 ;

var grid = []  ; 
for (var r = 0 ; r < total_rows ; r++){
    grid.push([])
    for(var c = 0 ; c < total_cols ; c++){
        //e stands for empty
        node = new Node(r , c , c * (gap + 1) , r * (gap + 2) , 'e' , total_rows , total_cols) ; 
        grid[r][c] = node ;  
    }
}


function draw(){
    clear() ; 
    ctx.fillStyle = "black" ; 
    ctx.fillRect(0, 0, canvas.height , canvas.width);

    for (var i = 0 ; i < total_rows ; i++){
        for (var j = 0 ; j < total_cols ; j++){
            grid[i][j].draw_node(ctx , gap) ; 
        }
    }
    
}
function clear(){
    ctx.clearRect(0 , 0 , WIDTH , HEIGHT) ; 
}
    
function initialise(){
    canvas = document.getElementById("canvas") ; 
    ctx = canvas.getContext("2d") ; 
    ctx.fillStyle = "black" ; 
    ctx.fillRect(0, 0, canvas.width , canvas.height);
    return setInterval(draw , 10) ; 
}

var pressX ; 
var pressY ;
var clicked = 0 ;
function drag(e){
    var mx = e.clientX - canvas.offsetLeft ; 
    var my = e.clientY - canvas.offsetTop;   

    for (var r = 0 ; r < total_rows ; r++){
        for(var c = 0 ; c < total_cols ; c++){
            let currX = grid[r][c].x ; 
            let currY = grid[r][c].y ; 
            if(currX <= mx && mx <= (currX+gap) && currY <= my && my <= (currY+gap)){
                if(clicked == 1 && grid[r][c].state != 's'){
                    clicked++ ; 
                    grid[r][c].state = 'f' ; 
                    finishNode = grid[r][c] ; 
                }
                else if(grid[r][c].state == "e" && (pressX != c || pressY != r) && grid[r][c].state != 's' && grid[r][c].state != 'f'){
                    grid[r][c].state = "w" ;
                    pressX = c ; 
                    pressY =  r ;
                }
                else if(grid[r][c].state == "w" && (pressX != c || pressY != r) && grid[r][c].state != 's' && grid[r][c].state != 'f'){
                    grid[r][c].state = "e" ;
                    pressX = c ; 
                    pressY =  r ;
                }
            }
        }
    }
}

function pressed(e) {
    canvas.onmousemove = drag ;
    var mx = e.clientX - canvas.offsetLeft ; 
    var my = e.clientY - canvas.offsetTop;   

    for (var r = 0 ; r < total_rows ; r++){
        for(var c = 0 ; c < total_cols ; c++){
            let currX = grid[r][c].x ; 
            let currY = grid[r][c].y ; 
            if(currX <= mx && mx <= (currX+gap) && currY <= my && my <= (currY+gap)){
                if(clicked == 0){
                    clicked++ ; 
                    grid[r][c].state = 's' ; 
                    startNode = grid[r][c] ; 
                }
                else if(clicked == 1 && grid[r][c].state != 's'){
                    clicked++ ; 
                    grid[r][c].state = 'f' ; 
                    finishNode = grid[r][c] ; 
                }
                else if(grid[r][c].state == "e" && grid[r][c].state != 's' && grid[r][c].state != 'f'){
                    grid[r][c].state = "w" ;
                    pressX = c ; 
                    pressY =  r ;
                }
                else if(grid[r][c].state == "w" && grid[r][c].state != 's' && grid[r][c].state != 'f'){
                    grid[r][c].state = "e" ;
                    pressX = c ; 
                    pressY = r ; 
                }
            }
        }
    }
}

function up(){
    canvas.onmousemove = null ; 
}





function callDijkstra(){
    for (var r = 0 ; r < total_rows ; r++){
        for(var c = 0 ; c < total_cols ; c++){
            grid[r][c].updateNeighbors(); 
        }
    }

    
    parent = dijkstra(startNode , finishNode) ; 
    // setPath(parent) ;
    
}

function callBFS(){
    for (var r = 0 ; r < total_rows ; r++){
        for(var c = 0 ; c < total_cols ; c++){
            grid[r][c].updateNeighbors(); 
        }
    }

    arr = bfs(startNode , finishNode) ; 
    a = arr[0] ; 
    for (var i = 0 ; i < a.length ; i++){
        if(a[i].state != 's' && a[i].state != 'f')
            a[i].state = 'd' ; 
    }

    parent = arr[1] ; 
    crawl = parent.get(finishNode) ; 
    while(crawl != -1){
        if(crawl != startNode && crawl != finishNode)
            crawl.state = 'p' ;
        crawl = parent.get(crawl) ; 
    }

}

function callDFS(){
    for (var r = 0 ; r < total_rows ; r++){
        for(var c = 0 ; c < total_cols ; c++){
            grid[r][c].updateNeighbors(); 
        }
    }
     dfs(startNode , finishNode) ;
}


function start(){ 
    
}


initialise();
canvas.onmousedown = pressed ; 
canvas.onmouseup = up ; 

