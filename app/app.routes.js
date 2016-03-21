comicsApp
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state('login', {
				url: '/login',
				views: {
					'content': {templateUrl: 'app/components/login/login.view.html' }
				},
				controller: "LoginCtrl",
				onEnter: function(loginService, $state){
			    	if (loginService.getAuth()) {
			    		$state.go('home');
			    	}
				}
			})
			.state('register', {
				url: '/register',
				views: {
					'content': {templateUrl: 'app/components/login/login.register.view.html' }
				},
				controller: "LoginCtrl",
				onEnter: function(loginService, $state){
			    	if (loginService.getAuth()) {
			    		$state.go('home');
			    	}
				}
			})
			.state('home', {
				url: '/home',
				views: {
					'linksCss': {templateUrl: 'app/components/home/home.styles.view.html'},
					'content': { templateUrl: 'app/components/home/home.view.html' }
				},
				controller: "HomeCtrl",
				onEnter: function(loginService, $state){
			    	if (!loginService.getAuth()) {
			    		$state.go('login');
			    	}
				}
			})
			.state('profile', {
				url: '/profile',
				views: {
					'linksCss': {templateUrl: 'app/components/home/home.styles.view.html'},
					'content': {templateUrl: 'app/components/profile/profile.view.html' }
				},
				controller: "LoginCtrl",
				onEnter: function(loginService, $state){
			    	if (!loginService.getAuth()) {
			    		$state.go('login');
			    	}
				}
			})
	});