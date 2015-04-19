// send hotkey to background script
//301 is the value for the alt key

var map = [];
onkeydown = onkeyup = function(e){
	e = e || event;
	map[e.keyCode] = e.type == 'keydown';
	
	if(e.altKey && map[16] && map[65]){ //AltShiftA
		sendMessage(301, 16, 65);
		map.length = 0;
	}
	else if(e.altKey && map[16] && map[72]){ //AltShiftH
		sendMessage(301, 16, 72);
		map.length = 0;
	}
	else if(e.altKey && map[16] && map[67]){ //AltShiftC
		sendMessage(301, 16, 67);
		map.length = 0;
	}
}


function sendMessage(num1, num2, num3) {
	console.log("Sending Message.");
	chrome.runtime.sendMessage({hotkey: num1 + " " + num2 + " " + num3}, 
	function(response) {
		console.log("Response received.");
	});
}

// create test button
// var button = document.createElement("button");
// button.setAttribute("id", "testButton");
// button.innerHTML = "Send Test Message";
// button.addEventListener("mouseup", sendMessage);


// add button to page
// document.body.appendChild(button);