//PARTE CHE STAVA SOPRA
var y = 50; //altezza del personaggio

$(document).ready(function(){
	$("#sprite").attr("src", "images/flappybird/sprite.png");
	alert("PREPARATI! \nAl tuo 'ok' il gioco partirà!");
	$("#sprite").show(); //personaggio
	$("#perso").hide();  //scritta Game Over
	setInterval(gravita, 1000);
	function gravita(){ //mi muovo giù
		$("#sprite").attr("src", "images/flappybird/sprite2.png");
		y = controlloMargineSotto(y);
		$("#sprite").animate({top: y +'%'}, function(){;
			$("#sprite").attr("src", "images/flappybird/sprite.png");
		}); 
	}
	$("#spazioLudico").click(function(){ //mi muovo su
		y = controlloMargineSopra(y);
		$("#sprite").attr("src", "images/flappybird/sprite2.png");
		$("#sprite").animate({top: y +'%'}); //mi muovo su
	});
	setInterval(ostacolo, 2000);
	function ostacolo(){
		inserisciColonne();
	}
});

//PARTE CHE STAVA SOTTO
var w = 35, h = 80; //larghezza e altezza spazioLudico

function controlloMargineSopra(y){ //controlla quando salgo
	if((y - 11) < 15) return y; //non mi fa più salire
	else{
		y = y - 7;
		return y;
	}
}

function controlloMargineSotto(y){ //controlla quando scendo
	if((y + 5) > 85){ //qui perdi
		//return y;
		document.getElementById("spazioLudico").style.display = "none"; //toglie
		document.getElementById("sprite").style.display = "none"; //toglie
		document.getElementById("perso").style.display = "block"; //visualizza
	}
	else{ //aggiunge la gravità
		y = y + 3;
		return y;
	}
}

function inserisciColonne(){
	document.getElementById("appoggio").style.display = "block"; //visualizza, tipo show
}