angular.module("ChatApp", ["ngRoute"])
.config(function ($routeProvider){
	$routeProvider.when("/login", {
		templateUrl: "login/login.html",
		controller: "LoginController"
	}).when("/rooms/:roomId", {
		templateUrl:"/views/room.html",
		controller: "RoomCtrl"
	}).otherwise({redirectTo: "/login"});

});

angular.module("ChatApp").controller("HomeCtrl",
["$scope","$http",
function($scope,$http){

	var socket = io.connect("http://localhost:8080");
	socket.on("roomlist", function(data){
		console.log(data);
	});

	$scope.rooms="";
	
	$scope.nick="";
	$scope.login = function(){
		socket.emit("adduser", $scope.nick, function(available){
			if(available){
				//
			}
		});
	};
}]);