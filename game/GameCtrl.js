angular
	.module('ttt')
	.controller('GameCtrl', GameCtrl);


function GameCtrl(gameService, playersRef, gameBoard, $firebase, $location) {
	var vm = this;
	vm.gameCount = 0;
	vm.turns = 0;
	vm.isP1Turn = true;
	vm.gameOver = false;
	vm.isTied = false;
	vm.gameboard = gameBoard.$asObject();
	vm.players = playersRef.$asArray();

	vm.newGame = function() {
		vm.turns = 0;
		vm.gameOver = false;
		vm.isTied = false;
		if (vm.gameCount % 2 === 0) {
			vm.isP1Turn = true;
		} else {
			vm.isP1Turn = false;
		}

		for(var i = 1; i < 10; i++) {
			vm.gameboard[i] = null;
		};
		vm.gameboard.$save();
		//console.log(vm.gameboard);
	}

	vm.playTurn = function(num) {
		var player = '';
		/*console.log(num);
		console.log(vm.gameboard[num]);*/
		if (!(vm.gameOver)) {
			if(!(vm.gameboard[num])) {
				if (vm.isP1Turn) {
					player = 'X';
				} else {
					player = 'O';
				}
			vm.gameboard[num] = player;
			vm.gameboard.$save();
			vm.isP1Turn = !vm.isP1Turn;
			vm.turns++;
			//console.log(vm.turns);

			}
			if (vm.winCheck()) {
				//console.log(player);
				if (player === 'X') {
					vm.gameOver = vm.players[0]['name'];
					vm.players[0].wins += 1;
					vm.players[1].losses += 1;
				} else {
					vm.gameOver = vm.players[1]['name'];
					vm.players[1].wins += 1;
					vm.players[0].losses += 1;
				}
				vm.gameCount++;
			}

			if(vm.tie()) {
				vm.isTied = true;
				vm.players[0].ties += 1;
				vm.players[1].ties += 1;
				vm.gameCount++;
			}
		}
	}


	vm.winCheck = function() {
		//console.log('checking for win');
		var a = vm.gameboard;
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

		removePlayersRef = new Firebase('http://jcd.firebaseio.com/ttt/local/players');
		//console.log(removePlayersRef);
		removePlayersRef.remove();
		
		vm.gameboard.$destroy();

		$location.path('/menu');
	}

	//start Game
	vm.newGame();

}