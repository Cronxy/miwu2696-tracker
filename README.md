# miwu2696-tracker
Using for DECO2017 final tracking website prototype

1. Change of landing page format
A clear website heirarchy to allow the user to easily walk through the website

2. Font change (round to typewriter-like change) and hovering/selecting animations for userability states 

3. Using MusicBrainz API (https://musicbrainz.org/doc/MusicBrainz_API) 
MusicBrainz is open source and freely available for use, and it provides a well-documented API that can be used to retrieve and submit data. 
Problems: Artist name and Album name auto-generated selected menu only work one or another
Error message from console log: Failed to load resource: the server responded with a status of 400 () 
Might be due to empty queries being made to the API when the input field is empty

4. Using js library (https://www.npmjs.com/package/spotify-info#get-information-without-the-spotify-api) getting information without the Spotify API (scraping)
Problem: The library's "scrapeAlbum" and "scrapeTrack" methods require Spotify URLs, not names or IDs, and do not provide search functionality.
In my case, it is difficult to figure out a way to obtain these Spotify URLs based on 

5. Data type of duration: Change the duration inputs as an array of numbers which would include hours, minutes and seconds as seperate integers. 

6. Changes made about use states like the searchb function and user confirmation for deleting and adding an item

7. Relevant typography, colour schemes, and branding elements' consistency to a cohesive appearance of prototype. Considering of UI design trends and design patterns to enhance appeal

8. Stylish form formatting reference(https://codepen.io/sudheer-ranga/pen/yOqBQB)