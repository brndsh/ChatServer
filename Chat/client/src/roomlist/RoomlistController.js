angular.module("ChatApp").controller("RoomlistController",
["$scope", "$routeParams","$location", "$http",
function RoomlistController($scope, $routeParams, $location, $http) {
	var socket = io.connect("http://localhost:8080");

	$scope.user = "";
	$scope.errorMessage = "";

	socket.on("userlist", function(users) {
		$scope.$apply(function() {
			$scope.user = users;
		})
	});

	socket.on("roomlist", function(roomlist) {
		$scope.$apply(function() {
			$scope.roomlist = Object.getOwnPropertyNames(roomlist);
		})
	});

	socket.emit("users");
	socket.emit("rooms");
	
	$scope.createRoom = function() {
		socket.emit("joinroom", {room: $scope.roomName}, function(available) {
			if (!available) {
				$scope.errorMessage = "Room already exists"//When login fails
				//console.log("Room already exists");
			}
			else {
				//console.log("jei nytt room");
				$scope.$apply(function() {
					$location.path("/room/" + $scope.roomName);
				});
			}
		});
	}


	$scope.joinRoom = function(thisRoom) {
		var joiningRoom = new Object();
		joiningRoom.room = thisRoom;

		socket.emit("joinroom", {room: thisRoom}, function(available) {
			if(!available) {
				$scope.$apply(function() {
					$scope.errorMessage = "Failed to join rooms!";
				})
			}
			else {
				$scope.$apply(function() {
					$location.path("/room/" + thisRoom);
				})
			}
		});
	}

	$scope.logOff = function(){
		socket.on("disconnect");
		socket.emit("users");
		$location.path("/login");

		socket.emit("updateusers", function(join, users, ops) {
			$scope.$apply(function() {
				$scope.user = users;
			})
		});
		
		socket.emit("servermessage", "quit", $scope.joinRoom.thisRoom, $scope.user);
	
	}

}]);