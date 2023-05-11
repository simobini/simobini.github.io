//Parte JavaScript
var colonna = document.getElementById("colonna");
var spazio = document.getElementById("spazio");
var sprite = document.getElementById("sprite");
var punti = 0;

spazio.addEventListener('animationiteration', () => {
    var random = -((Math.random()*300)+150);
    spazio.style.top = random + "px";
    punti = punti + 1;
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

    if (
        spaziomarginecontrollo.top < spritemarginecontrollo.bottom &&
        spaziomarginecontrollo.bottom > spritemarginecontrollo.top &&
        spaziomarginecontrollo.left < spritemarginecontrollo.right &&
        spaziomarginecontrollo.right > spritemarginecontrollo.left
      ) {
        //$("punti").text(punti);
        alert(punti);
      }
      else return false;
}