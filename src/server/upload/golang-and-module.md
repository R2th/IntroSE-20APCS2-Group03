Ờ bài viết này chúng ta sẽ tìm hiểu về go module.

### GOPATH

Trước version 1.11, để có thể code với go, source code của bạn cần đặt đúng folder,
cụ thể trong thư mục `$GOPATH/src`.   
Tuy nhiên cộng đồng cũng có những tool giúp ta quản lý dependency như cách node (npm) làm.  
Godep là 1 ví dụ như thế.
Bạn có thể tìm hiểu thêm về [godep ở đây](https://github.com/tools/godep)

### Go Module

Bắt đầu từ version 1.11,  Go team đã hỗ trợ việc quản lý dependency đơn giản hơn bằng module.
Các bước thực hiện:

1. Tạo folder project
```
$ mkdir -r /tmp/hello-http
$ cd /tmp/hello-world
```

2. Khởi tạo module

```
$ go mod init hellohttp
// Bạn có thể đặt tên cho module theo ý
```

3. Tạo file `hello.go` như sau:
```
package main

import (
   "net/http"
   
)

func main() {
   http.HandleFunc("/", index)
   http.ListenAndServe(":3000", nil)
}

func index(w http.ResponseWriter, r *http.Request) {
   w.Write([]byte("hello world"))
}
```

4. Build và chạy app

```
$ go build
$ ./hello
```