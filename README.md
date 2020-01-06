# INVOICERR

## Server

* NodeJS with Typescript
* 3 microservices (auth, contacts, invoice)
* All services use minimalist web framework ExpressJS
* Used yarn Workspaces for monorepo management
* Shared module for common code (e.g. ExpressJS middlewares and type definitions)

### Project structure

Inspired by "Bulletproof node.js project architecture" https://github.com/santiq/bulletproof-nodejs

### Configuration

All config parameters are configurable by enviromnment variables.
Each service has config file in `/config/index.ts`.
Each config file usually includes:
* port to run at
* connection to database
* secret for microservices communication
* URL to other microservices

### Authorization

On each user request, `Authorization` header with JWT token is sent. JWT data includes information about user. In ExpressJS middleware, JWT token is extracted and validated. If token is valid, local request variable with user info is set. This variable can be used in resolver functions.

In "invoice" and "contact" microservices, JWT token is sent to "auth" service, that extracts user data and send them back.

The following middlewares are used for authorization:
* ensureRole(roles: string[]) - ensures that user has perimssion to access given endpoint. Returns code 403 or continues middleware chain.
* ensureLoggedIn

### Communication between microservices

Each service is configured by enviroment variables. In these variables, service receives URLs to other services. Each service endpoints start with one of two prefixes:
* internal/*
* public/*

Internal endpoints are only accessible inside internal network. Public endpoints are exposed to clients by nginx sitting in front of services.

For better security inside internal network, each service is configured by `COMMUNICATION_SECRET` environment variable and accept only internal requests that include this secret in authorization header. This check is performed in `interComMiddleware` middleware.

### Nginx

Nginx is used to expose the application to clients. This enables to access all services by accessing single server. Nginx is used as reverse-proxy. Nginx configuration is localted in `/nginx/nginx.conf`.

Kubernetes ingress could be used instead, if application would be running in k8s cluster.

### Database
MongoDB is used as database. Each microservices is managing only it's own collections. `Mongoose ODM` (https://mongoosejs.com/) is used as an extra layer to create, manage and validate data models.

### Auth microservice
Manages users and authorization.

Internal endpoints:
* `getUser` - return user by JWT token
  
Public endpoints:
* POST `/user` - create new user
* GET `/users` - return all users
* GET `/user/:id`
* DELETE `/user/:id`
* PUT `/user/:id`
* POST `/change-password` - change password for current logged-in user
* POST `/login` - login, returns JWT token

### Contacts microservice
Manages contacts and company information

Internal endponts: `packages/contacts/src/api/routes/internal.ts`

Public endpoints: `packages/contacts/src/api/routes/public.ts`

### Invoice microservice
Manages invoices

Internal endponts: `packages/invoice/src/api/routes/internal.ts`

Public endpoints: `packages/invoice/src/api/routes/public.ts`

## Client

* ReactJS with TypeScript
* `styled-components` for styling (CSS)
* `formik` for form management
* `react-pdf` for pdf rendering

### Styling

Styling has been done from ground up without using any existing layouts. CSS is written in library `styled-components`, which couples css code with React components for better maintainability and readability.

Design is responsive.

## Starting the project

To start the project (all servers with client application), run `docker-compose up` in the project root.

Client application is available at `http://localhost:3030/`

### Example users

* `Admin001` `1234` admin role
* `User0001` `0001` accountant
* `User0002` `0002` accountant
* `User0003` `0003` user

## Extra functionality implemented

* Microservice architecture
* Downloadable invoice in PDF format

## Possible improvements

* Deploy application to Kubernetes cluster
* Server side rendering
* Build smaller docker image
* i18n
* Prettier