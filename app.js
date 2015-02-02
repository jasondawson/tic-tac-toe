angular
	.module('ttt', ['firebase', 'ngRoute', 'formly'])
	.config(config);

function config($routeProvider) {
	$routeProvider
		.when('/localMP', {
			templateUrl: 'game/players.html',
			controller: 'PlayerCtrl',
			controllerAs: 'vm',
			resolve: {
				playersRef: function(gameService) {
					return gameService.players();
				},
				usersRef: function(gameService) {
					return gameService.getUsers();
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
		.when('/login', {
			templateUrl: '/game/login.html',
			controller: 'LoginCtrl',
			controllerAs: 'vm',
			resolve: {
				usersRef: function(gameService) {
					return gameService.getUsers();
				}
			}
		})
		.when('/mainmenu', {
			templateUrl: 'game/mainmenu.html',
			controller: 'MainCtrl',
			controllerAs: 'vm'
		})
		.otherwise('/login');

}