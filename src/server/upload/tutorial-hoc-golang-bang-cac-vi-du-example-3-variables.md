![](https://images.viblo.asia/d96329a3-0350-4bff-bf91-00759fd08a08.jpeg)
Trong Go, các biến(variables) được trình biên dịch khai báo và sử dụng rõ ràng như để kiểm tra tính chính xác của việc gọi hàm(function).

```go
package main

import "fmt"

func main() {

   // Khai báo 1 biến bằng "var"
    var a = "initial"
    fmt.Println(a)

    // Khai báo 2 biến b, c có kiểu dữ liệu là int và khởi tạo luôn giá trị cho chúng
    var b, c int = 1, 2
    fmt.Println(b, c)

   // Go sẽ suy ra loại biến khởi tạo
    var d = true
    fmt.Println(d)

    // Các biến được khai báo mà không có khởi tạo tương ứng có giá trị bằng không.
    var e int
    fmt.Println(e)

    // Cú pháp ":=" là cách viết tắt để khai báo và khởi tạo một biến, 
    // ví dụ: cho var f string = "apple" trong trường hợp này.
    f := "apple"
    fmt.Println(f)
}
```

Ví dụ tiếp theo: [Constants](https://4rum.vn/t/tutorial-go-by-example-constants/569)

Source: https://github.com/nhannguyen09cntt/gobyexample/tree/master/examples/variables

Nguồn: https://4rum.vn/t/tutorial-go-by-example-variables/568