var express = require("express");
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var url =
  "mongodb+srv://diwakar8:diwakar84@cluster0-fyz8b.mongodb.net/test?retryWrites=true&w=majority";
// "mongodb://localhost:27017/";
var DbName = "kabra";
var SECRETKEY = "KABRA";
MongoClient.connect(
  url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  function (err, client) {
    if (err) throw err;
    console.log("DB connected");
    db = client.db(DbName);
  }
);
app.locals.ObjectId;
ObjectId = require("mongodb").ObjectID;

app.get("/", (req, res) => {
  res.send("hi");
});

const verify = (req, res, next) => {
  const bearer = req.headers["authorization"];
  if (bearer) {
    const bearerToken = bearer.split(" ");
    const token = bearerToken[1];
    jwt.verify(token, SECRETKEY, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.userdata = data;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

app.post("/user/signup", (req, res) => {
  console.log(req.body);
  db.collection("user").insertOne(req.body, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
app.post("/user/login", (req, res) => {
  console.log(req.body);
  db.collection("user").findOne({ email: req.body.email }, (err, result) => {
    // console.log(result);
    if (result == null) {
      res.status(400).send("Login Invalid");
    } else if (
      result.email == req.body.email &&
      result.password == req.body.password
    ) {
      var { email, _id } = result;
      jwt.sign({ email, _id }, SECRETKEY, (err, token) => {
        if (err) {
          res.sendStatus(403);
        } else {
          console.log(token);
          res.send({ token });
        }
      });
    }
  });
});

app.get("/product", verify, (req, res) => {
  db.collection("product")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.send({ data: result });
      console.log(result);
    });
});

app.get("/product/:id", (req, res) => {
  db.collection("product")
    .find({ _id: ObjectId(req.params.id) })
    .toArray((err, result) => {
      if (err) throw err;
      res.send({ data: result });
      console.log(result);
    });
});
app.listen(5000);
