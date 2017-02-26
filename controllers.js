
angular.module("PokeModule").controller("CreateCtrl", function() {
	
	this.no = 0;
	
	this.doIt = function() {
		
		if (this.no === 4) {
			this.no = 4;
		} else {
			this.no++;
		}	
		
	}	
	
});

angular.module("PokeModule").controller("PokeController", function(MyPokeService) {
	
	var pokeData = this;
	
	pokeData.getPokemon = function(input) {
		
		var promise = MyPokeService.sendRequestForPokemon(input);
		
		promise.then(function(response) {
			
			console.log(response.data);
			pokeData.pokemon = response.data;
			
		}, function(response) {
			
		});
		
	}
	
});

angular.module("PokeModule").controller("Data1Controller", function(MyData1Service,$http) {
	
	this.setPoke = function(input) {
		
		$http({
			  method:"GET",
			  url:"https://pokeapi.co/api/v2/pokemon/" + input + "/"
		}).then(function(response){
			
			var halfWeight = response.data.weight/20;
			
			var halfHeight = response.data.height/20;
			
			var totalStats = 0;
			
			for (i = 0; i < 6; i++) {
				
				totalStats += response.data.stats[i].base_stat;
			}
			
			MyData1Service.setData(response.data.id, response.data.base_experience, totalStats, halfWeight, halfHeight);	
		});	
		
		
	}
	
	this.getPoke = function() {
		
		return MyData1Service.getData();
	}
	
});

angular.module("PokeModule").controller("Data2Controller", function(MyData2Service,$http) {
	
	this.setPoke = function(input) {
		
		$http({
			  method:"GET",
			  url:"https://pokeapi.co/api/v2/pokemon/" + input + "/"
		}).then(function(response){
			
			var halfWeight = response.data.weight/20;
			
			var halfHeight = response.data.height/20;
			
			var totalStats = 0;
			
			for (i = 0; i < 6; i++) {
				
				totalStats += response.data.stats[i].base_stat;
			}
			
			MyData2Service.setData(response.data.id, response.data.base_experience, totalStats, halfWeight, halfHeight);	
		});	
	}
	
	this.getPoke = function() {
		
		return MyData2Service.getData();
	}
	
});

angular.module("PokeModule").controller("ImgController", function($http,$scope) {
	
	var nameToId = this;
	
	$scope.showImage = function(input) {		
		
		var id = parseInt(input);
		console.log(id);
		
		if (isFinite(id)) {
			
			$scope.image = 'pics/'+input+'.png';
						
		} else {
			
			$http({
				  method:"GET",
				  url:"https://pokeapi.co/api/v2/pokemon/" + input + "/"
			}).then(function(response){
				
				nameToId.id = response.data.id;	
				success();
			});		
			
			function success() {
				
				console.log(nameToId.id);
				$scope.image = 'pics/'+nameToId.id+'.png';
				
			}
	
		}	
 		
	}
		
});

angular.module("PokeModule").controller("ImgCropController", function() {
	
	this.image = "";
	
	this.showTheImage = function(input) {		
	
		this.image = 'pics/'+input+'.png';
 		
	}
		
});

angular.module("PokeModule").controller("ChoiceController", function($scope, MyChoice1Service, MyChoice2Service, MyChoice3Service, MyChoice4Service) {

	//this.weird1 = 0;
	
	this.check1 = function() {
		
		if ($scope.myVar1 === 'YES') {
			console.log("1g T");
			MyChoice1Service.setPick1(1);
			
			
		} else {
			console.log("1 F");
			MyChoice1Service.setPick1(0);
		}
	}
	

	this.check2 = function() {

		if ($scope.myVar2 === 'YES') {
			console.log("2 T");
			MyChoice2Service.setPick2(1);
			
		} else {
			console.log("2 F");
			MyChoice2Service.setPick2(0);
		}
	}

	this.check3 = function() {

		if ($scope.myVar3 === 'YES') {
			console.log("3 T");
			MyChoice3Service.setPick3(1);
			
		} else {
			console.log("3 F");
			MyChoice3Service.setPick3(0);
		}
	}

	this.check4 = function() {

		if ($scope.myVar4 === 'YES') {
			console.log("4 T");
			MyChoice4Service.setPick4(1);
			
		} else {
			console.log("4 F");
			MyChoice4Service.setPick4(0);
		}
	}
	
});

angular.module("PokeModule").controller("GetChoiceController", function(MyChoice1Service, MyChoice2Service, MyChoice3Service, MyChoice4Service) {
	
	this.getCheck = function() {
		
		if (MyChoice1Service.getPick1() === 1) {
			console.log("woo 1");
			this.image1 = 'https://vignette3.wikia.nocookie.net/role-play/images/4/49/Lightsaber.png/revision/latest?cb=20131228210601';
			
		} 
		
		if (MyChoice2Service.getPick2() === 1) {
			console.log("woo 2");
			this.image2 = 'https://vignette1.wikia.nocookie.net/chrisnolan/images/9/96/Batarang.png/revision/latest?cb=20110912230213';
		} 
		
		if (MyChoice3Service.getPick3() === 1) {
			console.log("woo 3");			
			this.image3 = 'https://vignette2.wikia.nocookie.net/xenonauts/images/4/4c/Machinegun.png/revision/latest?cb=20121206094123';
		} 
		
		if (MyChoice4Service.getPick4() === 1) {
			console.log("woo 4");
			var wildcard = randomNum();
			console.log(wildcard);
			this.image4 = 'pics/'+wildcard+'.png';
		} 
		
	}

	function randomNum() {
		
		return Math.floor(Math.random() * 720);
	}
	
});
	
angular.module("PokeModule").controller("ShowStatsController", function($scope) {
	
	$scope.unhideStats = false;
	
	$scope.printStats = function(divName) {
		
		 var printContents = document.getElementById(divName).innerHTML;
		 var popupWin = window.open('', '_blank', 'width=300,height=300');
		 popupWin.document.open();
		 popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/image.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
		 popupWin.document.close();
		
	}
	
});

angular.module("PokeModule").controller("TestController", function($scope, MySimpleService) {

	$scope.name = MySimpleService.name;	
	
});

angular.module("PokeModule").controller("ResultCtrl", function() {
	
});





