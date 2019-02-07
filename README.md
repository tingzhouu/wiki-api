# Wiki API
This is a RESTful API for users to read/modify a database which contains article title and content. The word 'wiki' is used only because the API manages articles.
This repository serves to document my learning of using Javascript and Node.js.


## What I Have Used

**Express**
To create server.
Allow user to send GET, POST, PUT, PATCH, DELETE requests to the API.

Specifically, I used the chainable route handlers as there are several types of requests.

I used route parameters to store article name as a parameter if the user wishes to make requests pertaining to a specific article.

**ZEIT NOW**
To host the API online.

**MongoDB and Mongoose**
To store the articles.

**body-parser**
Parse responses to Express.

**express-ip**
For obtaining the Internet Protocol (IP) Address of the user making request.

**Postman**
For API testing as it can send HTTP requests to the API.


## Getting Started (web version)
##### [For ALL Articles](https://wiki-api-tingzhou.now.sh/articles): 
GET request: Click on above link, or send GET request, no content required in the body.


POST request: Send POST request, with {title: String, content: String} in the body.


DELETE request: Send DELETE request, no content required in the body.

##### [For Specific Articles](https://wiki-api-tingzhou.now.sh/articles/ARTICLE_NAME):
GET Request: Modify ARTICLE_NAME in above link, or send GET request, no content required in the body.

PUT Request: Send PUT request, with ```{title: String, content: String}``` in the body.

PATCH Request: Send PATCH request with ```{title: String}``` or ```{content: String}``` in the body.

DELETE Request: Send DELETE request, no content required in the body.


## Getting Started (non-web version)
Open terminal in the directory of folder

Key ```node app.js``` in terminal

Using **Postman** or any other method of API testing,


##### [For ALL Articles](localhost:3000/articles): 

GET (nothing required in the body): Returns all articles in the database.

POST (title and content of article in the body): Creates article object and updates database.

DELETE (nothing required in the body): Deletes all articles in the database.


##### [For Specific Articles](localhost:3000/articles/ARTICLE_NAME): 

GET (nothing required in the body): Returns the specific article.

PUT ```{title: String, content: String}```: Modifies article object of both title and content, and updates database.

PATCH ```{title: String}``` or ```{ content: String}```: Modifies article object of either title or content, and updates database.

DELETE (nothing required in the body): Deletes specific article in the database.

## Authors

* **[Ting Zhou](https://github.com/tingzhouu)**
