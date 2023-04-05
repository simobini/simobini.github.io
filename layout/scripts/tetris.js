const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const EPunteggio = document.getElementById("punteggio");

const RIG= 20;
const COL= 10;
const SQ = 20;
const SV = "white";
const Pezzi = [
    [Z,"red"],
    [S,"green"],
    [T,"yellow"],
    [O,"blue"],
    [L,"purple"],
    [I,"cyan"],
    [J,"orange"]
];
//Le costanti RIG, COL, SQ e SV definiscono il numero di righe e colonne del tetris, la dimensione dei quadrati e il colore di sfondo, mentre Pezzi definisce il colore delle forme.

var img = document.createElement("img");
var song = true;
let punteggio = 0;
var sottofondo = document.createElement('audio');
var perso = document.createElement('audio');
//dichiarazione variabili

$(".game").hide();
setInterval(start, 2000);
function start(){
    $(".game").show();
    $("div:first").hide();
}
//Funzione per cambiare tra la loading bar e far iniziare il gioco

function disegnaQuad(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}
//La funzione disegnaQuad utilizza il contesto 2D ctx per disegnare un quadrato del colore specificato nelle coordinate (x*SQ, y*SQ) con dimensioni SQ x SQ. Inoltre, disegna un bordo nero intorno al quadrato utilizzando il metodo strokeRect.

let tabella = [];
for( r = 0; r <RIG; r++){
    tabella[r] = [];
    for(c = 0; c < COL; c++){
        tabella[r][c] = SV;
    }
}

function disegnaTab(){
    for( r = 0; r <RIG; r++){
        for(c = 0; c < COL; c++){
            disegnaQuad(c,r,tabella[r][c]);
        }
    }
}

disegnaTab();
/*La funzione disegnaTab utilizza il metodo disegnaQuad definito in precedenza per disegnare ogni quadrato nella tabella. 
Scorre attraverso la tabella utilizzando due cicli for annidati, uno per le righe e uno per le colonne. 
Ad ogni iterazione, chiama la funzione disegnaQuad per disegnare il quadrato nella posizione specificata dalle variabili r e c con il colore specificato nell'array tabella[r][c].*/

function PezziRandom(){
    let r = randomN = Math.floor(Math.random() * Pezzi.length) // 0 -> 6
    return new Pezzo( Pezzi[r][0],Pezzi[r][1]);
}

let p = PezziRandom();
/*La funzione "PezziRandom()" genera un numero casuale che viene utilizzato per selezionare casualmente un elemento all'interno dell'array. 
Questo elemento viene quindi passato come argomento alla funzione "Pezzo(tetramino, color)" per creare un nuovo oggetto "Pezzo".*/


function Pezzo(tetramino,color){
    this.tetramino = tetramino;
    this.color = color;
    
    this.tetraminoN = 0; 
    this.TetraminoAttivo = this.tetramino[this.tetraminoN];

    this.x = 3;
    this.y = -2;
    //posizione assoluta
}
//La funzione 'Pezzo' viene utilizzata per creare un nuovo oggetto tetramino.

Pezzo.prototype.riempi = function(color){
    for( r = 0; r < this.TetraminoAttivo.length; r++){
        for(c = 0; c < this.TetraminoAttivo.length; c++){
            if( this.TetraminoAttivo[r][c]){
                disegnaQuad(this.x + c,this.y + r, color);
            }
        }
    }
}
//Il metodo 'riempi' viene utilizzata  viene utilizzato per disegnare il tetramino sul tabellone di gioco controllando che lo stesso tabellone non sia già occupato da altri elementi.

Pezzo.prototype.disegna = function(){
    this.riempi(this.color);
}
//La funzione disegna usa il metodo riempi per disegnare il tetramino con il colore corrente.

Pezzo.prototype.cancella = function(){
    this.riempi(SV);
}
//La funzione cancella invece riempie i quadrati dell'area di gioco con il colore di SV, cancellando così il tetramino precedentemente disegnato.

Pezzo.prototype.muoviGiu = function(){
    if(!this.collisione(0,1,this.TetraminoAttivo)){
        this.cancella();
        this.y++;
        this.disegna();
    }else{
        this.blocca();
        p = PezziRandom();
    }
    
}
//

Pezzo.prototype.muoviDestra = function(){
    if(!this.collisione(1,0,this.TetraminoAttivo)){
        this.cancella();
        this.x++;
        this.disegna();
    }
}
//

Pezzo.prototype.muoviSinistra = function(){
    if(!this.collisione(-1,0,this.TetraminoAttivo)){
        this.cancella();
        this.x--;
        this.disegna();
    }
} 
//

Pezzo.prototype.ruota = function(){
    let prossimoPezzo = this.tetramino[(this.tetraminoN + 1)%this.tetramino.length];
    let sposta = 0;
    
    if(this.collisione(0,0,prossimoPezzo)){
        if(this.x > COL/2){

            sposta = -1;
        }else{
            sposta = 1;
        }
    }
    
    if(!this.collisione(sposta,0,prossimoPezzo)){
        this.cancella();
        this.x += sposta;
        this.tetraminoN = (this.tetraminoN + 1)%this.tetramino.length; 
        this.TetraminoAttivo = this.tetramino[this.tetraminoN];
        this.disegna();
    }
}
/*Queste 3 funzioni permettono di muovere l'oggetto Pezzo e controllano anche la presenza di collisioni utilizzando la funzione collisione e, 
se non ci sono collisioni, spostano l'oggetto e ridisegnano il tetramino con la nuova posizione utilizzando le funzioni cancella e disegna. 
Se invece c'è una collisione, la funzione blocca viene chiamata per bloccare l'oggetto nella posizione corrente e viene generato un nuovo oggetto Pezzo casuale utilizzando la funzione PezziRandom.*/

