/*"use strict";

angular.module("chatApp").factory("ChatResource", 
function ChatResource() {
	return {
		login: function login(user, pass, callback) {
			//TODO
		},

		getRoomList: function getRoomList(callback) {
			//TODO
		},

	};
});

*/

"use strict";
//Used Briant Ford Angular Socket io = http://briantford.com/blog/angular-socket-io
angular.module("ChatApp").factory('socket', function ($rootScope) {
  var socket = io.connect("http://localhost:8080");
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
