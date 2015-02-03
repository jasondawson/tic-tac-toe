angular
	.module('ttt')
	.controller('MenuCtrl', MenuCtrl);

function MenuCtrl($location) {
	var vm = this;

	vm.local = function() {
		$location.path('/localMP');
	}

	vm.online = function() {
		$location.path('/lobby');
	}
}