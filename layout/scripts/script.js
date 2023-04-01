var images = ["images/common/pause.png", "images/common/play.png"];
var i = 0;
var song = true;
var audioElement = document.createElement('audio');

$(document).ready(function(){

  $("div").hover(
    function() {
      $(this).animate({"margin-bottom": "150px"}, 300); // Alza l'immagine
    },

    function() {
      $(this).animate({"margin-bottom": "0px"}, 300); // Abbassa l'immagine
    }
  );

  $("#state").click(function(){
    i++;
    if(i >= images.length) i=0;
    $("#state").attr("src",images[i]);

    if(song) {
      audioElement.pause();
      song = false;
    }
    else {
      audioElement.play();
      song = true;
    }
    
  });
});

window.addEventListener("load", (event) => {
  audioElement.setAttribute('src', 'sounds/menu.mp3');
  audioElement.play();
});
