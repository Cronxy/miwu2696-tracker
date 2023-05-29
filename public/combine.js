// landing page animation effects, animation code referencing by Daniel Eden: https://github.com/daneden/animate.css
$(document).ready( function(){
    
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

  // DOM elements for targeting each user input fields
document.getElementById("artistName").addEventListener("input", (event) => {
    let query = event.target.value;
    if(query.trim() !== '') {
      searchMusicBrainz("artist", query);
    }
  });
  
  document.getElementById("albumName").addEventListener("input", (event) => {
    let query = event.target.value;
    if(query.trim() !== '') {
      searchMusicBrainz("release", query);
    }
  });
  
  document.getElementById("newAlbumForm").addEventListener("submit", function (e) {
    e.preventDefault();

    //   chechking if the duration user input if valid 
      var minutes = document.getElementById("durationMin").value;
      var seconds = document.getElementById("durationSec").value;
      if (seconds > 59) {
          alert("⏰ Seconds should be less than 60.");
          return false;
      }

      //   chechking if the release year user input if valid 
      var releaseYear = document.getElementById("releaseYear").value;
      var currentYear = new Date().getFullYear();
      if (releaseYear > currentYear) {
          alert("😳⚠️Oooops ERROR! Release Year should not be in the future.");
          return false;
      }

      const album = {
        id: new Date().getTime().toString(),
        dateAdded: new Date().toLocaleString(),
        name: document.getElementById("albumName").value,
        artist: document.getElementById("artistName").value,
        releaseYear: document.getElementById("releaseYear").value,
        genre: document.getElementById("genre").value,
        duration: minutes + " min " + seconds + " sec",
        imageURL: "./genre_pics/" + document.getElementById("genre").value.toLowerCase() + ".png",
        userRating: document.querySelector('input[name="rating"]:checked').value,
        userComment: document.getElementById("userComment").value,
    };

      // Save album to local storage
    let albums = localStorage.getItem("albums");
    if (albums) {
        albums = JSON.parse(albums);
    } else {
        albums = [];
    }
    albums.push(album);
    localStorage.setItem("albums", JSON.stringify(albums));
    console.log(album);

    // Success message
    alert("Album successfully added!");

    // Clear form after user submitting
    document.getElementById("newAlbumForm").reset();
});

// Load albums from local storage when page is loaded
window.addEventListener("DOMContentLoaded", (event) => {
  let albums = localStorage.getItem("albums");
  if (albums) {
      albums = JSON.parse(albums);
      let albumList = document.getElementById("albumList");
      for (let i = 0; i < albums.length; i++) {
          let albumDiv = document.createElement("div");
          albumDiv.textContent = "Album: " + albums[i].name + ", Artist: " + albums[i].artist;
          albumList.appendChild(albumDiv);
      }
  }
});


// event listener for monitoring user submission
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  var album = {
      name: document.getElementById("albumName").value,
      artist: document.getElementById("artistName").value,
      genre: document.getElementById("genre").value,
      releaseYear: document.getElementById("releaseYear").value,
      userRating: document.querySelector('input[name="rating"]:checked').value,
    
    
  };

  var albumList = document.querySelector('#albumList');
  albumList.appendChild(createAlbumCard(album));
  
  document.querySelector('form').reset();
});

window.addEventListener("DOMContentLoaded", (event) => {
let albums = localStorage.getItem("albums");
if (albums) {
  albums = JSON.parse(albums);
  let albumList = document.getElementById("albumList");
  for (let i = 0; i < albums.length; i++) {
      albumList.appendChild(createAlbumCard(albums[i]));
  }
}
});



