function dfs(startNode , finishNode){
    s = [] ; 
    s.push(startNode) ; 
    var parent = new Map() ; 
    parent.set(startNode , -1) ; 
    visitedNodes = [] ;

    while(s.length != 0){
        var topNode = s[s.length - 1] ; 
        s.pop() ;
    
        visitedNodes.push(topNode);
        if(topNode == finishNode){
            setPath(parent , visitedNodes , finishNode);
            return ;
        }

        var neighbor = topNode.neighbors ;
        console.log(neighbor);
        for(var i = 0 ; i < neighbor.length ; i++){
            if(neighbor[i].visited == false){
                neighbor[i].visited = true ; 
                s.push(neighbor[i]);
                parent.set(neighbor[i] , topNode) ; 
            }
        }
    }
    return ; 
}

async function setPath(parent , visitedNodes , finishNode){
    await updateVisited(visitedNodes);
    crawl = parent.get(finishNode) ; 
    while(crawl != -1){
        await sleep(10) ; 
        if(crawl != startNode && crawl != finishNode)
            crawl.state = 'p' ;
        crawl = parent.get(crawl) ; 
    }
    return "Path found" ; 
}

async function updateVisited(visitedNodes){
    for (var i = 0 ; i < visitedNodes.length ; i++){
        if(visitedNodes[i].state != 's' && visitedNodes[i].state != 'f' && visitedNodes[i].state != 'p' ){
            await sleep(10) ; 
            visitedNodes[i].state = 'd' ; 
        }
    }
}