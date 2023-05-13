//Parte jQuery
var y = 70; //altezza del personaggio
var x = 30; //distanza dal bordo del personaggio
var start = false; //inizializzo a true così da iniziare subito

$(document).ready(function(){
        $("#perso").hide();  //scritta Game Over
        $("#sprite").attr("src", "images/flappybird/sprite.png");
        $("#sprite").show(); //personaggio
        setInterval(gravita, 700);
	    function gravita(){ //mi muovo giù
	    	$("#sprite").attr("src", "images/flappybird/sprite2.png");
		    y = controlloMargineSotto(y);
		    $("#sprite").animate({top: y +'%', left: x + '%'}, function(){;
			    $("#sprite").attr("src", "images/flappybird/sprite.png");
		    }); 
			collisione();
	    }
         $("#spazioLudico").click(function(){ //mi muovo su
		    y = controlloMargineSopra(y);
		    $("#sprite").attr("src", "images/flappybird/sprite2.png");
		    $("#sprite").animate({top: y +'%'}); //mi muovo su
			collisione();
	    });
});