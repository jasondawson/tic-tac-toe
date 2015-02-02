angular
	.module('ttt')
	.service('gameService', gameService);

gameService.$inject = ['$firebase', '$q'];

function gameService($firebase, $q, usersRef) {

	var firebaseUrl = 'https://jcd.firebaseio.com/ttt'

	this.getUsers = function() {
		return $firebase(new Firebase(firebaseUrl + '/users'))
	}

	this.players = function() {
		return $firebase(new Firebase(firebaseUrl + '/players'))
	}

	this.gameBoard = function() {
		return $firebase(new Firebase(firebaseUrl + '/gameBoard'))
	}

	this.stats = function() {
		return $firebase(new Firebase(firebaseUrl + '/stats'))
	}

	this.registerUser = function(email, password) {
	/*console.log('Register with: Email: ' + vm.loginEmail + ' and password: ' + Boolean(vm.loginPassword) );*/
	var ref = new Firebase("https://jcd.firebaseio.com/");
	var dfd = $q.defer();

	ref.createUser({
		email    : email,
		password : password
	}, function(error) {
			if (error === null) {
			dfd.resolve(null);
		} else {	   
	     	dfd.resolve(error.message);
		}
	});
		return dfd.promise;
	}

	this.loginUser = function(email, password) {
		var ref = new Firebase("https://jcd.firebaseio.com");
		var dfd = $q.defer();
		ref.authWithPassword({
  		email    : email,
  		password : password
		}, function(error, authData) {
  		if (error) {
    		console.log("Login Failed!", error);
    		dfd.reject(error);
  		} else {
  			console.log(authData);
  			var userDetailsRef = $firebase(new Firebase(firebaseUrl + '/users'));
  			var sync = userDetailsRef.$asArray();
  			sync.$loaded()
  				.then(function() {
  					console.log(sync.length);
  			console.log('1');
  			console.log(sync)
  			var userExists = false;
  			console.log(sync.length);
  			for (var i = 0; i < sync.length; i++) {
/*  				console.log('loop '+ i);
  				console.log(sync[i].id);
  				console.log(authData.uid);*/
  				if (sync[i].id === authData.uid) {
  					userExists = true;
  					break;
  				}
  			}

  			if (!(userExists)) {
  				console.log(authData.password.email);
  				sync.$add({
  					id: authData.uid,
  					name: authData.password.email,
  					wins: 0,
  					losses: 0,
  					ties: 0
  				});
  				sync.$save(); 
  				console.log(sync);
  			}
    	console.log("Authenticated successfully with payload:", authData);
    	dfd.resolve('Success');
  				})
  		}
		});
		return dfd.promise;
	}

}