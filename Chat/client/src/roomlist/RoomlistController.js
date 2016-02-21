angular.module("ChatApp").controller("RoomlistController",
["$scope", "$routeParams","$location",
function RoomlistController($scope, $routeParams, $location) {
	var socket = io.connect("http://localhost:8080");
	$scope.roomName = "";
	$scope.user = "";
	$scope.errorMessage = "";

	
	$scope.createRoom = function() {
		socket.emit("joinroom", {room: $scope.roomName}, function(available){
			if (!available) {
				$scope.errorMessage = "Room already exists"//When login fails
				//console.log("Room already exists");
			}
			else {
				//console.log("jei nytt room");
				$scope.$apply(function(){
					$location.path("/room/" + $scope.roomName);
				});
			}
		});
	}


	$scope.joinRoom = function(thisRoom) {
		var joiningRoom = new Object();
		joiningRoom.room = thisRoom;

		socket.emit("joinroom", {room: thisRoom}, function(available) {
			if(!available){
				$scope.$apply(function() {
					$scope.errorMessage = "FAILED!";
				})
			}
			else {
				$scope.$apply(function(){
					$location.path("/room/" + thisRoom);
				})
			}

		});
	}

	

	socket.on("userlist", function(users) {
		//console.log("viðerumíuserlist");
		$scope.$apply(function() {
			//console.log("applyumusers");
			//console.log(users);
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
}]);