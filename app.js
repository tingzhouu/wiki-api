const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = new express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true} ));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const Article = mongoose.model("Article", articleSchema);


app.get("/articles", function(req, res) {
  Article.find({}, function(err, allArticles) {
    if (!err) {
      res.send(allArticles);
    } else {
      res.send(err);
    }
  });
});




app.listen(3000, function() {
  console.log("Server started listening on port 3000");
});
