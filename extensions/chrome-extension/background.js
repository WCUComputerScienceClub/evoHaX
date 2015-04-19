// receive message from content script
//301 is the value for the alt key

function recieveMessage(request, sender, sendResponse) {
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

chrome.runtime.onMessage.addListener(recieveMessage);