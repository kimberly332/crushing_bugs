(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				// querySelectorAll is for a one to many relationship and returns a Nodelust (an array) of matching elements

				puzzlePieces = document.querySelectorAll(".puzzle-image"),
				dropZones = document.querySelectorAll(".drop-zone"),
				dropBack = document.querySelectorAll(".puzzle-pieces"),
				gameBoard = document.querySelector(".puzzle-board");
				// one to one relationship -> returns the first matching element
	// record number of image in the dropzone (right)
	let countTl = 0, countTr = 0, countBl = 0, countBr = 0;
	// record number of image in puzzle board (left)
	let countPuzzle = 4;
	let imageNames = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
	// ["img1", "img2", "img3", "img4"]


  // add event handling here -> how is the user going to use our app?
  // what triggers do we need?
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
		// event.dataTransfer.setData("targetTrack", this.dataset.track);

		// set a reference to a data track so I can retrieve it later in the drop
	}

	function allowDragOver(event) {
		event.preventDefault();
		console.log("dragged something over me!");
	}

	function allowDrop(event) {
		console.log("dropped something on me");
		let droppedImage = event.dataTransfer.getData("draggedImg");
		// let currentTrack = event.getData("targetTrack");

		if (this.className == "drop-zone tl") {
			if (countTl == 0) {
				event.target.appendChild(document.querySelector(`#${droppedImage}`));
				countTl ++;
				countPuzzle --;
				}
				else {
					console.log("Not droppable!");
				}
			}
			else if (this.className == "drop-zone tr") {
				if (countTr == 0) {
					event.target.appendChild(document.querySelector(`#${droppedImage}`));
					countTr ++;
					countPuzzle --;
				}
				else {
					console.log("Not droppable!");
				}
			}
			else if (this.className == "drop-zone bl") {
				if (countBl == 0) {
					event.target.appendChild(document.querySelector(`#${droppedImage}`));
					countBl ++;
					countPuzzle --;
				}
				else {
					console.log("Not droppable!");
				}
			}
			else if (this.className == "drop-zone br") {
				if (countBr == 0) {
					event.target.appendChild(document.querySelector(`#${droppedImage}`));
					countBr ++;
					countPuzzle --;
				}
				else {
					console.log("Not droppable!");
				}
			}
	}

	function allowDropBack(event) {
			console.log("dropped back something on me");
			let droppedImage = event.dataTransfer.getData("draggedImg");
			// let className = this.className;
	    if (countPuzzle < 4) {
				let parent = document.getElementById(droppedImage).parentElement; // parent node is one of drop zone
				event.target.appendChild(document.querySelector(`#${droppedImage}`));
				countPuzzle ++;
				if (parent.className == "drop-zone tl") {
					countTl --;
				}
				else if (parent.className == "drop-zone tr") {
					countTr --;
				}
				else if (parent.className == "drop-zone bl") {
					countBl --;
				}
				else if (parent.className == "drop-zone br") {
					countBr --;
				}
			}
			else {
				console.log("Not droppable!");
			}
		}


	// click on the bottom buttons to change the puzzle image we're working with
	puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));
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
