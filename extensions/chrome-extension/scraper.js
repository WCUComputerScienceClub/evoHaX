// The array of links to be processed
var links = [];

// An array of buzz words to be matched against
var buzzWords = {
    "aboutus",
    "contactus",
    "support", "help",
    
}

/**
 * Gathers all of the anchor tags from a web page and stores
 * their text and href info in an object placed into the links array
 */
function gatherAnchorTags(){
    $("a").each(function(){
        links.push({
            text: this.text,
            url: this.href
        });
    });
}

function processLinks(){
    for(var linkData in links){
        for(var word in buzzWords){
            if(doesURLContainMatch(removePunctuationFromURL(linkData.url), word)){
                var action = "";
                
                if(word == "aboutus" || word == "about"){
                    action = "aboutus";
                }else if(word == "contact" || word == "contactus"){
                    action = "contactus";
                }else if(word == "support"){
                    action = "support";
                }
                    
                sendMessageToBackground({url: linkData.url, action: action});
 
                break;
            }
        }
    }
}

function sendMessageToBackground(message) {
	if(debug) console.log("Sending Message.");
	chrome.runtime.sendMessage(message);
}

/**
 * Given a string url and a buzz word see if any matches are found
 */
function doesURLContainMatch(url, word){
    if(url.contains(word)){
        return true;
    }
}

/**
 * Removes the punctuation from the passed parameter
 * Does not account for extraneous whitespace craeted by 
 * the replace but this shouldn't be a problem
 * for URLs
 */
function removePunctuationFromURL(url){
    return url.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}