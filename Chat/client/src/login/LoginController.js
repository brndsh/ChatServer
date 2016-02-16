"use strict";


angular.module("ChatApp").controller("LoginController", 
["$scope", "$location", "socket",
function LoginController($scope, $location, socket){
	
	$scope.user = "";
	$scope.errorMessage = "";

	$scope.onLogin = function onLogin() {
		ChatResource.login($scope.user, function(success){
			if (!success) {
				$scope.errorMessage = "Innskráning mistókst"//When login fails
			}
			else {
				$location("#/roomlist");
				//TODO senda notandann á herbergjalistann
			}
		})
	};

	
}]);