// fx for generating album list card
function createAlbumCard(album) {
  var card = document.createElement("div");
  card.className = "album-card";

  var deleteCheckbox = document.createElement("input");
  deleteCheckbox.type = "checkbox";
  deleteCheckbox.className = "delete-checkbox";
  // deleteCheckbox.style.display = "none";
  card.appendChild(deleteCheckbox);

// delete button styling
var deleteButton = document.createElement("button");
deleteButton.type = "button";
  deleteButton.textContent = "🗑️ DELETE";
  deleteButton.style.color = "red"
  deleteButton.style.backgroundColor = "#161719"
  deleteButton.style.display = "none"; // hide the delete button initially
  card.appendChild(deleteButton);

  // checkbox checked triggers delete button
  deleteCheckbox.addEventListener('change', function() {
    if(deleteCheckbox.checked) {
      deleteButton.style.display = "block";
    } else {
      deleteButton.style.display = "none";
    }
  });

  // get albums from local storage
  deleteButton.addEventListener('click', function() {
    let albums = localStorage.getItem('albums');
    if (albums) {
        albums = JSON.parse(albums);
    } else {
        albums = [];
    }
  
    // find album in list by id
    var index = albums.findIndex(function(item) {
      return item.id === album.id;
    });
  
    if (index > -1) {
      // remove album from list
      albums.splice(index, 1);
  
      // update local storage
      localStorage.setItem('albums', JSON.stringify(albums));
  
      // remove card from DOM
      card.remove();
      alert("💿🎧Goodbye! This album has hit the road, but there will always have the memories.");
    }
  });

  var cover = document.createElement("div");
  cover.className = "album-cover";

  // default version of list album content
  var img = document.createElement("img");
  img.src = album.imageURL;
  img.alt = "Album Art";
  cover.appendChild(img);

  var details = document.createElement("div");
  details.className = "album-details";

  var title = document.createElement("h3");
  title.textContent = album.name;
  details.appendChild(title);

  var artist = document.createElement("h5");
  artist.textContent = album.artist;
  details.appendChild(artist);

  // create div container to hold release year and genre, middle dot in between
  var infoContainer = document.createElement("div");
  infoContainer.className = "info-container";

  var genre = document.createElement("span");
  genre.className = "album-genre " + album.genre.toLowerCase();
  genre.textContent = album.genre;
  infoContainer.appendChild(genre);

  var dot = document.createElement("span");
  dot.textContent = " · ";
  infoContainer.appendChild(dot);

  var year = document.createElement("span");
  year.textContent = album.releaseYear;
  infoContainer.appendChild(year);

  details.appendChild(infoContainer);

  // view more button and detailed version of album
  var ratingAndMore = document.createElement("div");
  ratingAndMore.className = "album-rating-more";

  var rating = createStarRating(album.userRating);
  details.appendChild(rating);

  var moreButton = document.createElement("button");
  moreButton.textContent = "View More";
  moreButton.style.backgroundColor = "#161719"; 
  moreButton.style.border = "none"; 
  moreButton.style.color = "white";
  moreButton.style.padding = "8px 22px"; 
  moreButton.style.textAlign = "center"; 
  moreButton.style.textDecoration = "none"; 
  moreButton.style.display = "inline-block"; 
  moreButton.style.fontSize = "12px"; 
  moreButton.style.margin = "4px 2px"; 
  moreButton.style.cursor = "pointer"; 
  moreButton.type = "button"; // specify type "button" to prevent form submission


  var moreDetails = document.createElement("div");
  moreDetails.className = "more-details";
  moreDetails.style.fontSize = "15px";
  moreDetails.style.display = "none";

  // define variable for duration and comment info
  var userComment = document.createElement("p");
  userComment.textContent = "User comment: " + album.userComment;
  moreDetails.appendChild(userComment);

  var duration = document.createElement("p");
  duration.textContent = "Duration: " + album.duration;
  moreDetails.appendChild(duration);


// oneclick view more/view less control
  moreButton.onclick = function() {
    if (moreDetails.style.display === "none") {
      moreDetails.style.display = "block";
      moreButton.textContent = "View Less";
    } else {
      moreDetails.style.display = "none";
      moreButton.textContent = "View More";
    }
  };

  // add to the list content
  ratingAndMore.appendChild(moreButton);
  ratingAndMore.appendChild(moreDetails);

  card.appendChild(cover);
  card.appendChild(details);
  card.appendChild(ratingAndMore);

  return card;
}



// fx for showing star rating in album list
function createStarRating(rating) {
  var starContainer = document.createElement('div');
  starContainer.className = "star-container";

  for (var i = 1; i <= 5; i++) {
      var star = document.createElement('span');
      star.textContent = '★'; 
      if (i <= rating) {
          star.style.color = '#FFD700'; 
      } else {
          star.style.color = '#ccc';
      }
      starContainer.appendChild(star);
  }

  return starContainer;
}

// MusicBrainz API setup for auto-generating album/artist lists
  function searchMusicBrainz(entity, query) {
    fetch(`https://musicbrainz.org/ws/2/${entity}?query=${query}&fmt=json`)
        .then(response => response.json())
        .then(data => {
            let datalistId = (entity === "artist") ? 'artistList' : 'albumDataList';  // changed 'albumList' to 'albumDataList'
            const datalist = document.getElementById(datalistId);
            datalist.innerHTML = '';
            let options = (entity === "artist") ? data.artists : data.releases;
            if(options && options.length) {
              for(let i=0; i<options.length; i++) {
                  const option = document.createElement('option');
                  // Use 'title' for releases (albums) and 'name' for artists
                  option.value = options[i].title || options[i].name; 
                  datalist.appendChild(option);
              }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

  