const express = require('express');
const app = express();
const helmet = require('helmet')

// there is no reason not to include helmet on just about all your applications
// Helmet can help protect your app from some well-known web vulnerabilities 
// by setting HTTP headers appropriately.
// Helmet is actually just a collection of smaller middleware functions 
// that set security-related HTTP response headers:
app.use(helmet());

// here we do app.use() because this is a new piece of middleware we are bringing in

// express.static() is a piece of middleware that has access to (req, res, next)
app.use(express.static('public'))

// express.json() is native middleware to express
// if we open the package.json we will find body-parser because express uses body-parser for express.json
// json is any data that comes into any server (be it an express server or any other server) as a basic string
app.use(express.json())

// express.urlencoded([options]) is also native middleware to express
// It parses incoming requests with urlencoded payloads and is based on body-parser. 
// type = This is used to determine what media type the middleware will parse. default is "application/x-www-form-urlencoded"
// extended = This option allows to choose between parsing the URL-encoded data with the querystring library
// (when false) or the qs library (when true). The “extended” syntax allows for rich objects and arrays
// to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. 
app.use(express.urlencoded({extended:false}));


app.post('/ajax', (req, res) => {
    // if someone sends us data with this header = x-www-form-urlencoded we need 
    // this = express.urlencoded({extended:false}) to parse it out for us, and put it inside req.body for us
    // the urlencoded is very important because inside the origin there is this property
    // 'context-type': 'application/x-www-form-urlencoded: charset=UTF-8'
    // that we can see using this console.log
    // console.log(req.headers);

    // the reason its called req.body is because its based on the body parser
    // in this case req.body has a req.body.name because req.body is a mirror image of the object that was sent
    // with the form or ajax request or whatever was sent. across the wires came HTTP traffic 
    // we pulled out of the headers a urlencoded mime-type and in that data we parse it and ended up with an object
    // that looks like this { name: 'Rob' } (which is what we have in our ajax.html file)
    // two quick notes:
    // 1. in the ajax.html file even though we specified the data type as json it still sent it though as urlencoded
    //    unless you specifically change the headers that still went through like that
    // 2. req.body only exists because these created it:
    //    app.use(express.json())
    //    app.use(express.urlencoded({extended:false}));
    // req.body is not something that by default exists in express, its only there because json is creating it
    // through those two pieces of middleware. these two pieces of middleware are very important because
    // they will collect almost any type of submitted data, parse it for you, and give it to you in json format
    console.log(req.body);
    // express has been writing the headers, the status code, and mime-type for us
    // but in some cases as a use case to open up to certain types of ajax requests in chrome we will
    // have to deal with some CORS issues and thats something express will not do without us telling it to
    // but in this case res.send by default is going to set a mine-type of html. if we switch this to
    // res.json this is now going to change the mime-type to application.json
    // res.send("Test") switch to res.json("Test")
    // now the promise will work because jquery or axios or any other (xml/http client) will accept this mime-type
    res.json("Test")
});

// Just about every app will use these 3 middlewares:
// 1. static
// 2. json
// 3. urlencoded


app.listen(3000)