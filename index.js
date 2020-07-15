var express = require('express')

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/profile', function (req, res, next) {
  console.log(req.body)
  res.json(req.body)
})

app.get("/", function(req, res) {
  res.json({
    status: "My API is alive!"
  });
});

app.listen(3000, function() {
  console.log('Your server available at http://localhost:3000.');
});
