### What is Go Kit?
Go Kit is a collection of useful utility & toolkit used to ease development of microservice in Golang. This package center a round a concept of **Service**, **Endpoint**, **Transportation** and other useful library such as **Logging**, **Tracing** and **Instrumenting** which are very crucial and integral part for developing a good microservices application. In this part of the post we will be focusing on getting our head a round a core concept of **S**ervice, **E**ndpoint and **T**ransportation. It's hard to get the hang of at first, but once you get used to it, you will yourself in a comfortable position to write a solid and testable service so let's get start.

### Service
This part is the core part of your business logic, it should has a well defined interface and if your service depends on other service as a dependency it should be inject via factory function. Take for example the following user service which expose a basic CRUD api might need to interact with the database so we injected a **sql.DB** as a dependency.

```Go
package service

import "database/sql"

type UserService interface {
    Get(id int) (*User, error)
    Find() ([]*User, error)
    Create(input *CreateUserInput) (*User, error)
    Update(input *UpdateUserInput) (*User, error)
    Delete(id int) error
}

func NewUser(db *sql.DB) UserService {
    return &userService{db: db}
}

type userService struct {
    db *sql.DB
}

// rest of implementation
```

You can also decorate your service, let say for example to add service level logging, using middleware pattern as many levels as you want and your service will still easily be testable. That is the beauty of implement to an interface.

### Endpoint
The fun with Go Kit kicks in when it's time to implement an endpoint, but what is endpoint? Endpoint acts like action or handler on a controller in MVC pattern, but should stays transport agnostic, that is to say it shouldn't know about http header nor should it cares about where the data comes from or how the output should be format. There are many transportations we could use when developing a microservice, two of the most commonly used are HTTP and RPC and how to handle them is the job of the **T** part. Endpoint should contains logic for data checking, validation or sometime authorization (which should be centralize into one place such as building an API Gateway to act as a wall to protect intruder from the outside world). A typical endpoint would looks like this

```Go
package endpoint

import (
    "context"

    "github.com/go-kit/kit/endpoint"
)

type Endpoint struct {
    Add endpoint.Endpoint
}

type AddReply struct {
    Total int64
    Err error
}

func NewEndpoint(svc service.Service) Endpoint {
    return Endpoint{
        Add: makeAddEndpoint(svc),
    }
}

func makeSumEndpoint(svc service.Service) endpoint.Endpoint {
    return func(ctx context.Context, request interface{}) (interface{}, error) {
        req := request.(*AddInput)
        total, err := svc.Add(req.X, req.Y)

        // if internal error return err, otherwise
        // pass error to reply to display to user
        if isInternalErr(err) {
            return nil, err
        }

        return &AddReply{Total: total, Err: err}, nil
    }
}
```

Notice that there is a check for error returned from service to see whether the error caused by the bad input from the user or system failure. Bad input from user should be return as a field of output instead of directly return as a value to the function because just as service endpoint can be decorate with middleware too and that is typically for logging, instrument, tracing or to put a safety break by applying rate limiter or circuit breaker so error catch by middleware might trip a circuit eventhough it was not meant to be.

### Transport
One of the cool beauty of microservice is that we can expose more that one way to interact with a service, be it a good old REST, RPC, gRPC or Thrift you named it. Those kind of methods of interaction are what is called transport, so yeah transport layer deal with these kind of things like how to get data input from the client and how to present it back. When implementing a REST HTTP API, you might find something like this

```Go
r.Methods("POST").Path("/profiles/").Handler(httptransport.NewServer(
    e.PostProfileEndpoint,
    decodePostProfileRequest,
    encodeResponse,
    options...,
))
```

or for gRPC it might looks like this

```Go
return &grpcServer{
    sum: grpctransport.NewServer(
      endpoints.SumEndpoint,
      decodeGRPCSumRequest,
      encodeGRPCSumResponse,
      append(options, grpctransport.ServerBefore(opentracing.GRPCToContext(otTracer, "Sum", logger)))...,
    ),
    concat: grpctransport.NewServer(
      endpoints.ConcatEndpoint,
      decodeGRPCConcatRequest,
      encodeGRPCConcatResponse,
      append(options, grpctransport.ServerBefore(opentracing.GRPCToContext(otTracer, "Concat", logger)))...,
    ),
}
```

The important thing to note here is that the same endpoint can be lift up by multiple transports and that is very powerful.

### Conclusion
I hope in this part you get a better idea about the core concept a round Go Kit architecture & design.
In the next part we will put that into practice by implement some service and see how to connect them together.