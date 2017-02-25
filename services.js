
angular.module("PokeModule").service("MyPokeService", function($http) {
	
	var data = this;
	
	data.sendRequestForPokemon = function(input) {
		return $http({
			method:"GET",
			url:"https://pokeapi.co/api/v2/pokemon/" + input + "/"
		});
	}
	
});

angular.module("PokeModule").service("MyData1Service", function() {
	
	var pokes = {};
	
	this.setData = function(id, exp, stats) {
		
		pokes = {
			'id': id,
			'exp': exp,
			'stats': stats
		};
	}
	
	this.getData = function() {
		
		return pokes;
	}
	
	
});

angular.module("PokeModule").service("MyData2Service", function() {
	
	var pokes = {};
	
	this.setData = function(id, exp, stats) {
		
		pokes = {
			'id': id,
			'exp': exp,
			'stats': stats
		};
	}
	
	this.getData = function() {
		
		return pokes;
	}
	
	
});

angular.module("PokeModule").service("MyChoice1Service", function() {
	
	var self = this;
	
	this.setPick1 = function(choice) {
		self.choice = choice;
	}
	
	this.getPick1 = function() {
		return self.choice;
	}
});

angular.module("PokeModule").service("MyChoice2Service", function() {
	
	var self = this;
	
	this.setPick2 = function(choice) {
		self.choice = choice;
	}
	
	this.getPick2 = function() {
		return self.choice;
	}
});

angular.module("PokeModule").service("MyChoice3Service", function() {
	
	var self = this;
	
	this.setPick3 = function(choice) {
		self.choice = choice;
	}
	
	this.getPick3 = function() {
		return self.choice;
	}
});

angular.module("PokeModule").service("MyChoice4Service", function() {
	
	var self = this;
	
	this.setPick4 = function(choice) {
		self.choice = choice;
	}
	
	this.getPick4 = function() {
		return self.choice;
	}
});
