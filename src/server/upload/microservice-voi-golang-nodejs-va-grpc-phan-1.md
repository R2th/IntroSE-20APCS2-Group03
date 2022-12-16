### Đặt vấn đề
- Hiện nay việc sử dụng cấu trúc microservice đã trở nên phổ biến hơn bao giờ hết, và những lợi ích mang lại thì không có gì phải bàn cãi. Mình đang tham gia vào một dự án như vậy và muốn chia sẻ cho các bạn. 
- Bài viết này mình sẽ chia làm 2 phần, và đơn gian thôi là hiện thị mỗi `hello world` (bài viết được sử dụng tạm các example của grpc nhưng sẽ biến tấu để mình trình bày từ a->z cho các bạn dễ hiểu, và bạn hay xem nó phức tạp hơn `echo "hello world"` của PHP thế nào nhé (yaoming))
+ Phần 1: Khởi tạo core server (mình sử dụng golang, thường là nơi sử dụng dữ liệu chung) và một go-server (connect đến core server)
+ Phần 2: Sử dụng một con node server để connect đến core server
=> Vậy kỹ năng trong này sử dụng sẽ có: golang, nodejs và [grpc](https://grpc.io/).
Một số chút ý cần biết:
- Bài viết dựa trên dự án thực tế mình đã làm
- proto (grpc) sẽ được tạo một github riêng, sau đó sẽ được import vào các project khác (dự án thực tế, trong khuôn khổ bài viết này chỉ sử dụng một cách cơ bản)
### Thực hiện nào
Đầu tiên là tạo một file helloworld.proto (nếu không biết đuôi .proto là gì thì bạn hãy tìm hiểu [ở đây](https://grpc.io/) nhé).

proto/helloworld.proto
```
syntax = "proto3";
option go_package = "core_server/proto-go/helloworld";

package helloworld;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```
Vậy để biên dịch proto này thì chúng ta có [protobuf](https://github.com/protocolbuffers/protobuf/releases) và lệnh để trình biên dịch đó là 
```
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    helloworld/helloworld.proto
```  
Bạn có thể xem thêm hướng dẫn cài đặt thêm [ở đây](https://grpc.io/docs/languages/go/quickstart/)
Sau khi biên dịch chúng ta sẽ có thư mục thế này.

![](https://images.viblo.asia/843a9841-e519-4464-bcf5-734e201ba121.png)

- Bây gio sẽ setup các server nhé
#### Core Server
Bước đầu tiên ta sẽ tạo `go module` với câu lệnh `go mod init core_server`, sau đó dĩ nhiên sẽ tạo ra một file `go.mod`. 

Tạo file `main.go`
```
// Package main implements a server for Greeter service.
package main

import (
	"context"
	"log"
	"net"

	"google.golang.org/grpc"
	pb "core_server/proto" // mình sẽ lấy dữ liệu proto sau khi generate ở đây
)

const (
	port = ":50053" // đây là cổng của server grpc core
)

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

// SayHello implements helloworld.GreeterServer
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	return &pb.HelloReply{Message: "Hello " + in.GetName()}, nil
    
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
```
Sau đó bạn chạy lệnh `go run main.go` và chờ để làm con `go server` nhé.
#### Go Server
Cũng tương tự `core server`, trong thư mục của `go server` cũng có một thư mục proto (nhưng chỉ sử dụng service client), cũng tạo `go module`.
- Tạo thư mục main.go
```
package main

import (
	"context"
	"log"
	"os"
	"time"

	"google.golang.org/grpc"
	pb "go_server/proto"
)

const (
	address     = "localhost:50053"
	defaultName = "world"
)

func main() {
	// Set up a connection to the server.
	conn, err := grpc.Dial(address, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewGreeterClient(conn)

	// Contact the server and print out its response.
	name := defaultName
	if len(os.Args) > 1 {
		name = os.Args[1]
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.SayHello(ctx, &pb.HelloRequest{Name: name})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting: %s", r.GetMessage())
}
```
Sau đó bạn hãy chạy lệnh `go run main.go` rồi và chờ thành qủa
- Đây là kết qủa hiển thị bên `core server`
![](https://images.viblo.asia/33a19eb6-57ec-4ae4-a061-45ac0a1a5574.png)
- Đây là kết qủa hiển thị của `go server` sau khi chạy lệnh run
![](https://images.viblo.asia/942e1650-03a7-4d6e-a102-69dbc2c0d8b7.png)
### Tổng kết
- Vậy là xong việc thực hiên liên kết giua hai server golang-golang thông qua grpc, phần sau mình sẽ hướng dẫn việt kết nối giua golang-nodejs
- In mỗi `hello world` mà nó thế đó nhưng với các hệ thống lớn, thường xuyên có các chức năng mới như facebook chẳng hạn, hoặc nhiều đội nhóm thực hiện với nhiều ngôn ngữ khác nhau thì đây là một thứ vô cùng hay ho. bài sau sử dụng nodejs là một ví dụ (bạn có thể sử dụng với php, ruby...)