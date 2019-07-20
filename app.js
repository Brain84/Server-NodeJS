const express = require('express');
const path = require('path');

const app = express();

// Create server on port 3000
app.listen(3000, () => {
  console.log('Server is listening at http://localhost:3000');
});

// Load http://localhost:3000/home in a browser to see 'Home page'
app.get('/home', (req, res) => {
  res.send('Home page');
});

// Load http://localhost:3000/about in a browser to see 'About us'
app.get('/about', (req, res) => {
  res.send('About us', );
});

// Load http://localhost:3000/search in a browser to see home page Google
app.get('/search', (req, res) => {
  res.redirect('https://google.com');
});

// Load http://localhost:3000/logo in a browser to see a photo
app.get('/logo', (req, res) => {
  const fileName = 'logo.jpg';

  res.sendFile(fileName, {
    root: path.join(__dirname, 'public/images'),
  });
});

// Load http://localhost:3000/user/logout in a browser to clear cookie
app.get('/user/logout', (req, res) => {
  res.clearCookie('visitor_name');
  res.send('Cookie has been cleared');
});

// Instead ':name' you can use any string eg. 'Paul'. Load http://localhost:3000/user/Paul in a browser to create cookie (name of cookie is Paul)
app.get('/user/:name', (req, res) => {
  const { name } = req.params;
  const dt = new Date();

  dt.setDate(dt.getDate() + 30); // expires of cookie in 30 days

  res.cookie('visitor_name', name, {
    expires: dt, 
  });

  res.send('Name of visitor is in cookie');
});

// Load http://localhost:3000/json in a browser to see a 'pageUsers' in format json
app.get('/json', (req, res) => {
  const pageUsers = [
    {
      id: 1,
      name: 'Peter',
      age: 25,
    },
    {
      id: 2,
      name: 'Kate',
      age: 31,
    },
  ];

  res.json(pageUsers);
});

// Load any another string eg. 'xyz' localhost:3000/xyz in a browser to see 'Page Not found 404'
app.get('*', (req, res) => {
  res.send('<h1>Page Not found 404</h1>', 404);
});