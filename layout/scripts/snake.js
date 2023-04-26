//---------------------------------------------------------------------------------------
//-----------------------------COSTANTI E VARIABILI RIGUARDANTE IL GIOCO
let inputDir = {x: 0, y: 0}; 
var spazioMax = 20;
let puntAttuale = 0;
let lastPaintTime = 0;
var controlloIntervallo;
food = {x: 6, y: 7};
let snakeArr = [
    {x: 13, y: 15}
];

//---------------------------------------------------------------------------------------
//-----------------------------FUNZIONI RIGUARDANTI IL GIOCO-----------------------------

/*
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
*/
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            document.getElementById("bestPunt").innerHTML = puntAttuale;
            document.getElementById("puntNow").innerHTML = 0;
            puntAttuale = 0;
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 20 || snake[0].x <=0 || snake[0].y >= 20 || snake[0].y <=0){
        document.getElementById("bestPunt").innerHTML = puntAttuale;
        document.getElementById("puntNow").innerHTML = 0;
        puntAttuale = 0;
        return true;
    }
        
    return false;
}


function randomPosizioneCibo()
{
    food.x = Math.floor(Math.random() * 20) + 1;
    food.y = Math.floor(Math.random() * 20) + 1
}


function gameEngine(){
    // Part 1: Updating the snake array & Food
    
    if(isCollide(snakeArr)){
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        score = 0; 
    }
    

    //controllo se si ha mangiato un frutto
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        
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

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //visualizzazione cibo iniziale
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

//window.requestAnimationFrame(main);
//premendo uno dei 4 tasti il serpente si muoverà nella direzione voluta, non potr
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
        //eseguiamo la funzione per aggiornare la posizone del nostro serpente
        gameEngine();
    }

    controlloIntervallo = setInterval(gameEngine, 1500/10);
