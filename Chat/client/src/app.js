angular.module("ChatApp", ["ngRoute"])
.config(function ($routeProvider){
	$routeProvider.when("/login", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	})/*.when("/rooms/:roomId", {
		templateUrl:"src/views/room.html",
		controller: "RoomCtrl"
	})*/.otherwise({redirectTo: "/login"});

});

angular.module("ChatApp").controller("HomeCtrl",
["$scope","$http",
function($scope,$http){

	var socket = io.connect("http://localhost:8080");
	socket.on("roomlist", function(data){
		//console.log(data);
		$scope.$apply(function(){
			$scope.rooms = data;
		});
	});

	$scope.rooms="";
	
	$scope.nick="";
	$scope.loggedIn = false;
	$scope.rooms = [];

	$scope.login = function(){
		socket.emit("adduser", $scope.nick, function(available){
			if(available){
				$scope.loggedIn = true;
			}
		});
	};
}]);