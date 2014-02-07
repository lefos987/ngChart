angular.module('templates', ['app/app.view.html', 'app/demo/demo.view.html']);

angular.module('app/app.view.html', []).run(['$templateCache', function($templateCache) {
	'use strict';
	$templateCache.put('app/app.view.html',
		'<label for="width">Width</label>\n' +
		'<input id="width" type="number" ng-model="width">\n' +
		'<label for="width">Height</label>\n' +
		'<input id="height" type="number" ng-model="height">\n' +
		'<button ng-click="chartSetup()">Apply</button>\n' +
		'\n' +
		'<canvas chart id="mycanvas" type="Radar" data="data" options="options" width="chartW" height="chartH"></canvas>\n' +
		'<a id="downloadBtn" class="button" ng-click="download()">Download</a>\n' +
		'<ul>\n' +
		'	<li ng-repeat="d in myChartData">\n' +
		'		<label>{{d.label}}</label>\n' +
		'		<input type="number" ng-model="d.value">\n' +
		'	</li>\n' +
		'</ul>');
}]);

angular.module('app/demo/demo.view.html', []).run(['$templateCache', function($templateCache) {
	'use strict';
	$templateCache.put('app/demo/demo.view.html',
		'<div ng-controller="DemoCtrl">\n' +
		'	<h1>{{msg}}</h1>\n' +
		'</div>');
}]);
