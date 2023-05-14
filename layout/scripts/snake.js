// Costanti e variabili riguardanti il gioco
const inputDir = {x: 0, y: 0};
const spazioMax = 20;
let puntAttuale = 0;
let lastPaintTime = 0;
let controlloIntervallo;
let contatoreXControllo = 0;
let puntMigliore = 0;
let numeroXlocal = 0;

// Elementi audio
const suonoCibo = document.createElement('audio');
const gameOver = document.createElement('audio');
const movimentoSerpente = document.createElement('audio');
const musicaBackground = document.createElement('audio');
const audioElement = document.createElement('audio');

// Elementi HTML
const img = document.createElement("img");

// Variabili di gioco
let punteggio = 0;

//posizioniamo sia il cibo che il serpente
let snakeArr = [
  {x: 13, y: 15}
];
let food = {x: 6, y: 7};


$(".game").hide();
$(".gioco").hide();
$("#board").hide();
$(".visuaPunteggio").hide();
setInterval(start, 2000);
function start(){
    $(".game").show();
    $(".gioco").show();
    $("#board").show();
    $(".visuaPunteggio").show();
    $("div:first").hide();
}
//Funzione per cambiare tra la loading bar e far iniziare il gioco

function isCollide(snake) {
    //se ti colpisci dasolo
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === ((snake[0].x)+inputDir.x) && snake[i].y === ((snake[0].y)+inputDir.y)){             
            //musica di qunado perdiamo
            gameOver.setAttribute('src', 'sounds/snake/gameover.mp3');
            gameOver.play();
            //aggiornamento del punteggio
            document.getElementById("bestPunt").innerHTML = puntAttuale;
            document.getElementById("puntNow").innerHTML = 0;
            puntAttuale = 0;
            return true;
        }
    }
    //se vai contro ai bordi della board
    if(((snake[0].x)+inputDir.x) > 20 || ((snake[0].x)+inputDir.x) <=0 || ((snake[0].y)+inputDir.y) > 20 || ((snake[0].y)+inputDir.y) <=0){
        //musica di qunado perdiamo
        gameOver.setAttribute('src', 'sounds/snake/gameover.mp3');
        movimentoSerpente.pause();
        musicaBackground.pause();
        gameOver.play();
        //aggiornamento del punteggio
        document.getElementById("bestPunt").innerHTML = puntAttuale;
        document.getElementById("puntNow").innerHTML = 0;
        puntAttuale = 0;
        return true;
    }
    return false;
}
//Controllo se il serpente ha colpito sestesso o uno dei bordi

function randomPosizioneCibo()
{
    food.x = Math.floor(Math.random() * 20) + 1;
    food.y = Math.floor(Math.random() * 20) + 1
}
//Funzione che mi da le coordinate della posizione successiva del cibo


function mostraMessaggio()
{
    var mess = document.getElementById("messaggio");
    mess.style.display = 'block';
}
//Funzione che mostra il div del messaggio

function nascondiMessaggio()
{
    var mess = document.getElementById("messaggio");
    mess.style.display = 'none';
}

function premiINVIO()
{
    document.addEventListener('keypress', function(event) {
        // Controlla se il tasto premuto è il tasto Invio
        if(event.key === 'Enter') {
            nascondiMessaggio();
            snakeArr = [{x: 13, y: 15}]; //riposiziono il serpente nella casella 13, 15
            score = 0;
            return true;
        }
        return false;
      });
}

