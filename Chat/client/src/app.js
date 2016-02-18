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
		}).otherwise({redirectTo: "/login"});*/

});