

//------------------------FUNZIONI E VARIABILI NECESSARIE------------------------

//dichiarazione variabili
var img = document.createElement("img");
var song = true;
let punteggio = 0;
var audioElement = document.createElement('audio');

//$(".game").hide();
setInterval(start, 3000);

function start(){
    $(".game").show();
    //$("div:first").hide();
}

//Funzione per mettere in pausa il gioco
$("#state").click(function(){
    alert("Gioco in pausa");
});

//Funzione per ricaricare il gioco
$("#restart").click(function(){
    if(confirm("Riavviare la partita?")) window.location.reload();
});

//Funzione per far partire la musica all'avvio del gioco
window.addEventListener("load", (event) => {
    audioElement.setAttribute('src', 'sounds/tetris.mp3');
    audioElement.play();
});

//Funzione per gestire la musica
audioElement.setAttribute('src', 'sounds/tetris.mp3');
$("#music").click(function(){
    if(song) {
        audioElement.pause();
        song = false;
      }
      else {
        audioElement.play();
        song = true;
      }
});

//------------------------FUNZIONI E VARIABILI NECESSARIE AL CORRETTO FUNZIONAMENTO DEL GIOCO------------------------
const campoGioco = document.getElementById("playPlace");
var varX, varY, serpX = 5, serpY = 10;
var direzX = 0, direzY = 0;
var codaSerpente = [];

function posizioneCibo()
{
    ciboX = Math.floor(Math.random() * 30) + 1;
    ciboY = Math.floor(Math.random() * 30) + 1;
}

//funzione che crea il cibo del serpente
function posizioneCiboSerpente(){
    
    serpX += direzX;
    serpY += direzY;

    let posizioni = `<div class="serpentFood" style="grid-area: ${ciboX} / ${ciboY}"></div>`;

    if(serpX === ciboX && serpY === ciboY)
    {
        posizioneCibo(); //creo un nuovo cibo in modo randomico sul campo
        codaSerpente.push([ciboX, ciboY]); //salvo la coda del serpente
    }

    posizioni += `<div class="serpentHead" style="grid-area: ${serpX} / ${serpY}"></div>`;

    campoGioco.innerHTML = posizioni;    
}

//attraverso una funzione genero randomicamente la posizione del cibo
posizioneCibo();

//posiziono il serpente e il cibo sull'area di gioco
setInterval(posizioneCiboSerpente, 200);



//al click sul tasto il serpente si muoverà nella direzione voluta
document.onkeydown = muoviSerpente;

    function muoviSerpente(e)
    {
        if(e.key == "ArrowUp")
        {
            direzX = -1;
            direzY = 0;
        }

        if(e.key == "ArrowDown")
        {
            direzX = 1;
            direzY = 0;
        }

        if(e.key == "ArrowLeft")
        {
            direzX = 0;
            direzY = -1;
        }

        if(e.key == "ArrowRight")
        {
            direzX = 0;
            direzY = 1;
        }
        //eseguiamo la funzione per aggiornare la posizone del nostro serpente
        posizioneCiboSerpente();
    }










