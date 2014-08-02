var myApp = angular.module('myApp', [
  // 'ngRoute'
  ]); 

myApp.config(['$routeProvider','$anchorScrollProvider',
  function($routeProvider, $anchorScrollProvider) {
    $anchorScrollProvider.disableAutoScrolling();
    $routeProvider.
     when('/search', {
        templateUrl: 'views/search.html',
        controller: 'searchCtrl'
      }).
     when('/sign', {
        templateUrl: 'views/sign.html',
        controller: 'signCtrl'
      }).
     when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      }).
     when('/test', {
        templateUrl: 'views/test.html',
        controller: 'testCtrl'
      }).
     when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'chatCtrl'
      }).
     when('/onebyone', {
        templateUrl: 'views/onebyone.html',
        controller: 'onebyoneCtrl'
      }).
      otherwise({
        templateUrl: 'views/login.html',
        redirectTo: '/login',
      });
  }]);
