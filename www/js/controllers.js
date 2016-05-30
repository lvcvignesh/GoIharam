angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};
        //ionic.Platform.isFullScreen = true
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })
    .factory('searchParams', function () {
        var searchParams = {};
        searchParams.count = 10;
        searchParams.min = 50000
        searchParams.max = 500000
        searchParams.package = "HAJ";
        searchParams.set = function (dt, ct, type, minVal, maxVal) {
            searchParams.date = dt;
            searchParams.count = ct;
            searchParams.package = type;
            searchParams.min = minVal;
            searchParams.max = maxVal;
            console.log(searchParams);
        };
        return searchParams;
    })
    .controller('PlaylistsCtrl', function ($scope, searchParams) {
        $scope.playlists = [
            {
                "Name": "A l Misbah Haj & Umra Services"
                , "Address": "No 51, Sydenhams Road, Periamet, Chennai - 600007, Periamet"
                , "Phone": "91)-44-42117217  +(91)-9444259560"
                , "Url": "www.arrahmeen.com"
                , "Area": "Perimet"
                , "P1": 275000
                , "P2": 300000
                , "P3": 325000
                , "P4": 40000
                , "P5": 50000
                , "P6": 75000
            }


















            
            , {
                "Name": "A R Rahman Haj Service"
                , "Address": "No 75, 2nd Street, Egmore, Chennai - 600008, Near Don Bosco School Sait Colony"
                , "Phone": "(91)-44-28191230, 28191231  +(91)-9884477339, 9965744360, 9384848416"
                , "Url": "www.sadiqhaj.com"
                , "Area": "Egmore"
                , "P1": 280000
                , "P2": 305000
                , "P3": 330000
                , "P4": 45000
                , "P5": 55000
                , "P6": 80000
            }


















            
            , {
                "Name": "Aeman Haj And Umrah Service"
                , "Address": "14/B, First Floor, Vepery High Rd, Park Town, Periyamet, Vepery, Chennai, Tamil Nadu 600003, India"
                , "Phone": 0
                , "Url": "www.onlyumrah.com"
                , "Area": "Perimet"
                , "P1": 285000
                , "P2": 310000
                , "P3": 335000
                , "P4": 50000
                , "P5": 60000
                , "P6": 85000
            }


















            
            , {
                "Name": "Afzal HAJ Tour And Travel"
                , "Address": "150,1st Floor, Vepery High Road, Periamet, Chennai - 600007"
                , "Phone": 9566085786
                , "Url": "www.hajnumrah.com"
                , "Area": "Perimet"
                , "P1": 290000
                , "P2": 315000
                , "P3": 340000
                , "P4": 55000
                , "P5": 50000
                , "P6": 75000
            }


















            
            , {
                "Name": "Afzal Haj Tour&Travels Pltd"
                , "Address": "150, Veperyhigh Road, Periamet, Chennai - 600003"
                , "Phone": "044 - 25383013"
                , "Url": "www.goodjourney.com"
                , "Area": "Perimet"
                , "P1": 275000
                , "P2": 300000
                , "P3": 325000
                , "P4": 60000
                , "P5": 55000
                , "P6": 80000
            }


















            
            , {
                "Name": "Afzal Haj Tours & Travels"
                , "Address": "No 150 1st Floor, Vepery High Road, Park Town, Chennai - 600003, Periamet"
                , "Phone": "(91)-44-25383013, 42174665  +(91)-9884478655, 9840112158, 9841309574, 9941186086, 9994458425, 8438884995  +(91)-44-42174665"
                , "Url": "www.afzalhaj.com"
                , "Area": "Perimet"
                , "P1": 280000
                , "P2": 305000
                , "P3": 330000
                , "P4": 65000
                , "P5": 60000
                , "P6": 85000
            }


















            
            , {
                "Name": "Afzal Haj Tours And Travels Private Limited"
                , "Address": "No.150, First Floor, Vepery High Rd, Poongavanapuram, Periyamet, Chennai, Tamil Nadu 600003"
                , "Phone": "Phone:044 2538 3013 Mobile: 98401 12158"
                , "Url": "http://www.afzalhaj.com/"
                , "Area": "Perimet"
                , "P1": 285000
                , "P2": 310000
                , "P3": 335000
                , "P4": 70000
                , "P5": 50000
                , "P6": 75000
            }


















            
            , {
                "Name": "Ahmed World Travels Tours & Cargo Pvt Ltd"
                , "Address": "No 5/1, Habibullah Road, T Nagar, Chennai - 600017,"
                , "Phone": "44-28345098, 28345099, 28345786, 28345696,(91)-9710431818, 9841037786, 9445070485"
                , "Url": "www.millathhajservice.com"
                , "Area": "T.Nagar"
                , "P1": 290000
                , "P2": 315000
                , "P3": 340000
                , "P4": 75000
                , "P5": 55000
                , "P6": 80000
            }


















            
            , {
                "Name": "Ahmed World Travels Tours & Cargo Pvt. Ltd"
                , "Address": "No. 5/1, Habibullah Rd, Opposite Nadigar Sangam, Thiyagaraya Nagar, Chennai, Tamil Nadu 600017"
                , "Phone": "Phone:044 2834 5786"
                , "Url": "www.spiritualenjoy.com"
                , "Area": "T.Nagar"
                , "P1": 275000
                , "P2": 300000
                , "P3": 325000
                , "P4": 80000
                , "P5": 60000
                , "P6": 85000
            }


















            
            , {
                "Name": "Akbar Travels of India"
                , "Address": "Anna International Airport, GST Road Meenambakkam, Chennai - 600027"
                , "Phone": "044 - 22560463, 22560462"
                , "Url": "www.makkahtours.com"
                , "Area": "Airport"
                , "P1": 280000
                , "P2": 305000
                , "P3": 330000
                , "P4": 85000
                , "P5": 50000
                , "P6": 75000
            }


















            
            , {
                "Name": "Akbar Travels of India"
                , "Address": "No 2, Golden Enclave, 275, Old No 184, Poonamallee High Road, Chennai - 600010"
                , "Phone": "044 - 25321133, 25321134, 25321135, 25321136, 25321137, 25321138, 25321139, 25321140, 25321141, 25321142"
                , "Url": "www.madinahtour.com"
                , "Area": "Nungambakkam"
                , "P1": 285000
                , "P2": 310000
                , "P3": 335000
                , "P4": 90000
                , "P5": 55000
                , "P6": 80000
            }


















            
            , {
                "Name": "Akbar Travels Of India Pvt. Ltd"
                , "Address": "1288, 1st Floor, Opp. Air India, Trichy Main Road, Coimbatore, Tamil Nadu 600018"
                , "Phone": "Phone:0422 230 9200"
                , "Url": "http://www.akbargroup.in/hajj_umrah_services.html"
                , "Area": "Coimbatore"
                , "P1": 290000
                , "P2": 315000
                , "P3": 340000
                , "P4": 95000
                , "P5": 60000
                , "P6": 85000
            }


















            
            , {
                "Name": "Al - Haj Furniture & Interiors"
                , "Address": "239, Royapettah High Road, Royapettah High Road, Chennai, Tamil Nadu 600014, India"
                , "Phone": 13.051333
                , "Url": "www.royaltravels.com"
                , "Area": "Royapettah"
                , "P1": 275000
                , "P2": 300000
                , "P3": 325000
                , "P4": 100000
                , "P5": 55000
                , "P6": 75000
            }


















            
            , {
                "Name": "Al adam haj pvt ltd"
                , "Address": "18/86, Lingi chetty street, Mannady, Chennai - 600001, orange palace complex"
                , "Phone": "44-42167866  +(91)-9943020260"
                , "Url": "www.aladamhaj.com"
                , "Area": "Broadway"
                , "P1": 280000
                , "P2": 305000
                , "P3": 330000
                , "P4": 105000
                , "P5": 60000
                , "P6": 80000
            }
        ];
        $scope.inrange = function (value) {
            if ((value < searchParams.max) && (value > searchParams.min)) return true;
            else return false;
        }
        $scope.search = searchParams;
        $scope.search.count = searchParams.count;
        console.log($scope.search.count);
    })
    .controller('searchCtrl', function ($scope, searchParams, $state, $ionicHistory, $location,ionicDatePicker, $ionicModal) {
        
        //Range Slider Definition
        $(function () {
            $("#range").ionRangeSlider({
                hide_min_max: true,
                min: 80000,
                max: 500000,
                from: 1000,
                to: 4000,
                type: 'double',
                step: 1,
                prefix: "Rs. ",
                force_edges: true
            });

        });;
        var self = this;
        //HAJ-UMRA Toggle method 
        $scope.b1='background-yellow';
        $scope.select=function(choice){
            if(choice=='Hajj')
                {
                    $scope.b1='background-yellow';
                    $scope.b2='';
                }
            else
                {
                    $scope.b2='background-yellow';
                    $scope.b1='';
                }
            $scope.srcData.package=choice;
         }

        //DatePicker definition and start
        var ipObj1 = {
            callback: function (val) {  //Mandatory
            $scope.srcData.date=new Date(val).toDateString();
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            },
            from:new Date(),
            closeOnSelect: true,       //Optional
            templateType: 'modal',
        };
        $scope.openDatePicker = function(){
        ionicDatePicker.openDatePicker(ipObj1);
        };
        console.log($ionicHistory.backView());
        $scope.srcData = {};
        $scope.srcData.package = "Hajj";
        $scope.srcData.date=new Date().toDateString();
        $scope.srcData.min = 100000;
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
        for (var i=1; i<=20;i++){
          $scope.listdata.push(i)
        }
        $scope.data = {
            clientSide: '2'
            
        };  
       $ionicModal.fromTemplateUrl('templates/popup.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.modal = modal;
          });
          $scope.openModal = function() {
            $scope.modal.show();
          };
          $scope.closeModal = function() {
            var number = parseInt($scope.data.clientSide);
            if (number == 1) {
                $scope.srcData.numberText = 'Adult';        
            }
            else {
                $scope.srcData.numberText = 'Adults';
            }
            $scope.modal.hide();
          };
          // Cleanup the modal when we're done with it!
          $scope.$on('$destroy', function() {
            $scope.modal.remove();
          });
          // Execute action on hide modal
          $scope.$on('modal.hidden', function() {
            // Execute action
          });
          // Execute action on remove modal
          $scope.$on('modal.removed', function() {
            // Execute action
          });

           // An elaborate, custom popup
        
        //Misc
        $scope.send = function () {
            console.log($scope.srcData);
            searchParams.set($scope.srcData.date, $scope.srcData.count, $scope.srcData.package, $scope.slider_translate.minValue, $scope.slider_translate.maxValue);
            $state.go('app.results');
        };
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
             viewData.enableBack = true;
             console.log("Here");        
         });
        $scope.go = function ( path ) {
           $location.path( path );
        };
        $scope.myGoBack = function() {
            $ionicHistory.goBack();
            console.log($ionicHistory.backView());
        };
        
      })
    .controller('PostCtrl', function (searchParams) {
        var self = this;
        self.sendParams = function (dt, ct, type, min, max) {
            searchParams.set(dt, ct, type, min, max);

        };
    })
    .controller('LoginCtrl', function ($scope) {  
    })
    .directive('focusMe', function($timeout) {
        return {
            link: function(scope, element, attrs) {

              $timeout(function() {
                element[0].focus(); 
              });
            }
        };
    });