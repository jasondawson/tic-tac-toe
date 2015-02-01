angular
	.module('ttt')
	.controller('GameCtrl', GameCtrl);


function GameCtrl(gameService, playersRef, gameBoard, $firebase) {
	var vm = this;
	vm.turns = 0;
	vm.isP1Turn = true;
	vm.gameOver = false;
	vm.isTied = false;
	vm.gameboard = gameBoard.$asObject();
	vm.players = playersRef.$asArray();
	console.log(vm.tie);
	console.log(vm.gameboard);
	console.log(vm.players);

	vm.newGame = function() {
		for(var i = 1; i < 10; i++) {
			vm.gameboard[i] = null;
		};
		vm.gameboard.$save();
		console.log(vm.gameboard);
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
			console.log(vm.turns);

			}
			if (vm.winCheck()) {
				console.log(player);
				if (player === 'X') {
					console.log(vm.players[0]['name'])
					vm.gameOver = vm.players[0]['name'];
				} else {
					vm.gameOver = vm.players[1]['name'];
				}
			}

			if(vm.tie()) {
				vm.isTied = true;
			}
		}
	}


	vm.winCheck = function() {
		console.log('checking for win');
		var a = vm.gameboard;
		console.log(a);
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


	//start Game
	vm.newGame();

}