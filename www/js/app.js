// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('offTheTruck', ['ionic', 'firebase', 'offTheTruck.mapCtrl'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('main', {
    url: '/main',
    templateUrl: 'view/main.html'
  })
  .state('signup', {
    url:'/signup',
    templateUrl: 'view/signup.html'
  })
  .state('user', {
    url: '/user',
    templateUrl: 'view/user-tabs.html'
  })
  .state('user.home', {
    url: '/home',
    views: {
      'home':{
        templateUrl: 'view/user-main.html',
        controller: 'mapCtrl'
      }
    }
  })
  .state('vendor', {
    url: '/vendor',
    templateUrl: 'view/vendor-main.html'
  });


  $urlRouterProvider.otherwise('/main');
})
.controller('TruckController', ['$scope', "$firebaseObject", 
  function($scope, $firebaseObject) {
     $scope.user = {};
     var ref = new Firebase("https://off-the-truck.firebaseio.com/Trucks");

     var obj = $firebaseObject(ref);
     console.log("This is obj", obj);

     obj.$loaded().then(function() {
        console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

       // To iterate the key/value pairs of the object, use angular.forEach()
       angular.forEach(obj, function(value, key) {
          console.log(key, value);
       });
     });

     $scope.addUser = function(user){
      ref.push({
        username: user.username,
        email: user.email,
        password: user.password
      })
     };

   }]);

// .controller('UserController'[]);
