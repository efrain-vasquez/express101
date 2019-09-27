//native module goes on top
const path = require('path');


const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(helmet());

// express loads middleware from top to bottom. 
// if in the process of going through the cycle it hits anything that can 
// satisfy the request then that is what loads up first.
// here index.ejs satifies the request then it will satisfy the request
// you should not have files in your public folder that are competing with routes
// if you need public files loaded you should put them in other folders 
// or you should adjust your routes but you should never be competing for the same path.

//serve up static files
app.use(express.static('public'));
//parse json and urlencoded data into req.body
app.use(express.json());
app.use(express.urlencoded());


/*
app.set(), takes 2 args: it will assign the key to a value. Its like a hash map
1. name/key
2. value
in our example for name we will pass it the view engine for value we will pass it EJS
*/


//EJS is embedded JavaScript
app.set('view engine', 'ejs');

//handlebars
//app.set('view engine', 'hbs');

//Pug
//app.set('view engine', 'pug');

//we need to set this property/setting on app.set() (property = views) 
//so express knows where to look and then we need to actually create the file
//now when res.render() runs in this example it will go looking for index.ejs because we now have told 
//express our view engine is ejs so goes looking for index.ejs
//in this location the views directory is defined right here:
app.set('views', path.join(__dirname, 'views'));
//now we make a new folder in the public directory called views and a new file in views called index.ejs
// or a file called index.hbs
// or a file called index.pug

// those are the 3 pieces together: 
// 1. name of file
// 2. type of file
// 3. location of file
// now express knows everything it needs to actually render the file.


/*
app.set has a property called views whos type is a string or array:
this setting is A directory or an array of directories for the application's views. If an array, 
the views are looked up in the order they occur in the array.

if you do res.render this is where express will go looking for those files
by default its going to go look in the current directory wherever the node process is running/views:
process.cwd() + '/views'
*/

// In order to use res.render:

// 1. Express as we know it happens. Which is this File.
//  Express as we have been doing it: we include the various modules we include routes and middlewear

// 2. We define a new engine. They are all different as far as syntax and how you want to build it.
// - EJS
// - Mustache
// - Handlebars
// - Jade which is now named Pug

// 3. Inside one of our routes, we have a res.render

// 4. We pass that res.render 2 things:
// - the file we want to use. It Will either be a jade file, handlebars file, Mustache file or EJS file or 
//   whateverbe other type of file you specified for your view engine.
// - the data we want to send to that file. you dont want to do a res.send or make a .html file because
//   we can do stuff inside of res.render() such as write node.js here. this templating engine serves as 
//   a bridge inbetween node and the front end stuff. we can make a template out of HTML CSS and JS 
//   and we can have a bridge that will allow us to access node.js stuff.
//   the data we want to send to that file is our bridge, this object which is actually res.locals
//   gives us the ability to pass the users name, whether the user is validated, the users pictures,
//   all kinds of data that we might want to send over to the template and then the template engine can fill
//   out the html accordingly. We may want to do it here instead of the front end because 
//   there are things the server can do that the front end can not do such as database work such as requesting   

// 5. Express uses the node module for specfied view engine and parses the file. This is the translation part
// - that means, it takes the node stuff (the data) and combines/compiles it with HTML/CSS/JS 
//   and has a final product of just HTML CSS and JS and then the response is finally sent out

// 6. The final result of is this process is a compiled product of the things the browser can read
// - HTML, CSS, JS

app.get('/', (req, res, next) => {
    //res.send("sanity check")

    // or we can do 

    // res.json({
    //     msg: "Success!"
    // })

    // or we can do

    // here we are telling it to go look for a file called index.ejs because
    // if you do a res.render() it will go looking for those files using app.set()
    // and app.set() has a property called views which is telling us the view engine is ejs
    // thats why it goes looking for a file called index.ejs
    res.render("index");
})

app.listen(3000);



// In all these cases: res.send(), res.sendFile(), res.json, and express.static() the only thing we can send back is 
// HTML CSS and JS because the browser is on the other end and the browser only reads HTML CSS and JS
// so express goal is always to get there some how. to either send json back or send back 
// a front end product meaning to send back HTML CSS and JS.
// What if we dont want to send back a static product meaning we dont want to send back static code
// you can have a dynamic website even if its HTML CSS and JS, the JS via ajax can go out and fetch data
// or you can use a router and have vue, react, or angular use a router and make it feel like a dynamic website
// but it will still be static code.
// what if instead of usng JS to manipulate the DOM we actually wrote the DOM the way we wanted it from the beginning
// so the DOm was written so it showed up upfront the correct way, then we wouldn't need JS to get involved because
// it would already be correct we wouldn't need that extra step. But in order to know what the data that we need 
// would be, we need info from node. in order to pull that off without using JavaScript we need something inbetween
// that can speak both express and front end. 
// This is what a template engine or view is. = Pug, Mustache, Handlebars, or EJS

// The request comes in and express does its thing internally (routes & stuff), before the response goes out
// express sends out some node (some data from express) over to the template engine or view, the template
// engine or view (speaks both node and front end) it will build HTML CSS and JS for us and then it will 
// take that final product and allow express to send it back out as the response.
// so the job of the template engine or view engine is to marry the node with the front end.
// so that what we get in the end is instead of being a static front end site it is a dynamic front end site
// where we can build the DOM based on node,js 
// what we expect out of our template engine or view engine is a translator inbetween express and 
// EJS which will build the DOM before its sent out. 
// now it wont be as cool UX/UI potential as a full blown front end framework but it has its benefits.


