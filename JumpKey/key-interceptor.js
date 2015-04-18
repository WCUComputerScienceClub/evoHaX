// send hotkey to background script
function sendMessage() {
	console.log("Sending Message.");
	chrome.runtime.sendMessage({hotkey: "ctrl+hello+world"}, function(response) {
		console.log("Response recieved.");
	});
}

// create test button
var button = document.createElement("button");
button.setAttribute("id", "testButton");
button.innerHTML = "Send Test Message";
button.addEventListener("mouseup", sendMessage);
// add button to page
document.body.appendChild(button);