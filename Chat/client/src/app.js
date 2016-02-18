angular.module("ChatApp", ["ngRoute"])
.config(function($routeProvider){
	$routeProvider.when("/login", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	}).when("/room/: roomID", {
		templateUrl:"src/room/room.html",
		controller: "RoomController"
	}).when("/roomlist", {
		templateUrl: "src/roomlist/roomlist.html",
		controller: "RoomlistController"
		}).otherwise({redirectTo: "/roomlist"});

});