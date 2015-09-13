(function() {

angular
	.module('ttt')
	.controller('MpGameCtrl', MpGameCtrl);

function MpGameCtrl ($firebase, $routeParams, mpGameRef, mpBoardRef, $location) {
	var vm = this;


	vm.loadGame = mpGameRef.$asObject();
	vm.loadGame.$loaded().then(function(){
		vm.thisGame = vm.loadGame;

		vm.me = vm.thisGame.me;
		vm.mySymbol = vm.thisGame.mySymbol;
	})

	vm.gameCount = 0;
	vm.turns = 0;
	vm.isP1Turn = true;
	vm.gameOver = false;
	vm.isTied = false;


	vm.newGame = function() {
		vm.thisGame.turns = 0;
		vm.thisGame.gameOver = false;
		vm.thisGame.isTied = false;
		vm.thisGame.gameOver = false;
		if (vm.gameCount % 2 === 0) {
			vm.isP1Turn = true;
		} else {
			vm.isP1Turn = false;
		}

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

			vm.thisGame.gameboard[num] = vm.mySymbol;

			vm.thisGame.isP1Turn = !vm.thisGame.isP1Turn;
			vm.thisGame.turns++;
			vm.thisGame['p1Turn'] = !vm.thisGame['p1Turn'];
			vm.thisGame['p2Turn'] = !vm.thisGame['p2Turn'];

			vm.thisGame.$save();

			if (vm.winCheck()) {

				if (vm.mySymbol === 'X') {
					vm.gameOver = vm.thisGame.p1;
					vm.thisGame.p1_wins += 1;
					vm.thisGame.p2_losses += 1;
				} else {
					vm.gameOver = vm.thisGame.p2;
					vm.thisGame.p2_wins += 1;
					vm.thisGame.p1_losses += 1;
				}
				vm.thisGame.gameOver = vm.gameOver;
				vm.thisGame.gameCount++;
				vm.thisGame.$save();
			}

			if(vm.tie()) {
				vm.thisGame.isTied = true;
				vm.thisGame.p1_ties += 1;
				vm.thisGame.p2_ties += 1;
				vm.thisGame.gameCount++;
				vm.thisGame.$save();

			}

		}
		}
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
		if (vm.thisGame.turns === 9) {
			if (!vm.winCheck()) return true;
		}
		return false;
	}

	vm.startOver = function() {
		vm.newGame();
	}

	vm.mainMenu = function() {

		if (vm.thisGame.status !== 'Finished') {
			vm.thisGame.status = 'Finished';
			vm.thisGame.$save();
		}
		$location.path('/menu');
	}

}

})();
