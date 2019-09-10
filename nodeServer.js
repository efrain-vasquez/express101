//http is native to Node.js We just have to ask for it
const http = require('http');

// the http module is simply part of Node.js we dont have to install it 
// because it simply comes because we have node.js that is the module 
// that allows us to make http requests, responses and has those req. and res. 
// objects for us to interact with. This http module has a createServer method that comes with it.
// It takes one argument, that argument is a callback and that callback has two arguments
// a req and a res object.
// the req and res are local variables but for conventional reasons we should call them this
// because node.js has node modules called request and response so to not get confused use
// req and res instead.
// we create a server using the http module to create the server and using the createServer method
// which is a (function) that takes a call back to run and that will happen whenever an http request
// is made. An http request is made when the port gets a request via the listen method.
// if some traffic shows up there will be a server waiting and the createServer method (function)
// will get run it will get handed the request object
const server = http.createServer((req, res) => {
    // console.log(req)
    // res object = our way of responding to the requester
    // http message
    // 1. start-line - (CHECK) node takes care of this for us
    // 2. header we need to write the header out there is a writeHead method for this
    // 3. body we write body out using res.write method
    // writeHead takes 2 args:
    // 1. status code
    // 2. object for the mime-type
    res.writeHead(200, {'content-type':'text/html'});
    res.write('<h1>Hello, World</h1>');
    res.end();
});


// createServer returns an object with a listen method 
// listen takes 1 argument:
// 1.port to listen for http traffic on
// An http request is made when the port gets a request via the listen method.
// the server is listening for http traffic on port 3000
// if some traffic shows up there will be a server waiting and the createServer method (function)
// will get run it will get handed the request object
server.listen(3000);