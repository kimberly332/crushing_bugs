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

		// set a function for reset puzzle piece
		function resetPuzzlePieces(event) {
			let sectionLeft = document.getElementById("left");
			// store the images temporarily in the drag zones that need to append back
			let imgStore = [];

			// loop through each drop zone
			for (i = 1; i <= 4; i ++ ){
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
			// reset each counter
			countTl = 0, countTr = 0, countBl = 0, countBr = 0, countPuzzle = 4;

		}


	// click on the bottom buttons to change the puzzle image we're working with
	puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));
	puzzleButtons.forEach(reset => reset.addEventListener('click', resetPuzzlePieces));
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
