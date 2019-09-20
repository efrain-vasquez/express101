const express = require('express');
const app = express();

// Express = 2 things
// 1. Router
// 2. Middleware that makes up a webframework
// middleware means something needs to happen in between piece one (HTTP request) and piece two (HTTP Response)
// Request-------Middleware--------> Response

// the HTTP request comes in (the networking part = HTTP TCP/IP)

// then we get to the actual developer part where we are writing our code
// (our node.js/express part) thats the middleware part

// and then the response thats the other networking part where we sending off our response 
// which is going to go back out via HTTP TCP/IP

// the middleware part is all the stuff that happens inbetween the networking part
// middleware in specific express terms is just a bunch of little functions 
// that has access to the req, res, and next object 
// req = request object, res = response object, and next object = (finally send that response out)

// Request-------Middleware--------> Response

// 1. Request comes in 

// Middleware functions
// 2. We need to validate the user, sometimes.
// 3. We need to store some things in the DB.
// 4. If there is data from the user we need to parse it and store it

// 5. Response goes out



function validateUser(req, res, next){
    //get info out of the req object
    //do some stuff with the DB
    //this is a new thing the response object has a pre-built property called locals
    //it is a property pre-built into express and is attached to every response
    //very useful for passing data over to a template
    //every piece of middleware will have access to this variable because 
    //every piece of middleware will have access to the response object
    //This property is useful for exposing request-level information such as 
    //the request path name, authenticated user, user settings, and so on
    //the way that our program is running is that we can do the validation here 
    //using a boolean that gets set here and make use of in our actual route 
    //this is middleware at work because we can out source to one function and 
    //then just make use of it everywhere without having to clutter up our routes
    //by having to call validateUser on every single route
    res.locals.validated = true
    console.log("VALIDATED RAN!")
    // if your working with a piece of middleware if you call next it tells express
    // i want to hand off to the next piece of middleware in the cycle
    // if you dont call next then you have terminated the cycle the process will end
    // and the next piece of middleware will not run
    // this function will run every time an HTTP request is made
    // at the end of it next() gets called which means the next
    // piece of middleware that matches this will run, well app.get is the next piece of 
    // of middleware that matches as long as the user goes to the home page
    next();
}

// what we do here is we call app.use in order to actually call this
// and just like we did with the express.static we hand validateUser to app.use
// and this tells express hey i want to use validateUser at an application level
// so everybody will use validateUser so we dont have to call validator everytime we call a middleware function
//comment this out to see how we need to be on right path to run validateUser
//by changing and setting it to a specific path
//app.use(validateUser); 
app.use('/admin', validateUser);

// app.use() is just the bigger fancier version of app.get()
// because if you wanted to restrict this on say the home page instead of doing app.use() you do app.get()
// so instead of app.use('/', validateUser)
// you do app.get('/', validateUser)
// because validateUser has access to (req, res, next) they both can do the same thing
// the only difference is that app.use does not distinguish between get, post, put, etc..
// and we dont need to specify a path

//   This will run validateUser on ALL paths, all methods!
//   app.use(validateUser)

//   This will run validateUser on ('/admin'), all methods!
//   app.use('/admin', validateUser)

//   This will run validateUser on ('/'), only on all get methods!
//   app.get('/', ValidateUser)




// This will run validateUser
// as long as the user goes to the homepage ('/')
// this will be the next piece of middleware that matches
app.get('/', (req, res, next) =>{
    res.send("<h1>Main Page</h1>")
    //we use a console.log here to see what we get back
    console.log(res.locals.validated)
    //since we dont call next() the cycle ends
})

// This will run validateUser
// as long as the user goes to the admin page ('/admin') 
// this will be the next piece of middleware that matches
app.get('/admin', (req, res, next) =>{
    res.send("<h1>Admin Page</h1>")
    //we use a console.log here to see what we get back
    console.log(res.locals.validated)
    //since we dont call next() the cycle ends
})

app.listen(3000)
