### **Giới Thiệu**
Trong một vài năm gần đây thì ngôn ngữ lập trình Golang cực kì hot, vì hot nên thị trường công việc cũng như tuyển dụng vô cùng đa dạng.
Golang hiện tại rất mạnh cũng như rất mới ở Việt Nam nên hôm nay mình demo đơn giản tạo một source vào một api để ping và build ra image docker cũng như run nó nhé.

-----

### **Create Project**
Trước Khi tạo project golang bạn cần setup môi trường cho nó, để kiểm tra đã setup môi trường ok thì bạn run:
```
go verion
```
=> nếu kết quả ra thế này là ok rồi, *go version go1.18.2 darwin/arm64* hoặc version thấp hơn nhé.

-----

1. Để create 1 project golang bạn run: *golang-docker-demo* thì bạn có thể thay đổi tên khác nhé
```
go mod init golang-docker-demo
```
=> sau khi run xong bạn sẽ thấy một file *go.mod* được tạo ra.

2. Bạn tạo một file main.go:
```
package main

import (
	"fmt"
)
func main() {
	fmt.Println("running")
}
``` 
=> sau khi run *go run main.go* thì sẽ thấy kết quả *running*.  OK rồi bây giờ bạn có thể đi phỏng vấn với golang và nhận offer 2K$ rồi đó haha.

3. Bây giờ sẽ  tạo một api rest đơn giản sau đó thực hiện lệnh *curl http://localhost:8100/ping*  bạn thay thế đoạn code trên bằng đoạn code dưới này nhé.
```
package main

import (
	"fmt"
	"log"
	"net/http"
)

func init() {

}

var (
	ServiceName = "golang-docker-demo"
	port        = "8100"
)

func main() {
	http.HandleFunc("/ping", func(w http.ResponseWriter, req *http.Request) {
		w.Write([]byte(fmt.Sprintf("ping ok %s", ServiceName)))
	})
	fmt.Println("start service with port: ", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}

```
=> nếu kết quả là *ping ok golang-docker-demo* thì bạn đã thành công rồi đó. sau này chỉ cần xử lý get data từ database là được rồi.

### **Build Image**
Sau khi create project xong, bước tiếp theo là mình sẽ tạo *Dockerfile* bạn nhớ là ghi tên file đúng nha, nếu không đúng nhé, sau đó copy đoạn script này vào.
```
FROM golang:1.18.2-alpine
WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build  -o /out/main ./
ENTRYPOINT ["/out/main"]
```

Tiếp theo là bước build image, nhớ là cũng setup docker môi trường trước nhé.
```
docker build -t golang-docker-demo .
```
=> sau khi đợi build xong, bạn run *docker images* bạn sẽ thấy *golang-docker-demo* ở cột năm là build thành công rồi đó.

Tiếp đó là mình run images thành container nhé.
```
docker run --name   golang-docker-demo -p 8100:8100 -h 0.0.0.0 golang-docker-demo 
```
=> Sau khi build xong, bạn run *docker ps* nếu có xuất hiện *golang-docker-demo* ở cột name thì là đã run được container.

Bước cuối cùng bạn run:
```
curl http://localhost:8100/ping
```
=> **ping ok golang-docker-demo** thì đã thành công rồi nhé.

link source code: https://github.com/ducnpdev/golang-docker-demo