angular.module("ChatApp", ["ngRoute"])
.config(function($routeProvider){
	$routeProvider.when("/login", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	})/*.when("/rooms/:roomId", {
		templateUrl:"src/views/room.html",
		controller: "RoomController"
	}).when("/roomlist", {
		templateUrl: "src/roomlist/list.html"
		controller: "RoomlistController"
		})
		*/.otherwise({redirectTo: "/login"});

});

angular.module("ChatApp").controller("HomeController",
["$scope", "$http", 
function($scope, $http){
	
	var socket = io.connect("http://localhost:8080");
	
	socket.on("roomlist", function(data){
		//console.log(data);
		$scope.$apply(function(){
			$scope.rooms = data;
		});
	});
	console.login("nownick");
	$scope.nick = "";
	$scope.loggedIn = false;
	$scope.rooms = [];

	$scope.login = function(){
		socket.emit("adduser", $scope.nick, function(available){
			if(available){
				$scope.loggedIn = true;
				socket.emit("rooms");
			}
		});
	};
}]);

angular.module("ChatApp").controller("RoomController", 
["$scope", "$http",
function($scope, $http){

}]);