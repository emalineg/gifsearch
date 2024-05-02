// Require Libraries
// ---------------
const express = require('express');
const tenor = require('tenorjs').client({
    "Key": "AIzaSyDESZUdI4k1MrK04Ncji7d2GYLcCPyscPY", 
    "Filter": "high",
    "Locale": "en_US",
});

// ---------------
// App Setup // 
// ---------------
const app = express();
// Static files live here
app.use(express.static('public'));

// ---------------
// Middleware //
// ---------------
// Allow Express(web framework) to render HTML templates and send them back to the client using a new function
const handlebars = require('express-handlebars');

const hbs = handlebars.create({
    // Specify helpers which are only registered on this instance
    helpers: {
        foo() { return 'FOO!';},
        bar() { return 'BAR!'; }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// ---------------
// Routes // 
// ---------------
// Show a gif image
app.get('/', (req, res) => {
   // Handle the home page when we haven't queried yet
   term = "cats"
   //--------
   if (req.query.term) {
        term = req.query.term
   }

    // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
    tenor.Search.Query(term, "10")
    .then(response => {
        // store the gifs we get back from the search
        const gifs = response;
        // pass the gifs as an object into the home page
        res.render('home', { gifs })
    }).catch(console.error);
});

// Show a greeting to a user with their name
app.get('/greetings/:name', (req, res) => {
    // Grab the name from the path provided
    const name = req.params.name;
    // Render the greetings view, passing along the name
    res.render('greetings', { name });
});

// ---------------
// Start Server //
// ---------------
app.listen(3000, () => {
    // See message in terminal
    console.log('Gif Search listening on port localhost:3000!');
});
