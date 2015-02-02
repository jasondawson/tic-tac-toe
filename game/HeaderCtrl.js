angular
	.module('ttt')
	.controller('HeaderCtrl', HeaderCtrl);

function HeaderCtrl($scope, usersRef, $location) {
	$scope.test = 'Test';
}