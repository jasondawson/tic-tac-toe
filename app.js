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
		.when('/game/', {
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
		.when('/games/:gameId', {
			templateUrl: 'game/mpGame.html',
			controller: 'MpGameCtrl',
			controllerAs: 'vm',
			resolve: {
				mpGameBoard: function(gameService) {
					return gameService.mpGameBoard();
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
		.when('/lobby', {
			templateUrl: 'game/lobby.html',
			controller: 'LobbyCtrl',
			controllerAs: 'vm',
			resolve: {
				gamesRef: function(gameService) {
					return gameService.getGames();
				}
			}
		})
		.when('/menu',{
			templateUrl: 'game/menu.html',
			controller: 'MenuCtrl',
			controllerAs: 'vm'
		})
		.otherwise('/login');

}


angular
	.module('ttt')
	.run(function($rootScope, $location, gameService) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		$rootScope.currentUser = gameService.getCurrentUser();
			
		
		})

	})

