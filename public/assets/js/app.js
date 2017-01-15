(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'ui.bootstrap',
            'ngAnimate'
        ])
        .config(config)
        .run(run);

        function config($stateProvider, $urlRouterProvider){
        	$urlRouterProvider.otherwise("/");
        	$stateProvider
        		.state('home', {
        			url: '/',
        			templateUrl:'views/home/index.html'
        		})
        		.state('category', {
        			abstract: true,
        			url: '/cat',
        			template: '<ui-view/>'
        		})
        		.state('category.sportwear',{
        			url: '/:subcat?brand',
        			templateUrl: 'views/category/categories.html',
        			controller: function($scope, $stateParams){
        				console.log($stateParams, $stateParams.subcat);
        				if ($stateParams.brand) {
        					$scope.title = $stateParams.brand;
        				} else {
        					$scope.title = $stateParams.subcat;
        				}
        			}
        		})
        }

        function run($http, $rootScope, $window) {
        	// body...
        }

        // manually bootstrap angular after the JWT token is retrieved from the server
		    $(function () {
		    	angular.bootstrap(document, ['app']);
	        // get JWT token from server
	        // $.get('/token', function (token) {
	        //     window.jwtToken = token;
	        //     angular.bootstrap(document, ['app']);
	        // });
		    });
})();