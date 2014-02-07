'use strict';
/*jshint camelcase: false */

describe('chartjs module', function () {

	describe('chartjsFactory factory', function () {

		var chartjsFactory;

		beforeEach(module('chartjs'));
		beforeEach(inject(function (_chartjsFactory_) {
			chartjsFactory = _chartjsFactory_;
		}));

		it('- should return the meaning of life', function () {
			//expect(chartjsFactory.chartjs()).toEqual(42);
		});

	});

	describe('chartjs directive', function () {

		var $scope, element;
		
		beforeEach(module('chartjs'));
		beforeEach(inject(function ($compile, $rootScope) {
			$scope = $rootScope;
			element = angular.element('<chartjs></chartjs>');
			$compile(element)($scope);
		}));

		it('shouldn\'t have child div', function () {
			$scope.$digest();
			expect(angular.element(element.children()).html()).toBeUndefined();
		});

		it('should contain the correct text', function () {
			$scope.$digest();
			expect(element.text()).toEqual('');
		});

	});

	describe('chartDataFactory factory', function () {

		var chartDataFactory;

		beforeEach(module('chartjs'));
		beforeEach(inject(function (_chartDataFactory_) {
			chartDataFactory = _chartDataFactory_;
		}));

		it('- should return the meaning of life', function () {
			// expect(chartDataFactory.someMethod()).toEqual(42);
		});

	});
});