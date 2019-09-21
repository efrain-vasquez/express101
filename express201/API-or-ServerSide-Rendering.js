// ServerSide rendering -VS- building an API

// The only things the browser can read are:
// 1. HTML
// 2. CSS
// 3. JavaScript

// What happens in the server when running an app on the internet:
// The server recieves a request
// and the response needs to be HTML, CSS, and/or Javascript 

// This is what is going on inside of the server, the different layers of the server stack:
// 1. Operating System: Linux or Windows or Unix 
// 2. Web server: Apache or IIS or Nginx or Node.js or WebSphere or Tomcat
// 3. Data Base Layer: Sql Options: MySQL or PostgreSQL or Microsoft SQL Server or Oracle or 
//    modern options: NoSQL: Mongo or Dynamo or Couch
// 4. Programming Layer: C or C++ or Python or Ruby or PHP or Java

// before this was the only way server side rendering worked:
// Example: someone shows up on port 80 as created by Transport Layer
// http traffic because its an http port
// remember the browser can only read HTML, CSS, or JS
// On a website such as myspace whos users have there own page, 
// the question is does myspace have an individual HTML page stored on the hard drive for 
// every single user of course not it has some type of template page and 
// what happens is the user gets to port 80 and then web server
// kicks into gear and then it says im serving up myspace/whatever-path-you-just-asked-for
// the web server kicks into gear and starts processing and interpreting 
// it sends the request to the Programming Layer then we need some
// something from the Database Layer then more from the Processing Layer it goes back and forth 
// between the programming layer and the database layer until eventually the programming
// layer and the database layer have worked together to create a template with HTML, CSS, and JS
// then this is given to the web server it finishes all of its processing 
// and the web server sends it back across the wire
// this is called server side rendering because the server is in charged of putting
// together the HTML CSS and JS and sending it back to the browser

// this is what we will do with res.render()
// within express we will be able to create a template and put some kind of text
// but the browser cant read this so the server will process this into HTML CSS and JS


// the more modern version/option is res.json()
// we have user and you want to go out to Wikipedia. they use react
// so the first time you get here you have to get everything HTML CSS and JS. you have to get a full load 
// every following request every time you click on something after that 
// because its a single page app and because the way react or vue or angular manages the virtual DOM
// when you make a new request instead of making a full blown request you will use ajax
// and instead of sending back HTML CSS and JS the server will just send back json
// and that original HTMl document which was originally loaded up
// the json will come in and be update the DOM so it will look like a new page
// but its really the same HTML CSS and JS but it will have new data in it thanks to the json
// ajax will still be a new http request we will still have a req. and a res.
// and it will still be our responsibility to handle that network traffic we will still run a callback
// but instead of reponding with a template meaning with HTML CSS and JS
// we will just respond with JSON

// res.render() is server-side rendering means: 
// im going to the server and every time the server will respond with HTML CSS and JS

// res.json() is mostly going to be for API/JSON needs  
// you as the user are going to go out and hit the server and the server the first time is going to send out 
// HTML CSS and JS but every time after that the server will just send JSON
// and the page or DOM will update itself accordingly. react or vue or whatever your framework is
// will be responsible via some kind of router or directive or binding. it will take that JSON
// and it will update the DOM and it will make it seem like your going from page to page
// but your really just changing the DOM up.

// res.render()
// Server-Side rendering
// the user always has to come back to the server because the server contains everything 
// which allows you to make use of session variables and make use of cookies

// res.json()
// very fast
// creates very cool UI/UX opportunities
// but need to start storing stuff on the browser that you normally wouldn't want too

