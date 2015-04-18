// recieve message from content script
function recieveMessage(request, sender, sendResponse) {
	var hotkey = request.hotkey;
	console.log("Hotkey: " + hotkey);
}

chrome.runtime.onMessage.addListener(recieveMessage);