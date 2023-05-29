# miwu2696-tracker
Using for DECO2017 final tracking website prototype

## to see the updated album list, reload the page (if once not work try twice thanks)
1. Change of landing page format
A clear website heirarchy to allow the user to easily walk through the website

2. Font change (round to typewriter-like change) and hovering/selecting animations for userability states 

3. Using MusicBrainz API (https://musicbrainz.org/doc/MusicBrainz_API) 
MusicBrainz is open source and freely available for use, and it provides a well-documented API that can be used to retrieve and submit data. 
Problems: Artist name and Album name auto-generated selected menu only work one or another
Error message from console log: Failed to load resource: the server responded with a status of 400 () 
Might be due to empty queries being made to the API when the input field is empty
Further considerations: Handle No Results from MusicBrainz API: If there are no results from API, consider showing a message to the user indicating that there were no suggestions for their input.

4. Using js library (https://www.npmjs.com/package/spotify-info#get-information-without-the-spotify-api) getting information without the Spotify API (scraping)
Problem: The library's "scrapeAlbum" and "scrapeTrack" methods require Spotify URLs, not names or IDs, and do not provide search functionality.
In my case, it is difficult to figure out a way to obtain these Spotify URLs based on 

5. Data type of duration: Change the duration inputs as an array of numbers which would include hours, minutes and seconds as seperate integers. 

6. Changes made about use states like the searchb function and user confirmation for deleting and adding an item

7. Relevant typography, colour schemes, and branding elements' consistency to a cohesive appearance of prototype. Considering of UI design trends and design patterns to enhance appeal

8. Stylish form formatting reference(https://codepen.io/sudheer-ranga/pen/yOqBQB)

9. Form Accessibility: Add aria-* attributes to enhance the form's accessibility. This is important for users using assistive technology to navigate the web.

10. Tried to fetch album cover picture url using (https://github.com/lacymorrow/album-art), but as it using Spotify API, the 'albumArt' call failed might because of authorization of the API credentials

11. As the card content will be dynamiclly shown by the js code, initially it seems to be stuck on the same section, as the div with id="albumList" are siblings, not sure where the CSS code has conflict which forcing the list section to appear inside the form. 

12. The /view more/ button is somehow linking with submit button as every time i clicked, it will jump to Album name and ask to fill out the field, need specifiying the button functionaility before

13. View more/view less button

14. Global scope of defining a array. In delete button event listener, console log shown error of albumList isn't defined
<!-- see doc for detailed explanations -->

15. Using animate.css for overlay content open/close for better user experience and also make the website more interesting to interact with. (https://github.com/daneden/animate.css)