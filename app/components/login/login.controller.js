comicsApp.controller('LoginCtrl',[
    '$scope', 
    '$state',
    '$http', 
    'loginService',
    function ($scope, $state, $http, loginService) {

    $scope.user = {};
    $scope.user.user = '';
    $scope.user.email = '';
    $scope.user.pass = '';
    $scope.user.type = 'user'
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

        loginService.setAuth(loginService.login(user), user);

        if (loginService.getAuth()) {
            $state.go('home');
        } else {
            $scope.error = true;
            $scope.user = {};
        }       
    }

    $scope.doRegister = function(user) {
        loginService.setUsers(user);
        console.log(user);
        $scope.user = {};
        $state.go('login');
    }
}]);