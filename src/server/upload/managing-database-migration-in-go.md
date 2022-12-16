## Introduction
Managing database schema is an essential tool that every data baked applications needed. Different frameworks offer different tools to make this flow easy, but in this article we will take a look at database migration tool in Go, check how it works and how to integrate it into Go project.

## Getting Start
To start managing migration first we need to install [goose](https://github.com/pressly/goose). Run the following

```SH
$ go get github.com/pressly/goose/cmd/goose
```

This will install `goose` binary, which we can use. This CLI will take the following input
```SH
$ goose [OPTIONS] DRIVER DBSTRING COMMAND
```

### Generate Migration File
For example to create our first migration run it with `create` command
```SH
$ goose -dir=migrations postgres postgresql://testuser:secret123@localhost?sslmode=disable create create_users sql
```
This will generate an empty `.sql` file in `migrations` directory, which has content similar to the following.
```SQL
-- +goose Up

-- +goose Down
```
Anything that gose under `+goose Up` will be executed to make changes to our database and anything that gose under `+goose Down` will be executed as reverse operation when we rollback our changes.

Here is how to create a `users` table with index
```SQL
-- +goose Up
CREATE TABLE "users" (
  "id"         BIGSERIAL PRIMARY KEY,
  "name"       TEXT NOT NULL,
  "email"      TEXT NOT NULL,
  "password"   TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL
);

CREATE UNIQUE INDEX unique_users_email_idx ON users(email);

-- +goose Down
DROP INDEX unique_users_email_idx;
DROP TABLE users;
```

There are two ways you can write your migration in. One is using raw SQL syntax and the other is to write it in Go, which you can do so by supply `go` at the end of `create` command like this and it will generate a `.go` migration file
```SH
$ goose -dir=migrations postgres postgresql://testuser:secret123@localhost?sslmode=disable create create_users go
```

### Migration Operation
To actually commit the change we made into the database we need to run `up` command
```SH
$ goose -dir=migrations postgres postgresql://testuser:secret123@localhost?sslmode=disable up
```

The first time you run up command goose will generate a table to hold information about our schema version so we can add or rollback our changes at anytime.

To rollback the most recent version run `down` command
```SH
$ goose -dir=migrations postgres postgresql://testuser:secret123@localhost?sslmode=disable down
```

To rollback to a specific version run `down-to` command. It takes a version timestamp as an argument. You can get it from migration filename.
```SH
$ goose -dir=migrations postgres postgresql://testuser:secret123@localhost?sslmode=disable down-to 20200711141802
```

Here are the complete commands list
```
Commands:
    up                   Migrate the DB to the most recent version available
    up-by-one            Migrate the DB up by 1
    up-to VERSION        Migrate the DB to a specific VERSION
    down                 Roll back the version by 1
    down-to VERSION      Roll back to a specific VERSION
    redo                 Re-run the latest migration
    reset                Roll back all migrations
    status               Dump the migration status for the current DB
    version              Print the current version of the database
    create NAME [sql|go] Creates new migration file with the current timestamp
    fix                  Apply sequential ordering to migrations
```

## Custom Goose Binary
Using the default binary can be lengthly and frustrated sometime because you have to specify driver name, connection string and migration path all the time. Fortunately there is a way to make life better and that is to write a custom `goose` binary. If you look at the Readme file on their github repository, there is an instruction on how to do so, but lets check it our in below code snippet

```Go
package main

import (
	"flag"
	"log"
	"os"

	"github.com/pressly/goose"
	_ "github.com/lib/pq"
)

var (
	flags    = flag.NewFlagSet("goose", flag.ExitOnError)
    dbstring = flags.String("dbstring", "postgresql://testuser:secret123@localhost?sslmode=disable", "connection string")
	dir      = flags.String("dir", "./migrations", "directory with migration files")
)

func main() {
	flags.Parse(os.Args[1:])
	args := flags.Args()

	if len(args) < 1 {
		flags.Usage()
		return
	}

	command := args[1]

	db, err := goose.OpenDBWithDriver("postgres", *dbstring)
	if err != nil {
		log.Fatalf("goose: failed to open DB: %v\n", err)
	}

	defer func() {
		if err := db.Close(); err != nil {
			log.Fatalf("goose: failed to close DB: %v\n", err)
		}
	}()

	arguments := []string{}
	if len(args) > 2 {
		arguments = append(arguments, args[2:]...)
	}

	if err := goose.Run(command, db, *dir, arguments...); err != nil {
		log.Fatalf("goose %v: %v", command, err)
	}
}
```

Run `go build -o goose .` to create our custom binary then you can run `goose create`, `goose up` and any other goose commands without any lengthly typing anymore.