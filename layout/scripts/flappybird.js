//Parte JavaScript
var colonna = document.getElementById("colonna");
var spazio = document.getElementById("spazio");
var sprite = document.getElementById("sprite");
var point = 0;

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
    //Il mio div ha id "spazio"
    var spaziomarginecontrollo = spazio.getBoundingClientRect();
    //La mia immagine ha id "sprite"
    var spritemarginecontrollo = sprite.getBoundingClientRect();

    //conto i punti
    if (
        spaziomarginecontrollo.top < spritemarginecontrollo.bottom &&
        spaziomarginecontrollo.bottom > spritemarginecontrollo.top &&
        spaziomarginecontrollo.left < spritemarginecontrollo.right &&
        spaziomarginecontrollo.right > spritemarginecontrollo.left
      ) {
        point = point + 1;
        $("#punti").text("Punteggio: " + point);
      }
}

function finale(){
	    //Il mio div ha id "spazio"
      var spaziomarginecontrollo = spazio.getBoundingClientRect();		
      //Il mio div ha id "colonna"
      var spaziomarginecontrollo2 = colonna.getBoundingClientRect();
      //La mia immagine ha id "sprite"
      var spritemarginecontrollo = sprite.getBoundingClientRect();

      if ( //qui guardo se tocca il tubo
        spaziomarginecontrollo2.top < spritemarginecontrollo.bottom &&
        spaziomarginecontrollo2.bottom > spritemarginecontrollo.top &&
        spaziomarginecontrollo2.left < spritemarginecontrollo.right &&
        spaziomarginecontrollo2.right > spritemarginecontrollo.left 
      ){
          if( //qui escludo che sia la parte dove può effettivamente passare
            spaziomarginecontrollo.top < spritemarginecontrollo.bottom &&
            spaziomarginecontrollo.bottom > spritemarginecontrollo.top &&
            spaziomarginecontrollo.left < spritemarginecontrollo.right &&
            spaziomarginecontrollo.right > spritemarginecontrollo.left
          ){
            //il gioco si conclude
            $("#spazioLudico").hide(); //toglie
		        $("#sprite").remove();
		        document.getElementById("perso").style.display = "block"; //visualizza
          }
      } 
}