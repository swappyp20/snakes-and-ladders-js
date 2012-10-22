var debugOn = true;
// if(debugOn){console.log("");}

var die = function () {
	var die = this;

	if(debugOn){console.log("Creating die");}
	die.minValue = 2;
	die.maxValue = 12;
	die.lastValue = 0;

	die.roll = function () {
		if(debugOn){console.log("Rolling die");}
		die.lastValue = Math.floor(Math.random() * (die.maxValue - die.minValue + 1)) + die.minValue;
		return die.lastValue;
	}
}

var square = function () {
	var square = this;

	if(debugOn){console.log("Creating square");}
	var positionOnBoard;
	
	square.init = function (positionOnBoard) {
		if(debugOn){console.log("Initialising square " + positionOnBoard);}
		square.positionOnBoard = positionOnBoard;
	}
	
	square.getPositionOnBoard = function () {
		return square.positionOnBoard;
	}
}

var specialSquare = function () {
	var specialSquare = this;

	if(debugOn){console.log("Creating special square");}
	square.call(this);
	var isLadder;
	var linkedSquare;
	
	// Hopefully this does something?
	specialSquare.prototype = new square();
	specialSquare.prototype.constructor = specialSquare;
	
	specialSquare.init = function (isLadder, linkedSquare, positionOnBoard) {
		if(debugOn){console.log("Initialising special square " + positionOnBoard);}
		specialSquare.isLadder = isLadder;
		specialSquare.linkedSquare = linkedSquare;
		specialSquare.positionOnBoard = positionOnBoard;
	}
}

var board = function (rows, columns) {
	var board = this;

	if(debugOn){console.log("Creating board");}
	board.rows = rows;
	board.columns = columns;
	board.squareArray = new Array(board.rows);
	for(var i = 0; i < board.columns; i++) {
		board.squareArray[i] = new Array(board.columns);
	}
	board.snakes = [];
	board.ladders = [];
	
	board.init = function () {
		if(debugOn){console.log("Initialising board");}
		board.setSnakesAndLadders();
		var squareCount = 1; 
		for (var i = 0; i < board.rows; i++) {
			for(var j = 0; j < board.columns; j++) {
				if(debugOn){console.log(i + " " + j);console.log(squareCount);}
				// Checks to see if this square number is a special square	
				if(typeof board.snakes[squareCount] === 'number' || typeof board.ladders[squareCount] === 'number') {
					var snl = board.getSnakesAndLadders(squareCount);
					board.squareArray[i][j] = new specialSquare();
					board.squareArray[i][j].init(squareCount, snl.isLadder, snl.linkedSquare);
					
				}
				else {
					board.squareArray[i][j] = new square();
					board.squareArray[i][j].init(squareCount);
					if(debugOn){console.log("Created square");}
				}
				squareCount++;
			}
		}
	}

	board.setSnakesAndLadders = function () {
		if(debugOn){console.log("Populating snakes and ladders arrays");}
		board.ladders[20] = 39;
		board.ladders[48] = 67;
		board.ladders[59] = 62;
		board.ladders[69] = 88;
		board.snakes[30] = 8;
		board.snakes[44] = 25;
		board.snakes[86] = 64;
		board.snakes[99] = 83;
		if(debugOn){console.log("Populated snakes and ladders arrays");}
	}
	
	board.getSnakesAndLadders = function (squareCount) {
		if(board.snakes[squareCount]){
			if(debugOn){console.log("board square has a snake");}
			return {isSpecial:true, isLadder:false, linkedSquare:board.snakes[squareCount]};
		}
		else if(board.ladders[squareCount]){
			if(debugOn){console.log("board square has a ladder");}
			return {isSpecial:true, isLadder:true, linkedSquare:board.ladders[squareCount]};
		}
	}
}

var player = function () {
	var player = this;
	if(debugOn){console.log("Creating player");}
	player.name;
	player.score;
	player.isTurn;
	player.currentPosition;
	
	player.init = function (name) {
		if(debugOn){console.log("Initialising player " + name);}
		player.name = name;
		player.currentPosition = 0;
	}
	
	player.takeTurn = function () {
        // First, the player rolls the die
        var dieValue = die.roll();
		if(debugOn){console.log(player.name + " rolled a " + dieValue);}
        
        // Moves to new position on the board
        var newPosition = player.currentPosition + dieValue;
        
        if(newPosition > 100){
        	// don't let player move
        }
        else {
			player.currentPosition += dieValue;
			if(debugOn){console.log(player.name + " moved to " + currentPosition);}
		}
        
        // Check for snakes or ladders
        // If so, move player accordingly
        if(typeof board.snakes[currentPosition] === 'number') {
			if(debugOn){console.log(player.name + " landed on a snake and was moved to " + board.snakes[currentPosition]);}
			player.currentPosition = board.snakes[currentPosition];
		} else if(typeof board.ladders[currentPosition] === 'number') {
			if(debugOn){console.log(player.name + " landed on a ladder and was moved to " + board.ladders[currentPosition]);}
            player.currentPosition = board.ladders[currentPosition];
        }
		
		// Check if player has landed on another player
		// If so, knock the other player back to the beginning
		if(player.name === "Computer"){
			if(debugOn){console.log(board.humanPlayer.name + " was knocked off the board");}
			board.humanPlayer.currentPosition = 0;
		} else {
			if(debugOn){console.log(board.computerPlayer.name + " was knocked off the board");}
			board.computerPlayer.currentPosition = 0;
		}
	}
}

var game = function () {
	var game = this;
	
	if(debugOn){console.log("Creating game");}
	game.die;
	game.board;
	game.computerPlayer;
	game.humanPlayer;
	
	game.init = function (rows, columns, humanPlayerName) {
		if(debugOn){console.log("Initialising game");}
		game.die = new die();
		game.board = new board(rows, columns);
		game.board.init();
		game.computerPlayer = new player();
		game.computerPlayer.init("Computer");
		game.humanPlayer = new player(humanPlayerName);
		game.humanPlayer.init(humanPlayerName);
		if(debugOn){console.log("Initialised game");}
	}
	
	game.start = function () {
		if(debugOn){console.log("I got here");}
		var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;
		
		if(animFrame !== null) {
			var canvas; // make this the game canvas
			
			if($.browser.mozilla) {
				if(debugOn){console.log("Running on Mozilla Firefox");}
				var recursiveAnim = function () {
					game.run();
					animFrame(recursiveAnim);
				}
				window.addEventListener("MozBeforePaint", recursiveAnim, false);
				animFrame(recursiveAnim);
			}
			else {
				if(debugOn){console.log("Running on WebKit");}
				var recursiveAnim = function () {
					game.run();
					animFrame(recursiveAnim, canvas);
				}
				animFrame(recursiveAnim, canvas);
			}
		} else {
			if(debugOn){console.log("Running on Internet Explorer / Opera");}
			var ONE_FRAME_TIME = 1000.0/60.0;
			setInterval(game.run(), ONE_FRAME_TIME);
		}
	}

	game.update = function() {
		var firstRun = true;
		if(firstRun){
			// do two rolls, highest roller first
			var humanRoll = game.die.roll();
			var computerRoll = game.die.roll();
			if(humanRoll > computerRoll){
				game.humanPlayer.isTurn = true;
				game.computerPlayer.isTurn = false;
			}
			else {
				game.computerPlayer.isTurn = true;
				game.humanPlayer.isTurn = false;
			}
		}
		else {
			
		}
		
		
	}
	
	game.draw = function() {
		// GUI code in here??
		alert("draw");
	}
	
	game.run = function () {
		game.update();
		game.draw();
	}
}