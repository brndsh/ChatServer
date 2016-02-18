angular.module("ChatApp").controller("RoomlistController", 
function RoomlistController($scope, $routeParams, socket) {

	socket.emit("rooms");

	var whenRoomListChanges = function (roomlist){
		console.log(roomlist);
		$scope.apply(function() {
			$scope.roomlist = roomlist;
		});
	}	

	socket.on("roomlist", whenRoomListChanges);

	$scope.roomlist = [{
		name: "Lounge:",
		numParticipants: 10
	}, {
		name: "WEPO", 
		numParticipants: 110
	}];
});