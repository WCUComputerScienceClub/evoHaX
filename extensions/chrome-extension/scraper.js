function gatherAnchorTags(){
    var links = [];
    $("a").each(function(){
        links.push({
            text: this.text,
            url: this.href
        })
    })
    
    // All of the context and their urls are now in the links array
    
    // Search the links array for about us and contact us pages
}