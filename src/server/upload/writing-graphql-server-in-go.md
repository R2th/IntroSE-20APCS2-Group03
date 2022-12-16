# Overview
As technologies evolved the need for application to interact with each other is also increase especially with the dominance of the mobile platform in recent year. GraphQL lets you ask for what you want in a single query with smaller payload, saving bandwidth and reducing waterfall requests. It also enables clients to request their own unique data specifications.

In this post we will look into how to write a GraphQL server application in Go by using the infamouse Todo list as an example. We'll take a look at how to define GraphQL schema and connect it over HTTP.

# Todo Service
First lets define our business logic that will expose two methods **ListTodos**, **GetTodo** and **Todo** type as below.

```Go
type Todo struct {
	ID        int
	Name      string
	Completed bool
}

type Service interface {
    ListTodos() ([]*Todo, error)
    GetTodo(id int) (*Todo, error)
}
```

All todo items are store in a JSON file named **todos.json** and will be loaded during application start up and with this lets implement above interface.

```Go
// service.go
import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"sync"
)

func newService() (Service, error) {
    var todos []*Todo
	buf, err := ioutil.ReadFile("./todos.json")
	if err != nil {
		return nil, err
	}
	if err := json.Unmarshal(buf, &todos); err != nil {
		return nil, err
	}
	return &service{todos: todos}, nil
}

type service struct {
    todos []*Todo
    mux sync.Mutex
}

func (s *service) ListTodos() ([]*Todo, error) {
	return s.todos, nil
}

func (s *service) GetTodo(id int) (*Todo, error) {
	for _, todo := range s.todos {
		if todo.ID == id {
			return todo, nil
		}
	}
	return nil, errors.New("Todo not found")
}
```
The service implementation is pretty simple there is not to explain here and with this we can move on to the important part on how to define GraphQL schema.
# GraphQL Schema
First lets define a object schema type to reflect our **Todo** struct. We do this with **NewObject** function from [graphql-go/graphql](https://github.com/graphql-go/graphql) package.

```Go
todoType := graphql.NewObject(graphql.ObjectConfig{
	Name: "Todo",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if todo, ok := p.Source.(*Todo); ok {
					return todo.ID, nil
				}
				return nil, nil
			},
		},
		"name": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if todo, ok := p.Source.(*Todo); ok {
					return todo.Name, nil
				}
				return nil, nil
			},
		},
		"completed": &graphql.Field{
			Type: graphql.Boolean,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if todo, ok := p.Source.(*Todo); ok {
					return todo.Completed, nil
				}
				return nil, nil
			},
		},
	},
})
```
This object will have three fields **id**, **name** and **completed** with data type correspond to our **Todo** struct's field respectively. The resolve function is to filter out specific field according to fields list from incoming GraphQL's query for example
```SH
$ curl -XPOST -H "Content-Type: application/json" -d '{"query": "{queryName { id, name }}"}' http://graphql/endpoint
```

Next is how to defined query schema. For the purpose of this example application we will expose two queries name **todos** and **todo** with the first is to list all todo items and the last one is to get specific todo item by supplying **id** as query argument.

```Go
queryType := graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"todos": &graphql.Field{
			Type: graphql.NewList(todoType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return svc.ListTodos()
			},
		},
		"todo": &graphql.Field{
			Type: todoType,
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return svc.GetTodo(p.Args["id"].(int))
			},
		},
	},
})
```

As you probably see that the actual logic to get todo list is by calling our server methods that we defined in the above section in resolve function of each query **svc.ListTodos** and **svc.GetTodo**. **svc** will be pass in as an argument to **createSchema** function that will compile the defined schema like this

```Go
// schema.go
func createSchema(svc Service) (graphql.Schema, error) {
    // above schema definition code
    return graphql.NewSchema(graphql.SchemaConfig{
		Query: queryType,
	})
}
```

# Connect GraphQL with HTTP
Last but not least is to expose the graphql endpoint over http. We could write our own http server implementation to convert request and response back and forth but there a package that has already done that for us called [graphql-go/handler](https://github.com/graphql-go/handler), so let use it.

```Go
h := handler.New(&handler.Config{
	Schema:     &schema,
	Pretty:     true,
	GraphiQL:   false,
	Playground: true,
})

http.Handle("/graphql", h)
log.Fatal(http.ListenAndServe(":8080", nil))
```

The option **Playground** is for development purpose only, with it can play around with the query once we hop onto http://localhost:8080/graphql

The complete main function will looks like this
```Go
// main.go
package main

import (
	"log"
	"net/http"

	"github.com/graphql-go/handler"
)

func main() {
	svc, err := newService()
	if err != nil {
		log.Fatal(err)
	}
	schema, err := createSchema(svc)
	if err != nil {
		log.Fatal(err)
	}

	h := handler.New(&handler.Config{
		Schema:     &schema,
		Pretty:     true,
		GraphiQL:   false,
		Playground: true,
	})

	http.Handle("/graphql", h)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
```

The final touch is to open up the endpoint and play around with it like image below and that's it!. Check out the link to the two packages for more document on how to define complex schema.

![](https://images.viblo.asia/627e2bc9-45fa-47df-91ed-a4952bf02405.png)