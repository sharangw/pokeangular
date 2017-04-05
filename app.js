
var app = angular.module("PokeModule", ['ui.router']);

app.factory("MySimpleService", function() {
	
	return {
        name : 'testy'
    };
    
}); 

app.config(function($stateProvider, $urlRouterProvider) {
	
	var homeState = {
		name: 'home',
		url: '/',
		templateUrl: 'templates/home.html',
		
	};
			
	var createState = {
		name: 'create',
		url: '/create',
		templateUrl: 'templates/create.html',
	};
	
	var resultState = {
		name: 'result',
		url: '/result',
		templateUrl: 'templates/result.html',
	};
	
	var fightState = {
		name: 'fight',
		url: '/fight',
		templateUrl: 'templates/fight.html',
	};
	
	$stateProvider.state(homeState);
	$stateProvider.state(createState);
	$stateProvider.state(resultState);
	$stateProvider.state(fightState);
	
	//default routing
	$urlRouterProvider.otherwise('/');
	
});
