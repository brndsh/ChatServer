angular.module("ChatApp").controller("RoomlistController",
["$scope", "$routeParams",
function RoomlistController($scope, $routeParams) {
	var socket = io.connect("http://localhost:8080");
	socket.emit("rooms");

	/*var whenRoomListChanges = function (roomlist){
		console.log(roomlist);
		$scope.$apply(function() {
			$scope.roomlist = roomlist;
		});
	}	*/

	socket.on("roomlist", function(roomlist){
		$scope.$apply(function(){
			$scope.roomlist = roomlist;
		})
	});

	/*$scope.roomlist = [{
		name: "Lounge:",
		numParticipants: 10
	}, {
		name: "WEPO", 
		numParticipants: 110
	}];*/
}]);