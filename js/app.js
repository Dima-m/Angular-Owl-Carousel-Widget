angular.module('angular-owl-widget', ['ngResource'])

.factory('fetchService', ['$resource', function($resource) {
  	return $resource('http://newsagg.innocode.no/api/feeds/:id', 
  	{
            id: '@id'
        }, 
        {
            fetchFirstSource: {
                method: 'GET',
                params: { id: '32' }
            },
        
            fetchSecondSource: {
                method: 'GET',
                params: { id: '66' }
            },

            fetchThirdSource: {
                method: 'GET',
                params: { id: '64' }
            }
        });

  return fetchService;
}])

.controller('MainCtrl', ['$scope', 'fetchService', function($scope, fetchService) {
	getData();

	function getData() {
		$scope.firstFeed = fetchService.fetchFirstSource();
		$scope.secondFeed = fetchService.fetchSecondSource();
		$scope.thirdFeed = fetchService.fetchThirdSource();
	}
}])

.directive("owlCarousel", function() {
	return {
		restrict: 'E',
		transclude: false,
		link: function (scope) {
			scope.initCarousel = function(element) {
				var defaultOptions = {
					items: 3,
					pagination: true,
					scrollPerPage: true,
					responsive: {
				    480: {
				      items: 1,
					  scrollPerPage: false
				    },
				    678: {
				      items: 2,
					  scrollPerPage: false
				    },
				    960: {
				      items: 3
				    }
				  }
				};
				$(element).owlCarousel(defaultOptions);
			};
		}
	};
})
.directive('owlCarouselItem', [function() {
	return {
		restrict: 'A',
		transclude: false,
		link: function(scope, element) {
			if(scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
}]);
