# **Interface Trong GO**
Trong phần này mình sẽ giời thiệu tiếp theo đối với Interface trong GO, trước mặt bạn phải đọc trước phần trước của mình đó là [ object oriented](https://viblo.asia/p/go-lang-object-oriented-gDVK29Qn5Lj). Interface là một kỹ thuật trong Go được gọi là tinh vi (subtlest).

## Interface là gì ?
Trong một câu nói ngắn, ***Interface*** là những hàm mà cho phép chúng ta có thể định nghĩa hoạt động cho nó được. Vi dụ sinh viên và nhân viên có hàm những sau này:

- Sinh viên: ```SayHi()```,  ```Sing()``` và ```BorrowMoney()```.
- Nhân  viên: ```SayHi()```, ```Sing()``` và ```SpendSalary()```.

Trong ta thấy rằng sinh viên và nhân viên có 2 hàm giống nhau đó là đó là ```SayHi()``` và ```Sing()``` chung ta có thể tạo một class khác đó là con người có những hàm ```SayHi()``` và ```Sing()``` là được gọi là Interface và sinh viên và nhân viên có thể lấy hàm đó để dùng được.

## Cách viết Interface trong Go
Chúng ta sẽ lấy vi dụ trên sinh viên, nhân viên và con người để giải thích cho các bạn bằng code trong GO như sau:
```
package main

import "fmt"

type Human struct {
    name  string
    age   int
    phone string
}

type Student struct {
    Human
    school string
    loan   float32
}

type Employee struct {
    Human
    company string
    money   float32
}

// Interface Men implemented by Human, Student and Employee
type Men interface {
    SayHi()
    Sing(lyrics string)
}

// method
func (h Human) SayHi() {
    fmt.Printf("Hi, I am %s you can call me on %s\n", h.name, h.phone)
}

// method
func (h Human) Sing(lyrics string) {
    fmt.Println("La la la la...", lyrics)
}

// method
func (e Employee) SayHi() {
    fmt.Printf("Hi, I am %s, I work at %s. Call me on %s\n", e.name,
        e.company, e.phone) //Yes you can split into 2 lines here.
}

func main() {
    mike := Student{Human{"Mike", 25, "222-222-XXX"}, "MIT", 0.00}
    paul := Student{Human{"Paul", 26, "111-222-XXX"}, "Harvard", 100}
    sam := Employee{Human{"Sam", 36, "444-222-XXX"}, "Golang Inc.", 1000}
    tom := Employee{Human{"Sam", 36, "444-222-XXX"}, "Things Ltd.", 5000}

    // define interface i
    var i Men

    //i can store Student
    i = mike
    fmt.Println("This is Mike, a Student:")
    i.SayHi()
    i.Sing("November rain")

    //i can store Employee
    i = tom
    fmt.Println("This is Tom, an Employee:")
    i.SayHi()
    i.Sing("Born to be wild")

    // slice of Men
    fmt.Println("Let's use a slice of Men and see what happens")
    x := make([]Men, 3)
    // these three elements are different types but they all implemented interface Men
    x[0], x[1], x[2] = paul, sam, mike

    for _, value := range x {
        value.SayHi()
    }
}
```
## Interface Trống
Interface trống là những  interface không có hàm và có lợi ích cho phép mình lưu lại con trỏ (point) giống C (```void*```).
```
// định nghĩa interface trống
var void interface{}

// vars
i := 5
s := "Hello world"

// lưu lại già trị
void = i
void = s
```
- Nếu một hàm dùng interface trống thì dùng cho kiểu dữ liệu đấu vào của nó thì không phần biết gì hết
- Nếu một hàm dùng interface trống thì dùng cho kiểu dữ liệu đấu ra của nó thì nó có thể trả về bất kỳ kiểu dữ liệu.

## Đấu vào của một Interface
Trong Go không có gì khác cả đối với ngồn ngữ khác (Ruby, Python ...) nhưng nó có cách viết đấu vào của một Interface  như sau:
```
type  [Tên interface] interface {
    [tên hàm] [kiểu dữ liệu của hàm]
}
````
vi du:
```
type Stringer interface {
    String() string
}
```
## Kết Luận
Trên đây là những gì mình tìm hiểu được trong quá trình sử dụng interface trong Go. Interface là một trong những kĩ thuật đặc trưng của Go, mong nhận được ý kiến đóng góp từ các bạn. Mình sẽ giờ thiệu tiếp theo đối với 2 phần nữa cho Interface đó là Embedded interfaces và Reflection
## Tài liệu
- [Interface In Go](https://gobyexample.com/interfaces)
- [Interfaces in Go (part I)](https://medium.com/golangspec/interfaces-in-go-part-i-4ae53a97479c)