//Node.js is the language
//Express is a node, a node module

//Node is written in C but it runs or reads JavaScript
//Google in the Chromium project made the V-8 JavaScript engine which is the V-8 engine
//ECMAScript is the standard that JavaScript engines actually process or interpret the language
//everyone has there own JavaScript engine = a way to process it
//when Google made Chrome they made the V-8 engine. 
//Ryan Dahl took the V-8 engine out of Chrome and turned it into Node.js.
//Node.js is the language but it is not written in JavaScript it is written in C 
//Node.js reads or runs JavaScript.
//Express is the main framework for Node.js it is actually mananged by the Node.js foundation
//JSON = “JavaScript object notation” is the native tongue of Node.js
//JSON is a data format and a common way that data is sent between clients and servers.

//Express is a routing and middleware web framework
//Express is a routing framework allows us to create routes for our application
//Express allows us to hijack the process of changing the request & response object anytime and anyway we want to
//The middleware will allow us to effect the request and response object


//path is a native module to Node.js so its not dependent on third party modules 
//it will always happen in reverse, so good practice is to put native modules first
const path = require('path');


//Express is a node module
//http is a native module to node meaning you get http when you have node
//so dont need to do:
//const http = require('http');
//instead we do need to do:
const express = require('express');
//because express is a third party module it now is owned by node foundation donated by Microsoft 
//but it is not built into the language so when you require this module you must npm install express
//best way to use this is to run npm init to make a simple package.json file
//this will place express in the node.js modules folder and add all the dependecies express needs



//An "app" is the express function (createApplication inside the Express Module) invoked and is an Express application
//app is the return value of this function = createApplication
//we do this because what we have stored in our express variable is whatever was exported by the express node module
//by opening the express folder in the node modules folder we see that 
//in index.js (in the express folder) the default thing being exported is called createApplication
//this is a function that is being stored in the express variable
//when we want to invoke it and store its return value we assign it to a variable called app 
//so we bring express in by setting it to a variable then immediately turn around and define
//a variable called app by invoking the export of the express module which happens to be called createApplication
//thats why we call it app
//so this line is actually creating an express app
const app = express();


//serve up static files: only 1 line... unlike when we use node.js without express
app.use(express.static('public'))



//all is a method, and it takes 2 args:
//1. route
//2.callback to run if the route is requested
//the star means we will accept anything 
app.all('*', (req, res) =>{
    //Express handles the basic headers (status code, mime-type)! Awesome!
    //read in Node.js
    //we do a console.log to see what it gives us back
    console.log(path.join(__dirname + 'node.html'))
    //the path module in order to tell node where the file is we will need the entire path as it is on this machine
    //not where the file is relative to the server. so we need to do (path.join(__dirname + 'node.html')
    //so up above it has this code = app.all('*', (req, res) =>{  
    //which basically is saying send this file if an HTTP request of any type is made to /
    //inside of node.html we are asking for styles.css and node.png
    //but the trouble is we dont handle those routes here but we dont need to because those files are in public
    //and public is being served up statically
    res.sendFile(path.join(__dirname + 'node.html'))
    //res.send('<h1>This is the home page</h1>')
    //Express handles the end! Awesome!
});



//this will match any page because of the *
//* will match any path/page and all will match any method type
//express works from the top down so if the first app.all matches the second will not run 
//otherwise the second will match all other requests
app.all('*', (req, res) =>{
    res.send("<h1>Sorry, this page does not exist</h1>")
});



app.listen(3000);
console.log("The server is listening on port 3000...")
