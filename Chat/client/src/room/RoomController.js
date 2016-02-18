angular.module("ChatApp").controller("RoomController",
function RoomController($scope, $routeParams, $location) {
	var id = $routeParams.id;
	var queryString = $location.search();
	var status = queryString["status"];

	if(status === available){
		
	}
});