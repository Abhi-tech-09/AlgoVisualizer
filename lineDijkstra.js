function lineDijkstra(startNode, finishNode , lines , nodes){
    startNode.distance = 0 ; 
    q = [] ; 
    q.push(startNode) ; 
    var parent = new Map() ; 
    parent.set(startNode , -1); 
    console.log( q);
    while(q.length != 0){
        q.sort(cmp);
        var closestNode = q[0] ;
        q.shift() ; 
        

        var neighbor = closestNode.neighbors;
        for(var i = 0 ; i < neighbor.length ; i++){
            if(neighbor[i].distance > closestNode.distance+getWeight(neighbor[i],closestNode,lines)){
                neighbor[i].distance = closestNode.distance+getWeight(neighbor[i],closestNode,lines);
                q.push(neighbor[i]); 
                parent.set(neighbor[i] , closestNode);
            }
        }
    }

    for(var i = 0 ; i < nodes.length ; i++){
        console.log(nodes[i].distance);
    }
    updateLines(parent ,finishNode, lines);
    return parent ; 

}

function cmp(nodeA  ,nodeB){
    return nodeA.distance - nodeB.distance ; 
}

function getWeight(p1 , p2 ,lines){
    for(var i =0 ; i < lines.length ; i++){
        if(lines[i].p1.x == p1.x && lines[i].p1.y == p1.y && lines[i].p2.x == p2.x && lines[i].p2.y == p2.y){
            return lines[i].weight ; 
        }
        if(lines[i].p2.x == p1.x && lines[i].p2.y == p1.y && lines[i].p1.x == p2.x && lines[i].p1.y == p2.y){
            return lines[i].weight ; 
        }
    }
}

function getLine(p1 , p2 , lines){
    for(var i =0 ; i < lines.length ; i++){
        if(lines[i].p1.x == p1.x && lines[i].p1.y == p1.y && lines[i].p2.x == p2.x && lines[i].p2.y == p2.y){
            return lines[i]; 
        }
        if(lines[i].p2.x == p1.x && lines[i].p2.y == p1.y && lines[i].p1.x == p2.x && lines[i].p1.y == p2.y){
            return lines[i]; 
        }
    }
}

async function updateLines(parent , finishNode , lines){
    var crawl = finishNode; 
    while(crawl != -1){
        await sleep(1000) ; 
        var l = getLine(crawl , parent.get(crawl) , lines); 
        l.state = 'p' ; 
        crawl = parent.get(crawl) ; 
    }
}


