const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use( (req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log( log );
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
});

// MAINTENANCE DIRECIVE
// app.use((req, res, next) => {
//   res.render('maintenance' )
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return  new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
} );

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle:    'Home Page',
    welcomeMessage:  'Wecome to Site Awesome!'
  } )
  // res.send('<h1>Hello Express!<h1>');
  // res.send({
  //   name: 'David',
  //   likes: ['pizza', 'lobster', 'Maine']
  // })
} );

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page',
  });
})

app.get('/bad', (req, res) => {
res.send({
  errorMessage: 'Unable to handle request'
})
})

const port = 3000;
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});