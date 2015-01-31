angular
	.module('ttt')
	.service('gameService', gameService);

gameService.$inject = ['$firebase'];

function gameService($firebase) {

	var firebaseUrl = 'https://jcd.firebaseio.com/ttt'

	this.players = function() {
		return $firebase(new Firebase(firebaseUrl + '/players'))
	}

	this.gameBoard = function() {
		return $firebase(new Firebase(firebaseUrl + '/gameBoard'))
	}

	this.stats = function() {
		return $firebase(new Firebase(firebaseUrl + '/stats'))
	}
}