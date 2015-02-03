angular
	.module('ttt')
	.controller('LobbyCtrl', LobbyCtrl);

function LobbyCtrl($scope, gameService, gamesRef, $location) {
	var vm = this;

	vm.createGame = function() {
		gameService.createGame().then(function(res){
			vm.refreshGames();
			$location.path(/games/ + res);
		});
	}

	vm.refreshGames = function() {
		vm.games = vm.sync.$asArray();
	}

	vm.sync = gameService.getGames();
	
	vm.refreshGames();

}