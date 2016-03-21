comicsApp.controller('HomeCtrl', [
	'$scope', 
	'comicsFactory', 
	'$http',
	'loginService', 
	'$state',
	function($scope, comicsFactory, $http, loginService, $state) {

    $scope.rating = 5;
    $scope.sortType = 'name';
    $scope.username = loginService.getUsername();

	if (comicsFactory.getComics() === undefined) {
		$http({
	        method: 'GET', 
	        url: 'assets/libs/comics-data.json'
	        }).then(function(data, status, headers, config) {

				comicsFactory.setComics(data.data);
				$scope.comics = comicsFactory.getComics();

	        },function(data, status, headers, config) {

				alert("Ha fallado la petición. Estado HTTP:"+status);

	        });
    } else {
		$scope.comics = comicsFactory.getComics();
    }

    $scope.logout = function() {
    	loginService.setAuth(false);
    	$state.go('login');
    }

    $scope.rateFunction = function(rating, name) {
    	comicsFactory.updateRank(name, 'ranking.usersRank', rating);
    	$scope.comics = comicsFactory.getComics();
    }

    $scope.borrow = function(name) {
    	comicsFactory.updateStatus(name, true);
    }

    
}]).directive('starRating',
	function() {
		return {
			restrict : 'A',
			template : '<ul class="rating">'
					 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
					 + '\u2605'
					 + '</li>'
					 + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};
				
				scope.toggle = function(index) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};
				
				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						if (newVal) {
							updateStars();
						}
					}
				);
			}
		};
	}
);