//---------------------------------------------------------------------------------------------
//--------------------FUNZIONE CHE REGOLA E GESTISCE TUTTO IL GIOCO----------------------------
function gameEngine(){   
    //messaggio che appare se il serpente si è copito dasolo o ha sbattuto contro un bordo
    if(isCollide(snakeArr)){
        inputDir = {x: 0, y: 0}; //aggiorno a 0 sia le direzioni x e y del serpente così non si muove        
        mostraMessaggio(); //faccio apparire il div che mi chiede se voglio continuare a giocare

        if(premiINVIO()===false) premiINVIO(); //il giocatore deve premere perforza il tasto INVIO per continuare la partita

        snakeArr = [{x: 13, y: 15}]; //riposiziono il serpente nella casella 13, 15
        score = 0;
    }
    
    //controllo se si ha mangiato un frutto
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        suonoCibo.setAttribute('src', 'sounds/snake/food.mp3');
        suonoCibo.play();
        puntAttuale++; //incremento del nostro punteggio attuale
        document.getElementById("puntNow").innerHTML = puntAttuale; //visualizzazione del punteggio attuale
        
        //aggiunta di 1 nella coda del serpente
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        randomPosizioneCibo(); //eseguiamo per la posizione randomica del prossimo frutto
    }

    //funzione che serve per il movimento di tutto il serpente senza lasciare spazi tra i quadrati
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    //aggiornamento della posizione della testa del serpente nella direzione scelta con il tasto non potrà andare nella direzione opposta rispetto a quella in cui sta andando
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //visualizzazione serpente
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{

        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        //scelta per aggiungere la classe giusta all'elemento --> snakeElement
        if(index === 0) snakeElement.classList.add('head'); //aggiunta della classe head
        else snakeElement.classList.add('snake'); //aggiunta della classe snake

        board.appendChild(snakeElement);
        
    });

    //visualizzazione cibo iniziale
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
    
}

//premendo uno dei 4 tasti il serpente si muoverà nella direzione voluta
const rotazione = document.getElementsByClassName("head");

document.onkeydown = muoviSerpente;

function muoviSerpente(e)
{
    if(e.key == "ArrowUp" && inputDir.y != 1)
    {
        inputDir.x = 0;
        inputDir.y = -1;
    }

    if(e.key == "ArrowDown" && inputDir.y != -1)
    {
        inputDir.x = 0;
        inputDir.y = 1;
    }

    if(e.key == "ArrowLeft" && inputDir.x != 1)
    {
        inputDir.x = -1;
        inputDir.y = 0;
    }

    if(e.key == "ArrowRight" && inputDir.x != -1)
    {
        inputDir.x = 1;
        inputDir.y = 0;
    }

    gameEngine();
}

controlloIntervallo = setInterval(gameEngine, 1500/10);

$("#home").click(function(){
    musicaBackground.pause();
    if(confirm("Tornare alla pagina principale?")) {
        $(window).prop("location", "index.html");
    }
    else musicaBackground.play(); 
});
//Funzione per tornare alla pagina principale

$("#music").click(function(){
    if(song) {
        musicaBackground.pause();
        song = false;
      }
      else {
        musicaBackground.play();
        song = true;
      }
});
//Funzione per mettere in pausa e riprendere la musica

document.addEventListener("keydown", function(event) {
    if(event.key === "+"){
        musicaBackground.volume += 0.1;
    }
    else if(event.key === "-"){
        musicaBackground.volume -= 0.1;
    }
});
//Funzione per aumentare e diminuire il volume della musica

window.onblur = function() {
    musicaBackground.pause();
    movimentoSerpente.setAttribute('src', '');
}
//Funzione per mettere in pausa la musica quando si cambia scheda
    
window.onfocus = function() {
    musicaBackground.play();
    movimentoSerpente.setAttribute('src', 'sounds/snake/movimentoSerpente.mp3');
}
//Funzione per riprodurre la musica quando si ritorna alla scheda

window.addEventListener("load", (event) => {
    setTimeout(function() {
        musicaBackground.setAttribute('src', 'sounds/snake/SoundTrack.mp3');
        musicaBackground.volume = 0.1;
        musicaBackground.play();
    }, 2000);
});
//Funzione per far partire la musica di sottofondo

//Funzione per mettere in pausa il gioco
$("#state").click(function(){
    alert("Gioco in pausa");
});

//Funzione per ricaricare il gioco
$("#restart").click(function(){
    if(confirm("Riavviare la partita?")) window.location.reload();
});