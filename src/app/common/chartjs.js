'use strict';

/**
 * @ngdoc function
 * @name ng.module:chartjs
 * @function
 *
 * @description
 * Module to wrap chartjs library so we can use angular's dependency injection
 * to create our directives.
 *
 */
angular.module('chartjs', [])

	/**
	 * @ngdoc function
	 * @name ng.factory:chartjsFactory
	 * @function
	 *
	 * @description
	 * [add a description]
	 *
	 * @returns {string} A new instance of this factory.
	 *
	 */
	.factory('chartjsFactory', ['$document', '$q', '$rootScope', function ($document, $q, $rootScope) {

		var deferred = $q.defer();
		function onScriptLoad() {
			$rootScope.$apply(function () {
				deferred.resolve(window.Chart);
			});
		}
		var scriptTag = $document[0].createElement('script');
		scriptTag.type = 'text/javascript';
		scriptTag.async = true;
		scriptTag.src = 'vendor/chartjs/Chart.min.js';
		scriptTag.onreadystatechange = function () {
			if (this.readyState === 'complete') {
				onScriptLoad();
			}
		};
		scriptTag.onload = onScriptLoad;
		var body = $document[0].getElementsByTagName('body')[0];
		body.appendChild(scriptTag);

		return {
			chartjs: function () {
				return deferred.promise;
			}
		};
	}])

	/**
	 * @ngdoc function
	 * @name ng.directive:chartjs
	 * @function
	 *
	 * @description
	 * [add a description]
	 *
	 * @example
	   <doc:example>
	     <doc:source>
	       <chartjs></chartjs>
	     </doc:source>
	   </doc:example>
	 */
	.directive('chart', ['chartjsFactory', function (chartjsFactory) {
		return {
			restrict: 'A',
			scope: {
				data: '=',
				type: '@',
				options: '=',
				width: '=',
				height: '='
			},
			link: function ($scope, $element) {
				chartjsFactory.chartjs().then(function (Chart) {
					var ctx = $element[0].getContext('2d');
					$scope.$watch('width', function () {
						$scope.$watch('height', function () {
							ctx.canvas.width = $scope.width;
							ctx.canvas.height = $scope.height;
							var chart = new Chart(ctx);
							$scope.$watch('data', function (newVal, oldVal) {
								if (!newVal) {
									return;
								}
								chart[$scope.type]($scope.data, $scope.options);
							}, true);
						});
					});
				});
			}
		};
	}])

	/**
	 * @ngdoc function
	 * @name ng.factory:chartDataFactory
	 * @function
	 *
	 * @description
	 * [add a description]
	 *
	 * @returns {string} A new instance of this factory.
	 *
	 */
	.factory('chartDataFactory', [function () {
		return function (arr) {
			console.log('arr: ', arr);
			var labels = [],
					values = [];

			for (var i in arr) {
				labels.push(arr[i].label);
				values.push(arr[i].value);
			}
			return {
				labels: labels,
				values: values
			};
		};
	}]);