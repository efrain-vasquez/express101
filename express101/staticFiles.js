//how to load up static files
//we have node modules so dont need to install express again

const express = require('express');
const app = express();

//app comes with a use method this is how you invoke most middleware in express
//app works different depending on the situation
//use takes 1 arg (right now):
// 1. the middleware you want to run
//Mounts the specified middleware function or functions at the specified path: 
//the middleware function is executed when the base of the requested path matches path.

//express.static(root, [options])
//This is a built-in middleware function in Express. It serves static files and is based on serve-static.
//in node modules go into the express folder and in the express folder the default export is the 
//createApplication function but there are other things exported in this case exports.static = require('serve-static');
//here we are actually in the express module and we are invoking the static function 
//and we are going to hand it the directory we want to make public
app.use(express.static('public'))
//our app now anytime anyone wants to see localhost:3000/node.png or localhost:3000/styles.css
//it will load up because its inside of the public directory
//why localhost:3000 because thats where we are listening for HTTP traffic
//app will automatically serve up everything in there we dont actually need to include public in the path
//it will simply make it available we dont even need to have a route because right now app is listening
//for traffic on port 3000 so if any request shows up to localhost:3000 
//this = app.use(express.static('public')) is being added to any HTTP request that comes in
//we no longer need if statements, or write headers using writeHead, or figure out mime-types, 
//or read file using fs module, or open and close connections and responses and stuff
//now all we have to do is say hey express anything in this directory = app.use(express.static('public'))
//just serve it up. express is using the serve-static module its not actually built into express
//its just making good use of serve-static.
//whatever files you drop in the public folder can be served as part of the root domain
//you dont have to identify each file in the public directory i.e. 'public/filename'





app.listen(3000);
console.log("The server is listening on port 3000...")