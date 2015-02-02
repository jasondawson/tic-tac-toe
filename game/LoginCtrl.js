angular
	.module('ttt')
	.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', 'gameService', '$location'];

function LoginCtrl ($scope, gameService, $location) {
	var vm = this;
	vm.loginShow = true;
	vm.registerShow = false;
	vm.loginEmail = '';
	vm.loginPassword = '';
	vm.registerEmail = '';
	vm.registerPassword = '';
	vm.errMsg = '';

	vm.login = function() {
		gameService.loginUser(vm.loginEmail, vm.loginPassword).then(function(res) {
			if (res === 'Success') {
				$location.path('/localMP');
			}
		})
	}

	vm.register = function() {
		gameService.registerUser(vm.registerEmail, vm.registerPassword).then(function(res) {
			if (res === null) {
			vm.registerEmail = '';
			vm.registerPassword = '';
			vm.registerName = '';
			vm.registerShow = false;
			vm.loginShow = true;
		    console.log("User created successfully");
		} else {
			console.log("Error creating user:" + res);
			vm.errMsg = res;
		}
		})
	}

}