angular.module("ChatApp").controller("RoomController",
["$scope", "$routeParams", "$location", "$http",
function RoomController($scope, $routeParams, $location, $http) {
	var id = $routeParams.id;
	var queryString = $location.search();
	var status = queryString["status"];
	var socket = io.connect("http://localhost:8080");
	var thisRoom = $location.path().split("/")[2];
	$scope.user = "";
	$scope.roomName = thisRoom;
	
	socket.on("updateusers", function(room, users, ops) {
		$scope.$apply(function() {
			$scope.user = users;
		})
	});

	socket.on("updatechat", function(room, messages) {
		$scope.$apply(function() {
			$scope.typers = messages;
			$scope.message = "";
		})
	});
	
	socket.on("userlist", function(users) {
		socket.on("roomlist", function(roomlist) {
			$scope.$apply(function() {
				console.log(users);
				$scope.user = roomlist[thisRoom].users;
			})
		});
		socket.emit("rooms");
	});

	$scope.leaveRoom = function() {
		socket.emit("partroom", thisRoom); 
		$location.path("/roomlist");		
	}
}]);