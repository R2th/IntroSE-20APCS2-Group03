Trong bài này, chúng ta sẽ đi qua  một vài công cụ để xây dựng một HTTP API trong GO bằng: REST và gPRC

### gRPC
**gRPC** - là một công cụ được phát triển bởi Google, nó đang được tích cực phát triển trong cộng đồng Go và hơn thế nữa. gRPC chấp nhận bạn tạo những API trên **HTTP/2** bởi mặc định
**gRPC** được xây dựng trên kiến trúc **RPC** và nó đề cập đến các phương thức UpdateBalance, GetClient còn **REST** thì về các resource như **GET** /users, **POST** /users và những dạng tương tự khác.
Trong gRPC bạn có thể xây dựng rất nhiều phương thức trừ khi bạn gặp giới hạn của interface (523 method/ 1interface)

Như hầu hết các bài hướng dẫn về gRPC, cùng xây dựng một ví dụ đơn giản "hello, world" và cải thiện nó bằng các plugins. Chúng ta sẽ thêm xác nhận data và **REST** API tới dịch vụ **gRPC** và tự sinh file swagger.json.
```

syntax = "proto3";



package helloworld;



service Greeter {

	rpc SayHello (HelloRequest) returns (HelloReply) {}

}



message HelloRequest {

	string name = 1;

}



message HelloReply {

	string message = 1;

}
```

Cấu trúc của dự án theo mẫu sau:
1. pd - một package file để chứa proto file và code tự sinh
2. main.go 
3. server - package chứa logic của code
4. Makefile - makefile để tự động chạy setup project

Đầu tiên, ta thêm một vài command để tự động chạy trong file Makefile":
```

TARGET=helloworld



all: clean build



clean:

	rm -rf $(TARGET)



build:

	go build -o $(TARGET) main.go



proto:

	protoc --go_out=plugins=grpc:. pb/hello.proto
```

server/server.go
```
package server



import (

	"context"

	"fmt"

	"net"



	pb "github.com/maddevsio/grpc-rest-api-example/pb"

	"google.golang.org/grpc"

)



// Greeter ...

type Greeter struct {

}



// New creates new server greeter

func New() *Greeter {

	return &Greeter{}

}



// Start starts server

func (g *Greeter) Start() error {

	lis, err := net.Listen("tcp", "localhost:8080")

	if err != nil {

		return err

	}

	grpcServer := grpc.NewServer()

	pb.RegisterGreeterServer(grpcServer, g)

	grpcServer.Serve(lis)

	return nil

}



// SayHello says hello

func (g *Greeter) SayHello(ctx context.Context, r *pb.HelloRequest) (*pb.HelloReply, error) {

	return &pb.HelloReply{

		Message: fmt.Sprintf("Hello, %s!", r.Name),

	}, nil

}
```

Tạo thêm một file main.go để chạy server là ta đã có một server gRPC để sử dụng với file proto ở trên
```

package main



import "github.com/maddevsio/grpc-rest-api-example/server"



func main() {

	g := server.New()

	g.Start()

}
```
### gRPC-gateway
Chúng ta có thể dùng gRPC để giao tiếp giữa các dịch vụ và dùng REST cho client.
Để thực hiện điều đó một cách tiện lợi thì gRPC-gateway rất phù hợp, vì nó hỗ trợ cả gRPC và REST trong cùng một file proto.

```

syntax = "proto3";



import "google/api/annotations.proto";



package helloworld;



service Greeter {

	rpc SayHello (HelloRequest) returns (HelloReply) {

		option(google.api.http) = {

			get: "/api/hello/{name}",

		};

	}

}



message HelloRequest {

	string name = 1;

}



message HelloReply {

	string message = 1;

}
```

Chúng ta cũng thay đổi command để sinh code từ file proto như sau:
```
TARGET=helloworld



all: clean build



clean:

	rm -rf $(TARGET)



build:

	go build -o $(TARGET) main.go



proto:

	protoc -I/usr/local/include -I. \

		-I${GOPATH}/src \

		-I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \

		--go_out=plugins=grpc:. \

		pb/hello.proto

	protoc -I/usr/local/include -I. \

		-I${GOPATH}/src \

		-I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \

		--grpc-gateway_out=logtostderr=true:. \

		pb/hello.proto

	protoc -I/usr/local/include -I. \

		-I${GOPATH}/src \

		-I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \

		--swagger_out=logtostderr=true:. \

		pb/hello.proto
```

