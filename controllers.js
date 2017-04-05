

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
			
			var avgExp = response.data.base_experience/2;
			
			var avgTotalStats = 0;
			
			for (i = 0; i < 6; i++) {
				
				avgTotalStats += response.data.stats[i].base_stat;
			}
			
			avgTotalStats /= 2;
			
			MyData1Service.setData(response.data.id, avgExp, avgTotalStats, halfWeight, halfHeight);	
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
			
			var avgExp = response.data.base_experience/2;
			
			var avgTotalStats = 0;
			
			for (i = 0; i < 6; i++) {
				
				avgTotalStats += response.data.stats[i].base_stat;
			}
			
			avgTotalStats /= 2;
			
			MyData2Service.setData(response.data.id, avgExp, avgTotalStats, halfWeight, halfHeight);	
		});	
	}
	
	this.getPoke = function() {
		
		return MyData2Service.getData();
	}
	
});

angular.module("PokeModule").controller("NameController", function(MyNameService) {

	var self = this;
	
	self.setName = function(name) {
		
		MyNameService.setData(name);
	}
	
	self.getName = function() {		

		console.log(MyNameService.getData());
		return MyNameService.getData();
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
			this.image3 = 'http://vignette4.wikia.nocookie.net/bioshock/images/e/e0/Machine_Gun.png/revision/latest?cb=20091201194803';
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

angular.module("PokeModule").controller("OpponentController", function(MyPokeService) {
	
	var oppData = this;
	
	oppData.oppImage = "";
	oppData.numRand = 0;
	
	oppData.showOpponent = function() {
		
		oppData.numRand =  Math.floor(Math.random() * 720);
		console.log(oppData.numRand);
		oppData.oppImage = 'pics/'+oppData.numRand+'.png';
		
	}
	
	oppData.prepareForBattle = function(pokExp) {	
		
		console.log("pokExp " + pokExp + " opp " + oppData.numRand);
			
		var promise = MyPokeService.sendRequestForPokemon(oppData.numRand);
			
		promise.then(function(response) {
				
			console.log(response.data);
			oppData.oppExp = response.data.base_experience;
			console.log(oppData.oppExp);
			
			if (oppData.oppExp > pokExp) {
				
				oppData.battle(-1);
				
			} else if (oppData.oppExp < pokExp) {
				
				oppData.battle(1);
				
			} else if (oppData.oppExp == pokExp) {
				
				oppData.battle(0);
				
			}
				
		}, function(response) {
				
		});
			
	}	
		
	oppData.battle = function(exp) {
	
		console.log(exp);
		
		var elemOpp = document.getElementById("aniOpp");
		var posOpp = 670;
		var posOppTop = 120;
		
		var elemHead = document.getElementById("aniNewHead");
		var posH = 150;	
		var posHTop = 200; 
		
		var elemBottom = document.getElementById("aniNewBot");
		var posB = 150;
		var posBTop = 100;
		
		var idOpp = setInterval(moveOpp, 10);
		var idH = setInterval(moveHead, 10);
		var idB = setInterval(moveBottom, 10);		
		
		function moveOpp() {
			if (posOpp == 400 || posOppTop == 250) {
				clearInterval(idOpp);
			} else {
				posOpp--; 				
				
				if (exp == 1) {
					
					posOppTop++;					
					elemOpp.style.zIndex = "-2";
				    elemOpp.style.top = posOppTop + 'px';
				    
				} else if (exp == 0) {
					console.log("TIE!");
				}
				
			    elemOpp.style.left = posOpp + 'px';
			}
		}					
		
		function moveHead() {
			if (posH == 450 || posHTop == 450) {
				clearInterval(idH);
			} else {
				posH++; 
				
				if (exp == -1) {
					
					posHTop++;
					elemHead.style.zIndex = "-2";
					elemHead.style.top = posHTop + 'px';
					
				}
				
			    elemHead.style.left = posH + 'px'; 
			}
		}		
		
		function moveBottom() {
			if (posB == 450 || posBTop == 350) {
				clearInterval(idB);
			} else {
				posB++; 
				
				if (exp == -1) {
					
					posBTop++;
					elemBottom.style.zIndex = "-2";
					elemBottom.style.top = posBTop + 'px';
					
				}

			    elemBottom.style.left = posB + 'px'; 
			}
		}			
	}
	
	oppData.showSaber = function() {
		
		var elemSaber = document.getElementById("aniNewSaber");
		var posS = 260;
		var posSmore = 470;
		var idS = setInterval(moveSaber, 50);	
		var idSmore;
		
		function moveSaber() {
			if (posS == 160) {				
				clearInterval(idS);
				idSmore = setInterval(moveSaberMore, 50);
			} else {
				posS--;  
			    elemSaber.style.top = posS + 'px'; 
			}
		}
		
		function moveSaberMore() {
			if (posSmore == 670) {				
				clearInterval(idSmore);
			} else {
				posSmore++;  
			    elemSaber.style.left = posSmore + 'px'; 
			}
		}
	}
	
	oppData.showBat = function() {
		
		var elemBat = document.getElementById("aniNewBat");
		var posBa = 200;
		var idBa = setInterval(moveBat, 10);	
		
		function moveBat() {
			if (posBa == 600) {
				clearInterval(idBa);
			} else {
				posBa++;  
			    elemBat.style.left = posBa + 'px'; 
			}
		}
		
	}
	
	oppData.showGun = function() {
		
		var elemGun = document.getElementById("aniNewGun");
		var posG = 360;
		var posGdown = 330;
		var idG = setInterval(moveGun, 10);	
		var idGdown;
		
		function moveGun() {
			if (posG == 330) {
				clearInterval(idG);
				idGdown = setInterval(moveGunDown, 10);
			} else {
				posG--;  
			    elemGun.style.top = posG + 'px'; 
			}
		}
		
		function moveGunDown() {
			if (posGdown == 360) {
				clearInterval(idG);
				idG = setInterval(moveGun, 10);
			} else {
				posGdown++;  
			    elemGun.style.top = posGdown + 'px'; 
			}
		}
	}
	
	oppData.showWild = function() {
		
		var elemWild = document.getElementById("aniNewWild");
		var posW = 200;
		var idW = setInterval(moveWild, 10);	
		
		function moveWild() {
			if (posW == 400) {
				clearInterval(idW);
			} else {
				posW++;  
			    elemWild.style.left = posW + 'px'; 
			}
		}
		
	}
	
});
	//oppData.winner = "LOLOL";

angular.module("PokeModule").controller("ShowOpponentController", function($scope) {
	
	$scope.unhideOpp = false;
	
});

angular.module("PokeModule").controller("ShowStatsController", function($scope) {
	
	$scope.unhideStats = false;
	
	/* Useless: */
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
