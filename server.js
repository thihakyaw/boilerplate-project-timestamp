// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let dateString = req.params.date;

  if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    res.json({
      unix: dateInt,
      utc: new Date(dateInt).toUTCString()
    });
  } else {
    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: dateObject.valueOf(),
        utc: dateObject.toUTCString()
      });
    }
  }
});

app.get("/api/", function (req, res) {
  let currentTimestamp = Date.now();
    res.json({
      unix: currentTimestamp,
      utc: new Date(currentTimestamp).toUTCString()
    });
});

// listen for requests :)
var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
