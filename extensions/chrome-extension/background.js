
// receive message from content script
var tabs = [];

var hostDomain = "";

// recieve message from content script
//301 is the value for the alt key

function receiveMessage(request, sender, sendResponse) {
	console.log("receiveMessage");
    var hotkey = request.hotkey.substring(7,9);
	console.log("Hotkey: " + hotkey);
	
	switch(hotkey){
		case "65": //go to about us
		alert("About Us");
		break;
		case "72": //go to home page
		alert("Home");
		break;
		case "67": //go to contact us
		alert("Contact Us");
		break;
	}
}

chrome.runtime.onMessage.addListener(receiveMessage);

// Current Tab Changed
chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab){
        console.log("onUpdate");
        // Update the hostDomain for a tab
        for(var i = 0; i < tabs.length; i++){
            if(tabs[i].tabId == tabId){
                console.log("Previous Domain: " + hostDomain);
                tabs[i].hostDomain = getTheDomainFromURL(tab.url);
                console.log("New Domain: " + hostDomain);
                break;
            }
        }
    }
);

// New Tab
chrome.tabs.onCreated.addListener(
    function(tabId, changeInfo, tab){
        // Sets up the new Tab Object and adds it to the tabs array
        console.log("onCreated");
        tabs.push({ tabId: tabId, hostDomain: tab.url })
    }
);
               
// Tab Closed
chrome.tabs.onRemoved.addListener(
    function(tabId, changeInfo, tab){
        console.log("onRemove");
        // Removes the closed tab from the tabs array based on tabId
        for(var i = 0; i < tabs.length; i++){
            if(tabs[i].tabId == tabId){
                tabs.splice(i, 1);
                break;
            }
        }
    }
);

function getTheDomainFromURL(url){
    return new URL(url).hostname;
}
