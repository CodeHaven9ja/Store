(function() {
    'use strict';

    angular
        .module('app')
        .service('LocalService', LocalService);

    LocalService.$inject = ['$scope', '$rootScope', '$http'];

    /* @ngInject */
    function LocalService($scope, $rootScope, $http) {
        this.func = func;
        var hasSlider;

        var service = {};

        service.setHasSlider = SetHasSlider;
        service.getHasSlider = GetHasSlider;

        return service;
        ////////////////

        function SetHasSlider(bool) {
        	hasSlider = bool || false;
        }

        function GetHasSlider() {
        	return hasSlider;
        }

        function func() {
        }
    }
})();