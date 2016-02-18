angular.module("ChatApp").controller("RoomlistController",
["$scope", "$routeParams","$location",
function RoomlistController($scope, $routeParams, $location) {
	var socket = io.connect("http://localhost:8080");
	
/*
	var whenRoomListChanges = function (roomlist){
		console.log(roomlist);
		$scope.$apply(function() {
			$scope.roomlist = roomlist;
		});
	}	
*/
	socket.on("roomlist", function(roomlist){
		$scope.$apply(function(){
			$scope.roomlist = Object.getOwnPropertyNames(roomlist);
		})
	});
	socket.emit("rooms");
	$scope.roomName = "";
	$scope.createRoom = function() {
		socket.emit("joinroom", {room: $scope.roomName}, function(available){
			if (!available) {
				$scope.loginError = "Room already exists"//When login fails
				console.log("Room already exists");
			}
			else {
				//$location.path("/roomlist");
				console.log("jei nytt room");
				$scope.$apply(function(){
					$location.path('/room/' + $scope.roomName)
				});
				//TODO senda notandann á herbergjalistann
			}
		});
	}

	/*
	$scope.roomlist = [{
		name: "Lounge:",
		numParticipants: 10
	}, {
		name: "WEPO", 
		numParticipants: 110
	}];
	*/
}]);