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
        if(closestNode == finish){
           var r = setPath(parent , visitedNodes , finishNode);
           console.log(r);
           return parent ; 
        }

        var neighbor = closestNode.neighbors ; 
        for (var i = 0 ; i < neighbor.length ; i++){
            if(neighbor[i].distance > (closestNode.distance + 1)){
                parent.set(neighbor[i] , closestNode) ; 
                neighbor[i].distance = closestNode.distance + 1 ; 
                q.push(neighbor[i]) ; 
            }
        }
    }
    return parent ;
    
}

async function setPath(parent , visitedNodes , finishNode){
    await updateVisited(visitedNodes);
    crawl = parent.get(finishNode) ; 
    while(crawl != -1){
        await sleep(100) ; 
        if(crawl != startNode && crawl != finishNode)
            crawl.state = 'p' ;
        crawl = parent.get(crawl) ; 
    }
    return "Path found" ; 
}

function cmp(nodeA  ,nodeB){
    return nodeA.distance - nodeB.distance ; 
}

async function updateVisited(visitedNodes){
    for (var i = 0 ; i < visitedNodes.length ; i++){
        if(visitedNodes[i].state != 's' && visitedNodes[i].state != 'f' && visitedNodes[i].state != 'p' ){
            await sleep(2) ; 
            visitedNodes[i].state = 'd' ; 
        }
    }
    return new Promise(function(resolve , reject){
        setTimeout(() => {
            const check = true ; 
            if(check){
                resolve();
            }
            else{
                reject();
            }
        }, 1000);
    });
}