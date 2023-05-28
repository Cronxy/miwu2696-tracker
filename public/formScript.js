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

// generating album list card
// window.addEventListener("DOMContentLoaded", (event) => {
//   let albums = localStorage.getItem("albums");
//   if (albums) {
//       albums = JSON.parse(albums);
//       let albumList = document.getElementById("albumList");
//       for (let i = 0; i < albums.length; i++) {
//           let albumDiv = document.createElement("div");
//           albumDiv.className = "album-card";

//           let coverImg = document.createElement("img");
//           coverImg.src = albums[i].imageURL;
//           albumDiv.appendChild(coverImg);

//           let container = document.createElement("div");
//           container.className = "container";

//           let titleH2 = document.createElement("h2");
//           titleH2.textContent = albums[i].name;
//           container.appendChild(titleH2);

//           let artistP = document.createElement("p");
//           artistP.textContent = "Artist: " + albums[i].artist;
//           container.appendChild(artistP);

//           let genreP = document.createElement("p");
//           genreP.textContent = "Genre: " + albums[i].genre;
//           container.appendChild(genreP);

//           let yearP = document.createElement("p");
//           yearP.textContent = "Release Year: " + albums[i].releaseYear;
//           container.appendChild(yearP);

//           let ratingP = document.createElement("p");
//           ratingP.textContent = "Rating: " + albums[i].userRating;
//           container.appendChild(ratingP);

//           albumDiv.appendChild(container);
//           albumList.appendChild(albumDiv);
//       }
//   }
// });

function createAlbumCard(album) {
  var card = document.createElement("div");
  card.className = "album-card";

  var cover = document.createElement("div");
  cover.className = "album-cover";

  var img = document.createElement("img");
  img.src = album.imageURL;
  img.alt = "Album Art";
  cover.appendChild(img);

  var details = document.createElement("div");
  details.className = "album-details";

  var title = document.createElement("h3");
  title.textContent = album.name;
  details.appendChild(title);

  var artist = document.createElement("p");
  artist.textContent = album.artist;
  details.appendChild(artist);

  // var genre = document.createElement("p");
  // genre.className = "album-genre";
  // genre.textContent = album.genre;
  // details.appendChild(genre);

  var genre = document.createElement("p");
  genre.className = "album-genre " + album.genre.toLowerCase();
  genre.textContent = album.genre;
  details.appendChild(genre);

  var year = document.createElement("p");
  year.textContent = album.releaseYear;
  details.appendChild(year);

  var ratingAndMore = document.createElement("div");
  ratingAndMore.className = "album-rating-more";

  var rating = document.createElement("p");
  rating.textContent = album.userRating;
  ratingAndMore.appendChild(rating);

  var moreButton = document.createElement("button");
  moreButton.textContent = "View More";
  moreButton.onclick = function() { 
      alert('User comment: ' + album.userComment + '\nDuration: ' + album.duration); 
  };
  ratingAndMore.appendChild(moreButton);

  card.appendChild(cover);
  card.appendChild(details);
  card.appendChild(ratingAndMore);

  return card;
}


// event listener for monitoring user submission
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  var album = {
      name: document.querySelector('input[name="album"]').value,
      artist: document.querySelector('input[name="artist"]').value,
      genre: document.querySelector('input[name="genre"]').value,
      releaseYear: document.querySelector('input[name="year"]').value,
      userRating: document.querySelector('input[name="rating"]:checked').value,
      imageURL: document.querySelector('input[name="imgURL"]').value,
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


  // MusicBrainz API settings for auto-generating album/artist lists
  function searchMusicBrainz(entity, query) {
    fetch(`https://musicbrainz.org/ws/2/${entity}?query=${query}&fmt=json`)
        .then(response => response.json())
        .then(data => {
            let datalistId = (entity === "artist") ? 'artistList' : 'albumList';
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
  
  