![go-basic-types-operators-type-conversion|690x367](https://4rum.vn/uploads/default/original/1X/892373d3bc7640ac82e17413e307d1e1a67b6602.jpeg) 

Go có nhiều loại giá trị khác nhau bao gồm:  strings, integers, floats, booleans, v.v ... Dưới đây là một vài ví dụ cơ bản.
```
package main

import "fmt"

func main() {
    // Chuỗi, có thể được thêm vào bằng cách sử dụng dấu "+".
    fmt.Println("go" + "lang")
   
    //Integers and floats.
    fmt.Println("1+1 =", 1+1)
    fmt.Println("7.0/3.0 =", 7.0/3.0)
   
    // Kiểu logic đúng/sai: Boolean với các toán tử boolean.
    fmt.Println(true && false)
    fmt.Println(true || false)
    fmt.Println(!true)
}
```

```
$ go run values.go
golang
1+1 = 2
7.0/3.0 = 2.3333333333333335
false
true
false
```

Ví dụ tiếp theo: [Variables](https://4rum.vn/t/tutorial-go-by-example-variables/568)

Source: 
https://github.com/nhannguyen09cntt/gobyexample/tree/master/examples/values

Nguồn: https://4rum.vn/t/tutorial-go-by-example-values/567