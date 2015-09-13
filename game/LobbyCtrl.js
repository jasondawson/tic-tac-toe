(function() {

angular
	.module('ttt')
	.controller('LobbyCtrl', LobbyCtrl);

function LobbyCtrl($scope, gameService, gamesRef, $location) {
	var vm = this;

	vm.createGame = function() {
		gameService.createGame().then(function(res){
			$location.path(/games/ + res);
		});
	}

	vm.refreshGames = function() {
		vm.games = vm.sync.$asArray();
	}

	vm.joinGame = function(id) {
		gameService.joinGame(id).then(function(res) {
			$location.path(/games/ + res);
		})
	}

	vm.sync = gameService.getGames();

	vm.refreshGames();

}

})();
