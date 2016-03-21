comicsApp.service('loginService',['$sessionStorage', function($sessionStorage) {
    
    var users = [];
    
    var isAuth = false;

    var setUsername = function(user, type) {
        $sessionStorage['username'] = {user: user, type: type};
    }
    
    this.login = function (user) {
        var check = false;

        $.each(this.getUsers(),function(key, el) {
            if (user.email === el.email && user.pass === el.pass)
            {
                check = true;
                setUsername(el.user, el.type);
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

    this.deleteUser = function(user) {
        users = $sessionStorage['users'];
        $.each(users, function(ix, value) {
            if (value.user === user) {
                users.splice(ix,1);
            }
            
        });
            console.log(users);
        $sessionStorage['users'] = users;
    }

    this.getUsername = function() {
        return $sessionStorage['username'] || undefined;
    }


}]);
