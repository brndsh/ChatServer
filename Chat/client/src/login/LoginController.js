angular.module("ChatApp").controller("LoginController", 
["$scope", "$http", "$location",
function LoginController($scope, $http, $location){
	
	var socket = io.connect("http://localhost:8080");


	$scope.nick = "";
	$scope.errorMessage = "";
	$scope.loggedIn = false;
	

	$scope.$watch("nick", function (newValue, oldValue){
		if(newValue){
			if(newValue.length <= 3){   
				//console.log("too short username");
				$scope.errorMessage = "Too short.";
			}
			else
			{
				$scope.errorMessage = "";
			}
		}
	});

	$scope.onLogin = function() {
		socket.emit("adduser", $scope.nick, function(available){
			if (!available) {
				$scope.errorMessage = "Nickname is already in use.";
			}
			else {
				$scope.loggedIn = true;
				//console.log("innskraning tokst");
				$scope.$apply(function(){
					$location.path("/roomlist")
				});
			}
		})
	};

}]);