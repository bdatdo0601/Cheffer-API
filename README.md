# Cheffer-API

API for Project Green (Calling it Cheffer for faster navigation). Built with Node, Fastify, GraphQL.

## Pre-requirements

-   [Node](https://nodejs.org/en/) (> v8.0.0) **NOTE: Untested with v10.0.0**
-   [Yarn Package Manager](https://yarnpkg.com/en/)
-   [Visual Studio Code](https://code.visualstudio.com/)
-   [MongoDB](https://www.mongodb.com/) (`brew install mongodb`)
    -   MacOSX 10.12
    -   XCode 8.3.2

## Setup

### IDE

Visual Studio Code can work directly with JavaScript out of the box. However, there are a few plugins that would help the development process go much smoother and enforce a code style guideline. Below are the recommended plugins for this project:

-   DotENV
-   ES7 React/Redux/GraphQL/React-Native snippets
-   ESLint
-   GraphQL for VSCode
-   JShint
-   Prettier - Code Formatter
-   GraphQL
-   GraphQL Language Support

### Local Host setup

The project is incorporated with JWT so make sure to have an jwtSecret environment variable (either through CLI or .env file). Please refer to .sampleenv for example.

Once the project cloned into local machine, simply execute `yarn` and the package manager will install all necessary dependencies for the project. When all dependencies are installed, execute `yarn start` and the server will be up at `http://localhost:3000/`.

## Develop

GraphQL endpoint is available at `http://localhost:3000/graphql`. In development environment, the endpoint will expose GraphiQL to allow quick request testing. This will be disable in production

### Commands

-   `yarn init-db`: initialize the local database (**NOTE: all data in local database will be loss once executed**)
-   `yarn start`: start the development version (with development variables) of the API
-   `yarn start-production`: start the production version of the API
-   `yarn clean`: clean up build folder, use when you want to create a fresh production version of the project
-   `yarn build-server`: build a production version of the project
-   `yarn build`: Combination of `yarn clean` and `yarn build-server`

### Voyager

[Voyager](https://github.com/APIs-guru/graphql-voyager) is a great tool to visualize GraphQL schema. The project already implemented it and can be access in `/voyager` route.

## File Structures

This provides a brief overview of how the project is structured. As the project develops, more detail will be added in `docs/` folder

```
├── README.md                                   # Important information regarding to the project
├── docs/                                       # documents (ADR, Guides, etc) for the projects
├── package.json                                # project's info and dependencies declaration
├── src/
│   ├── config.js                               # config data (to separate between dev and production)
│   ├── db/
│   │   └── models/                             # models for objects(documents) store in data
│   ├── dbLoader/                               # hold code to help batching request to database
│   ├── dbinit.js                               # database initialization script
│   ├── graphql/
│   │   ├── errors.js                           # GraphQL Errors Response
│   │   ├── index.js
│   │   ├── resolvers/                          # GraphQL Resolvers
│   │   │   ├── mutation/
│   │   │   ├── query/
│   │   │   └── typeDefs/
│   │   └── typeDefs/                           # GraphQL Type Definitions
│   ├── index.js                                # Starting point of the project
│   └── plugins/                                # Fastify Custom Plugins
│       ├── graphql/
│       └── voyager/
├── test/                                       # unit testing script will be here
└── yarn.lock
```
