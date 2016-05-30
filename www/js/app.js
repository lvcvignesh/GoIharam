// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'rzModule','ionic-datepicker'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(false);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $stateProvider
            .state('app', {
                url: '/app'
                , abstract: true
                , templateUrl: 'templates/menu.html'
                , controller: 'AppCtrl'
            })

        .state('app.search', {
            url: '/search'
            , views: {
                'menuContent': {
                    templateUrl: 'templates/search2.html'
                    , controller: 'searchCtrl'

                }
            }
        })
        .state('app.browse', {
                url: '/browse'
                , views: {
                    'menuContent': {
                        templateUrl: 'templates/details.html'
                    }
                }
            })
            .state('app.login', {
                url: '/login'
                , views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html'
                        , controller: 'LoginCtrl'
                    }
                }
            })
            .state('app.results', {
                url: '/results'
                , views: {
                    'menuContent': {
                        templateUrl: 'templates/results.html'
                        , controller: 'PlaylistsCtrl'
                    }
                }
            })
            .state('app.landing', {
                url: '/landing'
                , views: {
                    'menuContent': {
                        templateUrl: 'templates/landing.html'
                    }
                }
            })
            .state('app.playlists', {
                url: '/playlists'
                , views: {
                    'menuContent': {
                        templateUrl: 'templates/playlists.html'
                        , controller: 'PlaylistsCtrl'
                    }
                }
            })

        .state('app.single', {
            url: '/playlists/:playlistId'
            , views: {
                'menuContent': {
                    templateUrl: 'templates/playlist.html'
                    , controller: 'PlaylistCtrl'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/landing');
        $ionicConfigProvider.tabs.position('top');
    });