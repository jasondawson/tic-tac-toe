(function() {

angular
	.module('ttt', ['firebase', 'ngRoute', 'formly'])
	.config(config)
	.run(run);

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

function run($rootScope, $location, gameService) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		$rootScope.currentUser = gameService.getCurrentUser();
		//console.log($rootScope.currentUser);
			//console.log($rootScope.currentUser);
			if (!$rootScope.currentUser) {

				//console.log('nobody logged in');
				$location.path('/login');
			}
		
		})

	}

})();
