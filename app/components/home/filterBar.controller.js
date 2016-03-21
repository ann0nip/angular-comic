comicsApp.controller('FilterCtrl', [
	'$scope', 
	'comicsFactory', 
	function($scope, comicsFactory) {
		$scope.filter = '';
		$scope.showSelect = false;
		$scope.search = {genres: '', authors: '', character: '', edition: ''}
		


		$scope.tabSelection = function(tabName) {
			$scope.showSelect = true;
			$scope.search = {genres: '', authors: '', character: '', edition: ''};

			if (tabName === 'genres') {
				$scope.items = ['genres'];
			} else if (tabName === 'edition') {
				$scope.items = ['authors', 'edition', 'others'];
			} else if (tabName === 'character') {
				$scope.items = ['character'];
			} else if (tabName === 'all') {
				$scope.showSelect = false;
			}
		};

	}]);