function astar(startNode , finishNode , grid){
    openList = [] ; 
    closedList = [] ; 
    var G = new Map() ; 
    var H = new Map() ; 
    var parent = new Map() ; 
    parent.set(startNode , -1) ; 
    openList.push(startNode) ;
    visitedNodes = [] ; 
    
    startNode.distance = 0 ;  
    H.set(startNode , heuristic(startNode,finishNode)) ; 
    G.set(startNode , ( startNode.distance + H.get(startNode) ) ); 
    
    while(openList.length != 0){
        var currentSquare = findlow(openList , G) ; 

        //Removing it from openList
        var index = -1 ; 
        for(var i = 0 ; i < openList.length ; i++){
            if(currentSquare.x == openList[i].x && currentSquare.y == openList[i].y){
                index = i;
                break;
            }
        }
        if(index != -1){
            openList.splice(index , 1);
        }

        closedList.push(currentSquare) ; 
        visitedNodes.push(currentSquare);
        if(currentSquare == finishNode){
            setPath(parent , visitedNodes , finishNode);
            return ;  
        }

        var neighbor = currentSquare.neighbors ; 
        for(var i = 0 ; i < neighbor.length ; i++){
            if(findNode(neighbor[i] , closedList))
                continue; 
            if(!findNode(neighbor[i] , openList)){
                openList.push(neighbor[i]);
                parent.set(neighbor[i] , currentSquare);
                neighbor[i].distance = currentSquare.distance + 1 ; 
                H.set(neighbor[i] , heuristic(neighbor[i],finishNode));
                G.set(neighbor[i] , (neighbor[i].distance + H.get(neighbor[i])));
            }
            else{
                var fValue = neighbor[i].distance;
                var currFvalue = currentSquare.distance + 1 ;  
                if(fValue > currFvalue){
                    parent.set(neighbor[i] , currentSquare);
                    G.set(neighbor[i] , currFvalue) ; 
                    neighbor[i].distance = currentSquare.distance + 1 ; 
                }
            }
        }

    }


}

function heuristic(node1 , node2){
     var X =  Math.abs(node1.x - node2.x) ;
     var Y =  Math.abs(node1.y - node2.y) ;
     ANS = X + Y ; 
     return ANS ; 

}

function findlow(openList , G){
    var min = Infinity ; 
    var r ; 
    for(var i = 0 ; i < openList.length ; i++){
        if(G.get(openList[i]) < min){
            min = G.get(openList[i]);
            r = openList[i] ; 
        }
    }
    return r ; 
}

function findNode(node , array){
    for(var i = 0 ; i < array.length; i++){
        if(array[i].x == node.x && array[i].y == node.y){
            return true ; 
        }
    }
    return false ; 
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