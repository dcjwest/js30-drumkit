/*
	Project Name: JS30 Drumkit
	Project URL: http://dcjwest.github.io/...
	Description: Simple drumkit emulator
*/

/* ====================================== */

function playSound(event){
	// Handle 'click' vs 'keydown' events
	const clickedElement = event.type === "click"? this : false;
	const currentSound = clickedElement? document.querySelector(`audio[data-key="${clickedElement.getAttribute("data-key")}"]`)
										:document.querySelector(`audio[data-key="${event.keyCode}"]`);
	const currentkey = clickedElement? document.querySelector(`.key[data-key="${clickedElement.getAttribute("data-key")}"]`)
										:document.querySelector(`.key[data-key="${event.keyCode}"]`);

	if(!currentSound) return; // Stop the function if unrelated keys are pressed
	currentSound.currentTime = 0; //Reset sound clip to fix quick successive key presses

	currentSound.play();
	currentkey.classList.add("playing");
}

function removeAnimation(event){
	if(event.propertyName !== "transform") return; //Ignore all events except 'transform' event
	this.classList.remove("playing");
}

const drumkit = document.querySelectorAll(".key");

//Event handling
window.addEventListener("keydown", playSound);
drumkit.forEach(key => key.addEventListener("click", playSound));
drumkit.forEach(key => key.addEventListener("transitionend", removeAnimation));