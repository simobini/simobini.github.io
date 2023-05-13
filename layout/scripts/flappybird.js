//Parte JavaScript
var colonna = document.getElementById("colonna");
var spazio = document.getElementById("spazio");
var sprite = document.getElementById("sprite");

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
    var point = 0; //variabile punti
    var spaziomarginecontrollo = spazio.getBoundingClientRect(); //Il mio div ha id "spazio" 
    var spritemarginecontrollo = sprite.getBoundingClientRect(); //La mia immagine ha id "sprite"

    spaziomarginecontrollo.top = spaziomarginecontrollo.top + 30;
    spaziomarginecontrollo.bottom = spaziomarginecontrollo.bottom + 30;

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
    else{
      finale(); 
    }
}

function finale(){
	    //Il mio div ha id "spazio"
      var spaziomarginecontrollo = spazio.getBoundingClientRect();		
      //Il mio div ha id "colonna"
      var spaziomarginecontrollo2 = colonna.getBoundingClientRect();
      //La mia immagine ha id "sprite"
      var spritemarginecontrollo = sprite.getBoundingClientRect();

      if ( //parte dove non può passare
        spaziomarginecontrollo2.top < spritemarginecontrollo.bottom &&
        spaziomarginecontrollo2.bottom > spritemarginecontrollo.top &&
        spaziomarginecontrollo2.left < spritemarginecontrollo.right &&
        spaziomarginecontrollo2.right > spritemarginecontrollo.left 
      ){
          //il gioco si conclude
            $("#spazioLudico").hide(); //toglie
		        $("#sprite").remove();
		        document.getElementById("perso").style.display = "block"; //visualizza
        }
} 