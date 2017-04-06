
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

angular.module("PokeModule").controller("OpponentController", function(MyPokeService, MyNameService) {
	
	var oppData = this;
	
	oppData.oppImage = "";
	oppData.numRand = 0;
	oppData.gunCount = 0;
	oppData.heart = 'http://icons.veryicon.com/png/Love/Valentine/heart.png';
	
	oppData.showOpponent = function() {
		
		oppData.numRand =  Math.floor(Math.random() * 720);
		console.log("Opp Id "+oppData.numRand);
		oppData.oppImage = 'pics/'+oppData.numRand+'.png';
		
		var promise = MyPokeService.sendRequestForPokemon(oppData.numRand);
		
		promise.then(function(response) {
				
			console.log(response.data);
			oppData.oppName = response.data.name;	
			oppData.oppExp = response.data.base_experience;
			//oppData.oppExp = 63;
			console.log("Opp Exp "+oppData.oppExp);
				
		}, function(response) {
				
		});
		
		var elemOppCh = document.getElementById("aniOpp");
		var posOppRightOnly = 450;
		var posOppRight = 410;
		var posOppTopp = 450;
		
		var elemHeadCh = document.getElementById("aniNewHead");
		var posHeadLeftOnly = 450;
		var posHeadLeft = 400;	
		var posHeadTopp = 450; 
		
		var elemBotCh = document.getElementById("aniNewBot");
		var posBotLeftOnly = 450;
		var posBotLeft = 400;
		var posBotTopp = 350;
		
		var elemGunCh = document.getElementById("aniNewGun");
		var posGunLeftOnly = 750;
		var posGunLeft = 700;
		var posGunTopp = 610;
		
		if (elemOppCh.style.left == posOppRightOnly + 'px') {
			oppData.winner = "";
			oppData.points = "";
			var idOppRightOnly = setInterval(moveOppRight, 10);
			var idHeadCh = setInterval(moveHeadCh, 10);
			var idBotCh = setInterval(moveBotCh, 10);
			var idGunCh = setInterval(moveGunCh, 10);
		} 
		
		if (elemHeadCh.style.left == posHeadLeftOnly + 'px' && elemBotCh.style.left == posBotLeftOnly + 'px') {
			oppData.winner = "";
			oppData.points = "";
			var idHeadLeftOnly = setInterval(moveHeadLeft, 10);
			var idBotLeftOnly = setInterval(moveBotLeft, 10);
			var idGunLeftOnly = setInterval(moveGunLeft, 10);
			var idOppCh = setInterval(moveOppCh, 10);			
		}
		
		// after opponent wins: 
	
		function moveOppRight() {
			if (posOppRightOnly == 670) {
				clearInterval(idOppRightOnly);
			} else {
				posOppRightOnly++; 		
			    elemOppCh.style.left = posOppRightOnly + 'px';
			}
		}					
		
		function moveHeadCh() {
			if (posHeadLeft == 150 && posHeadTopp == 200) {
				clearInterval(idHeadCh);
			} else {
				posHeadLeft--; 	
				posHeadTopp--;
			    elemHeadCh.style.left = posHeadLeft + 'px';
			    elemHeadCh.style.top = posHeadTopp + 'px';
			}
		}		
		
		function moveBotCh() {
			if (posBotLeft == 150 && posBotTopp == 100) {
				clearInterval(idBotCh);
			} else {				
				posBotLeft--; 	
				posBotTopp--;
			    elemBotCh.style.left = posBotLeft + 'px'; 
			    elemBotCh.style.top = posBotTopp + 'px';
			}
		}
		
		function moveGunCh() {
			if (posGunLeft == 450 && posGunTopp == 360) {
				clearInterval(idGunCh);
			} else {
				posGunLeft--; 	
				posGunTopp--;
			    elemGunCh.style.left = posGunLeft + 'px';
			    elemGunCh.style.top = posGunTopp + 'px';
			}
		}
		
		// after opponent loses:
		
		function moveHeadLeft() {
			if (posHeadLeftOnly == 150) {
				clearInterval(idHeadLeftOnly);
			} else {
				posHeadLeftOnly--; 		
				elemHeadCh.style.left = posHeadLeftOnly + 'px';
			}
		}	
		
		function moveBotLeft() {
			if (posBotLeftOnly == 150) {
				clearInterval(idBotLeftOnly);
			} else {
				posBotLeftOnly--; 		
			    elemBotCh.style.left = posBotLeftOnly + 'px';
			}
		}
		
		function moveGunLeft() {
			if (posGunLeftOnly == 450) {
				clearInterval(idGunLeftOnly);
			} else {
				posGunLeftOnly--; 		
				elemGunCh.style.left = posGunLeftOnly + 'px';
			}
		}
		
		function moveOppCh() {
			if (posOppRight == 670 && posOppTopp == 190) {
				clearInterval(idOppCh);
			} else {
				posOppRight++; 	
				posOppTopp--;
			    elemOppCh.style.left = posOppRight + 'px'; 
			    elemOppCh.style.top = posOppTopp + 'px';
			}
		}
	}
	
	oppData.prepareForBattle = function(pokExp) {	
				
		var battle = document.getElementById("battle");
		battle.volume = 0.06;
		battle.play();
		
		if (oppData.oppExp > pokExp) {
			
			oppData.winner = oppData.oppName + " wins!\n";
			oppData.points = oppData.oppExp + " points to " + pokExp + " points";
			
			
			oppData.battle(-1);  // opp wins
			
		} else if (oppData.oppExp < pokExp) {
			
			oppData.winner = MyNameService.getData() + " wins!";
			oppData.points = pokExp + " points to " + oppData.oppExp + " points";
			
			
			oppData.battle(1); // opp loses
			
		} else if (oppData.oppExp == pokExp) {
			
			oppData.winner = "It's a Tie!";
			
			var kiss = document.getElementById("kiss");
			kiss.play();
			
			oppData.battle(0); // tie
			
		}
		
	}	
		
	oppData.battle = function(exp) {
	
		console.log(exp);
		
		var elemHeart = document.getElementById("aniHeart");
		
		var elemOpp = document.getElementById("aniOpp");
		var posOpp = 670;
		var posOppTop = 190;
		
		var elemHead = document.getElementById("aniNewHead");
		var posH = 150;	
		var posHTop = 200; 
		
		var elemBottom = document.getElementById("aniNewBot");
		var posB = 150;
		var posBTop = 100;
		
		var elemGun = document.getElementById("aniNewGun");
		var posGun = 450;
		var posGunTop = 360;
		
		var idOpp = setInterval(moveOpp, 10);
		var idH = setInterval(moveHead, 10);
		var idB = setInterval(moveBottom, 10);	
		var idGun = setInterval(moveGun, 10);
		
		function moveOpp() {
			if (posOpp == 450 || posOppTop == 450) {
				clearInterval(idOpp);
			} else {
				//posOpp--;			
				
				if (exp == 1) {
					
					posOpp--;	
					posOppTop++;					
					elemOpp.style.zIndex = "-2";
					elemOpp.style.left = posOpp + 'px';
				    elemOpp.style.top = posOppTop + 'px';				    
				    
				} else if (exp == 0) {	
					
					elemHeart.style.display = 'inline';
						
				} else if (exp == -1) {	
					
					posOpp--;	
					elemOpp.style.left = posOpp + 'px';
					elemOpp.style.zIndex = "0";						
				}
				
				//elemOpp.style.left = posOpp + 'px';
				//elemOpp.style.top = posOppTop + 'px';
				
			}
			
		}					
		
		function moveHead() {
			if (posH == 450 || posHTop == 450) {
				clearInterval(idH);
			} else {				 
				
				if (exp == -1) {
					
					posH++;
					posHTop++;
					elemHead.style.zIndex = "-2";
				    elemHead.style.left = posH + 'px'; 
					elemHead.style.top = posHTop + 'px';
					
				} else if (exp == 0) {
					
					elemHeart.style.display = 'inline';
					
				} else if (exp == 1) {
					
					posH++;
				    elemHead.style.left = posH + 'px'; 
					elemHead.style.zIndex = "0";
				}			
				
			}
		}		
		
		function moveBottom() {
			if (posB == 450 || posBTop == 350) {
				clearInterval(idB);
			} else {
				
				if (exp == -1) {					

					posB++; 
					posBTop++;
					elemBottom.style.zIndex = "-2";
				    elemBottom.style.left = posB + 'px';
					elemBottom.style.top = posBTop + 'px';
					
				} else if (exp == 0) {
					
					elemHeart.style.display = 'inline';
					
				} else if (exp == 1) {					

					posB++; 
				    elemBottom.style.left = posB + 'px';
					elemBottom.style.zIndex = "0";
				}			
				
			}
		}
		
		function moveGun() {
			if (posGun == 750 || posGunTop == 610) {
				clearInterval(idGun);
			} else {				 
				
				if (exp == -1) {
					
					posGun++;
					posGunTop++;
					elemGun.style.zIndex = "-2";
				    elemGun.style.left = posGun + 'px'; 
					elemGun.style.top = posGunTop + 'px';
					
				} else if (exp == 0) {
					
					elemHeart.style.display = 'inline';
					
				} else if (exp == 1) {
					
					posGun++;
				    elemGun.style.left = posGun + 'px'; 
					elemGun.style.zIndex = "0";
				}			
				
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
		var idG = setInterval(moveGunUp, 10);	
		var idGdown;
		
		var gun = document.getElementById("gun");
		if (elemGun.style.top == 360 + 'px') {			
			gun.play();
			oppData.gunCount++;
			oppData.oppExp -= 10;
		}
		
		function moveGunUp() {
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
				clearInterval(idGdown);
				idG = setInterval(moveGunUp, 10);
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





