comicsApp.controller('ProfileCtrl', [
	'$scope', 
	'comicsFactory', 
	'loginService', 
	'$state',
	function($scope, comicsFactory, loginService, $state) { 
		$scope.manageUsers = false;
    	$scope.username = loginService.getUsername();
		$scope.users = loginService.getUsers();

		$scope.adminUsers = function(manageUsers) {
			$scope.manageUsers = manageUsers;
		}

		$scope.manageComics = false;

		$scope.adminComics = function(manageComics) {
			$scope.manageComics = manageComics;
		}

		$scope.logout = function() {
    		loginService.setAuth(false);
    		$state.go('login');
    	}

    	$scope.delete = function(user) {
    		loginService.deleteUser(user);
    	}

	}]);