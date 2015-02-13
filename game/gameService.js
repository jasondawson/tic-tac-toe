angular
	.module('ttt')
	.service('gameService', gameService);

gameService.$inject = ['$firebase', '$q'];

function gameService($firebase, $q, usersRef, $rootScope) {

   var currentUser = {};

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

  this.getLocalGame = function(gameId) {
    return $firebase(new Firebase(firebaseUrl + '/local/' + gameId))
  }

  this.createLocalGame = function(p1_name, p2_name) {
      var gameRef = new Firebase(firebaseUrl + '/local');

      var localGameRef = gameRef.push({
        p1        : p1_name,
        p1_id     : 'X',
        p1_wins   : 0,
        p1_losses : 0,
        p1_ties   : 0,
        p2        : p2_name,
        p2_id     : 'O',
        p2_wins   : 0,
        p2_losses : 0,
        p2_ties   : 0
      })

       localGameRef.child('gameboard').set({
          '0': 'created',
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

      var dfd = $q.defer();
      console.log(localGameRef.key());
      dfd.resolve(localGameRef.key());
      return dfd.promise;
  }

  this.createGame = function(name) {
      var gameRef = new Firebase(firebaseUrl + '/games');

      var p1 = currentUser.name;
      var newGameRef = gameRef.push({
        me: 'p1Turn',
        mySymbol: 'X',
        p1Turn: true,
        p2Turn: false,
        status: 'pending',
        p1: currentUser.name,
        p1_wins: currentUser.wins,
        p1_losses: currentUser.losses,
        p1_ties: currentUser.ties,
        p2: 'Waiting for Player',
        gameOver: false,
        isTied: false,
        isP1Turn: true,
        gameCount: 0,
        turns: 0
      })

       newGameRef.child('gameboard').set({
          '0': 'created',
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

      var dfd = $q.defer();
      dfd.resolve(newGameRef.key());
      return dfd.promise;
  }

    this.joinGame = function(gameId) {
      var gameRef = new Firebase(firebaseUrl + '/games/' + gameId);

      var p2 = currentUser.name;
      
      gameRef.update({
        me: 'p2Turn',
        mySymbol: 'O',
        status: 'In progress',
        p2: currentUser.name,
        p2_wins: currentUser.wins,
        p2_losses: currentUser.losses,
        p2_ties: currentUser.ties
      })

      var dfd = $q.defer();
      dfd.resolve(gameId);
      return dfd.promise;
  }



	this.stats = function() {
		return $firebase(new Firebase(firebaseUrl + '/stats'))
	}

	this.registerUser = function(email, password, name) {

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
            var usersRef = new Firebase('https://jcd.firebaseio.com/ttt/users');
            var currentId = usersRef.getAuth().uid.replace('simplelogin:','');
  
            var userRef = $firebase(new Firebase('https://jcd.firebaseio.com/ttt/users/' + currentId));
            currentUser = userRef.$asObject();
 
            dfd.resolve(currentUser);  

            
  		}
		});
		return dfd.promise;
	}

  this.logout = function() {
    var ref = new Firebase(firebaseUrl);
    var dfd = $q.defer();
    
    ref.unauth();
    currentUser = {}
    dfd.resolve(null);

    return dfd.promise;
  }

}