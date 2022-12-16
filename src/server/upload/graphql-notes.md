GraphQL is a query language for API and potentially a replacement for [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) (REpresentational State Transfer). It was developed by Facebook in 2012. Facebook defines GraphQL as,

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.

GraphQL is essentially an API, and it is language independent. Fundamentally, it works in the following way,

- Setup a back-end server and front-end client
- Define queries to make from the client
- Implement *resolvers* for each query
- Make the query

This article attempts to highlight the significant sections of GraphQL in the manner of a reference (not an introduction). Let's go through the bits and pieces of GraphQL.

## Usage

- Query language and runtime
- Replacement for REST
- Querying specific fields on objects
- GraphQL queries can traverse related objects and their fields, letting clients fetch lots of related data in one request, instead of making several round-trips as one would need in a classic REST architecture

## Significant Advantages

- Least number of round-trips to the server
- Different argument set for each query field
  - *Note*: REST provides a flat argument set through query parameters and URL segments

  ```graphql
  // REST
  /companies/{argument_1}/users?limit={argument_2}

  // GraphQL
  query QueryX {
    company(id: $companyId) {
      users(limit: $userLimit) {
        id
        name
        email
      }
    }
  }
  ```
- Better control over data extraction from the back-end
  - *Note*: A query may request for only the required data properties

## Notes

- When no operation is explicitly specified, it is inferred as a `query`
  - Explicit operation type specification example:
    ```graphql
    query HeroNameAndFriends {
      hero {
        name
        friends {
          name
        }
      }
    }
    ```
  - Implicit operation type specification example:
    ```graphql
    hero {
      name
      friends {
        name
      }
    }
    ```
  - *Usage*: Explicit naming can be used for debugging or server-side logging
- Operation types can be any of `query`, `mutation` or `subscription`
- Variable
  - Provides dynamicity to query arguments. Variable name has the following format: `$variableName`
  - On explicit query definition, variable type has to be declared
    - *Example*: `query QueryName($variableName: VariableType)`
  - *Warning*: String interpolation is discouraged
  - Variables can be either *scaler*, *enum* or *input object type*
  - **Required vs. Optional variable definition:** Variable definitions can be optional or required.

  ```graphql
  type Query {
    hero(episode: Episode): Character
    droid(id: ID!): Droid
  }
  ```

  In the case above, since there isn't an `!` next to the `Episode` type, it's optional. But if the field you are passing the variable into requires a non-null argument, then the variable has to be required as well.
    - *Example*: `query Hero($episode: Episode, $withFriends: Boolean!) {`
  - *Default variable*: `query HeroNameAndFriends($episode: Episode = "JEDI") {`
- Directive
  - Core specification includes two directives, `@include` and `@skip`.
    - *Synopsis*:
      - `@include(if: Boolean)`
      - `@skip(if: Boolean)`
- **Fragment**
  - Reusable chunk of query
  - *Example*:
  
    ```graphql
    // Definition
    fragment comparisonFields on Character {
      name
      appearsIn
      friends {
        name
      }
    }

    // Usage
    {
      ...comparisonFields
      otherField
    }
    ```

  - *Warning*: Fragment cannot refer to itself or create a cycle
- **Mutation**
  - **Any query** can be used for data manipulation, however, it's an established convention, to use `mutation` for data manipulation
  - *Example*

    ```graphql
    mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
      createReview(episode: $ep, review: $review) {
        stars
        commentary
      }
    }
    ```
  
- **Input Object Type**
  - Input object types are identical to regular `type`s, except these types are used particularly in mutation.
- Meta fields
  - Meta fields are specific request specification
  - *Example*: `__typename`
  - Example usage scenario: When a request is made, if for certain request we need s especial response, server can be acknowledged of this case through a meta field.
- In-line fragment
  - In-line fragments are fragments without name, and are meant to be used once
  - *Usage*: When a field is required on an object that is defined as an interface, it can not be told for certain that a specific method is available or not. Because, the type that implements an interface may have an exclusive method. In this case, if we need to add a field based on the implementer type, we can use in-line fragment. It works like, "Add field_x if type is TypeX"
  - *Example*:

    ```graphql
    query HeroForEpisode($ep: Episode!) {
      hero(episode: $ep) {
        name
        ... on Droid {
          primaryFunction
        }
        ... on Human {
          height
        }
      }
    }
    ```

