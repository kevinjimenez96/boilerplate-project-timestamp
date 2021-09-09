// server.js
// where your node app starts

// init project
const express = require('express');

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// your first API endpoint...
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get('/api', (req, res) => {
  const date = new Date();

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get('/api/:date', (req, res) => {
  const inputDate = req.params.date;
  let date = new Date(inputDate);
  if (Number.isNaN(date.getTime())) {
    date = new Date(parseInt(inputDate, 10));
  }
  if (Number.isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }
  return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
