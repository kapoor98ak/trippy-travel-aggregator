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

routes: Defines the routes for our API endpoints.

services: Contains business logic that is reused throughout the application.

middlewares: Contains custom middleware functions.

utils: Contains utility functions such as error handling, logging, etc.

tests: Contains unit and integration tests for our application.

server.js: Entry point of our backend application.

package.json: Manages project dependencies and scripts.

### Example File System explanation

The role of each file in our Node.js backend project:

server.js (or app.js):

This file is typically the entry point of our application.
It initializes and configures the Express server.
It listens for incoming HTTP requests and routes them to the appropriate handlers.
It often sets up middleware, such as body parsers and error handlers.
In our project, app.js fulfills this role.

emailService.js:

This file contains the logic for sending emails.
It typically uses a third-party library like Nodemailer to send emails.
It abstracts away the email sending functionality so that it can be easily used by other parts of the application.
It may contain additional logic for formatting emails, handling attachments, etc.

routes/index.js:

This file aggregates all route handlers and exports them as a single module.
It allows for modularization and organization of route definitions.
It often serves as the entry point for defining routes in our application.

routes/emailRoutes.js:

This file defines routes related to email functionality.
It specifies the HTTP endpoints (e.g., /api/email/send) and associates them with corresponding controller functions. (Controller functions for each /xyz is present here - the binding needs to be done here!)
It delegates the handling of HTTP requests to the appropriate controller functions. (What function to call when we hit /xyz)

emailController.js:

This file contains the controller functions for handling HTTP requests related to email functionality.
Each function typically corresponds to a specific route endpoint and performs the necessary logic, such as validating input, calling service functions, and sending responses.
It separates the concerns of routing and business logic, making the codebase more modular and maintainable.

config.js:

This file contains configuration settings for our application.
It often includes environment-specific configurations (e.g., database connection strings, API keys).
It abstracts away configuration details from the rest of the application and centralizes them in one place for easy management.

In summary, each file in our project plays a specific role in the overall architecture of our Node.js backend. app.js sets up and runs the Express server, while emailService.js handles the logic for sending emails. routes/*.js files define the API routes and delegate request handling to controller functions. emailController.js contains the business logic for email-related requests, and config.js manages application configuration settings. Together, these files work cohesively to provide the desired functionality for our backend application.


Service has the implementation logic.
Controller defines the functions.
Routes bind the controller function to HTTP Endpoints.

## Frontend