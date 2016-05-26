var app = angular.module('app',[]);

app.controller('home',['$scope','$http',function($scope,$http){
    $scope.location= {}
    $scope.submit = function() {
        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.location.lat = pos.coords.latitude;
            $scope.location.long = pos.coords.longitude;
            var req = {
                method: 'POST',
                url: '/dispatch/browser/location',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {location: $scope.location}
            };
            $http(req).then(function (response) {
                console.log(response);
            }, function (response) {
                console.log("err " + response);
            });
        });
    };
}]);