Bây giờ protoc command sẽ sinh ra cho chúng ta file rest gateway, swagger và interface để xây dựng logic code.
Có một vấn đề nhỏ là server của chúng ta sẽ lắng nghe trên 2 socket TCP. Một để đảm bảo giao tiếp với gRPC, và còn cho REST. 
Ta sửa lại code một chút xíu để support cả 2 dang:
```

package server



import (

	"context"

	"fmt"

	"log"

	"net"

	"net/http"

	"sync"



	"github.com/grpc-ecosystem/grpc-gateway/runtime"

	pb "github.com/maddevsio/grpc-rest-api-example/pb"

	"google.golang.org/grpc"

)



// Greeter ...

type Greeter struct {

	wg sync.WaitGroup

}



// New creates new server greeter

func New() *Greeter {

	return &Greeter{}

}



// Start starts server

func (g *Greeter) Start() {

	g.wg.Add(1)

	go func() {

		log.Fatal(g.startGRPC())

		g.wg.Done()

	}()

	g.wg.Add(1)

	go func() {

		log.Fatal(g.startREST())

		g.wg.Done()

	}()

}

func (g *Greeter) startGRPC() error {

	lis, err := net.Listen("tcp", "localhost:8080")

	if err != nil {

		return err

	}

	grpcServer := grpc.NewServer()

	pb.RegisterGreeterServer(grpcServer, g)

	grpcServer.Serve(lis)

	return nil

}

func (g *Greeter) startREST() error {

	ctx := context.Background()

	ctx, cancel := context.WithCancel(ctx)

	defer cancel()



	mux := runtime.NewServeMux()

	opts := []grpc.DialOption{grpc.WithInsecure()}

	err := pb.RegisterGreeterHandlerFromEndpoint(ctx, mux, ":8080", opts)

	if err != nil {

		return err

	}



	return http.ListenAndServe(":8090", mux)

}



// SayHello says hello

func (g *Greeter) SayHello(ctx context.Context, r *pb.HelloRequest) (*pb.HelloReply, error) {

	return &pb.HelloReply{

		Message: fmt.Sprintf("Hello, %s!", r.Name),

	}, nil

}
```
Thử chạy lại server và thực hiện một request REST trên nó:
```
$ curl -XGET http://localhost:8090/api/hello/Mike
{"message":"Hello, Mike!"}
```

Cuối cùng, chúng ta đã có REST API  trên gRPC. Nhưng trong ví dụ ta chưa có việc xác thực dữ liệu. Để làm điều này ta có thể dùng 1 thư viện 
https://github.com/lyft/protoc-gen-validate. 

```

syntax = "proto3";



import "google/api/annotations.proto";

import "validate/validate.proto";



package helloworld;



service Greeter {

	rpc SayHello (HelloRequest) returns (HelloReply) {

		option(google.api.http) = {

			get: "/api/hello/{name}",

		};

	}

}



message HelloRequest {

	string name = 1 [(validate.rules).string.len = 3];

}



message HelloReply {

	string message = 1;

}
```
**Sửa lại code của Makefile một xíu cho việc validate nào:**
```

TARGET=helloworld



all: clean build



clean:

	rm -rf $(TARGET)



build:

	go build -o $(TARGET) main.go



proto:

	protoc -I/usr/local/include -I. \

		-I${GOPATH}/src \

		-I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \

		-I${GOPATH}/src/github.com/lyft/protoc-gen-validate \

		--go_out=plugins=grpc:. \

		pb/hello.proto

	protoc -I/usr/local/include -I. \

		-I${GOPATH}/src \

		-I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \

		-I${GOPATH}/src/github.com/lyft/protoc-gen-validate \

		--grpc-gateway_out=logtostderr=true:. \

		pb/hello.proto

	protoc -I/usr/local/include -I. \

		-I${GOPATH}/src \

		-I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \

		-I${GOPATH}/src/github.com/lyft/protoc-gen-validate \

		--swagger_out=logtostderr=true:. \

		pb/hello.proto

	protoc -I/usr/local/include -I. \

		-I${GOPATH}/src \

		-I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \

		-I${GOPATH}/src/github.com/lyft/protoc-gen-validate \

		--validate_out="lang=go:." \

		pb/hello.proto
```
**Sau khi code được sinh ra, chúng ta có thể xác thực lại công việc của mình :**
```
$ curl -XGET http://localhost:8090/api/hello/
{"error":"invalid HelloRequest.Name: value length must be 3 runes","message":"invalid HelloRequest.Name: value length must be 3 runes","code":2}
```