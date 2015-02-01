angular
	.module('ttt', ['firebase', 'ngRoute', 'formly'])
	.config(config);

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'game/players.html',
			controller: 'PlayerCtrl',
			controllerAs: 'vm',
			resolve: {
				playersRef: function(gameService) {
					return gameService.players();
				}
			}
		})
		.when('/game', {
			templateUrl: 'game/game.html',
			controller: 'GameCtrl',
			controllerAs: 'vm',
			resolve: {
				playersRef: function(gameService) {
					return gameService.players();
				},

				gameBoard: function(gameService) {
					return gameService.gameBoard();
				}
			}
		})
		.otherwise('/');

}