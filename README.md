# CSCI5709_S24_Group_Project



## Backend
### Services
#### Email Service
It uses the nodemailer package which provides an easy-to-use API for sending emails.
It uses GMail to send emails.

### Folder Structure
A common folder structure for a Node.js project using Express and following the MVC (Model-View-Controller) pattern, here's a brief explanation of each folder:

config: Contains configuration files such as database connection, email service setup, and other environment variables.

controllers: Handles the application logic, interacts with models and services.

models: Defines database schema and interacts with the database.

routes: Defines the routes for your API endpoints.

services: Contains business logic that is reused throughout the application.

middlewares: Contains custom middleware functions.

utils: Contains utility functions such as error handling, logging, etc.

tests: Contains unit and integration tests for your application.

server.js: Entry point of your backend application.

package.json: Manages project dependencies and scripts.


## Frontend