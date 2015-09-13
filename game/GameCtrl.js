(function() {

angular
	.module('ttt')
	.controller('GameCtrl', GameCtrl);


function GameCtrl(gameService, $firebase, $location, localGameRef) {
	var vm = this;
	vm.gameCount = 0;
	vm.turns = 0;
	vm.isP1Turn = true;
	vm.gameOver = false;
	vm.isTied = false;

	vm.loadGame = localGameRef.$asObject();
	vm.loadGame.$loaded().then(function() {
		vm.thisGame = vm.loadGame;
	})

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
			vm.thisGame.gameboard[i] = null;
		};
		vm.thisGame.$save();
	}

	vm.playTurn = function(num) {
		var player = '';

		if (!(vm.gameOver)) {
			if(!(vm.thisGame.gameboard[num])) {
				if (vm.isP1Turn) {
					player = 'X';
				} else {
					player = 'O';
				}
			vm.thisGame.gameboard[num] = player;
			vm.thisGame.$save();
			vm.isP1Turn = !vm.isP1Turn;
			vm.turns++;


			}
			if (vm.winCheck()) {

				if (player === 'X') {
					vm.gameOver = vm.thisGame.p1;
					vm.thisGame.p1_wins += 1;
					vm.thisGame.p2_losses += 1;
				} else {
					vm.gameOver = vm.thisGame.p2;
					vm.thisGame.p2_wins += 1;
					vm.thisGame.p1_losses += 1;
				}
				vm.thisGame.$save();
				vm.gameCount++;
			}

			if(vm.tie()) {
				vm.isTied = true;
				vm.thisGame.p1_ties += 1;
				vm.thisGame.p2_ties += 1;
				vm.thisGame.$save();
				vm.gameCount++;
			}
		}
	}


	vm.winCheck = function() {

		var a = vm.thisGame.gameboard;

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

		$location.path('/menu');
	}

}

})();
