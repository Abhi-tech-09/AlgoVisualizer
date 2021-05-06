var canvas ; 
var ctx ;
var WIDTH = 800 ; 
var HEIGHT = 800 ;

var startNode ; 
var finishNode ; 

var gap = 20 ; 

var total_rows = 30 ; //30
var total_cols = 56   ; //56

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

var pressX = 0 ; 
var pressY  = 0 ;
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

    resetNodes();
    
    for (var r = 0 ; r < total_rows ; r++){
        for(var c = 0 ; c < total_cols ; c++){
            grid[r][c].updateNeighbors(); 
        }
    }
    parent = DijkstraAlgo.dijkstra(startNode , finishNode) ; 
    
}

function callBFS(){

    resetNodes() ;

    for (var r = 0 ; r < total_rows ; r++){
        for(var c = 0 ; c < total_cols ; c++){
            grid[r][c].updateNeighbors(); 
        }
    }

    BFS.bfs(startNode , finishNode) ; 

}

function callDFS(){

    resetNodes() ; 

    for (var r = 0 ; r < total_rows ; r++){
        for(var c = 0 ; c < total_cols ; c++){
            grid[r][c].updateNeighbors(); 
        }
    }
     DFS.dfs(startNode , finishNode) ;
}

function callAstar(){
    resetNodes() ; 
    for (var r = 0 ; r < total_rows ; r++){
        for(var c = 0 ; c < total_cols ; c++){
            grid[r][c].updateNeighbors(); 
        }
    }
    ASTAR.astar(startNode , finishNode , grid) ; 
}

function callBiDijkstra(){
    resetNodes() ; 
    for (var r = 0 ; r < total_rows ; r++){
        for(var c = 0 ; c < total_cols ; c++){
            grid[r][c].updateNeighbors(); 
        }
    }

    BIDIJKSTRA.BiDijkstra(startNode , finishNode , grid);
}
 
async function meraRecursion(r0 , c0 , rm , cm){
    if(Math.abs(rm-r0) < 5){
        return ;
    }
    if(Math.abs(cm-c0) < 5){
        return ;
    }
    let horizontal = cm - c0 ; 
    let vertical = rm - r0 ; 
    if(vertical >= horizontal){
        let randRow = Math.floor(Math.random() * (rm - r0 )) + r0 + 1  ;
        if((randRow+1) <= rm && grid[randRow+1][5].state == 'w')
            randRow -= 1;
        else if((randRow-1) >= r0 && grid[randRow-1][5].state == 'w')
            randRow += 1 ;  

        for(var i = c0+1 ; i < cm ; i++){
            await sleep(1);
            grid[randRow][i].state = 'w' ; 
        }
        var cnt = Math.floor(Math.random() * 3) + 2 ; 
        while(cnt != 0){
            cnt -= 1; 
            let randCol = Math.floor(Math.random() * (cm - c0)) + c0 ;
            if(randCol == c0)randCol += 1
            grid[randRow][randCol].state = 'e' ; 
        }
        meraRecursion(r0 , c0 , randRow , cm) ; 
        meraRecursion(randRow , c0 , rm , cm ) ;
    }
    else{
        let randCol =  Math.floor(Math.random() * (cm - c0 )) + c0  ;
        if(randCol == c0)randCol += 1 ; 

        if((randCol+1) <= cm && (grid[2][randCol+1].state == 'w'))
            randCol -= 1;
        else if((randCol-1) >= c0 && (grid[2][randCol-1].state == 'w'))
            randCol += 1 ;  

        for(var i = r0+1 ; i < rm ; i++){
            await sleep(1);
            grid[i][randCol].state = 'w' ; 
        }

        var cnt = Math.floor(Math.random() * 3) + 2 ; 
        while(cnt != 0){
            cnt -= 1; 
            let randRow = Math.floor(Math.random() * (rm - r0)) + r0 ;
            if(randRow == r0)randRow += 1
            grid[randRow][randCol].state = 'e' ; 
        }
        meraRecursion(r0 , c0 , rm , randCol) ; 
        meraRecursion(r0 , randCol , rm , cm ) ;

    }
    
}

async function makeSimple(){
    //Random Maze
    let cnt = 0 ; 
    while(cnt != 200){
        cnt += 1;   
    let rr = Math.floor(Math.random() * 30);
    let cc = Math.floor(Math.random() * 56);
    await sleep(10);
    grid[rr][cc].state = 'w' ; 
    }
}

async function RecursiveDivison(){
    for (var r = 0 ; r < total_rows ; r++){
        for(var c = 0 ; c < total_cols ; c++){
            grid[r][c].updateNeighbors(); 
        }
    }
    for(var r = 0 ; r < total_rows ; r++){
        await sleep(1);
        grid[r][0].state = 'w' ; 
        grid[r][total_cols-1].state = 'w';
    }
    for(var c = 0 ; c < total_cols ; c++){
        await sleep(1);
        grid[0][c].state = 'w' ; 
        grid[total_rows-1][c].state = 'w';
    }

    meraRecursion(0 , 0 , total_rows-1 , total_cols-1);
   
}

function resetNodes(){
    for(var i = 0 ; i < total_rows ; i++){
        for(var j = 0 ; j < total_cols ; j++){
            if(grid[i][j].state == 'd' || grid[i][j].state == 'p'){
                grid[i][j].state = 'e';
            }
            grid[i][j].neighbors = [] ; 
            grid[i][j].distance = Infinity ; 
            grid[i][j].visited = false ; 
        }
    }
}

function reset(){
   for(var i = 0 ; i < total_rows ; i++){
       for(var j = 0 ; j < total_cols ; j++){
           grid[i][j].state = 'e' ; 
           grid[i][j].neighbors = [] ; 
           grid[i][j].distance = Infinity ; 
           grid[i][j].visited = false ; 
       }
   }
   pressX =  new Node() ; 
   pressY =  new Node() ; 
   clicked = 0;
}

initialise();
canvas.onmousedown = pressed ; 
canvas.onmouseup = up ; 

