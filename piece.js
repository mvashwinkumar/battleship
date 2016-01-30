(function(app){

	var CONST = {
		"0" : "water",
		"1" : "airship",
		"2" : "speedboat",
		"3" : "ferry"
	};

function Piece(boardInstance, config) {
	this.id = new Date().getTime();
	this.board = boardInstance;
	this.config = config || {
								top : 3,
								left : 6,
								shape : [
									[1,1,1,1],
									[1,1,1,1]
									]
							};
	this.tempBoard = null;
}

function _reDrawPiece(oldTop,oldLeft,newTop,newLeft) {
	var _width = this.config.shape[0].length,
		_height = this.config.shape.length;

	for(var j = 0; j<_height;j++) {
		for(var i = 0; i<_width; i++) {
			var _cellDom = this.tempBoard.cellArray[oldTop-1+j][oldLeft-1+i].domRef;
			_cellDom.innerHTML = 0;
			_cellDom.className = "cell cell-"+CONST[0];
		}
	}

	for(var j = 0; j<_height;j++) {
		for(var i = 0; i<_width; i++) {
			if(this.config.shape[j][i] != 0) {
				var _val = this.config.shape[j][i];
				var _cellDom = this.tempBoard.cellArray[newTop-1+j][newLeft-1+i].domRef;
				_cellDom.innerHTML = _val;
				_cellDom.className = "cell cell-"+CONST[_val]+" cell-temp";
			}
		}
	}
}

function _rotate2DArray(arr) {
	
	var _newArr = new Array();

	for(var j = 0; j<arr.length;j++) {
		for(var i = 0; i<arr[j].length; i++) {
			_newArr[i] = _newArr[i] || [];
			_newArr[i][j] = arr[j][i];		
		}
	}

	return _newArr;
}

Piece.prototype.construct = function() {
	this.tempBoard = new app.Board();
	var boardDiv = this.board.domRef;
	boardDiv.parentNode.appendChild(this.tempBoard.construct());
	this.tempBoard.domRef.className = "board board-temp";
	_reDrawPiece.call(this,this.config.top,this.config.left,this.config.top,this.config.left);
}

Piece.prototype.rotate = function() {
	// rotate 2D Array
	if((this.config.top + this.config.shape[0].length - 1)>10) return;
	if((this.config.left + this.config.shape.length - 1)>10) return;

	this.config.shape = _rotate2DArray(this.config.shape);

	var _width = this.config.shape[0].length,
		_height = this.config.shape.length;

	for(var j = 0; j<10;j++) {
		for(var i = 0; i<10; i++) {
			var _cellDom = this.tempBoard.cellArray[j][i].domRef;
			_cellDom.innerHTML = 0;
			_cellDom.className = "cell cell-"+CONST[0];
		}
	}

	for(var j = 0; j<_height;j++) {
		for(var i = 0; i<_width; i++) {
			if(this.config.shape[j][i] != 0) {
				var _val = this.config.shape[j][i];
				var _cellDom = this.tempBoard.cellArray[this.config.top-1+j][this.config.left-1+i].domRef;
				_cellDom.innerHTML = _val;
				_cellDom.className = "cell cell-"+CONST[_val]+" cell-temp";
			}
		}
	}
}

Piece.prototype.move = function(direction) {

	// only for temp board
	if(!this.tempBoard) return;

	var _oldTop = this.config.top,
		_oldLeft = this.config.left,
		_width = this.config.shape[0].length,
		_height = this.config.shape.length;

	switch(direction) {
		case "UP":
			if(_oldTop==1) return;
			this.config.top--;
			_reDrawPiece.call(this,_oldTop,_oldLeft,this.config.top,this.config.left);
			break;
		case "DOWN":
			if((_oldTop+_height-1)==10) return;
			this.config.top++;
			_reDrawPiece.call(this,_oldTop,_oldLeft,this.config.top,this.config.left);
			break;
		case "LEFT":
			if(_oldLeft==1) return;
			this.config.left--;
			_reDrawPiece.call(this,_oldTop,_oldLeft,this.config.top,this.config.left);
			break;
		case "RIGHT":
			if((_oldLeft+_width-1)==10) return;
			this.config.left++;
			_reDrawPiece.call(this,_oldTop,_oldLeft,this.config.top,this.config.left);
			break;
	}
}

Piece.prototype.resetCells = function() {
	var _width = this.config.shape[0].length,
		_height = this.config.shape.length;

	for(var j = 0; j<_height;j++) {
		for(var i = 0; i<_width; i++) {
			var _cellDom = this.board.cellArray[this.config.top-1+j][this.config.left-1+i].domRef;
			_cellDom.innerHTML = 0;
			_cellDom.className = "cell cell-"+CONST[0];			
		}
	}	
}

Piece.prototype.mergeToBoard = function() {

	if(!this.tempBoard) return;

	var _width = this.config.shape[0].length,
		_height = this.config.shape.length;
	var _hasNoWater = false;

	for(var j = 0; j<_height;j++) {
		for(var i = 0; i<_width; i++) {
			if(this.board.cellArray[this.config.top-1+j][this.config.left-1+i].domRef.innerHTML != "0") {
				_hasNoWater = true;
				break;
			}
		}
	}

	if(_hasNoWater) return;
	
	for(var j = 0; j<_height;j++) {
		for(var i = 0; i<_width; i++) {
			if(this.config.shape[j][i] != 0) {
				var _val = this.config.shape[j][i];
				var _cellDom = this.board.cellArray[this.config.top-1+j][this.config.left-1+i].domRef;
				_cellDom.innerHTML = _val;
				_cellDom.className = "cell cell-"+CONST[_val];
			}
		}
	}

	this.tempBoard.destroy();
	this.board.storePiece(this);
	this.tempBoard = null;	
}

app.Piece = Piece;

})(app || (app = {}));