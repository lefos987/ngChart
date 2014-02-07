'use strict';

angular.module('app', ['templates', 'common', 'ngRoute'])
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/app.view.html',
				controller: 'AppCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
	}])
	.controller('AppCtrl', ['$scope', 'chartDataFactory', function ($scope, chartDataFactory) {
			$scope.templateUrl = 'app/app.view.html';
			$scope.options = {
				scaleOverride: true,
				scaleSteps: 10,
				scaleStepWidth: 1,
				scaleStartValue: 0
			};
			$scope.myChartData = [
				{label: 'Acidity', value: 12},
				{label: 'Floral', value: 5},
				{label: 'Citrus', value: 7},
				{label: 'Soft fruit', value: 9},
				{label: 'Nutty', value: 5},
				{label: 'Malty', value: 7},
				{label: 'Caramel', value: 7},
				{label: 'Chocolate', value: 7},
				{label: 'Spicy', value: 7},
				{label: 'Mouthfeel', value: 7},
				{label: 'Aftertaste', value: 7}
			];
			$scope.data = {
				labels : [],
				datasets : [
					{
						fillColor : 'rgba(102,153,153,0.5)',
						strokeColor : 'rgba(118,64,0,1)',
						pointColor : 'rgba(118,64,0,1)',
						pointStrokeColor : '#fff',
						data : []
					}
				]
			};
			$scope.$watch('myChartData', function (myData) {
				var chartData = chartDataFactory(myData);
				$scope.data.labels = chartData.labels;
				$scope.data.datasets[0].data = chartData.values;
			}, true);
			$scope.chartSetup = function () {
				$scope.chartW = $scope.width;
				$scope.chartH = $scope.height;
				
			};
			$scope.download = function () {
				var ctx = document.getElementById('mycanvas').getContext('2d');
				var dataURL = ctx.canvas.toDataURL('image/png');
				$scope.dataUrl = dataURL;
				var dnl = document.getElementById('downloadBtn');
				dnl.href = $scope.dataUrl;
				dnl.download = 'test.png';
				console.log('dataUrl ', $scope.dataUrl);
			};
		}
	]);