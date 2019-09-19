//http is native to Node.js We just have to ask for it
//node is great at managing http traffic
const http = require('http');
//to read contents of files we need the fs module
//fs = file system module: fs is built into Node.
//fs gives node access to THIS computers file system does not give the requester access.
//node server is running on this computer so this file needs access to this computers
//file system there is no security issue here
const fs = require('fs');

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
// the server is an http server so if traffic shows up it will quick create an http server
// to handle that traffic it will have the request object which is every known thing about the 
// http requester it will also create a response object so we can manage the response as developers
// that we can send back without having to deal with all of the networking stuff as developers we
// still have to send back the http response but we dont have to deal with the start line
// we do have to write the header we use writeHead to do that we send back the code and we send
// back the mime-type. In the header we also have to write the body we use write method to do that
// and then we close off the connection so the browser is not left hanging. 
// http is not made to deal with the response object 
const server = http.createServer((req, res) => {
    //inside the req object we have a URL property
    //console.log(req.url)
    //the user wants the homepage, we know because the req object has '/' in the url property
    // we have a use case for our homepage
    if (req.url === '/') {
    // our server is listening for network traffic specifically http network traffic
    // on port 3000 doesnt make any difference what path the user comes to or what type of
    // request is being made node does it job it will run the http.createServer function
    // its our job as developers to decide what to do inside this function or this callback
    // node will give us the req and res object it will give us all the http info all the info
    // inside the http message it also gives us a res object so we can respond
    // how we want to. http is the protocal but its our job as developers to decide how to respond 
    
    // console.log(req)
    // res object = our way of responding to the requester
    // http message
    // 1. start-line - (CHECK) node takes care of this for us
    // 2. header - we need to write the header out there is a writeHead method for this
    // 3. body - we write body out using res.write method
    // writeHead takes 2 args:
    // 1. status code
    // 2. object for the mime-type

    // what we will do now is instead of putting an h1 in our server we will server up an html file
    // but what we are really serving up is a response what we will do is read from a file and send
    // the contents of that file back to whoever asked. 
      res.writeHead(200, {'content-type':'text/html'});
    //res.write('<h1>This is the home page!</h1>');
    //in place of res.write we will use a const instead and set it equal to fs.readFileSync('node.html')
    //we hand readFileSync the name of the file which is node.html 
    //what this does is bring the contents of this file into this variable
    //this variable becomes a (buffer) which is useful to node 
    //node converts this into something useful for us
      const homePageHTML = fs.readFileSync('node.html')
    //this is not the content itself meaning its not the file itself but the content of the file 
    //the (buffer) we send that over in the response
      res.write(homePageHTML) 
    //then we close the response  
      res.end();

    //this allows the server to respond to the req for the image and send the file
    //the mime-type for this image is png
    //this handles the second http req for the image
    //we have a use case for our image
    }else if(req.url === "/node.png"){
      res.writeHead(200, {'content-type':'image/png'});
      const image = fs.readFileSync('node.png')
      res.write(image)
      res.end();

    //we need this route for the third http req we get for /styles.css
    //the mime-type is /css express handles the mime-types for you
    //we have a use case for our stylessheet

    }else if(req.url === "/styles.css"){
      res.writeHead(200, {'content-type':'text/css'});
      const css = fs.readFileSync('styles.css')
      res.write(css)
      res.end();

    //if wanted to add a JS file we would need to add another else statement 
    //to deal with that URL or path the req is asking for 
    //this is our responsibility now because http is not made to deal with that
    //this is simply the network letting us know what the requester is asking for
    //its our job to build the response object and to respond accordingly
    //express takes care of most of this for us we get to escape all these if statements
    //the res.writeHead the res.end

    
    //we have a use case for everything else
    }else{
      //without the code above this is not a file server it sends back a 404 the server  
      //is set up to send responses not files so sends a 404. 
      res.writeHead(404, {'content-type':'text/html'});
      res.write(`<h4>Sorry, this isn't the page your're looking for!</h4>`);
      res.end();
    }
});


// createServer returns an object with a listen method 
// listen takes 1 argument:
// 1.port to listen for http traffic on
// An http request is made when the port gets a request via the listen method.
// the server is listening for http traffic on port 3000
// if some traffic shows up there will be a server waiting and the createServer method (function)
// will get run it will get handed the request object
server.listen(3000);