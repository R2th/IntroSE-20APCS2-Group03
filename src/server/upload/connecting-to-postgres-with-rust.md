## Getting Start
In this article we'll take a look at how to setup a Rust project and connect to postgresql and do some basic insert and select query. Our demo project will be a famous Todo list which will perform some insert and list todo from the database out into stdout. We will be using `diesel` a schema migration management and ORM crate to interact with the db.

## Project Setup
Let's start by setting up our demo project. We'll be using docker for this. First lets generate a new rust project with the following command. With this a new demo directory will be created on the host machine.

```
$ docker run --rm -v $(pwd):/usr/src/app rustlang/rust:nightly bash
$ cargo new demo
```

Then write our base image Dockerfile.
```
FROM rustlang/rust:nightly

RUN cargo install cargo-watch
RUN cargo install diesel_cli --no-default-features --features postgres

WORKDIR /usr/src/app

CMD ["cargo", "watch", "-x", "run"]
```

Our base image here is simple, pull in the rust image as a base, install some development tool that we need like `cargo-watch` to recompile when the source code change and `diesel_cli` for schema management as we'll see in the next section. The last line is to just start our application and watch for file changes.

Next lets take a look at `docker-compose` file. Our goal is to connect to `PostgreSQL` so we should also start a db container so that our app can connect to as well so the final file should looks like this.

```
version: "3"

services:
  web:
    build: .
    volumes:
      - .:/usr/src/app
      - cargo:/root/.cargo
    links:
      - db
  db:
    image: postgres:9.6-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data/pgdata
    environment:
      POSTGRES_PASSWORD: secret123
      PGDATA: /var/lib/postgresql/data/pgdata

volumes:
  cargo: {}
  pgdata: {}
```

The `cargo` volume is here to cache the downloaded crate so that when we shutdown and then spin the container backup it doesn't re-download all the crate again.

## Schema & Migration
Now that we have a rust project up and running, it's time to setup our database schema. Create a `.env` file with the following content and spin up our containers with `docker-compose` then run the following command

```
# .env
DATABASE_URL=postgres://postgres:secret123@db/demo
```
```
$ docker-compose exec web bash
$ diesel setup
```

This will create a `migrations` directory along with `src/schema.rs` and `diesel.toml`. Usually `schema.rs` file will be automatically updated whenever we add a new migration so we don't need to touch this file, but the one that will be interested in is the SQL files in `migrations`.

Let start by creating a `todos` table
```
$ diesel migration generate create_todos
```
The command will generate migration SQL file inside of `migrations` so let modify it like below

```
# up.sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

# down.sql
DROP TABLE todos;
```
After that run `diesel migration run` to migrate our schema. The `diesel_cli` has a lot of other command to help use manage our application schema and for more details checkout [diesel](https://diesel.rs/guides/getting-started).

## Connecting to PostgreSQL
Now that we have our table ready, let start off by establishing connection to db with the following code. But before that open up `Cargo.toml` and add the following dependencies.

```
[dependencies]
diesel = { version = "1.4.4", features = ["postgres"] }
dotenv = "0.15.0"
```

```
// src/main.rs
#[macro_use]
extern crate diesel;
extern crate dotenv;

use diesel::pg::PgConnection;
use std::env;
use dotenv::dotenv;

fn main() {
    dotenv().ok();
    
    if let Ok(url) = env::var("DATABASE_URL") {
        let conn = PgConnection::establish(&url)
            .expect("could not connect to database");
    } else {
        println!("No DATABASE_URL set")
    }
}
```

First we import `diesel` and `dotenv` crate into scope and notice the `#[macro_use]` which import the marco from `diesel` into current scope, which will allow us to define ORM mapping to our struct later on.
The `dotenv` crate being used here for ease of development to load environment variables from `.env` file. Next we call `PgConnection::establish` to open a connect to db.

### Select Todo
In order to get data from our database lets define `Todo` struct to map to our `todos` table. To make diesel knows how to filled in the database from db into our struct we need to make it queryable by implement a `Queryable` trait from `diesel::deserialize` module. The easiest way to do this is to use `derive` macro like we did below. `Queryable` trait along with others that we will need can be imported with `diesel::prelude::*`

```
use diesel::prelude::*;

#[derive(Debug, Queryable)]
struct Todo {
    id: i32,
    name: String,
}
```

Next lets' write a function to select the first 10 todos from the db with the following code

```
pub mod schema;

use schema::todos;

fn query_todos(conn: &PgConnection) {
    let rows = todos::table
        .limit(10)
        .load::<Todo>(conn)
        .expect("could not load todos");
    for row in rows {
        println!("{:?}", row);
    }
}
```
`todos::table` was generated by `diesel` when we ran `diesel migration run`. This command updated `src/schema.rs` with the following code. The `table!` macro defined a lot of things for us and `todos::table` is one of the `DSL` we can use. For a more detail checkout the link to diesel documentation in the previous section.

```
table! {
    todos (id) {
        id -> Int4,
        name -> Text,
    }
}
```

Thanks to `Todo` derive from `Debug`trait when printing result with `println!` macro we'll get a nice result like this.

``
Todo { id: 1, name: "todo01" }
``

### Insert Todo
Since rust is strict on type checking, we will get into trouble if we use `Todo` struct to do the insertion, because then we will need to manually generate `id` for every new record we want to insert, but we want to avoid that and let postgres do the increment for us, so instead let define a new struct for inserting a new todo.

```
#[derive(Debug, Insertable, QueryableByName)]
#[table_name="todos"]
struct NewTodo<'a> {
    name: &'a str,
}
```

Notice the different between `Todo` and `NewTodo` is that now we want `NewTodo` to be insertable into the db that's why we derive it from `Insertable` trait and since there is no `new_todos` table in our db we need a way to map this struct to our `todos` table, hence, we derive it from `QueryableName` and tell it that the table name is actually `todos` with `#[table_name="todos"]` attribute. Also we want to be able to use both `String` and `&str` as input name so we defined our `name` field to be `&str` since it's a field of struct any reference need a life time specifier and need named it `'a`.

The insert function is simple we just supply the connection and a name to the new todo to the function and call the function import from diesel to do the job. Again for more detail checkout the documentation.

```
fn insert_todo<'a>(conn: &PgConnection, name: &'a str) -> Todo {
    let new_todo = NewTodo{
        name: name,
    };

    diesel::insert_into(todos::table)
        .values(&new_todo)
        .get_result(conn)
        .expect("error saving new todo")
}
```

The last step is to call these functions from `main` to insert and select the record.

```
fn main() {
    if let Ok(url) = env::var("DATABASE_URL") {
        // code
        
        // insert some todos
        insert_todo(&conn, "todo01");
        insert_todo(&conn, "todo02");
        insert_todo(&conn, "todo03");
        insert_todo(&conn, "todo04");

        query_todos(&conn);
    } else {
        // code
    }
}
```

## References
https://diesel.rs/guides/getting-started
https://docs.rs/crate/cargo-watch/7.0.2
https://docs.rs/dotenv/0.15.0/dotenv/