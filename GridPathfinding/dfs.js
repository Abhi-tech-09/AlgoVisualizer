function dfs(startNode , finishNode){
    startNode.visited = 0 ;
   
    recur(startNode , finishNode);
}
visitedNodes = [] ; 
function recur(temp , finishNode){
    if(temp == finishNode){
        return -1;
    }

    var A = temp.neighbors ; 
    for(var i = 0 ; i < A.length ; i++){
        if(A[i] == finishNode) break ; 
        if(A[i].state == 'w') continue ; 
        if(A[i].visited == false){
            A[i].visited = true ; 
            visitedNodes.push(A[i]) ; 
            updateVisited(visitedNodes);
            recur(A[i] , finishNode) ; 
        }
    }
}

