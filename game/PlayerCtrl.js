(function() {


angular
	.module('ttt')
	.controller('PlayerCtrl', PlayerCtrl);

function PlayerCtrl(playersRef, gameService, $location) {
	var vm = this;

	vm.createLocalGame = function() {
		gameService.createLocalGame(vm.p1Name, vm.p2Name).then(function(res) {
			$location.path('/game/' + res);
		})
	}

}

})();