Pezzo.prototype.tuttogiu = function(){
    while(!this.collisione(0,1,this.TetraminoAttivo)){
        this.cancella();
        this.y++;
        this.disegna();
    }
}
//Funzione per far scendere velocemente il tetramino. 

Pezzo.prototype.blocca = function(){
    for( r = 0; r < this.TetraminoAttivo.length; r++){
        for(c = 0; c < this.TetraminoAttivo.length; c++){

            if( !this.TetraminoAttivo[r][c]){
                continue;
            }

            if(this.y + r < 0){
                $("canvas").remove();
                img.src = "images/tetris/gameover.png"; 
                var src = document.getElementById("gameover");
                src.appendChild(img);
                perso.setAttribute('src', 'sounds/gameover.mp3');
                perso.play();
                sottofondo.pause();
                $("img:first").css("margin-top","180px");
                EPunteggio.style.marginTop = -170 + "px";
                gameOver = true;
                break;
            }
            tabella[this.y+r][this.x+c] = this.color;
        }
    }
    for(r = 0; r < RIG; r++){
        let RigaPiena = true;
        for( c = 0; c < COL; c++){
            RigaPiena = RigaPiena && (tabella[r][c] != SV);
        }
        if(RigaPiena){
            for( y = r; y > 1; y--){
                for( c = 0; c < COL; c++){
                    tabella[y][c] = tabella[y-1][c];
                }
            }
            for( c = 0; c < COL; c++){
                tabella[0][c] = SV;
            }
            punteggio += 10;
        }
    }
    disegnaTab();
    EPunteggio.innerHTML = punteggio;
}
/*La funzione 'blocca()' viene chiamata quando il pezzo corrente si è bloccato sul fondo del gioco o ha raggiunto un altro pezzo già posizionato. 
La funzione ha il compito di aggiungere il colore del pezzo alla matrice di gioco tabella e controllare se una riga è stata completata e quindi eliminata, 
quando una riga viene eliminata, il punteggio del giocatore viene aumentato di 10 punti.*/

Pezzo.prototype.collisione = function(x,y,pezzo){
    for( r = 0; r < pezzo.length; r++){
        for(c = 0; c < pezzo.length; c++){
            if(!pezzo[r][c]){
                continue;
            }
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            
            if(newX < 0 || newX >= COL || newY >= RIG){
                return true;
            }

            if(newY < 0){
                continue;
            }

            if( tabella[newY][newX] != SV){
                return true;
            }
        }
    }
    return false;
}
/*Questa è la funzione che viene utilizzata per controllare se il pezzo si scontra con un altro pezzo o con i bordi del campo di gioco. 
I parametri x,y,pezzo che corrispondono rispettivamente alla posizione orizzontale e verticale del Pezzo e l'ultimo corrisponde al pezzo che si vuole controllare*/

document.addEventListener("keydown",CONTROLLA);

function CONTROLLA(event){
    if(event.keyCode == 37){
        p.muoviSinistra();
        CP = Date.now();
    }else if(event.keyCode == 38){
        p.ruota();
        CP = Date.now();
    }else if(event.keyCode == 39){
        p.muoviDestra();
        CP = Date.now();
    }else if(event.keyCode == 40){
        p.muoviGiu();
    }
    else if(event.keyCode == 32){
        p.muoviGiu();  
        p.tuttogiu();
    }
}
/*La funzione CONTROLLA è aggiunta come listener dell'evento keydown, ovvero l'evento generato quando si preme un tasto sulla tastiera. 
La funzione gestisce l'evento e chiama i metodi della tessera p per il movimento a sinistra (muoviSinistra), a destra (muoviDestra) e la rotazione (ruota). 
Se viene premuto il tasto giù (keyCode == 40), la tessera viene fatta scendere di una posizione con il metodo muoviGiu.*/

let CP = Date.now();
let gameOver = false;
function rilascia(){
    let now = Date.now();
    let delta = now - CP;
    if(delta > 1000){
        p.muoviGiu();
        CP = Date.now();
    }
    if(!gameOver){
        requestAnimationFrame(rilascia);
    }
}

rilascia();
/*La funzione rilascia viene chiamata una volta all'inizio del gioco e poi si autogestisce richiamando se stessa tramite requestAnimationFrame ogni volta che il gioco non è ancora terminato.*/

$("#state").click(function(){
    sottofondo.pause();
    alert("Gioco in pausa");
    sottofondo.play();
});
//Funzione per mettere in pausa il gioco

$("#restart").click(function(){
    sottofondo.pause();
    if(confirm("Riavviare la partita?")) {
        window.location.reload();
    }
    else sottofondo.play();
});
//Funzione per ricaricare il gioco

$("#home").click(function(){
    sottofondo.pause();
    if(confirm("Tornare alla pagina principale?")) {
        $(window).prop("location", "index.html");
    }
    else sottofondo.play(); 
});
//Funzione per tornare alla home

/*window.addEventListener("load", (event) => {
    sottofondo.setAttribute('src', 'sounds/tetris.mp3');
    sottofondo.play();
});
//Funzione per far partire la musica all'avvio del gioco*/

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
//Funzione per gestire la musica
