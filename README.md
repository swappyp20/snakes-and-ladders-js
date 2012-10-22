Objects:
	Game
		Board
			Square
				SpecialSquare
		Player
			Computer
			Human
		Die

Properties:
	Game:
		Board board
	
	Board:
		int columns
		int rows
		
		Square:
			boolean isSpecial
			int positionOnBoard
			
			SpecialSquare:
				Square linkedSquare
				
	Player:
		String name
		int score
		
	Die:
		int value
		
Basic Just-Get-It-Working Game Flow
	Game loads, get initialised with row, column and player name
	Creates board, squares, snakes, ladders, players, die
	Both players roll die, highest roller starts first
	If a player lands on a snake, they go down, on a ladder, they go up, on the other player, the other player gets knocked off the board
	First to reach the end (100) wins
	
Board Layout:
	10x10 board
	Ladders on 20(39), 48(67), 59(62), 69(88)
	Snakes on 30(8), 44(25), 86(64), 99(83)
	Think of a better way to handle the snakes and ladders:
		- Send parameter to game (snakes, ladders)
		- Game creates snakes and ladders at random, being intelligent about snakes and ladders
	
Colour Scheme:
	Square A	: #4671D5
	Square B	: #6C8CD5
	InfoBar		: #1240AB
	Text		: #06266F	
	Background	: #2A4480
	
Also, maybe make separate .js files for objects, possibly allow use of jQuery/jCanvas inside them.

Drawing to canvas:
	Layers:
		Textual Scores rendered once every turn - TOPMOST
		Player Pieces - rendered once every turn
		Snakes and Ladders - render once
		Board (static) - BOTTOMMOST