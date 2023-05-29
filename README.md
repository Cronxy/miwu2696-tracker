# miwu2696-tracker - Using for DECO2017 tracking website prototype

_**A friendly remind: To see the updated album list, reload the page (if not work try twice thanks:)**_

## Website feature and walkthrough 

Upon entering the website, the user will be greeted by a title that reads "Your digital album collection library", hinting at the website's purpose. The page is neatly divided into two sections, each with interactive visuals. <br>

In the header, there's a search icon. When the user clicks on it, a search bar appears where can input text to search for specific albums in their collection.<br>

If the user navigates to the left section, labelled as "Add Something New", it triggers an overlay on click. This overlay contains a form to add a new album. The placeholder within the input field will suggest the user of what information to put in. <br>

* In the "Album Name" field, the user can start typing the name of an album. As they type, the website fetches relevant album names from the MusicBrainz API and displays them as suggestions. <br>
* The "Artist" field works similarly. <br>
* User inputs for the album's release year and duration in minutes and seconds required. <br>
* Selecting the genre from a dropdown menu. <br>
* Rating the album using a star-rating system, ranging from 1 to 5.<br>
* The user can comment on the album in the "User Comment" field. This could be thoughts, feelings, or any particular memory associated with the album. <br>


Once all fields are filled, hit "Submit" to add the album to your collection. There will be some logical constraints for validating the user inputs, such as the release year cannot be the future.  <br>

The right section, labelled "Viewing ALBUM LIST", allows to view the existing digital music collection in a list form. User should be able to view the album item in short/long versions using the ‘View more/less’ button. <br>

*__Responsive Design:__ Throughout the experience, the website adjusts accordingly to the screen size, providing a consistent and enjoyable user experience as the grid-based design. <br><br>


## Coding development for DECO2017 prototype 


*__Change of landing and overall layout compared with mockup__ : <br>The duo viewing grid provides a clear website hierarchy, which allows the user to easily walk through the website and design to be intuitive. 

*__Font change__ : <br> (very round 'Poppins' to typewriter-like 'Courier'), to incorporate more with the general aesthetics of the retro punk-like vibe of the website.

*__Adding hovering/selecting animations for usability states__  <br> According to the user feedback, the transition between the landing and overlay content page is dull, which by adding extra transition effects and animation, it adds more fun to the page. <br>


