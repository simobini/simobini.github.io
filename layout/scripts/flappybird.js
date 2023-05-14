var colonna = document.getElementById("colonna");
var spazio = document.getElementById("spazio");
var sprite = document.getElementById("sprite");
var song = true; // variabile settata a true perché la musica parte subito
var sottofondo = document.createElement('audio'); // musica di sottofondo
var perso = document.createElement('audio'); // effetto audio gameover
var mov = document.createElement('audio'); // effetto audio movimento
var punteggioFlappy = 0;
var punteggioMiglioreFlappy = parseInt(localStorage.getItem("punteggioMiglioreFlappy")) || 0;
const EPunteggioFlappy = document.getElementById("punteggioFlappy");
const MPunteggioFlappy = document.getElementById("punteggioMiglioreFlappy");
MPunteggioFlappy.innerHTML = punteggioMiglioreFlappy;
$(".game").hide();
setInterval(start, 2000);

// Funzione per cambiare tra la loading bar e far iniziare il gioco
function start() {
  $(".game").show();
  $("div:first").hide();
}

// Aggiunge l'evento 'animationiteration' per gestire il movimento dello spazio
spazio.addEventListener('animationiteration', () => {
  var random = -((Math.random() * 300) + 150);
  while (random > -200) { //così non da valori troppo bassi
    random = -((Math.random() * 400) + 30);
  }
  spazio.style.top = random + "px";
});

// Funzione per controllare il margine superiore quando il personaggio salta
function controlloMargineSopra(y) {
  if ((y - 11) < 10) return y; // non mi fa più salire
  else {
    y = y - 11;
    return y;
  }
}

// Funzione per controllare il margine inferiore quando il personaggio scende
function controlloMargineSotto(y) {
  if ((y + 5) > 83) { // qui perdi
    sottofondo.pause();
    $("#title").css("margin-top", "275px");
    $("#spazioLudico").remove(); // toglie
    $("#sprite").remove();
    document.getElementById("perso").style.display = "block"; // visualizza
  } else { // aggiunge la gravità
    y = y + 5;
    return y;
  }
}

var punteggioFlappy = 0;
var punteggioMiglioreFlappy = localStorage.getItem("punteggioMiglioreFlappy") || 0;

function collisione() {
  var spaziomarginecontrollo = spazio.getBoundingClientRect(); // div ha id "spazio" 
  var spritemarginecontrollo = sprite.getBoundingClientRect(); // immagine ha id "sprite"
  var spaziomarginecontrollo2 = colonna.getBoundingClientRect(); // div ha id "colonna"

  // Controllo se il personaggio passa attraverso lo spazio
  if (
    spaziomarginecontrollo.top < spritemarginecontrollo.bottom &&
    spaziomarginecontrollo.bottom > spritemarginecontrollo.top &&
    spaziomarginecontrollo.left < spritemarginecontrollo.right &&
    spaziomarginecontrollo.right > spritemarginecontrollo.left
  ) {
    punteggioFlappy += 1;
    EPunteggioFlappy.innerHTML = punteggioFlappy;
    MPunteggioFlappy.innerHTML = punteggioMiglioreFlappy;
    if (punteggioFlappy > punteggioMiglioreFlappy) {
      punteggioMiglioreFlappy = punteggioFlappy;
      localStorage.setItem("punteggioMiglioreFlappy", punteggioMiglioreFlappy);
    }
  } else if ( // Controllo se il personaggio collide con la colonna
    spaziomarginecontrollo2.top < spritemarginecontrollo.bottom &&
    spaziomarginecontrollo2.bottom > spritemarginecontrollo.top &&
    spaziomarginecontrollo2.left < spritemarginecontrollo.right &&
    spaziomarginecontrollo2.right > spritemarginecontrollo.left
  ) {
    // Sbarra che cade
    $("#sbarrachecade").get(0).volume = 0.1;
    $("#sbarrachecade")[0].pause();
    $("#sbarrachecade")[0].play();
    $("#title").css("margin-top", "275px");
    $("#spazioLudico").remove();
    $("#sprite").remove();
    document.getElementById("perso").style.display = "block"; // visualizza
  }
}

var y = 70; // altezza del personaggio
var x = 30; // distanza dal bordo del personaggio

$(document).ready(function() {
  setTimeout(function() {
    $("#perso").hide(); // scritta Game Over
    $("#sprite").attr("src", "images/flappybird/sprite.png");
    $("#sprite").show(); // personaggio
    setInterval(gravita, 700);

    function gravita() { // mi muovo giù
      $("#sprite").attr("src", "images/flappybird/sprite2.png");
      y = controlloMargineSotto(y);

      $("#sprite").animate({ top: y + '%', left: x + '%' }, function() {
        $("#sprite").attr("src", "images/flappybird/sprite.png");
      });

      collisione();
    }

$("#spazioLudico").click(function(){ //mi muovo su
      y = controlloMargineSopra(y);
      //ala
      $("#flap").get(0).volume = 0.1;
      $("#flap")[0].pause();
      $("#flap")[0].play();
      $("#sprite").attr("src", "images/flappybird/sprite2.png");
      $("#sprite").animate({top: y +'%'}); //mi muovo su
      collisione();
    });
  }, 2000);

});

$("#state").click(function(){
  sottofondo.pause();
  alert("Gioco in pausa");
  sottofondo.play();
});
//Funzione per mettere in pausa la partita

$("#restart").click(function(){
  sottofondo.pause();
  if(confirm("Riavviare la partita?")) {
    localStorage.setItem("punteggioMiglioreFlappy", punteggioMiglioreFlappy);
    window.location.reload();
  }
  else sottofondo.play();
});
//Funzione per riavviare la partita

$("#home").click(function(){
  sottofondo.pause();
  if(confirm("Tornare alla pagina principale?")) {
    localStorage.setItem("punteggioMiglioreFlappy", punteggioMiglioreFlappy);
    $(window).prop("location", "index.html");
  }
  else sottofondo.play(); 
});
//Funzione per tornare alla pagina principale

window.addEventListener("load", (event) => {
  setTimeout(function() {
      sottofondo.setAttribute('src', 'sounds/flappybird/themesound.mp3');
      sottofondo.volume = 0.1;
      sottofondo.play();
  }, 2000);
});
//Funzione per riprodurre la musica di sottofondo

window.onblur = function() {
  sottofondo.pause();
}
//Funzione per mettere in pausa la musica quando si cambia scheda

window.onfocus = function() {
  sottofondo.play();
}
//Funzione per riprodurre la musica quando si ritorna alla scheda

$("#music").click(function(){
  if(song) {
      sottofondo.pause();
      song = false;
    }
    else {
      sottofondo.play();
      song = true;
    }
});
//Funzione per mettere in pausa e riprendere la musica

document.addEventListener("keydown", function(event) {
  if(event.key === "+"){
      sottofondo.volume += 0.1;
  }
  else if(event.key === "-"){
      sottofondo.volume -= 0.1;
  }
});
//Funzione per aumentare e diminuire il volume della musica
