//PARTE CHE STAVA SOPRA
var y = 57; //altezza del personaggio
var x = 30; //distanza dal bordo del personaggio
var xc = -1, yc = -3;

$(".game").hide();
setInterval(start, 2000);
function start(){
    $(".game").show();
    $("div:first").hide();
}

$("#sprite").attr("src", "images/flappybird/sprite.png");
$("#sprite").show(); //personaggio
$("#perso").hide();  //scritta Game Over
$(document).ready(function(){
	//setInterval(gravita, 700);
	function gravita(){ //mi muovo giù
		$("#sprite").attr("src", "images/flappybird/sprite2.png");
		y = controlloMargineSotto(y);
		$("#sprite").animate({top: y +'%', left: x + '%'}, function(){;
			$("#sprite").attr("src", "images/flappybird/sprite.png");
		}); 
	}
	$("#spazioLudico").click(function(){ //mi muovo su
		y = controlloMargineSopra(y);
		$("#sprite").attr("src", "images/flappybird/sprite2.png");
		$("#sprite").animate({top: y +'%'}); //mi muovo su
	});
	setInterval(ostacolo, 900);
	function ostacolo(){
		xc = xc - 70;
		$("#appoggio").css("background-position", xc + "px " + yc + "px");
		controllo(x, y, xc, yc);
	}
});

//PARTE CHE STAVA SOTTO
var w = 35, h = 80; //larghezza e altezza spazioLudico

function controlloMargineSopra(y){ //controlla quando salgo
	if((y - 11) < 10) return y; //non mi fa più salire
	else{
		y = y - 9;
		return y;
	}
}

function controlloMargineSotto(y){ //controlla quando scendo
	if((y + 5) > 83){ //qui perdi
		//return y;
		$("#spazioLudico").hide(); //toglie
		$("#sprite").remove();
		document.getElementById("perso").style.display = "block"; //visualizza
	}
	else{ //aggiunge la gravità
		y = y + 5;
		return y;
	}
}

function controllo(x, y, xc, yc){
	//var s = document.getElementById("sprite");
	//var a = document.getElementById("appoggio"); 

	if(xc)
	
	/*salvare le due altezze*/

}