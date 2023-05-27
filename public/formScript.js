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
          imageURL: "./images/" + document.getElementById("genre").value.toLowerCase() + ".jpg",
          userRating: document.querySelector('input[name="rating"]:checked').value,
          userComment: document.getElementById("userComment").value,
      };
      console.log(album);
  });
  
  function searchMusicBrainz(entity, query) {
    // API settings
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
  
  