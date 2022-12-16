[Go by Example](https://4rum.vn/t/tutorial-h-c-golang-b-ng-nh-ng-vi-d/499)
[](https://4rum.vn/uploads/default/original/1X/f4a83e50a187197282eaa585c0292be3c56037a4.png)

Ở chương trình đầu tiên, chúng ta sẽ in ra thông điệp cổ điển: “Hello world”. Đây là mã nguồn đầy đủ:
```
package main

import "fmt"

func main() {
    fmt.Println("hello world")
}
```
Để chạy chương trình, hãy viết code trong file hello-world.go và sử dụng go run.
```
$ go run hello-world.go
hello world
```
Đôi khi chúng ta muốn xây dựng chương trình của mình thành file nhị phân(binary). Có thể thực hiện bằng cách dùng go build.
```
$ go build hello-world.go
$ ls
hello-world    hello-world.go
```
Sau đó chúng ta run trực tiếp file:
```
$ ./hello-world
hello world
```
Hiện tại chúng ta đã có thể build và run một ứng dụng Go cơ bản. Hãy học hỏi thêm bằng các ví dụ tiếp theo.

Ví dụ tiếp theo: [Values](https://4rum.vn/t/tutorial-go-by-example-values/567)

Source: https://github.com/nhannguyen09cntt/gobyexample/tree/master/examples/hello-world

Refer: 
https://4rum.vn/t/tutorial-go-by-example-hello-world/500
https://github.com/mmcgrana/gobyexample