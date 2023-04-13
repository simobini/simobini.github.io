

//-------------------------FUNZIONI E VARIABILI NECESSARIE------------------------

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

//-------------------------------------------------------------------------------------------------------------------
//------------------------FUNZIONI E VARIABILI NECESSARIE AL CORRETTO FUNZIONAMENTO DEL GIOCO------------------------
const campoGioco = document.getElementById("playPlace");
var varX, varY, serpX = 23, serpY = 10;
var direzX = 0, direzY = 0;
let codaSerpente = [];
var controlloIntervallo;

//con questa funzione posizioniamo il cibo in modo randomico
function posizioneCibo()
{
    ciboX = Math.floor(Math.random() * 30) + 1;
    ciboY = Math.floor(Math.random() * 30) + 1;
}

//funzione che crea il cibo del serpente
function posizioneCiboSerpente(){
 
    let posizioni = `<div class="serpentFood" style="grid-area: ${ciboY} / ${ciboX}"></div>`;    

    //controllo se il serprente ha colpito uno dei muri
    if(serpX<= 0 || serpX >= 30 || serpY <= 0 || serpY >= 30)
    {
        clearInterval(controlloIntervallo);
        alert("gioco finito!!!");
    }
    else
    {
        //aggiornamento della posizione del serprnte 
        serpX += direzX;
        serpY += direzY;
    }

    //controllo se il serpente sta sulla casella del cibo
    if(serpX === ciboX && serpY === ciboY)
    {
        posizioneCibo(); //creo un nuovo cibo in modo randomico sul campo
        codaSerpente.push([ciboX, ciboY]); //salvo la coda del serpente
        console.log("preso il cibo");
    }

    for(var i = codaSerpente.length - 1; i>0; i--)
    {
        codaSerpente[i] = codaSerpente[i - 1];
    }

    //posizioniamo il serpente nella casella voluta
    codaSerpente[0] = [serpX, serpY];

    

    for(var i=0; i< codaSerpente.length; i++)
    {
        posizioni += `<div class="serpentHead" style="grid-area: ${codaSerpente[i][1]} / ${codaSerpente[i][0]}"></div>`;
    }


    //creazione del campo di gioco
    campoGioco.innerHTML = posizioni;    
}

//attraverso una funzione genero randomicamente la posizione del cibo
posizioneCibo();

//posiziono il serpente e il cibo sull'area di gioco
controlloIntervallo = setInterval(posizioneCiboSerpente, 100);

//al click sul tasto il serpente si muoverà nella direzione voluta
document.onkeydown = muoviSerpente;

    function muoviSerpente(e)
    {
        if(e.key == "ArrowUp")
        {
            direzX = 0;
            direzY = -1;
        }

        if(e.key == "ArrowDown")
        {
            direzX = 0;
            direzY = 1;
        }

        if(e.key == "ArrowLeft")
        {
            direzX = -1;
            direzY = 0;
        }

        if(e.key == "ArrowRight")
        {
            direzX = 1;
            direzY = 0;
        }
        //eseguiamo la funzione per aggiornare la posizone del nostro serpente
        posizioneCiboSerpente();
    }