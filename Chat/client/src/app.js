angular.module("ChatApp", ["ngRoute"])
.config(function($routeProvider){
	$routeProvider.when("/login", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	})/*.when("/room/:roomId", {
		templateUrl:"roomlist/room.html",
		controller: "RoomController"
	})*/.when("/roomlist", {
		templateUrl: "src/roomlist/roomlist.html",
		controller: "RoomlistController"
		}).otherwise({redirectTo: "/login"});

});