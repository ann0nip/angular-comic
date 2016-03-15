comicsApp.service('loginService',['$sessionStorage', function($sessionStorage) {
    
    var users = [];
    
    var isAuth = false;

    this.login = function (user) {
        var check = false;

        $.each(this.getUsers(),function(key, el) {
            if (user.email === el.email && user.pass === el.pass)
            {
                check = true;
            } 
        });
                
        return check;
    }

    this.setUsers = function(data) {
        if ($sessionStorage['users'] === undefined) {
            $sessionStorage['users'] = data;
        } else {
            users = $sessionStorage['users'];
            users.push(data);
            $sessionStorage['users'] = users;
        }
    }

    this.setAuth = function(result) {
        $sessionStorage['isAuth'] = result;
    }

    this.getUsers = function() {
        return $sessionStorage['users'] || undefined;
    }

    this.getAuth = function() {
        return $sessionStorage['isAuth'] || false;
    }

}]);
