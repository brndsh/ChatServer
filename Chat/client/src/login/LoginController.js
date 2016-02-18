angular.module("ChatApp").controller("LoginController", 
["$scope", "$http", "$location",
function LoginController($scope, $http, $location){
	
	var socket = io.connect("http://localhost:8080");
	
	/*socket.on("roomlist", function(data){
		$scope.$apply(function(){
			$scope.rooms = data;
		});
	});*/

	$scope.nick = "";
	$scope.errorMessage = "";
	$scope.loggedIn = false;
	

	$scope.$watch("nick", function (newValue, oldValue){
		if(newValue){
			if(newValue.length <= 3){   
				console.log("too short username");
			}
		}
	});

	$scope.onLogin = function() {
		socket.emit("adduser", $scope.nick, function(available){
			if (!available) {
				$scope.loginError = "Innskráning mistókst"//When login fails
				console.log("innskraning tokst ekki");
			}
			else {
				$scope.loggedIn = true;

				//$location.path("/roomlist");
				console.log("innskraning tokst");
				$scope.$apply(function(){
					$location.path('/roomlist')
				});
				//TODO senda notandann á herbergjalistann
			}
		})
	};

}]);