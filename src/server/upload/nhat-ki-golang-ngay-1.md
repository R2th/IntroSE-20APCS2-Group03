# Bắt đầu 
Mình cũng đã tiếp xúc với go nhưng lâu không động đến rồi. Chắc lên TutorialPoints đọc lại chút để xem cú pháp qua đã, tự giới hạn tầm 15p. Nếu bạn nào cần tiếng việt thì có Phở Code cũng có bài về go rất dễ hiểu, mình sẽ để link resource ở đây:
- [https://www.tutorialspoint.com/go/index.htm](https://www.tutorialspoint.com/go/index.htm)
- [https://phocode.com/golang/go-lap-trinh-go/](https://phocode.com/golang/go-lap-trinh-go/)

Chỉ xem cú pháp thôi nhé. Nhớ đợt trước thử dùng go có cái gopath mệt vãi cứ phải xét lên xét xuống, nên phần tìm hiểu về quản lý package mình để sau. Từ đầu đã nhảy vào mấy cái đấy mệt lắm. Chả học được gì 1 tiếng cài cắm với sửa lỗi cũng đủ nản rồi.
# Code thử
## bắt đầu từ cái "Hello world" đã
```go
package main

import "fmt"

func main() {
  fmt.Println("Hello", "World")
}
```
Tự viết cho quen tay.
## Thử code vài ví dụ huyền thoại
### Tính số fibonaci nào đó
```go
package main

import "fmt"

func main() {
  x1 := 0
  x2 := 1
  x3 := 1
  n := 20
  for (n > 0) {
    x1 = x2
    x2 = x3
    x3 = x1 + x2
    n--
  }
  fmt.Println(x3);
}
```
Đơn giản mà sao dài thế nhỉ, tìm cách nào code ngắn hơn tí.
```go
package main

import "fmt"

func main() {
  x1, x2, n := 1, 1, 20
  for ;n>0;n-- {x1, x2 = x2, x1 + x2}
  fmt.Println(x2);
}
```
Ngắn đi trông thấy.
### Kiểm tra nguyên tố
```go
package main

import "fmt"

func main() {
  n, ch := 997, 0
  for i:= 2; i < n; i++ {
    if (n % i == 0){ch = 1;}
  }
  if (ch == 1) { 
    fmt.Println(n, "is not prime")
  } else { 
    fmt.Println(n, "is prime")
  }
}
```
Code thử cho nó chạy thôi, optimize tí nào.
```go
package main

import "fmt"

func main() {
  n, ch := 999, true
  for i:= 2; i * i <= n; i++ {
    if (n % i == 0){
      ch = false;
      break;
    }
  }
  if (ch) { 
    fmt.Println(n, "is prime")
  } else { 
    fmt.Println(n, "is not prime")
  }
}
```
### Phân tích thừa số nguyên tố
```go
package main

import "fmt"

func main() {
  n := 2 * 2 * 3 * 5 * 17 * 97
  t := n
  for i := 2; t > 1; i++ {
    if (t % i == 0) {
      c := 0
      for ;t % i == 0; c++ {
        t = t / i;
      }
      fmt.Println(i, "^", c)
    }
  }
}
```
# Tổng kết
Nay dừng đây đã, cơ bản nắm được lệnh điều kiện và lệnh lặp của go, Những code trên mình tự viết, có thể không tốt lắm, viết cho quen tay với ngôn ngữ thôi.