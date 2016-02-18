angular.module("ChatApp").controller("RoomlistController",
["$scope", "$routeParams","$location",
function RoomlistController($scope, $routeParams, $location) {
	var socket = io.connect("http://localhost:8080");
	

	socket.on("roomlist", function(roomlist){
		$scope.$apply(function(){
			$scope.roomlist = Object.getOwnPropertyNames(roomlist);
		})
	});

	$scope.user = "";
	socket.on("userlist", function(users){
		console.log("viðerumíuserlist");
		$scope.$apply(function(){
			console.log("applyumusers");
			console.log(users);
			$scope.user = users;
		})
	});

	socket.emit("users");

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


	$scope.roomName = "";

	$scope.joinRoom = function(){
		socket.emit("joinroom", {room: $scope.roomName}, function(available){
			$scope.$apply(function(){
				$location.path('/room/' + $scope.roomName);
			})
		});
	}

	$scope.joinRoomEx = function(thisroom){
		var roomy = new Object();
		roomy.room = thisroom;

		socket.emit("joinroom", {room: thisroom}, function(available){
			if(available){
				$scope.$apply(function(){
					$location.path('/room/' + thisroom);
				})
			}
			else{
				$scope.$apply(function(){
					$scope.errorMessage = "FAILED!";
				})
			}

		});
	}
}]);