comicsApp.controller('LoginCtrl',[
    '$scope', 
    '$rootScope',
    '$state',
    '$http', 
    'loginService',
    function ($scope, $rootScope, $state, $http, loginService) {

    $scope.user = {};
    $scope.user.username = '';
    $scope.user.email = '';
    $scope.user.pass = '';
    $scope.error = false;

    if (loginService.getUsers() === undefined) {
        $http({
        method: 'GET', 
        url: 'app/components/login/login.users.json'
        }).then(function(data, status, headers, config) {

          loginService.setUsers(data.data);

        },function(data, status, headers, config) {

          alert("Ha fallado la petición. Estado HTTP:"+status);

        });
    }
    

    $scope.doLogin = function(user) {

        loginService.setAuth(loginService.login(user));

        if (loginService.getAuth()) {
            $state.go('home');
        } else {
            $scope.error = true;
            $scope.user = {};
        }       
    }

    $scope.doRegister = function(user) {
        loginService.setUsers(user);
    }
}]);