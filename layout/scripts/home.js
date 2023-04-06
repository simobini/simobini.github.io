$(document).ready(function(){

  $("#nintendo").hide();

  $(".menu-item").hover(
    function() {
      $(this).animate({"margin-bottom": "140px"}, 300); // Alza l'immagine
    },

    function() {
      $(this).animate({"margin-bottom": "10px"}, 300); // Abbassa l'immagine
    }
  );

  $("div.menu-item").click(function(){
    if($(this).is(":first-child")) {
      $(this).css("margin-top", "-480px");
      $("p:first").hide("medium");
      $("#nintendo").fadeIn("slow");
      $("div.menu-item:nth-child(2)").hide("medium");
      $("div.menu-item:nth-child(3)").hide("medium");
      $(this).animate({"margin-top": "10px"}, 2000, function(){
      $(window).prop("location", "tetris.html");
      });
    }
    else if($(this).is(":nth-child(2)")) {
      $(this).css("margin-top", "-480px");
      $("p:nth-child(2)").hide("medium");
      $("#nintendo").fadeIn("slow");
      $("div.menu-item:first-child").hide("medium");
      $("div.menu-item:nth-child(3)").hide("medium");
      $(this).animate({"margin-top": "10px"}, 2000, function(){
      $(window).prop("location", "flappybird.html");
      });
    }
    else if($(this).is(":nth-child(3)")) {
      $(this).css("margin-top", "-480px");
      $("p:last").hide("medium");
      $("#nintendo").fadeIn("slow");
      $("div.menu-item:first-child").hide("medium");
      $("div.menu-item:nth-child(2)").hide("medium");
      $(this).animate({"margin-top": "10px"}, 2000, function(){
      $(window).prop("location", "snake.html");
      });
    }
  });
  
});
