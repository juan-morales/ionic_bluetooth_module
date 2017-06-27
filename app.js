/*
	This file is just to mark where you need to attach the module.
	Use your own app.js file in your ionic app.

	As I said, in order to include the module, you should add it in the angular.module call at the beggining.

	Here you can see the "juancarmo.bluetooth" element, in the modules
*/
angular.module('appMain', [ 'ionic','appMain.controllers','juancarmo.bluetooth'])

.run(function($ionicPlatform, $state) {  
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        //Goto Home
        $state.go('app.home');
     });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

	//Do some general configuration if you need it.

  $stateProvider

  //THIS IS AN EXAMPLE!!!!! 
  //Here your Home, this is just to show you a general JS app structure and how to implement the module per se.
  //Do not pay atenttion to this file.
  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

  ;

});
