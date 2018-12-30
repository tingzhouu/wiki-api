const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = new express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true} ));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});


//Creates mongoose schema with title and content of an article.
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

//Creates mongoose model in the database.
const Article = mongoose.model("Article", articleSchema);


//This is a chainable route handler for requests of all articles - /article.
//There are 3 route handlers: get, post, delete.
app.route("/articles")
.get(function(req, res) { // no parameters are sent to the API. API returns all articles.
  Article.find({}, function(err, allArticles) {
    if (!err) {
      res.send(allArticles);
    } else {
      res.send(err);
    }
  });
})
.post(function(req, res) { //title and content of article is sent to the API. API creates article object and updates database.
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function(err) {
    if (!err) {
      res.send("Article successfully added.");
    } else {
      res.send(err);
    }
  });
})
.delete(function(req, res) { //no parameters are sent to the API. API deletes ALL article objects from the database.
  Article.deleteMany({}, function(err) {
    if(!err) {
      res.send("All articles have been deleted");
    } else {
      res.send(err);
    }
  });
});


// This is a chainable route handler for requests of specific articles - article/<ArticleName>.
// There are 4 route handlers - get, put, patch, delete.
app.route("/articles/:articleName")
.get(function(req,res) { //name of article is sent to the API. API returns article object.
  let inputArticleName = req.params.articleName;
  Article.findOne({title: inputArticleName}, function(err, foundArticle) {
    if (!err) {
      res.send(foundArticle);
    } else {
      res.send(err);
    }
  });
})
.put(function(req,res) { //name of article, new title AND new content of article is sent to the API. API updates article object.
  let inputArticleName = req.params.articleName;
  Article.update(
    {title: inputArticleName},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err) {
      if (!err) {
        res.send("Successfully updated article");
      } else {
        res.send("Could not update article");
      }
    }
  );

})
.patch(function(req, res) { //name of article, new title OR new content of article is sent to the API. API only updates article object of fields sent.
  let inputArticleName = req.params.articleName;
  Article.update(
    {title: inputArticleName},
    {$set: req.body},
    function(err) {
      if (!err) {
        res.send("Successfully updated article");
      } else {
        res.send("Could not update article");
      }
    }
  );
})
.delete(function(req, res) { //tile of article is sent to the API. API deletes article object from database.
  let inputArticleName = req.params.articleName;
  Article.deleteOne({title: inputArticleName}, function(err) {
    if (!err) {
      res.send("Successfully deleted article");
    } else {
      res.send("Could not delete article");
    }
  });
});


app.listen(3000, function() {
  console.log("Server started listening on port 3000");
});
