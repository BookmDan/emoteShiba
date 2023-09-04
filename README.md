# emoteShiba

## <ins>Setting up your environment:</ins>
To start your project on a local server, you'll need to follow these general steps:
Setup a Local Server: You can use tools like Node.js with the http-server package, Python's http.server, or other web server software to set up a local server.
For Node.js, you can use http-server by installing it globally:
sh
```npm install -g http-server```

Navigate to Your Project Directory: Open your command line (terminal) and navigate to the directory where your project files are located.
Start the Local Server: Run the local server command to start serving your project files:
For `http-server`:
sh
```http-server```

For Python:
sh
```python -m http.server```

Replace http-server or python -m http.server with the actual command based on the server software you're using.
Access Your Project: Once the server is running, it will display a local URL (like http://localhost:8080) in your terminal. Open a web browser and navigate to this URL to access your project.

Remember that this is a simplified explanation, and the exact steps may vary based on your specific environment. If you're using more advanced development tools like webpack, React, or Vue, the setup might differ.

Also, keep in mind that the server might need to be restarted when you make changes to your code for them to take effect.
Lastly, ensure that the background image and other assets are properly linked using relative paths, as local servers often serve content from different URLs than file-based access.

For the project, we used the following apiURL: 'https://shibe.online/api/shibes?count=10'

![Screen Shot 2023-08-26 at 10 02 48 AM (2)](https://github.com/BookmDan/emoteShiba/assets/8926023/425eadb9-ad24-4946-ab13-984a14af3e73)

## <ins>Genesis of Idea:</ins>

I wanted to be able to send different shiba emojis to friends. A challenge I faced was that the api generated randomized image names upon refresh. This made it difficult to have a dictionary of images tied to tags. Once a user refreshes, there are completely different images that are generated. 

Thus, I pivoted to more of a memory challenge game and fun match-making game. By hovering over the image, you can see which tag the user input. Then if you search for that tag, that image is both highlighted and returned on the right. 

## <ins>Current Bugs:</ins>
1. when you click images, display alert box pops up update: fixed :white_check_mark:
2. if caption or keyword is non-unique, it does not throw an error update: :white_check_mark:
* only prints the first occurrence of the search. In other words, duplicate images with same keyword does not show :confused:
* error message for if not-matching keyword input does not show :white_check_mark:
3. doesn’t erase the previous search keyword, after refresh :x:
4. tagFocus does not do anything, must mouseclick the input space to enter a tagword for the image :x:

## <ins>Future</ins>

I would like to add more animated features, instead of just highlights. For example, it might produce stars that appear and then fade, with the selected image shown in prominence and in larger format. The challenge with this is how to return back to the matrix and to be able to search another tagword. Also, can I add more than one tag word? 

This turned into more of a game, but I would still like to be able to incorporate this more to sending personalized shiba stickers to friends through an online message portal. More to come...


