// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var geoApp = angular.module('geoDemo', ['ionic' , 'ngCordova'])

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

geoApp.controller('geoAppCtrl', function ($scope, $cordovaGeolocation, $timeout, $ionicLoading){
   $scope.address = {
      latitude: null,
      longitude: null
    };
   $scope.getLocation = function() {
      $scope.show();
      var options = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      };

       $cordovaGeolocation.getCurrentPosition(options)
      .then(function(position){
          $scope.address.latitude  = position.coords.latitude;
          $scope.address.longitude = position.coords.longitude;
          $scope.getAddress();
            $timeout(function() {
          $scope.hide();
        }, 4000);

      }, function(error){
          alert('Code' + error.code);
          alert('Msg' + error.message);
          console.log('error:', error);
        });
    }

    $scope.getAddress = function() {
      var latlng = new google.maps.LatLng($scope.address.latitude, $scope.address.longitude);
      var gecoder = new google.maps.Geocoder();
      gecoder.geocode({ latLng: latlng }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            $scope.location = results[0].formatted_address;
          }
        }
      });
    }

    $scope.show = function() {
      $ionicLoading.show({
        template: '<div class="ion-loading-c">' +
        '<ion-spinner icon="android"/></div>' +
        '<span>Loading...</span>'
      });
    }

    $scope.hide = function() {
      $ionicLoading.hide();
    }
})
