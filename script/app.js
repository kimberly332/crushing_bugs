(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				// querySelectorAll is for a one to many relationship and returns a Nodelust (an array) of matching elements
				gameBoard = document.querySelector(".puzzle-board");
				// one to one relationship -> returns the first matching element 



	function changeImageSet() {
		// change all the image elements on the page -> draggable image sources,

		// and set the drop zone background
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgkey}.jpg)`;
		// #gameBoard { background-image: url('../images/newBackground0.jpg')}
	}

	// add event handling here -> how is the user going to use our app?
	// what triggers do we need?

	// click on the bottom buttons to change the puzzle image we're working with
	puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));

	//research call, apply and bind
	changeImageSet.call(puzzleButtons[0]); //emulates a click on the first bottom button
})();
