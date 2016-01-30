(function(app){

function Cell(cellType) {
	this.value = cellType || 0;
	this.domRef = null;
}

Cell.prototype.construct = function() {
	var _newCell = document.createElement("div");
	_newCell.className = "cell";
	_newCell.innerHTML = this.value;
	this.domRef = _newCell;
	this.setVal(this.value);
	return _newCell;
}

Cell.prototype.setVal = function(cellType) {
	this.value = cellType;
	this.domRef.innerHTML = cellType;
	switch(cellType) {
		case 0:
			this.domRef.className = "cell cell-water";
			break;
		case 1:
			this.domRef.className = "cell cell-airship";
			break;
		case 2:
			this.domRef.className = "cell cell-speedboat";
			break;
		case 3:
			this.domRef.className = "cell cell-ferry";
			break;
		case -1:
			this.domRef.className = "cell cell-hit";
			break;
	}
}

app.Cell = Cell;

})(app || (app = {}));