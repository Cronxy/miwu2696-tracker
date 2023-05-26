$(document).ready( function(){
    // Animate CSS effects by Daniel Eden: https://github.com/daneden/animate.css

    $("#west .content").click( function() {
      $("#west-overlay").addClass("animated fadeInLeft open").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass("animated fadeInLeft");
      });
      $("#west-overlay .product-content").addClass("animated flipInY ").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass("animated flipInY");
      }); 
    });
    $("#west-overlay .close-icon").click( function() {
        $("#west-overlay").addClass("animated flipOutY ").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass("animated flipOutY open");
        }); 
    });
    $("#east .content").click( function() {
      $("#east-overlay").addClass("animated fadeInRight open").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("animated fadeInRight");
      }); 
      $("#east-overlay .product-content").addClass("animated flipInY ").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass("animated flipInY");
       }); 
    });
    $("#east-overlay .close-icon").click( function() {
      $("#east-overlay").addClass("animated flipOutY ").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("animated flipOutY open");
      });     
    });
    
    // hidden search bar function
    document.getElementById('searchBar').addEventListener('keyup', function() {
      var searchQuery = this.value.toLowerCase();
      var allText = document.body.innerText.toLowerCase();
      var resultsDiv = document.getElementById('results');
  
      if(searchQuery.length > 2) {
        var regex = new RegExp("\\b" + searchQuery + "\\b", "g");
        var matches = allText.match(regex);
  
        if(matches) {
          resultsDiv.innerHTML = "Number of matches: " + matches.length;
        } else {
          resultsDiv.innerHTML = "😞 Oops! Seems the music elves couldn't find any matches.";
        }
      } else {
        resultsDiv.innerHTML = "";
      }
    });
  
    document.getElementById('searchIcon').addEventListener('click', function() {
      var searchBar = document.getElementById('searchBar');
      if(searchBar.classList.contains('hidden')) {
        searchBar.classList.remove('hidden');
      } else {
        searchBar.classList.add('hidden');
      }
    });
  });