### Schema and Type definition



- Arguments must be named
- Types in a schema are in general regular object types, except for, `query` type and `mutation` type
- *Scaler types*: `Int`, `Float`, `String` (UTF-8), `Boolean`, `ID`
  - `ID`
    - Unique identifier for re-fetch or usage as key for cache
- `enum` example
  ```graphql
  enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
  }
  ```
- *Type modifiers*:
  - `!` suffix: Non Null
  - `[Type]`: List
  - *NOTE*:
    - `[String!]`: List of non-null strings
    - `[String]!`: Non-nullable list
- **Interface**
  - Interfaces are abstract types that can be implemented by any object type. Like other typed languages with interface support, GraphQL interface expects that the implementer type implements all the defined field in an interface. This essentially means that the implementer must have all the interface fields and may have some additional fields
  - *Usage*: Interfaces are useful when we need to return an object or set of objects (but those objects are of several different types)
  - *Example*: Consider the following example.
  ```graphql
  query HeroForEpisode($ep: Episode!) {
    hero(episode: $ep) {
      name
      primaryFunction
    }
  }
  ```
  `hero` has a `Character` type, where `Character` is an interface, which is implemented by two types, `Human` and `Droid`. So, based on the `episode`, `hero` type may varry. And, since `primaryFunction` is exclusive to `Droid` type, if we want it like the example above, we have be aware of the implementer type. This scenario is backed by in-line fragment, which produced the following correct query,
  ```graphql
  query HeroForEpisode($ep: Episode!) {
    hero(episode: $ep) {
      name
      ... on Droid {
        primaryFunction
      }
    }
  }
  ```
  - *NOTE*: It is also possible to utilize a named fragment in the above scenario, if it makes sense. :D
- **Union**
  - Unions are identical to interface, except there is no common fields between the types
  - Returned type of an union can be any of the predefined types
  - Definition example: `union Animal = Cat | Panda | Moose`
  - *Usage*: Identical to interface, except, we need to provide fragment (most likely in-line) for each type.
  - *Note*: Union members can only be concrete object types, they can't be interfaces or unions, themselves
- **Input types**
  - Input types are identical to regular object types, except, these are used for mutations
  - These types are defined with `input` keyword, instead of `type`
  - *Example*:
    ```graphql
    input ReviewInput {
      stars: Int!
      commentary: String
    }
    ```
  - Input types can be used in the same way as a regular object type, as an argument, in a mutation.
  - *Note*:
    - An input type can refer to another input object type
    - Input types can not have arguments on their fields
  - *Warning*:
    - Input types can not be mixed with output types

### Query Execution

- Each field on each type is backed by a function called the *resolver* which is provided by the GraphQL server developer <sup>[ref](https://graphql.org/learn/execution/#root-fields-resolvers)</sup><sup>[]()</sup>
- If a field produces a scalar value like a string or number, then the execution completes. However if a field produces an object value then the query will contain another selection of fields which apply to that object. This continues until scalar values are reached. GraphQL queries always end at scalar values
- Three arguments are provided to the resolver method
  - `obj`: Previous object in the chain
  - `args`: Arguments provided to the field
  - `context`: Holds contextual information (e.g. current user, database access).
- *Scalar coercion*: Internally, when a query executes, and the query contains some enum value, it gets internally represented by the it's index number. But, during representation, the value again gets converted to it's corresponding enumerated value.

## Warnings

- **Query syntax** is confusingly similar to ES6 object syntax. Here are two valid syntax example for ES6 and GraphQL (although they mean totally different things :) )
  - ES6 object:
    ```javascript
    {
      x,
      y(z = {a: 11}) {
        z
      }
    }
    ```
  - GraphQL Query:
    ```graphql
    {
      x
      y(a: 11) {
        z
      }
    }
    ```
- **Query vs. Mutation**: While query fields are executed in parallel, mutation fields run in series, one after the other.
- **`!` notation** for a query segment `[Episode]!` indicates that the type `[]` must be non-nullable, but since it's a non-scaler type, it may contain **zero** or more elements
- **Query and Mutation types in schema entry point**: Other than the special status of being the "entry point" into the schema, the `Query` and `Mutation` types are the same as any other GraphQL object type, and their fields work exactly the same way <sup>[ref](http://graphql.org/learn/schema/#the-query-and-mutation-types)</sup>.