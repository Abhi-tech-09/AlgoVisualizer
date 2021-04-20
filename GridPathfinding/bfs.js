function bfs(startNode , finishNode){
    q = [] ; 
    var parent = new Map() ;
    startNode.distance = 0 ;
    parent.set(startNode , -1) ;  
    startNode.visited = true ; 
    q.push(startNode) ; 
    visitedNodes = [] ; 
    while(q.length != 0){
        frontNode = q[0] ; 
        q.shift() ; 

        visitedNodes.push(frontNode);
        updateVisited(visitedNodes); 
        if(frontNode == finishNode){
            return [visitedNodes , parent] ; 
        }

        neighbor = frontNode.neighbors;
        for(var i = 0 ; i < neighbor.length ; i++){
            if(!neighbor[i].visited){
                neighbor[i].visited = true ;
                neighbor[i].distance = frontNode.distance + 1 ; 
                parent.set(neighbor[i] , frontNode) ; 
                q.push(neighbor[i]);
            }
        } 
    }
    return [visitedNodes , parent] ; 

}