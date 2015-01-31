angular
	.module('ttt')
	.controller('GameCtrl', GameCtrl);


function GameCtrl(gameService, playersRef) {
	var vm = this;

	vm.players = playersRef.$asArray();
	console.log(vm.players);
}