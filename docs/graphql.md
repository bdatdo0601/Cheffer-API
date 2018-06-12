#GraphQL Quick Guide

## Introduction

GraphQL is a query language for APIs to replace REST API. Although there is a learning curve (which hopefully this quick guide to make it less problematic), There are a lot of advantage to this:

-   Both the frontend and the backend will have the same data graph and one endpoint to work with, allowing seamless integration between the two
-   You only need 1 request to get all the data you need from not only just one but multiple resources
-   As the API change, no versioning is required. more Fields can be added and removed (or mark depracated) as needed
-   No limitation to what database, language use for both front and back end (although some language have better support)

## Schema

A schema is a blue print of everything that is available to view/edit in an API. As request go in to the API, it will strictly follow the schema instruction, and the schema will map the request to the appropriate **resolver** and return the data back.

## Type of Schema

There are three main types in the schema, each serve a different purposes. Other type in schema is available and can be checked out [here](https://graphql.github.io/learn/)

### Type Definition

This defined a type in GraphQL, allowing us to defined a specified object with neccessary properties for our functions. Below is an example

```graphql
type Character {
    name: String!
    appearsIn: [Episode]!
}
```

this defined a `Character` with 2 **fields**, their name and list of episode they appear in. There are primitive scalar type in GraphQL so String can be returned directly through a resolver. However, for a custom type (i.e another object), you would need a **type definition resolver** to map it with the appropriate result.

### Queries

A Query exposed what is available to request and appear as an entry node for the graph. Below is an example

```graphql
type Query {
    getUser: User!
}

schema {
    query: Query
}
```

This will allow front end (or clients in general) to get data through GraphQL.

### Mutations

A Mutation is extremly similar to a query. The major difference here is that a mutation indicate the request will make changes to the data in the system. This is not strictly enforced but it is a good practice to do so.

## Request Example

this is an example to request data on a GraphQL-compatible API

```graphql
query Hero($episode: Episode, $withFriends: Boolean!) {
    hero(episode: $episode) {
        name
        friends @include(if: $withFriends) {
            name
        }
    }
}

mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
    createReview(episode: $ep, review: $review) {
        stars
        commentary
    }
}
```

This request does 2 things, get a all hero name from a specified episode (GraphQL does include with variable) and show their friend depends on a boolean. Next, it will create review for a specified episode.
Through this, we can see GraphQL can performed anything that REST can.
