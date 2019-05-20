
[![Build Status](https://travis-ci.org/successgilli/quick-credit.svg?branch=develop)](https://travis-ci.org/successgilli/quick-credit)
[![Coverage Status](https://coveralls.io/repos/github/successgilli/quick-credit/badge.svg?branch=develop)](https://coveralls.io/github/successgilli/quick-credit?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/4073e8f791399ecb2848/maintainability)](https://codeclimate.com/github/successgilli/quick-credit/maintainability)

https://quickcreditgilli.herokuapp.com/api/v1
# Quick Credit
Quick Credit is an online lending platform that provides short term soft loans to individuals. This
helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.



### IMPLEMENTED FEATURES

 * Real Time email notification on approval or rejection of loan application.
 * User (client) can sign up.
 * User (client) can login.
 * User (client) can request for only one loan at a time.
 * User (client) can view loan repayment history, to keep track of his/her liability or
responsibilities.
 * Admin can mark a client as verified , after confirming his/her home and work address.</li>
 * Admin can view a specific loan application.
 * Admin can approve or reject a client’s loan application.
 * Admin can post loan repayment transaction in favour of a client.
 * Admin can view all loan applications.
 * Admin can view all current loans (not fully repaid).
 * Admin can view all repaid loans.


 


### USER INTERFACE

User interface is hosted <a href= "https://successgilli.github.io/quick-credit/">here</a>.
API is hosted <a href= "https://quickcreditgilli.herokuapp.com/api/v1">here</a>.
Swagger documentation <a href= "https://quickcreditgilli.herokuapp.com/api-docs">here</a>.



### TECHNOLOGIES USED

**User Interface**
* Hyper Text Mark-up Language
* Cascading Styles Sheet
* Javascript

#### Server-side API ####
* <a href= "https://nodeJS.org">NodeJS</a>  - A runtime environment based off of Chrome's V8 Engine for writing Javascript code on the server.
* <a href="https://expressJS.com">ExpressJS</a>  - A Web framework based on Node.js.
    
**Development Tools**
* <a href="https://babeljs.io">Babel</a> - A javascript transpiler.
* <a href = "https://eslint.org/">ESlint</a> - A javascript code linting library.
* <a href = "https://https://github.com/airbnb/javascript">Airbnb</a> - ESlint style guide.

**Testing tools**
* <a href="https://www.npmjs.com/package/mocha">mocha</a> - A Javascript testing framework.
* <a href= "https://www.npmjs.com/package/chai">Chai</a> - An assertion library
### API INFORMATION

|   METHOD      |  DESCRIPTION   | ENDPOINT                    |
| ------------- | -------------- |-----------------------------|
|   POST        | Create user account |`POST /auth/signup`          |
|   POST         | Login a user  |`POST /auth/signin`|
|   PATCH        | Mark a user as verified.|`PATCH /users/<:user-email>/verify`          |
|   GET         | Get all current loans that are not fully repaid.|`GET /loans?status=approved&repaid=false`|
|   GET         |Get a specific loan application. |`GET /loans/<:loan-id>`|
|   GET         |Get all repaid loans.|`GET /loans?status=approved&repaid=true`|
| GET |GET /loans|`Get all loan applications.`|
| GET |View loan repayment history.|`GET /loans/<:loan-id>/repayments`|
| POST | Create a loan application|`POST /loans`|
| PATCH |Approve or reject a loan application. Specify the status in the request’s body.|`PATCH /loans/<:loan-id>`|
| POST |Create a loan repayment record.|`POST /loans/<:loan-id>/repayment`|

 
 
### HOW TO INSTALL THIS APP

**Installation**
* Install the latest version of <a href="https://nodejs.org">nodeJS</a>
* Clone this repository using git clone https://github.com/successgilli/quick-credit.git 
* Run npm install to install all dependencies.
* Run npm start to start the server.
* Navigate to `localhost:8080/api/v1` in your browser to access the application.

**Testing**
* Install <a href="https://www.getpostman.com/apps">Postman</a>
* Test the endpoints manually by sending requests to `localhost:8080/endpoint`
* Run `npm test` on your local terminal to test automatically.

### AUTHOR
AWAJI-MITOP N. GILBERT


