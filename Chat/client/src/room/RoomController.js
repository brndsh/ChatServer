angular.module("ChatApp").controller("RoomController",
["$scope", "$routeParams", "$location", "$http",
function RoomController($scope, $routeParams, $location, $http) {
	var id = $routeParams.id;
	var queryString = $location.search();
	var status = queryString["status"];
	var socket = io.connect("http://localhost:8080");
	var thisRoom = $location.path().split("/")[2];


	$scope.roomName = thisRoom;

	$scope.leaveRoom = function(){
		socket.emit("partroom", thisRoom); 
		$location.path('/roomlist');		
	}

	$scope.user = "";

			socket.on("userlist", function(users){
			console.log("viðerumíherbergi");
			$scope.$apply(function(){
			console.log("þetteruusers");
			console.log(users.thisRoom);
			$scope.user = users;
		})
	});


}]);