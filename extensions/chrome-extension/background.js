// recieve message from content script
//301 is the value for the alt key

function recieveMessage(request, sender, sendResponse) {
	var hotkey = request.hotkey;
	console.log("Hotkey: " + hotkey);
}

chrome.runtime.onMessage.addListener(recieveMessage);