*__Using MusicBrainz API:__ <br> (https://musicbrainz.org/doc/MusicBrainz_API) <br>
MusicBrainz is open-source and freely available for use, and it provides a well-documented API that allows auto-complete suggestions for album and artist names. These suggestions are fetched in real-time as the user types in the respective fields.
* Problem: Artist name and Album name auto-generated selected menu only work one or another.
Error message from console log ```Failed to load resource: the server responded with a status of 400 ()```<br>
This might be due to empty queries being made to the API when the input field is empty
* Further considerations: Handle No Results from MusicBrainz API: If there are no results from API, consider showing a message to the user indicating that there were no suggestions for their input.

*__Alternative method for MusicBrainz API,__ <br> (https://www.npmjs.com/package/spotify-info#get-information-without-the-spotify-api) <br> getting information without the Spotify API (scraping)
* Problem: The library's "scrapeAlbum" and "scrapeTrack" methods require Spotify URLs, not names or IDs, and do not provide search functionality.
In my case, it is difficult to figure out a way to obtain these Spotify URLs based on the id. 

*__Stylish form formatting__ <br> 
to make the album-adding form more visually appealing to the user, compared with the initial design shown in the mockup, I changed the form with label and other decorative features, which is more accessible and clearly indicates what each album is about. <br> The animation of labels and buttons also provides a more enjoyable visuality form. <br>
__Form Accessibility:__ 
Add ```aria-*``` attributes to enhance the form's accessibility. This attribute is important for users using assistive technology to navigate the web.

*__Fetching album cover pic using js library__ <br> (https://github.com/lacymorrow/album-art) <br>
but as it using Spotify API, the 'albumArt' call failed might be because of authorization of the API credentials. Decided not to use it in the end, instead uploaded the genre picture to the folder and allocate each to the correct genre using the syntax:<br>
```imageURL: "./genre_pics/" + document.getElementById("genre").value.toLowerCase() + ".png"```
 <br>
 
As the album item card content in the list will be dynamically shown by the js code, initially it seems to be stuck on the same section, as the div with id="albumList" are siblings, not sure where the CSS code has a conflict which forcing the list section to appear inside the form.<br>

Using animate.css for overlay content open/close for better user experience and also to make the website more interesting to interact with. <br>  



## Specific coding problem encountered during prototype 

*__Overlapping labels and inputs in CSS,__ <br> 
For the label elements in form, I used the transition that moves the label to the side when an input field is focused or has valid content. This was achieved using the ```:focus``` and ```:valid pseudo-classes``` in conjunction with other CSS transformations.
 * Further considerations:<br>
It relies on the use of modern features that may not be fully supported in all browsers. Considering if the users are browsing the website using a non-mainstream browser, poor user experiences might happen and deter users to explore more on the page. 

*__Code duplication,__ <br>
For handling form submissions and loading albums from local storage. I tried to define the function to decrease the repetition but the two buttons were used for different functions and it seems not working.

*__LocalStorage manipulation in the delete functionality,__ <br> I’m trying to use 'albumList' in LocalStorage, but there's no 'albumList' in the LocalStorage. Need to check the js code in the delete function referencing the correct keys when working with LocalStorage. 

*__The non-unique identifiers,__ <br> Initially, I’m trying to delete an item using its index in the array, but there's no guarantee that the index will be unique. So instead of using the index, I turn back to the item’s property and assign a unique ID to each album when it's created, and then use this ID to identify the item when it needs to be deleted. 

*__DOM elements__
<br> There are several places in js I’m creating new DOM elements and appending them to existing one by one. <br> To make it efficient, I tried to create a template string with all the necessary HTML using, and then convert string into DOM nodes using innerHTML but it seems there are interruptions with my current form section and the list style was really hard to manage. 

*__List reload__ <br>
Every time the user submits a new form of the album, the album list will disappear and only be shown when the page is reloaded. The console message shows there is a ```“TypeError: Cannot read properties of null (reading 'value')”``` It’s because it trying to access the value of form elements using the name attribute, but in my HTML form, I’m using the id attribute to identify the elements. <br>
Tried to use ```document.getElementById``` instead of ```document.querySelector```, but the problem remains. 

*__Merging landing and form/list together__ <br> 
* div conflicts as I write the code individually in two sets of HTML/CSS/JS files, some of the selector in the CSS file is overlapping and causing the style inconsistency, especially for selectors like ‘```html, body {}``` and ```* {}```’ which apply across to the entire page.<br>
* MusicBrainz API isn’t working when merging the two parts of codes together, caused by the naming inconsistency between HTML and JS, there is a datalist with the id of ```albumDataList``` in HTML, but in JS, initially im trying to update a datalist with the id of ```albumList```.

*__Using pop-up notification instead of js built-in alert__ <br>
* Further consideration: Alerts are quite basic and disruptive in terms of visual aesthetics and user experience. It interrupts users, preventing them from interacting with the website until they acknowledge the alert, which can lead to a poor user experience. 


# References

## Pictures
A punk rocker, dressed in leather, with green Mohican hair and wearing sunglasses. <br>
https://unsplash.com/photos/bpHiMALBe-A
 
Black and white sound mixer <br>
https://unsplash.com/photos/aVOACNd1cc0 

Burns black electric guitar <br>
https://unsplash.com/photos/LtD7qn9k108

Black and white cd cases <br> 
https://unsplash.com/photos/EuMVFkzkYuU

Old record store on record day <br>
https://unsplash.com/photos/gExmKBFk118

Vinyl store collection <br>
https://unsplash.com/photos/X4d6DUMappU

Cryptopunk generator - Figma Community <br>
https://www.figma.com/community/file/1011965611456947173

## Coding reference 
MusicBrainz API <br>
https://github.com/Borewit/musicbrainz-api 

Animation CSS <br>
https://github.com/animate-css/animate.css

Stylish Form Elements With CSS3  <br>
https://codepen.io/sudheer-ranga/pen/yOqBQB

CSS Responsive Full Screen Duo Layout With Animated Overlay <br>
https://codepen.io/vailjoy/pen/GNbQoO
