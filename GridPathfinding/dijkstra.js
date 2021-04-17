function dijkstra(start , finish){
     visitedNodes = [] ; 
     q = [] ; 
    start.distance = 0 ; 
    var visited = new Map() ;
    var parent = new Map() ; 
    parent.set(start , -1) ; 
    q.push(start); 
    
    console.log("q" , q) ;  
    while(q.length != 0){
        q.sort(cmp) ; 
        var closestNode = q[0] ; 
        q.shift() ; 

        visitedNodes.push(closestNode) ; 
        if(closestNode == finish){
            return [visitedNodes,parent] ; 
        }

        var neighbor = closestNode.neighbors ; 
        console.log("neighbor" , neighbor) ; 
        for (var i = 0 ; i < neighbor.length ; i++){
            if(neighbor[i].distance > (closestNode.distance + 1)){
                // console.log(neighbor[i]);
                parent.set(neighbor[i] , closestNode) ; 
                neighbor[i].distance = closestNode.distance + 1 ; 
                q.push(neighbor[i]) ; 
            }
        }
        console.log("queue" , q);
    }
    return [visitedNodes , parent] ; 
    
}

function cmp(nodeA  ,nodeB){
    return nodeA.distance - nodeB.distance ; 
}