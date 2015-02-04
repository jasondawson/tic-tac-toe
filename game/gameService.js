angular
	.module('ttt')
	.service('gameService', gameService);

gameService.$inject = ['$firebase', '$q'];

function gameService($firebase, $q, usersRef, $rootScope) {

   var currentUser = {};

/*  this.setUser = function(obj) {
      this.currentUser = obj;
      console.log('set user');
      console.log(this.currentUser);
  }*/

  this.getCurrentUser = function() {
    return currentUser;
  }

	var firebaseUrl = 'https://jcd.firebaseio.com/ttt';

  this.getGames = function() {
    return $firebase(new Firebase(firebaseUrl + '/games'))
  }

  this.getMpGame = function(gameId) {
    return $firebase(new Firebase('http://jcd.firebaseio.com/ttt/games/' + gameId))
  }

  this.getMpBoard = function(gameId) {
    return $firebase(new Firebase('http://jcd.firebaseio.com/ttt/games/' + gameId + '/gameboard'))
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

  this.mpGameBoard = function() {
    return $firebase(new Firebase(firebaseUrl + '/games'))
  }

  this.createGame = function(name) {
      var gameRef = new Firebase(firebaseUrl + '/games');
      //var sync = gameRef.$asArray();
     // var userRef = new Firebase(firebaseUrl + '/users')
    /*  var auth = gameRef.getAuth().uid.replace('simplelogin:','');
      console.log(auth);*/
      //var userName = userRef.child(auth).child('name').value();
      //console.log(userName);
      //console.log(auth);
      var p1 = currentUser.name;
      var newGameRef = gameRef.push({
        me: 'p1Turn',
        p1Turn: true,
        p2Turn: false,
        status: 'pending',
        p1: currentUser.name,
        p1_wins: currentUser.wins,
        p1_losses: currentUser.losses,
        p1_ties: currentUser.ties,
        p2: 'Waiting for Player'
      })
      //sync.$save();
      var dfd = $q.defer();
      dfd.resolve(newGameRef.key());
      return dfd.promise;
  }

    this.joinGame = function(gameId) {
      var gameRef = new Firebase(firebaseUrl + '/games/' + gameId);
      //var sync = gameRef.$asArray();
     // var userRef = new Firebase(firebaseUrl + '/users')
    /*  var auth = gameRef.getAuth().uid.replace('simplelogin:','');
      console.log(auth);*/
      //var userName = userRef.child(auth).child('name').value();
      //console.log(userName);
      //console.log(auth);
      var p2 = currentUser.name;
      
      gameRef.update({
        me: 'p2Turn',
        status: 'In progress',
        p2: currentUser.name,
        p2_wins: currentUser.wins,
        p2_losses: currentUser.losses,
        p2_ties: currentUser.ties
      })

      gameRef.child('gameboard').set({
          '1': null,
          '2': null,
          '3': null,
          '4': null,
          '5': null,
          '6': null,
          '7': null,
          '8': null,
          '9': null
        })
      
      //sync.$save();
      var dfd = $q.defer();
      dfd.resolve(gameId);
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
                    //console.log(authData.uid.replace('simplelogin:', '') + ' ' + authData.name);
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
            //console.log(currentId);
            var userRef = $firebase(new Firebase('https://jcd.firebaseio.com/ttt/users/' + currentId));
            currentUser = userRef.$asObject();
            //console.log(currentUser);
            
            /*var userRef = usersRef.child$asArray();
            console.log(userRef);*/
            dfd.resolve(currentUser);  

            
  		}
		});
		return dfd.promise;
	}

  this.logout = function() {
    var ref = new Firebase(firebaseUrl);
    var dfd = $q.defer();
    
    ref.unauth();
    dfd.resolve(null);

    return dfd.promise;
  }

}