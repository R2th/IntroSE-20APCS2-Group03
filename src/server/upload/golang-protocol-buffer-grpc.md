### Introduction
Due to the difficulty or next to impossible of scaling Monolithic application as the business grow many companies have shift their gear toward Microservice Architecture. Because each service is an independent piece of functionality, have their own domain space, data and logic, it is easy and lighweight to scale part of the application without worrying about breaking other part of the system compare to the tranditional Monolithic application which you have to scale everything together.

At the cost of ease of scalability, microservice application become fairy complext to write. Because each part of the system are now live in their own isolation, interacting with each other need to happen over the network called instead of invoking a function/method in the same memory address space. Each service can expose their function through various means for example like using **JSON** over **HTTP** which is great for client to service especially from javascript web application, but for internal communication there is a better way and that is what we are going to talk about in this article.

### What is gRPC?
Before we get to that question lets taling about what is **RPC**. RPC is stand for **R**emote **P**rocedure **C**alls, a protocol used to invoke a piece of function that live in another process typically another PC over the network. RPC encaptulated the process to make it looks like we are calling a regular function and there are many differrent implementations of this protocol, one of which is **gRPC**. gRPC is an open source RPC implementation developed by Google which based on **HTTP/2** and aim to be fast and efficient. It broken into three parts.

* The lowest layer is the **transport**: used HTTP/2 as its transport protocol which provides the same basic semantics as HTTP 1.1, but much more efficient, more secure and most of all that it can multiplex many parallel requests over the same network connection and it allows full-duplex bidirectional communication.
* The **channel** layer: an abstraction over transport which defines calling conventions and implements the mapping of an RPC onto the underlying transport. At this layer, a gRPC call consists of a client-provided service name and method name, optional request metadata, and zero or more request messages.
* The **stub** layer: this layer is where interface constraints and data types are defined typically by using **I**nterface **D**efinition **L**anguage, which I'll talking about in a bit.

### When to use gRPC?
It can be used in almost any situation, but the ones that I find make the most sense are

1. In **microservice** architecture where each services communicate remotely. JSON over HTTP is human readable and it's great but not in this case because it incureed a lot of overhead. What we need is a format that is easy for computer to read and compact.
2. **Client-server** application especially the one running on desktop or mobile device. It uses HTTP/2, which improves on HTTP 1.1 in both latency and network utilization. This means you get improved response times and longer battery life.
3. **Integration with API** from third part service. Again performance wise.

### Protocol Buffers
In the previous section we talked about using Interface Definition Language (IDL) to defined interface & data type for the **stub** layer of gRPC. That is what **Protobuf** is. It let us defined what our service API going to looks like what data it needs and return in a language agnostic way. We can take this file and compile it down into various languages specific to generate client and server stub. gRPC and Protobuf are not depend with each other we can use them in a mix and match with other technology, though they have strong the built-in support for one another since they are both developed by Google.

### A Quick Look at Protobuf & gRPC in Go
Say that we have a **Sum** service, which does what it sounds like, we want to expose it via RPC protocol and our programming of choice is Go. The simplest implementation would looks something like below.

#### Protobuf Definition
```Protobuf
// sum.proto
syntax = "proto3";
package pb;

message SumRequest {
    int32 x = 1;
    int32 y = 2;
}

message SumResponse {
    int32 total = 1;
}

service SumService {
    rpc Sum(SumRequest) returns (SumResponse);
}
```
Run command `protoc -I=./pb --go_out=plugins=grpc:./pb ./pb/sum.proto` to generate stub code.

#### Server
For server implementation we need to implement the generated **SumServiceServer** interface and register it like below.

```Go
type server struct{}

func (s *server) Sum(_ context.Context, req *pb.SumRequest) (*pb.SumResponse, error) {
    return &pb.SumResponse{Total: req.X + req.Y}, nil
}

func main() {
    lis, err := net.Listen("tcp", ":8080")
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }
    s := grpc.NewServer()
    pb.RegisterSumServiceServer(s, &server{})
    if err := s.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}
```

#### Client
Client implementation will look something like this

```Go
func main() {
	// Set up a connection to the server.
	conn, err := grpc.Dial("localhost:8080", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewSumServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.Sum(ctx, &pb.SumRequest{X: 10, Y: 20})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Total: %s", r.Total)
}
```

### Conclusion
At the heart of distributed system and microservice **gRPC** and **Protocol Buffers** are both good tools to have at our disposal. They give us a lot of flexibility and handle the heavy lifting work for us at the same time. Combining this with the API Query Language like **GraphQL** could enabled us to write some awesome stuff.