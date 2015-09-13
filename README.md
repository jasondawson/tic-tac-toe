# tic-tac-toe with real-time online multiplayer

An Angular app that uses Firebase for data storage and simple authentication.

-------------

When making this app, there were a few key features that I wanted. I've described how I did a couple of them below.

I wanted the ability to show user details (e.g. 'Welcome, Username!'). To accomplish this, listen to route change events and place the user object on the rootscope.

```javascript
//in app.js
app.run(function() {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        $rootScope.currentUser = gameService.getCurrentUser();
        if (!$rootScope.currentUser) {
        $location.path('/login');
        }
    })
}
```

This can then be accessed via $root in the html
```html
//in html header
<div>Welcome, {{$root.currentUser.name}}</div>
```

I wanted to be able to bring in my Firebase url from an external config file. I tried a few different angular ways to do this (e.g. module.constant()) but ultimately I used commonjs-require to load my config file which looks like this:

```
require.register('config', function(exports, require, module){
  module.exports = {
    firebaseGameUrl: <url-to-firebase-node-for-game-data>,
    firebaseBaseUrl: <url-to-firebase-root>  //(used for authentication)
  }
});
```

Then, where config variables are needed, use require() passing in the name from require.register()

```javascript
var config = require('config');
var firebaseGameUrl = config.firebaseGameUrl

```


