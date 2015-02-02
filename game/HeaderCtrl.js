angular
	.module('ttt')
	.controller('HeaderCtrl', HeaderCtrl);

function HeaderCtrl($scope, $location) {
	$scope.test = 'Test';
}