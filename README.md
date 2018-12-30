# Wiki API
This is a RESTful API for users to read/modify a database which contains article title and content. The word 'wiki' is used only because the API manages articles.
This repository serves to document my learning of using Javascript and Node.js. 


## What I Have Used

**Express**
To create server.
Allow user to send GET, POST, PUT, PATCH, DELETE requests to the API. 

Specifically, I used the chainable route handlers as there are several types of requests.

I used route parameters to store article name as a parameter if the user wishes to make requests pertaining to a specific article.

**MongoDB and Mongoose**
To store the articles

**body-parser**
Parse responses to Express

**Postman**
For API testing as it can send HTTP requests to the API.


## Getting Started (non-web version)
Open terminal in the directory of folder

Key **node app.js** in terminal

Using **Postman** or any other method API testing, 

**- For ALL Articles** localhost:3000/articles

GET (nothing required in the body): Returns all articles in the database.

POST (title and content of article in the body): Creates article object and updates database.

DELETE (nothing required in the body): Deletes all articles in the database.

**- For Specific Articles** localhost:3000/articles/**articleName**
  
GET (nothing required in the body): Returns the specific article.

PUT (title AND content of article in the body): Modifies article object of both title and content, and updates database.

PATCH (title OR content of article in the body): Modifies article object of only title or content, and updates database.

DELETE (nothing required in the body): Deletes specific article in the database.

## Authors

* **[Ting Zhou](https://github.com/tingzhouu)**
