angular
	.module('ttt')
	.controller('PlayerCtrl', PlayerCtrl);

function PlayerCtrl(playersRef, gameService, $location) {
	var vm = this;

	vm.players = playersRef.$asArray();
	//console.log(vm.players);


	vm.setPlayers = function(p1Name, p2Name) {
		for (var i = 0; i < vm.players.length; i++) {
			vm.players.$remove(i);
		}

		//console.log(vm.players.length);

		vm.players.$add({
			id: 'X',
			name: p1Name
		});
		vm.players.$add({
			id: 'O',
			name: p2Name
		});

		$location.path('/game');
		//console.log(vm.players);
	}
/*
	vm.players.push({
		player: 'p1',
		name: vm.p1Name
	});*/
	//vm.players.p2 = vm.p2;

}
