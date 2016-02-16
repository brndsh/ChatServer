"use strict";


angular.module("ChatApp").controller("LoginController", 
["$scope",
function LoginController($scope){
	
	$scope.user = "";
	$scope.pass = "";
	$scope.errorMessage = "";
/*
	$scope.onLogin = function onLogin() {
		ChatResource.login($scope.user, $scope.pass, function(success){
			if (!success) {
				$scope.errorMessage = "Innskráning mistóks"//When login fails
			}
			else {
				$location("#/roomlist");
				//TODO senda notandann á herbergjalistann
			}
		})
	};

	*/
}]);
