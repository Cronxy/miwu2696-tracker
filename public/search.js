document.getElementById('searchBar').addEventListener('keyup', function() {
  var searchQuery = this.value.toLowerCase(); // Get input value on change
  var allText = document.body.innerText.toLowerCase(); // Get all text from the body
  var resultsDiv = document.getElementById('results'); // Get the results div

  if(searchQuery.length > 2) { // If the input value has more than two characters
      var regex = new RegExp("\\b" + searchQuery + "\\b", "g"); // Create a new global regex

      // Filter all text of the body based on the search query
      var matches = allText.match(regex);

      if(matches) { // If there are matches
          resultsDiv.innerHTML = "Number of matches: " + matches.length;
      } else {
          resultsDiv.innerHTML = "😞 Oops! Seems the music elves couldn't find any matches.";
      }
  } else {
      resultsDiv.innerHTML = ""; // Clear the results div
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