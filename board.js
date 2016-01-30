(function(app){

function Board() {
	this.cellArray = [];
	this.domRef = null;
	this.pieceCollection = {};
}

Board.prototype.construct = function() {
	var boardDiv = document.createElement("div");
	boardDiv.className = "board";

	for(var i=0; i<10; i++) {
		var _rowArray = new Array();
		for(var j=0; j<10; j++) {
			var _newCell = new app.Cell(0);
			_rowArray.push(_newCell);
			boardDiv.appendChild(_newCell.construct());
		}
		this.cellArray.push(_rowArray);
	}
	this.domRef = boardDiv;
	return boardDiv;
}

Board.prototype.updateCell = function(rowNum,colNum,type) {
	var _selectedCell = this.cellArray[rowNum-1][colNum-1];
	_selectedCell.setVal(type);
}

Board.prototype.storePiece = function(pieceInstance) {
	if(!this.pieceCollection[pieceInstance.id]) {
		this.pieceCollection[pieceInstance.id] = pieceInstance;
	}
}

Board.prototype.getPiece = function(pieceId) {
	return this.pieceCollection[pieceId];
}

Board.prototype.destroy = function() {
	
	if (this.domRef.parentNode != null) {
        this.domRef.parentNode.removeChild(this.domRef);
    }
    delete this;
}

app.Board = Board;

})(app || (app = {}));