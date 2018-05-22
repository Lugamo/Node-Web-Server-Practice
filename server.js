const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

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
//when the web is in maintenance
// app.use((req, res, complete) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
   res.render('home.hbs', {
     pageTitle: 'Home Page',
     mainText: 'amazing'
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

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects',
    NumberOfProjects: 7
  })
});

app.listen(3000, () => {
   console.log(`Example app listening on port ${port}`)
});
