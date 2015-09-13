(function() {

angular
	.module('ttt', ['firebase', 'ngRoute'])
	.config(config)
	.run(run);

	function run($rootScope, $location, gameService) {

	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		$rootScope.currentUser = gameService.getCurrentUser();;
			if (!$rootScope.currentUser) {

				$location.path('/login');
			}

		})

	}

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
		.when('/game/:gameId', {
			templateUrl: 'game/game.html',
			controller: 'GameCtrl',
			controllerAs: 'vm',
			resolve: {
				localGameRef: function(gameService, $route) {
					return gameService.getLocalGame($route.current.params.gameId)
				}
			}
		})
		.when('/games/:gameId', {
			templateUrl: 'game/mpGame.html',
			controller: 'MpGameCtrl',
			controllerAs: 'vm',
			resolve: {
				mpGameRef: function(gameService, $route) {
					return gameService.getMpGame($route.current.params.gameId);
				},
				mpBoardRef: function(gameService, $route) {
					return gameService.getMpBoard($route.current.params.gameId);
				}
			}
		})
		.when('/login', {
			templateUrl: '/game/login.html',
			controller: 'LoginCtrl',
			controllerAs: 'vm'
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

})();
