const path = require('path');


const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(helmet());


app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded());



app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


function validateUser(req, res, next){
    // ... validated logic (in the real world we do some stuff to check to see that they have been validated)
    res.locals.validated = true;
    next();
}

app.use(validateUser)


app.get('/about', (req, res, next) => {
    res.render("about", {})
})


app.get('/', (req, res, next) => {
    //the data, in the 2nd arg, is going to be appended to res.locals
    //the views files already has access to all the properties on the locals object
    res.render("index", {
        countries: [
        {
            name: "Russia",
            capital: "Moscow",
            western: false
        },
        {
            name: "England",
            capital: "London",
            western: true
        }
    ],
        msg: "Success!",
        msg2: "Failure!",
        //HTML came from the DB and we want to drop it in the template
        html: '<p><img src="data:image/jpeg;base64,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"/></p>'
    })
});

app.listen(3000);

