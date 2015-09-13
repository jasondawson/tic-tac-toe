(function() {

angular
	.module('ttt')
	.controller('HeaderCtrl', HeaderCtrl);

function HeaderCtrl($scope, $location, gameService, $rootScope) {
	var vm = this;

	vm.logout = function() {
		gameService.logout().then(function() {
			$rootScope.currentUser = {};
			$location.path('/login');
		})
	}
}

})();
