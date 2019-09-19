const express = require('express');
const app = express();


// app object has a few methods:
// CRUD app correspondence!
// 1. get = read
// Default for all browsers is get.
// 2. post = create
// 3. delete = delete
// 4. put = update
// HTTP verbs! (more specifically they are the) REST verbs!
// we can handle these requests how we want but we should answer them according to what is requested

// all of these take 2 args:
// 1. path
// 2. callback to run if an HTTP request that matches THIS verb is made to the path in #1

// app.all('/', (req, res) => {
//     res.send(`<h1>Welcome to the home page!</h1>`)
// });


// even though the get and post routes look the same (both have '/') express sees them as very different
// because in the HTTP message when it comes through, a GET and POST is totally different reguardless
// of the path that the user/requester is actually asking for.

// the point is the routing system in express is meant to handle to two things
// 1. the type of HTTP request
// 2. the path that you actually want to fetch

// these verbs are set up to indicate what the person wants from you 
// so when you set them up try to organize your routes so that it makes sense to whoever the requester is

// something to keep in mind is that express works from the top down so if you have more than one 
// of the same type of request only the first will run unless you explicitly tell it to run it aswell

app.get('/', (req, res) => {
    //you can always fetch the get request with the browser
    console.log(req)
    res.send(`<h1>Welcome to the GET home page!</h1>`)
});

app.post('/', (req, res) => {
    res.send(`<h1>Welcome to the POST home page!</h1>`)
});

app.delete('/', (req, res) => {

});

app.put('/', (req, res) => {

});




app.listen(3000);
console.log("The server is listening on port 3000...")