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
					'content': { template: 'Look I am a column!' }
				},
				controller: "HomeCtrl",
				onEnter: function(loginService, $state){
			    	if (!loginService.getAuth()) {
			    		$state.go('login');
			    	}
				}
			});
	});