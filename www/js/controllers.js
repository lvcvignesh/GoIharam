angular.module('starter.controllers', [])
    .run(function ($rootScope, $state, $stateParams, $location, $localStorage, searchResults) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
            // to be used for back button //won't work when page is reloaded.
            $rootScope.previousState_name = fromState.url;
            $rootScope.previousState_params = fromParams;
        });
        //back button function called from back button's ng-click="back()"
        $rootScope.back = function () {
            console.log("Transition  : " + $localStorage.uid);
            searchResults.login()
                //console.log($rootScope.previousState_name + "  Prev STATE");
            console.log($rootScope.previousState_params);
            if ($rootScope.previousState_params == {})
                $location.path("/app" + $rootScope.previousState_name);
            else {
                var path = "/app" + $rootScope.previousState_name;
                path = path.replace(":params", $rootScope.previousState_params.params)
                path = path.replace(":book", "true")
                $location.path(path)
            } //            $state.go($rootScope.previousState_name, $rootScope.previousState_params);
        };
    }).controller('AppCtrl', function ($scope, $state, $ionicModal, $timeout, searchResults, $localStorage) {

        $scope.data = {
            uid: searchResults.uid
        };
        $scope.logout = function () {
            console.log("Logging out!");
            searchResults.logout();
            $scope.data = {
                uid: searchResults.uid
            };
            $state.go('app.landing', {}, {
                reload: true
            });

        }
        $scope.$on('$ionicView.enter', function (event, viewData) {
            viewData.enableBack = true;
            searchResults.login();
            $scope.data.uid = $localStorage.uid;
            console.log("Menu Controller " + $scope.data.uid + "\t" + $localStorage.uid);

        });

    })
    .factory('searchResults', function ($http, $localStorage) {
        var searchResults = {}
        var done = false;
        searchResults.uid = $localStorage.uid;
        searchResults.login = function () {
            console.log("Setting Factory UID Value to " + $localStorage.uid);
            searchResults.uid = $localStorage.uid;
        }
        searchResults.logout = function () {
            console.log("Deleting Login")
            delete $localStorage.uid;
            searchResults.uid = null;
        }
        searchResults.params;
        searchResults.set = function (params, state) {
            done = false;
            searchResults.params = params;
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http({
                    url: 'http://b84e2cc5.ngrok.io//index.php'
                    , method: "POST"
                    , data: params
                })
                .then(function (response) {
                        searchResults = response.data;
                        done = true;
                        if (Object.keys(response.data).length > 0)
                            state.go('app.results');
                    }
                    , function (response) { // optional
                        // failed
                    });

        };
        searchResults.get = function () {
            if (done == true)
                return searchResults;
        }
        return searchResults;
    })
    .controller('PlaylistsCtrl', function ($scope, searchResults, $state, $localStorage) {
        $scope.playlists = searchResults.get()
        searchResults.login();
        $scope.$on('$ionicView.enter', function () {
            console.log("Results Page");
        });

        $scope.go = function (data) {
            console.log(data);
            $state.go('app.browse', {
                params: data
            });
        }

    })
    .controller('searchCtrl', function ($ionicModal, $scope, searchResults, $state, $ionicHistory, $location, ionicDatePicker, $ionicPopup, $http) {
        //Range Slider Definition
        $scope.numberOfAdults = '2';
        $scope.cityName = 'Chennai';
        var from = 0;
        var to = 0;
        $scope.srcData = {};
        $(function () {
            var saveResult = function (data) {
                $scope.srcData.min = data.from;
                $scope.srcData.max = data.to;
            };

            $("#range").ionRangeSlider({
                hide_min_max: true
                , min: 10000
                , max: 500000
                , from: 1000
                , to: 4000
                , type: 'double'
                , step: 1000
                , prefix: "Rs. "
                , force_edges: true
                , onStart: function (data) {
                    saveResult(data);
                }
                , onChange: saveResult
                , onFinish: saveResult
            });
        });;
        var self = this;
        //HAJ-UMRA Toggle method 
        $scope.b1 = 'background-yellow';
        $scope.select = function (choice) {
            if (choice == 'Hajj') {
                $scope.b1 = 'background-yellow';
                $scope.b2 = '';
            } else {
                $scope.b2 = 'background-yellow';
                $scope.b1 = '';
            }
            $scope.srcData.package = choice;
        }

        //DatePicker definition and start
        var ipObj1 = {
            callback: function (val) { //Mandatory
                $scope.srcData.date = new Date(val).toDateString();
                console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            }
            , from: new Date()
            , closeOnSelect: true, //Optional
            templateType: 'modal'
        , };
        $scope.openDatePicker = function () {
            ionicDatePicker.openDatePicker(ipObj1);
        };
        console.log($ionicHistory.backView());
        $scope.srcData = {};
        $scope.srcData.package = "Hajj";
        $scope.srcData.date = new Date().toDateString();
        $scope.srcData.min = 100000;
        $scope.srcData.max = 1000000;
        $scope.srcData.number = 2;
        $scope.slider_translate = {
            minValue: 50000
            , maxValue: 500000
            , options: {
                ceil: 500000
                , floor: 0
                , step: 1000
                , translate: function (value) {
                    return 'Rs. ' + value;
                }
            }
        };
        //Number Selection start
        $scope.listdata = [];
        $scope.srcData.numberText = 'Adults';
        for (var i = 1; i <= 20; i++) {
            $scope.listdata.push(i)
        }
        $scope.data = {
            clientSide: $scope.numberOfAdults

        };
        $ionicModal.fromTemplateUrl('templates/popup.html', {
            scope: $scope
            , animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function () {
            $scope.modalTitle = "Travellers";
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            var number = parseInt($scope.data.clientSide);
            $scope.numberOfAdults = $scope.data.clientSide;
            if (number == 1) {
                $scope.srcData.numberText = 'Adult';
            } else {
                $scope.srcData.numberText = 'Adults';
            }
            $scope.modal.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });

        // An elaborate, custom popup
        //Misc
        $scope.send = function () {
            var params = {
                type: 'search'
                , package: $scope.srcData.package
                , min: $scope.srcData.min
                , max: $scope.srcData.max
                , count: 4
            };
            searchResults.set(params, $state);
            //            $state.go('app.results');
        };
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
            console.log("Search Enter");
        });
        $scope.go = function (path) {
            $location.path(path);
        };
        $scope.myGoBack = function () {
            $ionicHistory.goBack();
            console.log($ionicHistory.backView());
        };

    })
    .controller('PostCtrl', function (searchResults) {
        var self = this;
        self.sendParams = function (dt, ct, type, min, max) {
            searchResults.set(dt, ct, type, min, max);

        };
    })
    .controller('browseCtrl', function ($scope, $state, $stateParams, $location, searchResults, $localStorage) {
        try {
            var id = JSON.parse($stateParams.params);
            var full_data = searchResults.get();

            for (i in full_data) {
                if (parseInt(full_data[i].agentid) == parseInt(id)) {
                    console.log("Match!");
                    console.log(full_data[i]);
                    $scope.data = full_data[i];
                    break;
                }
            }

        } catch (e) {
            console.log(e);
            console.log($stateParams.params);
        }
        $scope.isAvail = function () {
            return "icon-alive";
        }
        if ($scope.data != null) {
            try {
                console.log(searchResults.params.count);
                $scope.selected = $scope.data.packages[0].package_id;
                $scope.price = $scope.data.packages[0].price * searchResults.params.count;

            } catch (e) {}
        }
        $scope.select = function (id) {
            for (package in $scope.data.packages) {
                if (parseInt($scope.data.packages[package].package_id) == parseInt(id)) {
                    $scope.price = $scope.data.packages[package].price * searchResults.params.count;
                    console.log($scope.price);
                }
            }
            $scope.selected = id;
        }
        $scope.isSelected = function (id) {
            if ($scope.selected == id)
                return true
            else
                return false
        }
        $scope.book = function () {
            searchResults.login()
            console.log("Trying to book! " + "Login Status : " + $localStorage.uid)
            if ($localStorage.uid == null || $localStorage.uid == undefined)
                $state.go('app.login');
            else {
                $location.path('/app/detailform');
            }
        }
        if ($stateParams.book == "true") {

            console.log("AutoBook with user " + $localStorage.uid);
            $scope.book();
        }

    })
    .controller('LoginCtrl', function ($scope, $http, $state, $ionicHistory, $localStorage, searchResults, $ionicLoading) {
        $scope.data = {};
        console.log("Login Controller Setting Default LocalStorage");
        $scope.$storage = $localStorage.$default({
            uid: null
        });
        $scope.data.uid = $scope.$storage.uid;
        $scope.data.pwd = "";
        $scope.login = function () {
            params = {
                type: "login"
                , uid: $scope.data.uid
                , pwd: $scope.data.pwd
            };
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

            $http({
                    url: 'http://b84e2cc5.ngrok.io//index.php'
                    , method: "POST"
                    , data: params
                })
                .then(function (response) {
                        if (response.data == "true") {
                            console.log("Storing Login");
                            $scope.$storage.uid = params.uid;
                            searchResults.login();
                            //                            console.log($scope.$previousState)
                            $scope.back()
                                //                            $state.go($scope.$previousState.name)


                        } else {
                            alert("Login Failed! Try Again");

                        }
                    }
                    , function (response) { // optional
                    });

        };


    })
    .controller('cityCtrl', function ($scope, $ionicModal) {
        $scope.listdata = ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai', 'Trichy', 'Salem', 'Madurai', 'Vellore'];
        $scope.data = {
            clientSide: $scope.cityName

        };
        $ionicModal.fromTemplateUrl('templates/popup.html', {
            scope: $scope
            , animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function () {
            $scope.modalTitle = "City";
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.cityName = $scope.data.clientSide;
            $scope.modal.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });
    })
    .directive('focusMe', function ($timeout) {
        return {
            link: function (scope, element, attrs) {

                $timeout(function () {
                    element[0].focus();
                });
            }
        };
    });