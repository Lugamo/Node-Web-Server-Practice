const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const  app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getcurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('getCapitalize', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) =>{
    if (error) {
      console.log('unable to append to server.log');
    }
  });
  next();
});
app.use((req, res, complete) => {
  res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public'));
app.get('/', (req,res) => {
   res.render('home.hbs', {
     pageTitle: 'Home Page',
     mainText: 'Welcome Dude'
   });
});

app.get('/about', (req,res) => {
   res.render('about.hbs', {
     pageTitle: 'About Page',
   });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fullfil this request'
    });
});

app.listen(3000, () => {
   console.log('Example app listening on port 3000!')
});
