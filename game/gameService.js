angular
	.module('ttt')
	.service('gameService', gameService);

gameService.$inject = ['$firebase', '$q'];

function gameService($firebase, $q, usersRef) {

   var currentUser = {};

/*  this.setUser = function(obj) {
      this.currentUser = obj;
      console.log('set user');
      console.log(this.currentUser);
  }*/

  this.getCurrentUser = function() {
    return currentUser;
  }

	var firebaseUrl = 'https://jcd.firebaseio.com/ttt'

  this.getGames = function() {
    return $firebase(new Firebase(firebaseUrl + '/games'))
  }

	this.getUsers = function() {
		return $firebase(new Firebase(firebaseUrl + '/users'))
	}

	this.players = function() {
		return $firebase(new Firebase(firebaseUrl + '/local/players'))
	}

	this.gameBoard = function() {
		return $firebase(new Firebase(firebaseUrl + '/local/gameBoard'))
	}

  this.createGame = function(name) {
      var gameRef = new Firebase(firebaseUrl + '/games');
      //var sync = gameRef.$asArray();
      var userRef = new Firebase(firebaseUrl + '/users')
      var auth = gameRef.getAuth().uid.replace('simplelogin:','');
      console.log(auth);
      //var userName = userRef.child(auth).child('name').value();
      //console.log(userName);
      //console.log(auth);
      var newGameRef = gameRef.push({
        status: 'pending',
        p1: name

      })
      //sync.$save();
      dfd = $q.defer();
      dfd.resolve(newGameRef.key());
      return dfd.promise;
  }

	this.stats = function() {
		return $firebase(new Firebase(firebaseUrl + '/stats'))
	}

	this.registerUser = function(email, password, name) {
	/*console.log('Register with: Email: ' + vm.loginEmail + ' and password: ' + Boolean(vm.loginPassword) );*/
	var ref = new Firebase("https://jcd.firebaseio.com/");
	var dfd = $q.defer();

	ref.createUser({
		email    : email,
		password : password
	}, function(error) {
			if (error === null) {
        ref.authWithPassword({
        email: email,
        password: password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          dfd.reject(error);
        } else if (authData){
                    authData.name = name;
                    authData.wins = 0;
                    authData.losses = 0;
                    authData.ties = 0;
                    authData.timestamp = new Date().toISOString();
                    ref.child('ttt').child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);
                    console.log(authData.uid.replace('simplelogin:', '') + ' ' + authData.name);
                   /* cb(authData.uid.replace('simplelogin:', ''), authData.name);*/
                  dfd.resolve(null);
                }
      })
    } else {   
      
	     	dfd.reject(error.message);
		}
	});
		return dfd.promise;
	}

	this.loginUser = function(email, password) {
		var ref = new Firebase("https://jcd.firebaseio.com");
		var dfd = $q.defer();
    var loggedInId;
		ref.authWithPassword({
  		email    : email,
  		password : password
		}, function(error, authData) {
  		if (error) {
    		console.log("Login Failed!", error);
    		dfd.reject(error);
  		} else if (authData) {
           // console.log(authData);
            var usersRef = new Firebase('https://jcd.firebaseio.com/ttt/users');
            var currentId = usersRef.getAuth().uid.replace('simplelogin:','');
            console.log(currentId);
            var userRef = $firebase(new Firebase('https://jcd.firebaseio.com/ttt/users/' + currentId));
            currentUser = userRef.$asObject();
            console.log(currentUser);
            
            /*var userRef = usersRef.child$asArray();
            console.log(userRef);*/
            dfd.resolve(currentUser);  

            
  		/*	console.log(authData);
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
  				})*/
  		}
		});
		return dfd.promise;
	}

}