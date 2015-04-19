<<<<<<< HEAD
// receive message from content script
=======
var tabs = [];

var previousDomain = "";

// recieve message from content script
>>>>>>> origin/master
//301 is the value for the alt key

function recieveMessage(request, sender, sendResponse) {
	var hotkey = request.hotkey;
	console.log("Hotkey: " + hotkey);
}

chrome.runtime.onMessage.addListener(recieveMessage);

// Current Tab Changed
chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab){
        // Update the previousDomain for a tab
        for(int i = 0; i < tabs.length; i++){
            if(tabs[i].tabId == tabId){
                tabs[i].previousDomain = getTheDomainFromURL(tab.url);
            }
        }
    }
);

// New Tab
chrome.tabs.onCreated.addListener(
    function(tabId, changeInfo, tab){
        // Sets up the new Tab Object and adds it to the tabs array
        tabs.push({ tabId: tabId, previousDomain: tab.url })
    }
);
               
// Tab Closed
chrome.tabs.onRemoved.addListener(
    function(tabId, changeInfo, tab){
        // Removes the closed tab from the tabs array based on tabId
        for(int i = 0; i < tabs.length; i++){
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
