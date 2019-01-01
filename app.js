const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressip = require("express-ip");

const app = new express();


app.use(bodyParser.urlencoded({ extended: true} ));
app.use(expressip().getIpInfoMiddleware);

app.use(function (req, res, next) {
  logTheRequestToDB(req);
  next();
});


mongoose.connect(`mongodb+srv://admin-tingzhou:${process.env.MONGO_PASSWORD}@cluster0-71gbh.mongodb.net/wikiDB?retryWrites=true`, {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true}); //- Used for testing on localhost

app.listen(process.env.PORT || 3000, function() {
  console.log("listening");
});

// Creates a mongoose schema that stores all requests made to the API.
const requestLogSchema = mongoose.Schema({
  ipInfo: Object,
  userAgent: String,
  path: String,
  method: String,
  title: String,
  content: String,
});

// Creates a mongoose model for requests in the database.
const RequestLog = mongoose.model("RequestLog", requestLogSchema);

// Function to log a request into the database.
function logTheRequestToDB(req) {
  let newRequestLog = new RequestLog({
    ipInfo: req.ipInfo,
    userAgent: req.headers["user-agent"],
    path: req.originalUrl,
    method: req.method,
    title: req.body.title,
    content: req.body.content,

  });
  newRequestLog.save();
  console.log("log request first");
}

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

//Creates mongoose model for articles in the database.
const Article = mongoose.model("Article", articleSchema);



//This is a chainable route handler for requests of all articles - /article.
//There are 3 route handlers: get, post, delete.
app.route("/articles")
.get(function(req, res, next) { // no parameters are sent to the API. API returns all articles.

  Article.find({}, function(err, allArticles) {
    if (!err) {
      console.log("Request successful");
      res.send(allArticles);
    } else {
      res.send(err);
    }
  });
})
.post(function(req, res, next) { //title and content of article is sent to the API. API creates article object and updates database.
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
.delete(function(req, res, next) { //no parameters are sent to the API. API deletes ALL article objects from the database.
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
.get(function(req, res, next) { //name of article is sent to the API. API returns article object.
  let inputArticleName = req.params.articleName;
  Article.findOne({title: inputArticleName}, function(err, foundArticle) {
    if (!err) {
      res.send(foundArticle);
    } else {
      res.send(err);
    }
  });
})
.put(function(req, res, next) { //name of article, new title AND new content of article is sent to the API. API updates article object.
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
.patch(function(req, res, next) { //name of article, new title OR new content of article is sent to the API. API only updates article object of fields sent.
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
.delete(function(req, res, next) { //tile of article is sent to the API. API deletes article object from database.
  let inputArticleName = req.params.articleName;
  Article.deleteOne({title: inputArticleName}, function(err) {
    if (!err) {
      res.send("Successfully deleted article");
    } else {
      res.send("Could not delete article");
    }
  });
});
