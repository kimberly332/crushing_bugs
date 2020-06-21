(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				// querySelectorAll is for a one to many relationship and returns a Nodelust (an array) of matching elements
				puzzlePieces = document.querySelectorAll(".puzzle-image"),
				dropZones = document.querySelectorAll(".drop-zone"),
				dropBack = document.querySelectorAll(".puzzle-pieces"),
				gameBoard = document.querySelector(".puzzle-board");
				// one to one relationship -> returns the first matching element

	// record 1-to-1 position relationship between image sets
	let imageNames = ["topLeft", "topRight", "bottomLeft", "bottomRight"];


	function changeImageSet() {
		// change all the image elements on the page -> draggable image sources,
		imageNames.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.bgkey}.jpg`;
		});
		// and set the drop zone background
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgkey}.jpg)`;
		// #gameBoard { background-image: url('../images/newBackground0.jpg')}
	}


	function allowDrag(event) {
		// let the drag happen, and store a reference of the ID of the element we're dragging
		console.log ("started dragging an image: this one - ", event.target.id);
		event.dataTransfer.setData("draggedImg", this.id);
	}


	function allowDragOver(event) {
		event.preventDefault();
		console.log("dragged something over me!");
	}


	function allowDrop(event) {
		console.log("dropped something on me");
		let droppedImage = event.dataTransfer.getData("draggedImg");

		if (this.childElementCount > 0){ // there is already a image here
			console.log("there is already a image, so cannot drop!!!");
		} else { // no image => can drop here
			event.target.appendChild(document.querySelector(`#${droppedImage}`));
		}
	}


	function allowDropBack(event) {
		console.log("dropped back something on me");
		let droppedImage = event.dataTransfer.getData("draggedImg");
		if (this.childElementCount <= 4) { // there are less than 4 images in puzzle board (left)
			event.target.appendChild(document.querySelector(`#${droppedImage}`));
		} else {
			console.log("out of images space, so cannot drop image here");
		}
	}


	// set a function for reset puzzle piece
	function resetPuzzlePieces(event) {
		let sectionLeft = document.getElementById("left-img-board");
			// store the images temporarily in the drag zones that need to append back
			let imgStore = [];
			// loop through each drop zone, store and remove img
			for (i = 1; i <= 4; i ++) {
				let zoneID = "zone" + i.toString();
				let zone = document.getElementById(zoneID);
				while (zone.firstChild) {
					// store the image into imgStore
					imgStore.push(zone.firstChild);
					// remove image from zone
					zone.removeChild(zone.firstChild);
				}
			}
			// loop through each image in imgStore, append each image back to puzzle board
			imgStore.forEach(img => sectionLeft.appendChild(img));
	}


	// click on the bottom buttons to change the puzzle image we're working with
	// reset
	puzzleButtons.forEach(button => {
		// change puzzle image
		button.addEventListener('click', changeImageSet);
		// reset puzzle pieces
		button.addEventListener('click', resetPuzzlePieces);
	});

	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	for (let zone of dropZones) {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	}


	for (let piece of dropBack) {
		piece.addEventListener('dragover', allowDragOver);
		piece.addEventListener('drop', allowDropBack);
	}

	//research call, apply and bind
	changeImageSet.call(puzzleButtons[0]); //emulates a click on the first bottom button
})();
