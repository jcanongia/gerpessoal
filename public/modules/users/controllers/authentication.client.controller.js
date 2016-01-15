'use strict';

angular.module('users').controller('AuthenticationController', ['$rootScope','$scope', '$http', '$location', 'Authentication',
'$timeout', '$document',
	function($rootScope, $scope, $http, $location, Authentication, $timeout, $document) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Timeout timer value
		var TimeOutTimerValue = 1800000;// 30 minutos
		// var TimeOutTimerValue = 5000;// para teste 5 segundos

		// Start a timeout
		var TimeOut_Thread = $timeout(function(){ new LogoutByTimer(); } , TimeOutTimerValue);
		var bodyElement = angular.element($document);

	  // Keyboard Events Mouse Events Touch Events Common Events
		angular.forEach(['keydown', 'keyup', 'click', 'mousemove', 'DOMMouseScroll', 'mousewheel', 'mousedown', 'touchstart', 'touchmove', 'scroll', 'focus'],
    function(EventName) {
         bodyElement.bind(EventName, function (e) { new TimeOut_Resetter(e); });
    });

		function LogoutByTimer()
		{
			$scope.authentication.user = '';
			// And redirect to the index page
			$location.path('/#!/signin');
		}

		function TimeOut_Resetter(e)
		{
			// console.log('' + e);

			/// Stop the pending timeout
			$timeout.cancel(TimeOut_Thread);

			/// Reset the timeout
			TimeOut_Thread = $timeout(function(){ new LogoutByTimer(); } , TimeOutTimerValue);
		}

	}
]);

