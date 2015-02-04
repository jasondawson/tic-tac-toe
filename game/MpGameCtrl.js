angular
	.module('ttt')
	.controller('MpGameCtrl', MpGameCtrl);

function MpGameCtrl ($firebase, $routeParams, mpGameRef, mpBoardRef) {
	var vm = this;

/*	vm.loadGame = mpGameRef.$asObject().$loaded();
	vm.loadGame.then(function(res) {
		res.$bindTo(vm, 'thisGame').then(function(){
			//vm.thisGame = res;
			vm.me = vm.thisGame.me;
			vm.p1Turn = vm.thisGame.p1Turn;
			vm.p1Turn.$on('loaded', vm.checkTurn);
			vm.p1Turn.$on('change', vm.checkTurn);
			vm.p2Turn = vm.thisGame.p2Turn;
			vm.p2Turn.$on('loaded', vm.checkTurn);
			vm.p2Turn.$on('change', vm.checkTurn);
			//console.log(vm.me);
		});
		
	})*/

	vm.thisGame = mpGameRef.$asObject();
	vm.thisGame.$loaded().then(function(){
		vm.thisGame.$bindTo(vm, 'thisGame');
		console.log(vm.thisGame);
		vm.me = vm.thisGame.me;
	})

	vm.thisBoard = mpBoardRef.$asObject();
	vm.thisBoard.$loaded().then(function() {
		vm.thisBoard.$bindTo(vm, 'thisBoard');
		vm.newGame();
		console.log(vm.thisGame['p1Turn']);
			console.log(vm.thisGame['p2Turn']);
	})

	//vm.thisBoard =mpBoardRef.$asObject();
	//vm.gameboard = vm.gameRef.child('gameboard').$asArray();
	/*console.log(vm.thisGame);
	console.log(vm.thisBoard);

	var myTurn = vm.thisGame.p1;
	console.log(myTurn);*/

	vm.gameCount = 0;
	vm.turns = 0;
	vm.isP1Turn = true;
	vm.gameOver = false;
	vm.isTied = false;


	vm.newGame = function() {
		vm.turns = 0;
		vm.gameOver = false;
		vm.isTied = false;
		if (vm.gameCount % 2 === 0) {
			vm.isP1Turn = true;
		} else {
			vm.isP1Turn = false;
		}
		console.log(vm.thisBoard);
		if(vm.thisBoard.length > 0) {

			for(var i = 1; i < 10; i++) {
				vm.thisBoard[i] = null;
			};
			vm.thisBoard.$save();

		}
	}

	vm.playTurn = function(num) {
		var player = '';

		if(!(vm.thisGame.status === 'pending')) {
			if(!(vm.gameOver)) {
				if(vm.thisGame[vm.me]) {
				if (vm.isP1Turn) {
					player = 'X';
				} else {
					player = 'O';
				}
			vm.thisBoard[num] = player;
			vm.thisBoard.$save();
			console.log(vm.thisBoard);
			vm.isP1Turn = !vm.isP1Turn;
			vm.turns++;
			vm.thisGame['p1Turn'] = !vm.thisGame['p1Turn'];
			vm.thisGame['p2Turn'] = !vm.thisGame['p2Turn'];
			console.log(vm.thisGame['p1Turn']);
			console.log(vm.thisGame['p2Turn']);
			vm.thisGame.$save();
			
			if (vm.winCheck()) {
				//console.log(player);
				if (player === 'X') {
					vm.gameOver = vm.thisGame.p1;
					//vm.players[0].wins += 1;
					//vm.players[1].losses += 1;
				} else {
					vm.gameOver = vm.thisGame.p2;
					//vm.players[1].wins += 1;
					//vm.players[0].losses += 1;
				}
				vm.gameCount++;
			}

			if(vm.tie()) {
				vm.isTied = true;
				//vm.players[0].ties += 1;
				//vm.players[1].ties += 1;
				vm.gameCount++;
			}
		}
			}
		}
	}

	vm.winCheck = function() {
		//console.log('checking for win');
		var a = vm.thisBoard;
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