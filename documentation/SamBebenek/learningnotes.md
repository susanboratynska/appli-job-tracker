# Learning Notes
## Resources
JWT (JSON Web Token) - [What is JWT?](https://www.youtube.com/watch?v=7Q17ubqLfaM), [JWT Authentication Tutorial](https://www.youtube.com/watch?v=mbsmsi7l3r4)

https://reactjs.org/tutorial/tutorial.html

https://www.linkedin.com/learning/learning-full-stack-javascript-development-mongodb-node-and-react/course-overview?u=76812730

https://www.jetbrains.com/webstorm/

https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

## Notes
Notes on Express and React from comments in this project's server.js file:
 * Empty express boilerplate app - Sam Bebenek
 * 
 * The purpose of an Express server.js file is to act as the go-between for the front-end react app and the database, using API endpoints. It can also act as a router and serve pages,
 * although in our case it will only be serving the index page (once development is done and the react app is built), and all the routing will be done on the react side using 
 * react-router (for more information, look into react-router. One of the benefits is that it can allow for page changes without needing to reload the page).
 * 
 * API endpoints can be put in this file, or could possibly be put in another and then referenced here.
 * To run this express server, install the nodemon package globally in npm, then navigate to the folder containing this server.js file in a command terminal and run the command
 * 'nodemon server.js'
 * The benefit of the nodemon package is that if this server is running, nodemon will automatically refresh the server any time this server.js file is changed and saved.
 * 
 * NOTE: During development, react apps need to be hosted on a seperate command terminal. To run our react app, navigate to the application-tracker folder in a command terminal,
 * then run the command 'npm start'. The react app should open in your browser automatically.
 * To interface with the database during development, both the express app and the react app need to be running at the same time in two seperate command windows.
 * Once development is complete and the files are ready to be hosted, React apps can have a 'build' command run on them that will compile the react code into static html \
 * and javascript files. At that point, I believe only this Express app will need to be running to serve the new static build pages.   
 
 ### Tuesday June 2nd -  
 Today I worked on the front-end development of the following pages: Networking events home, My Networking Events, Public Networking Events, Event Details, Update Event

 ### Tuesday June 9th -  
 Today I completed the Networking Events model and all API endpoints and database CRUD functionality. Next work session I will connect it to the database

 ### Tuesday June 16th -  
 This week I planned on connecting my back end routes to the MongoDB server, however the team ran into some trouble with merge errors. Instead, this week I helped Susan and Chris Jones work out those merge errors. I also helped Chris Jones work out our deployment plan. I didn't get as much done as I wanted to this week due to preperation for the portfolio show, however by next week I hope to have a lot more done.