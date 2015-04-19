var debug = false;

// receive message from content script
var tabs = [];

// recieve message from content script
//301 is the value for the alt key

function recieveMessage(request, sender, sendResponse) {
    if (request.hotkey) {
        // handle key-interceptor request
        var hotkey = request.hotkey.substring(7,9);
        if(debug) console.log("Hotkey: " + hotkey);

        switch(hotkey){
		case "65": //go to about us
            if(debug)alert("About Us");
			sendMessage("about-us");
            break;
		case "67": //go to contact us
            if(debug)alert("Contact Us");
			sendMessage("contact-us");
            break;
        case "72": //go to home page
            if(debug)alert("Home");
            sendMessage("home");
            break;
		case "83": //go to support
			if(debug)alert("Support");
			sendMessage("support");
			break;
		case "76": //go to login 
			if(debug)alert("Login");
			sendMessage("login");
			break;
		case "74": //go to jobs/careers
			if(debug)alert("Jobs");
			sendMessage("jobs");
			break;
        }
    } else if (request.url && request.action) {
        // handle scraper request
        chrome.tabs.query({active: true, currentWindow: true}, function(activeTabs) {
            var activeTab = activeTabs[0];
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].tabId == activeTab.id) {
                    tabs[i].actionURL = request.url;
                    sendMessage(request.action);
                    break;
                }
            }
        });
    }
}

chrome.runtime.onMessage.addListener(recieveMessage);

// Current Tab Changed
chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab){
        // Update the previousDomain for a tab
        for(var i = 0; i < tabs.length; i++){
            if(tabs[i].tabId == tabId){
                if(debug) console.log("Previous Domain: " + tabs[i].hostDomain);
                
                tabs[i].hostDomain = getTheDomainFromURL(tab.url);
                
                if(debug) console.log("New Domain: " + tabs[i].hostDomain);
                break;
            }
        }
    }
);

// New Tab
chrome.tabs.onCreated.addListener(
    function(tab){
        // Sets up the new Tab Object and adds it to the tabs array
        if(debug) console.log("onCreated");
        tabs.push({ tabId: tab.id, hostDomain: tab.url })
        if(debug) console.log(tabs);
    }
);
               
// Tab Closed
chrome.tabs.onRemoved.addListener(
    function(tabId, changeInfo, tab){
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

function sendMessage(action){
    
    chrome.tabs.query({active: true, currentWindow: true}, function(activeTabs) {
        var activeTab = activeTabs[0];
        var url = "";
        
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].tabId == activeTab.id) {
                switch(action){
                    case "home":
                        url = "http://" + tabs[i].hostDomain;
                        break;
                    case "aboutus":
                    case "contactus":
                    case "support":
                        url = tabs[i].actionURL;
                        break;
					case "support":
						break;
					case "login":
						break;
					case "jobs":
						break;
                }
                break;
            }
        }
        
        chrome.tabs.sendMessage(activeTab.id, {url: url }, function(response) {
            if(debug) console.log("Message Sent! " + url);
        });
    });
    
}
















