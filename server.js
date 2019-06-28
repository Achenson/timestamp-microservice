const express = require('express')
const app = express()
const port = 3000
// nodemon installed!


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//app.get('/', (req, res) => res.send('Hello World!'))

//http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (_req, res) {
 res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/timestamp/:date_string?", function (req, res) {

  let myDate;

  if(req.params.date_string === undefined) {
    myDate = new Date();
    console.log(myDate);

  } else {
    myDate = new Date(req.params.date_string);
    console.log(myDate);

    //NaN is not equal to itself
    if(myDate.getTime() !== myDate.getTime()) {
      res.send({"error": "Invalid Date"});
      return;
    }
  }

  res.send({"unix": myDate.getTime(), "utc": myDate.toUTCString()});

});


app.listen(port, () => console.log(`Example app listening on port ${port}`))


