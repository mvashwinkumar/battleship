var app = app || {};

function onload() {
	var boardDiv = document.getElementById("primaryboard");

	app.primaryBoard = new app.Board();
	
	boardDiv.appendChild(app.primaryBoard.construct());

	var pieceShapes = {
		'airship1' : 	[
							[1,1,1,1],
							[1,1,1,1]
						],
		'speedboat1' : 	[
							[2],
							[2]
						],
		'airship2' : 	[
							[1,1],
							[1,1],
							[1,1],
							[1,1]
						],
		'ferry1' : 	[
							[3,3,3],
							[3,3,3]
						]
	};

	for(var pc in pieceShapes) {
		var _config = {
			top : 1,
			left : 1,
			shape : pieceShapes[pc] 
		};
		var _piece = new app.Piece(app.primaryBoard,_config);
		_piece.id = pc;
		app.primaryBoard.storePiece(_piece);

		var _option = document.createElement('option');
		_option.textContent = pc;
		_option.value = _piece.id;
		document.getElementById('pieceSelect').appendChild(_option);
	}

}

function getCurrentPiece() {
	var _pieceId = document.getElementById('pieceSelect').value;
	return app.primaryBoard.getPiece(_pieceId);
}

function onKeyPress(e) {
	var _currPiece = getCurrentPiece();

	if(e.key.toUpperCase() === "ENTER") {
		_currPiece.mergeToBoard();
		return;
	}

	if(e.key.toUpperCase() === "R") {
		_currPiece.rotate();
		return;
	}

	var _direction = e.key.slice(5).toUpperCase();
	_currPiece.move(_direction);
}

function onEditPiece(e) {
	var _currPiece = getCurrentPiece();
	if(_currPiece.tempBoard) return;

	_currPiece.resetCells();
	_currPiece.construct();
	e.target.blur();
	_currPiece.tempBoard.domRef.focus();
}