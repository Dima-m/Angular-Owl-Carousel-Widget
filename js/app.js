angular.module('angular-owl-widget', [])

.service('fetchService', ['$http', function($http) {
	var fetchService = {};

  fetchService.fetchFirstSource = function() {
  	return $http.get('http://newsagg.innocode.no/api/feeds/32');
  };

  fetchService.fetchSecondSource = function() {
  	return $http.get('http://newsagg.innocode.no/api/feeds/66');
  };

  fetchService.fetchThirdSource = function() {
  	return $http.get('http://newsagg.innocode.no/api/feeds/64');
  };

  return fetchService;
}])

.controller('MainCtrl', ['$scope', 'fetchService', function($scope, fetchService) {
	getData();

	function getData() {
		fetchService.fetchFirstSource().then(function(resp) {
			var responeData = resp.data;
			$scope.firstFeedName = responeData.feed.name;
			$scope.firstFeedNews = _.forEach(responeData.news, function(value) { return value; });
		});
		fetchService.fetchSecondSource().then(function(resp) {
			var responeData = resp.data;
			$scope.secondFeedName = responeData.feed.name;
			$scope.secondFeedNews = _.forEach(responeData.news, function(value) { return value; });
		});
		fetchService.fetchThirdSource().then(function(resp) {
			var responeData = resp.data;
			$scope.thirdFeedName = responeData.feed.name;
			$scope.thirdFeedNews = _.forEach(responeData.news, function(value) { return value; });
		});
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
