
const path = require('path');
//we bring in express
const express = require('express');
//we envoke express and put that inside of app
const app = express();

//this is a third party module
const cookieParser = require('cookie-parser')

//we bring in helmet
const helmet = require('helmet');
//we add that as middleware
app.use(helmet());

//we use public as our static folder using the express static middleware
app.use(express.static('public'));
//we bring in json and urlencoded from the express object and add them as middleware 
//this way any data that comes in will be added to req.body
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

//we set the view engine to ejs
app.set('view engine', 'ejs');
//we set the location of the views property to /views
app.set('views', path.join(__dirname, 'views'));

//and we have a single route thats sending a Sanity Check
app.get('/', (req, res, next) => {
    res.send("Sanity Check")
})

app.get('/login', (req, res, next) => {
    res.render('login')
})



// the browser will never see this page because the user comes here and as soon as they submit the form 
// they get redirected because there is no res.render, res.json, or res.send here there is only res.redirect 
// which means we will hit this route just long enough to check to see if the password is "x" or not 
// and then get redirected to either welcome or login there is no other option
// this post route its only purpose is for the user to submit some data 
app.post('/process_login', (req, res, next) => {
    //req.body is parsed body data
    const password = req.body.password;
    const username = req.body.username;
    // check the DB to see if user credentials are Valid
    // if they are valid...
    // - send them to the welcome page but first
    // - save their username in a cookie so its readily available
    // - you can use sessions to do the same thing the difference is 
    // - Cookies are only stored on the client-side machine (the visitor's browser)
    // - the browser will send it up to the server everytime a request is made
    // - Sessions data get stored on the server and the browser is given a key for that data
    // - sessions are not built into express but cookies are. you can also use local data
    if(password === "x"){
        // res.cookie takes 2 args:
        // - 1.name of the cookie
        // - 2. value to set it to
        // we store that data in a cookie so going forward we can access it on any page 
        // and we dont need to remember it if the user comes back we wont have access to req.body anymore
        // we send them to a new path we get a totally new response and totally new request 
        // that just the nature of http (its stateless) there is no conversation or dialogue going on
        // its just a one off you get a req and a res and then we start all over, thats what the cookie is for
        // the response object can set cookies
        // here cookie is singular because you can only set one cookie at a time
        res.cookie('username', username);

        // the redirect method can move the user on programmatically rather than clicking on something
        // or typing it in on the url we can move them around internal to express
        // res.redirect() takes one arg:
        // where to send the browser
        res.redirect('/welcome');
    } else {
        res.redirect('/login?msg=fail')
    }
    //req.body is made by urlencoded middleware, which parses the http message for sent data!
    //urlencoded middleware will have added to the req object a body property 
    //which will have these two pieces of data in it: username and password 
    //because thats how we are sending it over in our form
    //res.json(req.body)
})

//this is a get request we are just redirecting them to welcome
app.get('/welcome', (req, res, next) => {
    // this is welcome.ejs
    res.render('welcome', {

    // on the first request the data was sent through req.body but this is a totally new request
    // req.body is now empty that is why we saved the data in a cookie. this way of using res.render will not work
    // so instead sending req.body.username we send req.cookie.username
    // res.render('welcome', {
    //    username: req.body.username 
    // })

        //req.cookies object will have a property for every named cookie that has been set.
        //here cookies is plural because we presumably have multiple cookies
        //before we do this we actually have to go and fetch the cookie parser
        //because that is not part of the body, the cookies are sent throught the http message
        //the same way the data is from the form but we need something else because
        //urlencoded and json will not be able to do those. so we will do an app.use(cookieParse())
        username: req.cookies.username
    })
});

//an achor tag (welcome.ejs) always means its a get request for the route
app.get('/logout', (req, res, next) => {
    // res.clearCookie takes 1 arg:
    // 1. Cookie to clear (by name)
    // here we hand res.clearCookie() username this is good practice because
    // it removes the cookie from there computer. which cookie the username cookie
    // good practice once the data is no longer needed to get it out of there system
    // so your not clogging it up, and so sensitive data is not available later on
    // to see what cookie is currently in your browser you can click on application tab 
    // on your chrome dev tools on left hand side you see the various storages
    // click on the cookies it will show you the domain they are found in 
    res.clearCookie('username');
    res.redirect('/login')
})

//app is listening on port 3000
app.listen(3000);
console.log("Server listening on port 3000...")



