// Networking - http rides on tcp/udp. tcp and ip work together to get your computers ready to talk
// so a server and a client. you are now the server your express server is the server
// and tcp which we are not managing at all thats done at a toltaly different networking level than we are working with

// various benefits of http:
// -stateless
// -connectionless
// -flexible

// -HTTP message looks like:
// -  start line consisted of:
// -  request format
// -  req: method, path, version of http: http/1.1  (http/1.1 is the standard now)
// -  response format
// -  the res: version of http: http/1.1, status code: 200 

// -headers
// -  {key:values}
// -  key:value pair of header content-type:text/html  
// -  key:value pair of header content-type:application.json
// -  key:value pair of header Cache-Control: public, max-age=0
// -  key:value pair of header Date: Fri, 24 Aug 2019 15:23:58 GMT
// -  BLANK LINE
// -  body
// -  the body contains the STUFF - could be: HTML, 4k video (binary), image, etc...

// our portion as developers is we get the request and the last thing we send out is the response
// so we get an http message that comes in the last thing we send out is an http messsage
// we take info out of the http message and we build the http message and we send it out
// using http and using tcp/ip

// Express version 
// - Express is Node.js
// - app === express() app is envoking the express module
// - the express module is really the createApplication function this allows us to make an express app
// - nodes server.listen -----> became express app.listen 
// - router - we built our own router by using these methods:
// - app.get, app.post, app.delete, app.put, etc...
// - served up static files, with express.static() middleware

// - 201
// - middleware = is any function that has access to req. res. and next 
// - the req. and res. objects are ultimately just http messages 
// - req: a start line, the headers, and the body that came in via the network request
// - res: a start line, the headers, and the body as they went out via a network request 
// we as developers we pull that data out of the networking request object
// we build something cool and we send it back out with the response object
// networking on the outside the req. and the res. objects are on the outside
// node/express developement on the inside we use that with app.use 
// and anytime we see a function with req. res. and next inside
// next() is a way to move a piece of middleware forward. without next() the cycle stops 
// express.json() ---> uses body parser
// express.urlencoded() ----> uses boby parser
// te body parser creates req.body
// helmet() ----> 3rd party module that writes safe stuff to the headers to prevent attacks

// Request Object
// - req.ip - contains/fetches the ip of requester
// - req.path - contains the requested path
// - req.body - all the parsed data will be put in req.body as a result of express.json and urlencoded middleware

// Response Object
// - res.send(.end()) - only reason need to use res.end is if for some reason you were going to run a process
// - but never actually respond with something and simply want to close connection off. 
// - res.sendFile - send a file!
// - res.locals - is available throughout the response cycle. to pass parameters between middleware in Express.js
// - use res.locals setting with res.locals.your_variable and then getting with res.locals.your_variable
// - Example:
/*
    app.get('/test', 
    function(req, res, next) { 
        res.locals.custom   = true;
        res.locals.myObject = { hello: 1 };
        next(); 
    }, 
    function(req, res) { 
        console.log('See:', res.locals.custom, res.locals.myObject); 
        return res.status(200).send(res.locals); 
    });
*/
// - remember that variables from the back-end are available only during rendering, not after rendering (usually).
// - res.json (jsonp) - sends json back as application/json
