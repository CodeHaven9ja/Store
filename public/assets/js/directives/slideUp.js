(function() {
    'use strict';

    angular
        .module('app')
        .directive('ngSlideUp', SlideUp);

    SlideUp.$inject = [];

    /* @ngInject */
    function SlideUp() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;

        function link(scope, element, attrs) {
        	$.scrollUp({
						scrollName: 'scrollUp', // Element ID
						scrollDistance: 300, // Distance from top/bottom before showing element (px)
						scrollFrom: 'top', // 'top' or 'bottom'
						scrollSpeed: 300, // Speed back to top (ms)
						easingType: 'linear', // Scroll to top easing (see http://easings.net/)
						animation: 'fade', // Fade, slide, none
						animationSpeed: 200, // Animation in speed (ms)
						scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
						//scrollTarget: false, // Set a custom target element for scrolling to the top
						scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
						scrollTitle: false, // Set a custom <a> title if required.
						scrollImg: false, // Set true to use image
						activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
						zIndex: 2147483647 // Z-Index for the overlay
        	});
        }
    }

    /* @ngInject */
    function Controller() {

    }
})();