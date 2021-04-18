function dijkstra(start , finish){
    visitedNodes = [] ; 
     q = [] ; 
    start.distance = 0 ; 
    var parent = new Map() ; 
    parent.set(start , -1) ; 
    q.push(start); 
    
    console.log("q" , q) ;  
    while(q.length != 0){
        q.sort(cmp) ; 
        var closestNode = q[0] ; 
        q.shift() ; 

        visitedNodes.push(closestNode) ; 
        updateVisited(visitedNodes) ;
        if(closestNode == finish){
            return parent;
        }

        var neighbor = closestNode.neighbors ; 
        console.log("neighbor" , neighbor) ; 
        for (var i = 0 ; i < neighbor.length ; i++){
            if(neighbor[i].distance > (closestNode.distance + 1)){
                parent.set(neighbor[i] , closestNode) ; 
                neighbor[i].distance = closestNode.distance + 1 ; 
                q.push(neighbor[i]) ; 
            }
        }
        console.log("queue" , q);
    }
    return parent ; 
    
}

function cmp(nodeA  ,nodeB){
    return nodeA.distance - nodeB.distance ; 
}

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve , time)) ; 
}

const updateVisited = async(visitedNodes) => {
    for (var i = 0 ; i < visitedNodes.length ; i++){
        if(visitedNodes[i].state != 's' && visitedNodes[i].state != 'f' ){
            await sleep(5) ; 
            visitedNodes[i].state = 'd' ; 
        }
    }
}