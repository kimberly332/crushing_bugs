(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				// querySelectorAll is for a one to many relationship and returns a Nodelust (an array) of matching elements

				puzzlePieces = document.querySelectorAll(".puzzle-image"),
				dropZones = document.querySelectorAll(".drop-zone"),
				gameBoard = document.querySelector(".puzzle-board");
				// one to one relationship -> returns the first matching element


  // add event handling here -> how is the user going to use our app?
  // what triggers do we need?
	function changeImageSet() {
		// change all the image elements on the page -> draggable image sources,

		// and set the drop zone background
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgkey}.jpg)`;
		// #gameBoard { background-image: url('../images/newBackground0.jpg')}
	}

	function allowDrag() {
		// let the drag happen, and store a reference of the ID of the element we're dragging
		console.log ("started dragging an image: this one - ", event.target.id);
	}

	function allowDragOver(event) {
		event.preventDefault();
		console.log("dragged something over me!");
	}

	function allowDrop(event) {
		console.log("dropped something on me");
	}


	// click on the bottom buttons to change the puzzle image we're working with
	puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));

	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	dropZones.forEach(zone => {
		zone.addEventListener(`dragover`, allowDragOver);
		zone.addEventListener(`drop`, allowDrop);
	});

	//research call, apply and bind
	changeImageSet.call(puzzleButtons[0]); //emulates a click on the first bottom button
})();
