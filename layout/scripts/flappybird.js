//Parte JavaScript
var colonna = document.getElementById("colonna");
var spazio = document.getElementById("spazio");
var sprite = document.getElementById("sprite");
var point = 0; //variabile punti

spazio.addEventListener('animationiteration', () => {
    var random = -((Math.random()*300)+150);
    while(random > -200){ //così non da valori troppo bassi
      random = -((Math.random()*400)+30);
    }
    spazio.style.top = random + "px";
});

function controlloMargineSopra(y){ //controlla quando salgo
	if((y - 11) < 10) return y; //non mi fa più salire
	else{
		y = y - 11;
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

function collisione(){
    var spaziomarginecontrollo = spazio.getBoundingClientRect(); //Il mio div ha id "spazio" 
    var spritemarginecontrollo = sprite.getBoundingClientRect(); //La mia immagine ha id "sprite"
    var spaziomarginecontrollo2 = colonna.getBoundingClientRect(); //Il mio div ha id "colonna"
    
    //conto i punti
    if ( //parte dove può passare
        spaziomarginecontrollo.top < spritemarginecontrollo.bottom &&
        spaziomarginecontrollo.bottom > spritemarginecontrollo.top &&
        spaziomarginecontrollo.left < spritemarginecontrollo.right &&
        spaziomarginecontrollo.right > spritemarginecontrollo.left
      ) {    
        point = point + 1;
        $("#punti").text("Punteggio: " + point);
      }
    else if(
              spaziomarginecontrollo2.left < spritemarginecontrollo.right &&
              spaziomarginecontrollo2.right > spritemarginecontrollo.left
          ){   
            $("#spazioLudico").hide(); //toglie
		        $("#sprite").remove();
		        document.getElementById("perso").style.display = "block"; //visualizza
        }
} 