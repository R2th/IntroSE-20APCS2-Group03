<h2>1. Giới thiệu</h2>
Go là một ngôn ngữ lập trình được đi kèm với các bộ công cụ mạnh mẽ giúp cho việc tải các package và  build file thực thi rất đơn giản. Một trong những tính năng hay nhất của Go đó là khả năng build file thực thi cho đa nền tảng, miễn là Go support (các nền tảng này mình sẽ đề cập ở dưới). Điều này giúp cho chúng ta test cũng như triển khai ứng dụng, package của mình trên các nền tảng 1 cách dễ  dàng, bởi vì không cần phải vào từng nền tảng để tiến hành build lại nữa.
Tuy nhiên cũng sẽ có những trường hợp mà chúng ta sẽ không thể chỉ dùng mỗi go để có thể build đa nền tảng. Trong bài này mình sẽ hướng dẫn các bạn build đa nền tảng với Go và CGO

<h2>2. Sử dụng go build để build cross platform</h2>
Chúng ta sẽ tạo 1 ứng dụng go đơn giản: In ra màn hình Hello From Go

```go
    package main
    import "fmt"
    func main() {
        fmt.Println("Hello from go")
    }
```

 Vì mình đang sử dụng MacOS nên để build file thực thi cho thì chỉ cần chạy:  
 `go build`  
 và để phân biệt được các file thực thi mình sẽ chỉ định cụ thể file được build ra bằng cách dùng -o file_name như sau:  
 `go build -o mac_exe`  
 
 Khi này ở thư mục của project mình đã có được 1 file mới là mac_exe. Để chạy file này thì mình chỉ cần chạy `./mac_exe`. Kết quả hiển thị sẽ là `Hello from go`  
 Tiếp đến mình sẽ build thêm cho windows và ubuntu.  
 Để build cho các nền tảng khác thì chúng ta sẽ cần phải xác định được hệ điều hành (os), và architecture của chip. Dưới đây là 1 số os và architecture:
| OS | ARCH |
| -------- | -------- |
|android|arm|
|darwin|386|
|darwin|amd64|
|darwin|arm|
|darwin|arm64|
|dragonfly|amd64|
|freebsd|386|
|freebsd|amd64|
|freebsd|arm|
|linux|386|
|linux|amd64|
|linux|arm|
|linux|arm64|
|linux|ppc64|
|linux|ppc64le|
|linux|mips|
|linux|mipsle|
|linux|mips64|
|linux|mips64le|
|netbsd|386|
|netbsd|amd64|
|netbsd|arm|
|openbsd|386|
|openbsd|amd64|
|openbsd|arm|
|plan9|386|
|plan9|amd64|
|solaris|amd64|
|windows|386|
|windows|amd64|  
<br/>
Khi đã xác định được 2 giá trị này thì chúng ta chỉ việc set GOOS và GOARCH khi build như sau để build cho windowns và linux:

`GOOS=linux GOARCH=amd64 go build -o linux_exe .`  
`GOOS=windows GOARCH=amd64 go build -o windows_exe.exe .`  
Vậy là chúng ta đã build được 3 file thực thi cho cả 3 hệ điều hành là macos, ubuntu, windows.
<h2>3. CGO và go build</h2>
Go cũng hỗ trợ chúng ta nhũng code C, C++ thông qua CGO. Đây là 1 chương trình đơn giản mà mình sẽ nhúng thêm C vào trong Go.

```c:cheader.h

    #include <stdio.h>
    void Hello();
    
   csource.c:
```
```c
#include "cheader.h"
void Hello(){
    printf("Hello from C\n");
}
```

```go:main.go:  
    
    package main

    /*
      #include "cheader.h"
    */
    import "C"
    import "fmt"

    func main() {
        fmt.Println("Hello from Go")
        C.Hello()
    }
```

Khi sử dụng lệnh go build, chúng ta vẫn có thể build ra được file thực thi trên môi trường hiện tại.  

Nhưng khi set GOOS và GOARCH chúng ta sẽ bị lỗi `build constraints exclude all Go files`

<h2>4. Sử dụng elastic Docker image để build cross platform cgo </h2>

Một trong nhưng cách đơn giản nhất mà mình hay dùng để giải quyết vấn đề cross build với cgo đó chính là sử dụng docker image này do elastic phát triển để build: https://github.com/elastic/golang-crossbuild  
Để sử dụng được image thì trước tiên các bạn phải cài đặt docker trong máy của mình.
Sau đó chúng ta vào https://github.com/elastic/golang-crossbuild/tags và chọn version go muốn chạy.  
Ở đây mình sẽ chọn là 1.18 và để build cho ubuntu và window nên sẽ dùng image này
docker.elastic.co/beats-dev/golang-crossbuild:1.18-main  
Cuối cùng chỉ cẩn chạy (thay PROJECT_PATH bằng path đến code của các bạn):  
Ubuntu:  
```
    docker run -it --rm \
      -v PROJECT_PATH:/go/src/app \
      -w /go/src/app \
      -e CGO_ENABLED=1 \
    docker.elastic.co/beats-dev/golang-crossbuild:1.18-main\
      --build-cmd "go build -o linux_exe" \
      -p "linux/amd64"
```

Windows:  
```
    docker run -it --rm \
      -v PROJECT_PATH:/go/src/app \
      -w /go/src/app \
      -e CGO_ENABLED=1 \
    docker.elastic.co/beats-dev/golang-crossbuild:1.18-main\
      --build-cmd "go build -o windows_exe.exe" \
      -p "windows/amd64"
```
Sau khi chạy thì mình đã có được 2 file thực thi cho linux và window trong thư mục của project.

<h2>5. Tổng kết</h2>
Như vậy mình đã giới thiệu sơ qua cách build cross platform cho go cũng như 1 cách để build cgo. Hẹn gặp các bạn ở những bài sau.