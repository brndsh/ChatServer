angular.module("ChatApp").controller("RoomController",
["$scope", "$routeParams", "$location", "$http",
function RoomController($scope, $routeParams, $location, $http) {
	var id = $routeParams.id;
	var queryString = $location.search();
	var status = queryString["status"];
	var socket = io.connect("http://localhost:8080");
	var thisRoom = $location.path().split("/")[2];

	$scope.roomName = thisRoom;

	$scope.leaveRoom = function() {
		socket.emit("partroom", thisRoom); 
		$location.path("/roomlist");		
	}
	
	
	console.log($location.path());
	socket.on("roomlist", function(data) {
		//console.log("viðerumíherbergi");
		//console.log(users);
		$scope.$apply(function() {
			//console.log("þetteruusers");
			console.log(users);
			$scope.users = data[thisRoom].users;
			})
	});
	socket.emit("rooms");
	
}]);