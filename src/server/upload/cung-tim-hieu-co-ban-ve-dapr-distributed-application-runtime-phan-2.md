Sau một thời gian dài dằng dặc thì mình lại tiếp tục tìm hiểu về Dapr nhé. Trong bài viết lần này mình sẽ thực hiện tính năng **Service Invocation** của Dapr nhé. 

# Service Invocation
Là cách giao tiếp giữa các service trong hệ thống phân tán. Thông thường khi gọi từ service A sang service B, ta sẽ sử dụng HTTP Request, gRPC, ... Vậy Dapr giúp được gì cho chúng ta ?

![image.png](https://images.viblo.asia/a444e759-4a02-4b08-b9f3-c3e00cba0f2b.png)

Như các bạn đã thấy Dapr sẽ đứng ở giữa để forward request & response cho 2 service A & B, khi 2 dapr giao tiếp với nhau nó đã tự động mã hoá message & xác thực giữa 2 service với nhau

# Xây dựng 1 ứng dụng đơn giản
Trong bài này mình sẽ viết 1 todolist đơn giản để tìm hiểu về Service Invocation của Dapr. Tổng quan về ứng dụng: Service A (go) tạo và lưu trữ danh sách todolist trong mảng, Service B (python) get Todolist từ service A. 

Trước khi bắt đầu thì toàn bộ source code mình để ở đây nhé: https://github.com/lequocbinh04/dapr-demo-go-python.

# Server todolist với Go
Đầu tiên ta sẽ khởi tạo  một HTTP request mục đích để add một việc mới vào list. Chi tiết hàm `addTodoListHandle` bạn có thể xem ở [đây](https://github.com/lequocbinh04/dapr-demo-go-python/blob/main/go-dapr-grpc-server/main.go#L58).

```go
go func(s *server) {
		log.Printf("starting http server on port %d", 8080)
		http.HandleFunc("/add-todo-list", addTodoListHandle(s))
		http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
			writeRes(w, "pong")
		})
		http.ListenAndServe(":8080", nil)
}(serverStruct)
```


Tiếp theo ta sẽ khởi tạo một gRPC server với mục đích để python gọi sang và get todolist

```go
lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
if err != nil {
    log.Fatalf("failed to listen: %v", err)
}

s := grpc.NewServer()

pb.RegisterTodoListServer(s, serverStruct)
log.Printf("server listening at %v", lis.Addr())

if err := s.Serve(lis); err != nil {
    log.Fatalf("failed to serve: %v", err)
}
````

Để run server ta dùng lệnh:
```shell
dapr run --app-id server --app-port 4999 --dapr-grpc-port 5000 -- go run main.go 
```

```shell
Dapr sidecar is up and running.
Updating metadata for app command: go run main.go
You're up and running! Both Dapr and your app logs will appear here.

== APP == 2022/11/10 12:57:20 starting http server on port 8080
== APP == 2022/11/10 12:57:20 server listening at [::]:4999
```
 
Lúc này http server của bạn sẽ được chạy ở port 8080, gRPC server của bạn sẽ được chạy ở port 4999 và gRPC của Dapr sẽ được chạy ở cổng 5000, bây giờ ở client (trong ví dụ này mình dùng python) sẽ gọi tới cổng 5000 nhé (thật ra các bạn gọi tới 4999 cũng được kết quả tương tự nhưng nó không đi qua Dapr nhé :v).

# Client với Python

Code của phần này thì đơn giản hơn: 

```python
port = "5000"

with grpc.insecure_channel('localhost:' + str(port)) as channel:
    stub = todolist_pb2_grpc.TodoListStub(channel)
    metadata = (('dapr-app-id', 'server'),)
    response = stub.GetTodolist(request=todolist_pb2.google_dot_protobuf_dot_empty__pb2.Empty(), metadata=metadata)
    return response
```

Mục đích là để kết nối tới server todolist (thông qua Dapr các bạn có thể thấy ở đây mình đã gọi tới localhost port 5000), phần metadata các bạn phải thêm trường dapr-app-id với value là id của app mà bạn muốn gọi tới, ở đây id app là  "server" (do cái câu command để run cái server có cái flag `--app-id` là `server` ấy)


Tiếp theo chúng ta tiến hành start client

```shell
dapr run --app-id client -- python .\main.py
```

Ở đây chúng ta không cần phải khai báo dapr grpc port nữa do cả 2 đang dùng trên cùng 1 máy nên không cần nhé, trong trường hợp 2 service ở 2 VPS khác nhau thì câu lệnh lúc này sẽ là

```shell
dapr run --app-id client --dapr-grpc-port 5000 -- python .\main.py
```

# Thử nghiệm
Để lấy ra danh sách các todolist các bạn gọi GET request tới `localhost:3000/todo` nhé

![image.png](https://images.viblo.asia/2adbc308-c016-4509-abb3-4de46d0657aa.png)

Thêm mới 1 todo vào list:
![image.png](https://images.viblo.asia/4379567e-a8c6-47fe-a8a1-fe0782abfb46.png)

Tiến hành get lại: 
![image.png](https://images.viblo.asia/0ff458fd-1fd2-49cf-9820-7284b88e2cbb.png)

Tới đây thì mình đã demo xong cơ bản về **Service Invocation** trong Dapr, ở bài viết sau mình sẽ tiếp tục thử nghiệm các tính năng hay ho của Dapr như Tracing, Distributed lock, .... nhé. Còn những example hay ho hơn các bạn có thể tham khảo tại repo của Dapr. Nhớ up vote nếu cảm thấy bài viết hữu ích nhé <3


- Trang chủ: https://dapr.io/
- Github: https://github.com/dapr
- Example: https://github.com/dapr/quickstarts
- Code trong bài viết: https://github.com/lequocbinh04/dapr-demo-go-python