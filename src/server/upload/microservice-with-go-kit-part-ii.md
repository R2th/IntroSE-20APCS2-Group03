In [part I](https://viblo.asia/p/microservice-with-go-kit-part-i-LzD5drJ4ZjY) we've learned the concept of how Microservice worked and also how Go Kit fit into the design. In this part lets put it into practice by implementing a simple random sentence generator service.

### Service
Lets start from our business logic by define and implement a service, basically a contract. For the purpose of this example our service will has one simple method which take **n** number of setences to return and return **n** random setences.

```Go
package service

import (
    "context"
    "errors"
    "math/rand"
    "time"
)

func init() {
    rand.Seed(time.Now().UnixNano())
}

type Service interface {
    GetRandomSentences(ctx context.Context, n int) ([]string, error)
}

func NewService() Service {
    sentences := []string{
        "I want to eat apple",
        "Nice day today huh!",
        "Hey there! How do you do?",
        "Anime's rock!",
    }

    return &service{sentences: sentences}
}

type service struct {
    sentences []string
}

func (s *service) GetRandomSentences(ctx context.Context, n int) ([]string, error) {
    if n > len(s.sentences) {
        return nil, errors.New("The maximum number is exceed")
    }
    
    var sens []string
    for i := 0; i < n; i++ {
        j := rand.Intn(len(s.sentences))
        sens = append(sens, s.sentences[j])
    }
    
    return sens, nil
}
```

### Endpoint
Our endpoint will wrap the sentences return from service into a `SentencesResponse` struct with `Data` and `Err` field. Because could only come from client bad input we will only wrap error in the return struct so that we can feedback to the client what kind error that make the server failed. We also wrap our endpoint in a `loggingMiddleware`, which take a logger and an endpoint and return a new endpoint decorated with logging behaviour.

```Go
package endpoint

import (
    "context"
    "time"

    "github.com/go-kit/kit/endpoint"
    "github.com/go-kit/kit/log"
    
    "example.com/randsvc/service"
)

type Errorer interface {
    GetError() error
}

type Endpoint struct {
    GetRandomSentencesEndpoint endpoint.Endpoint
}

type SentencesResponse struct {
    Data []string `json:"data"`
    Err  error `json:"err,omitempty"`
}

func (r *SentencesResponse) GetError() error {
    return r.Err
}

func NewEndpoint(svc service.Service, logger log.Logger) Endpoint {
    getRandomSentencesEndpoint := makeGetRandomSentencesEndpoint(svc)
    getRandomSentencesEndpoint = loggingMiddleware(log.WithPrefix(logger, "method", "GetRandomSetences"))(getRandomSentencesEndpoint)
    return Endpoint{
        GetRandomSentencesEndpoint: getRandomSentencesEndpoint,
    }
}

func makeGetRandomSentencesEndpoint(svc) endpoint.Endpoint {
    return func(ctx context.Context, request interface{}) (interface{}, error) {
        sens, err := svc.GetRandomSentences(ctx, request.(int))
        return SentencesResponse{Data: sens, Err: err}, nil
    }
}

func loggingMiddleware(logger log.Logger) endpoint.Middleware {
    return func(next endpoint.Endpoint) endpoint.Endpoint {
        return func(ctx context.Context, request interface{}) (resp interface{}, err error) {
            defer func(begin time.Time) {
                logger.Log("took", time.Since(begin), "err", err)
            }(time.Now())
            resp, err = next(ctx, request)
            return
        }
    }
}
```

### HTTP Transport
To expose our service to the ourside world, we choose `HTTP` protocol as our transport. The number of sentences to return will be get in the form of request body from a `POST` request and when we get the result back from endpoint we write a JSON response back to the client. The conversion and type checking is to get user generated error, which we wrapped inside `SentencesResponse` struct, and show it accordingly. Any error that return from `endpoint` will be caught by `ServerErrorEncoder` server option.

```Go
package transport

import (
    "context"
    "net/http"
    
    "github.com/go-kit/kit/log"
    kithttp "github.com/go-kit/kit/transport/http"

    "example.com/randsvc/endpoint"
)

type NumberRequest struct {
    N int `json:"n"`
}

func NewHTTPServer(endp endpoint.Endpoint, logger log.Logger) http.Handler {
    options := []kithttp.ServerOption{
        kithttp.ServerErrorEncoder(errEncoder),
        kithttp.ServerErrorLogger(log.WithPrefix(logger, "transport", "HTTP")),
    }

    return kithttp.NewServer(
        endp.GetRandomSentencesEndpoint,
        decodeHTTPRequest,
        encodeHTTPResponse,
        options...,
    )
}

func decodeHTTPRequest(ctx context.Context, r *http.Request) (interface{}, error) {
    var req NumberRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        return nil, err
    }
    return req.N, nil
}

func encodeHTTPResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
    w.Header().Set("Content-Type", "application/json; charset=utf-8")

    if resp, ok := response.(endpoint.Errorer); ok && resp.GetError() != nil {
        w.WriteHeader(http.StatusBadRequest)
        return json.NewEncoder(w).Encode(map[string]string{"error": resp.GetError().Error()})
    }
    
    w.WriteHeader(http.StatusOK)
    return json.NewEncoder(w).Encode(response)
}

func errEncoder(ctx context.Context, err error, w http.ResponseWriter) {
    w.Header().Set("Content-Type", "application/json; charset=utf-8")
    w.WriteHeader(http.StatusInternalServerError)
    json.NewEncoder(w).Encode(map[string]string{"error": "internal server error"})
}
```

### Wire it up
This is how we wired up all component together to get a working service. There is nothing fancy here, just a couple of initialization code.

```Go
package main

import (
    "flag"
    "net/http"
    "os"
    "time"

    "github.com/go-kit/kit/log"

    "example.com/randsvc/endpoint"
    "example.com/randsvc/transport"
    "example.com/randsvc/service"
)

var (
    fs = flag.NewFlagSet("randsvc", flag.ExitOnError)
    httpAddr = fs.String("http-addr", ":8080", "HTTP listening address")
)

func main() {
    logger := log.NewLogfmtLogger(os.Stdout)
    logger = log.WithPrefix(logger, "service", "randsvc", "ts", log.DefaultTimestamp)
    
    svc := service.NewService()
    endp := endpoint.NewEndpoint(svc, logger)
    handler := transport.NewHTTPServer(endp, logger)
    
    server := &http.Server{
        Addr:         *httpAddr,
        Handler:      handler,
        ReadTimeout:  10*time.Second,
        WriteTimeout: 10*time.Second,
    }
    logger.Log("transport", "HTTP", "addr", *httpAddr)
    if err := server.ListenAndServe(); err != nil {
        logger.Log("during", "HTTP", "err", err)
        os.Exit(1)
    }
}
```

### Conclusion
I hope from this post you will get a better idea on how to implement a microservice in golang using Go Kit packages.