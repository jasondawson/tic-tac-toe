angular
	.module('ttt')
	.controller('MpGameCtrl', MpGameCtrl);

function MpGameCtrl ($firebase, $routeParams, mpGameRef, mpBoardRef) {
	var vm = this;


	vm.loadGame = mpGameRef.$asObject();
	vm.loadGame.$loaded().then(function(){
		vm.thisGame = vm.loadGame;
		//vm.thisGame.$bindTo(vm, 'thisGame');
		console.log(vm.thisGame);
		vm.me = vm.thisGame.me;
		vm.mySymbol = vm.thisGame.mySymbol;
	})

	/*vm.loadBoard = mpBoardRef.$asArray();
	vm.loadBoard.$loaded().then(function() {
		vm.thisBoard = vm.loadBoard;
		vm.newGame();
		console.log(vm.thisGame['p1Turn']);
			console.log(vm.thisGame['p2Turn']);
	})*/


	vm.gameCount = 0;
	vm.turns = 0;
	vm.isP1Turn = true;
	vm.gameOver = false;
	vm.isTied = false;


	vm.newGame = function() {
		vm.turns = 0;
		vm.gameOver = false;
		vm.isTied = false;
		vm.thisGame.gameOver = false;
		if (vm.gameCount % 2 === 0) {
			vm.isP1Turn = true;
		} else {
			vm.isP1Turn = false;
		}
		//console.log(vm.thisBoard);
		if(vm.thisGame.gameboard[0] === 'created') {

			for(var i = 1; i < 10; i++) {
				vm.thisGame.gameboard[i] = null;
			};
			vm.thisGame.$save();

		}
	}

	vm.playTurn = function(num) {
		var player = '';

		if(!(vm.thisGame.status === 'pending')) {
			if(!(vm.thisGame.gameOver)) {
				if(vm.thisGame[vm.me]) {
					if(!vm.thisGame.gameboard[num]) {
		/*		if (vm.isP1Turn) {
					player = 'X';
				} else {
					player = 'O';
				}*/
			vm.thisGame.gameboard[num] = vm.mySymbol;
			//vm.thisBoard.$save();
			//console.log(vm.thisBoard);
			vm.isP1Turn = !vm.isP1Turn;
			vm.turns++;
			vm.thisGame['p1Turn'] = !vm.thisGame['p1Turn'];
			vm.thisGame['p2Turn'] = !vm.thisGame['p2Turn'];
			console.log(vm.thisGame['p1Turn']);
			console.log(vm.thisGame['p2Turn']);
			vm.thisGame.$save();
			
			if (vm.winCheck()) {
				//console.log(player);
				if (vm.mySymbol === 'X') {
					vm.gameOver = vm.thisGame.p1;
					//vm.players[0].wins += 1;
					//vm.players[1].losses += 1;
				} else {
					vm.gameOver = vm.thisGame.p2;
					//vm.players[1].wins += 1;
					//vm.players[0].losses += 1;
				}
				vm.thisGame.gameOver = vm.gameOver;
				vm.thisGame.$save();
				vm.gameCount++;
			}

			if(vm.tie()) {
				vm.isTied = true;
				//vm.players[0].ties += 1;
				//vm.players[1].ties += 1;
				vm.gameCount++;

			}
			console.log(vm.thisGame)
		}
		}
			}
		}
	}

	vm.winCheck = function() {
		//console.log('checking for win');
		var a = vm.thisGame.gameboard;
		//console.log(a);
		if ((a[1] === a[2] && a[2] === a[3]) && (a[1])) return true;
		if ((a[4] === a[5] && a[5] === a[6]) && (a[4])) return true;
		if ((a[7] === a[8] && a[8] === a[9]) && (a[7])) return true;
		if ((a[1] === a[4] && a[4] === a[7]) && (a[1])) return true;
		if ((a[2] === a[5] && a[5] === a[8]) && (a[2])) return true;
		if ((a[3] === a[6] && a[6] === a[9]) && (a[3])) return true;
		if ((a[1] === a[5] && a[5] === a[9]) && (a[1])) return true;
		if ((a[3] === a[5] && a[5] === a[7]) && (a[3])) return true;
		return false;
	}

	vm.tie = function() {
		if (vm.turns === 9) {
			if (!vm.winCheck()) return true;
		}
		return false;
	}

	vm.startOver = function() {
		vm.newGame();
	}

	vm.mainMenu = function() {
		console.log('Go to main menu');
	}

	

}