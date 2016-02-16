"use strict";


angular.module("ChatApp").controller("LoginController", 
["$scope", "$location", "ChatResource",
function LoginController($scope, $location, ChatResource){
	
	$scope.user = "";
	$scope.errorMessage = "";

	$scope.onLogin = function onLogin() {
		ChatResource.emit("adduser", $scope.nick, function(available){
			if (!available) {
				$scope.$apply(function(){
					$scope.errorMessage = "Innskráning mistókst"//When login fails
				})
			}
			else {
				$scope.$apply(function(){
					$location.path("/roomlist");
				})
				//TODO senda notandann á herbergjalistann
			}
		})
	};

	
}]);
