Xin chào anh em, chúng ta lại tiếp tục học Golang nào. 
Ở phần này mình sẽ giới thiệu về Struct trong Golang. Struct được dùng thường xuyên nên một người sử dụng golang chắc chắn sẽ phải nắm chắc phần này.
# Struct là gì
Struct là 1 kiểu dữ liệu, nhưng không giống các kiểu dữ liệu nguyên thủy thông thường như int, string... mà struct là kiểu dữ liệu người dùng tự định nghĩa.<br> Một struct có thể bao gồm nhiều trường có các kiểu dữ liệu khác nhau.
## Định nghĩa struct

```go
type Person struct {
	FirstName string
	LastName  string
	Age       int
}
```
Để định nghĩa một struct thì chúng ta dùng từ khóa type, từ khóa này để báo cho Go biết là chúng ta định nghĩa một struct<br> Ở ví dụ trên ta khai báo một struct tên là Person nó có chứa các trường<br> FirstName kiểu string<br>LastName kiểu string<br>Age kiểu int
### Định nghĩa struct bên trong struct
Ta có thể định nghĩa 1 struct bên trong struct khác qua đó struct trong golang thể hiện tính kế thừa của ngôn ngữ này
```go
type Person struct {
   name string
   age int
   sex bool
}

type Student struct {
    Person
    class string
    point float
}
```

Ví dụ trên ta định  nghĩa một struct Person có các trường name, age, sex. Và định nghĩa một struct Student có trường Person, class, point.<br>bên trong student có trường Person là struct nên Student có tất cả các trường nằm trong Person, khi đó Student sẽ có các trường là name, age, sex, slass, point.
## Khởi tạo biến struct 
Có nhiều cách khởi tạo struct như ví dụ sau
```go
package main

import (
	"fmt"
)

// Defining a struct type
type Person struct {
	FirstName string
	LastName  string
	Age       int
}

func main() {
	var p Person //khai báo p có kiểu dữ liệu là Person, các trường của biến p sẽ có kiểu dữ liệu mặc định là 0 với int, 0.0 với float, "" với string
	p.LastName ="Nguyễn"
	p.FirstName = "Thịnh"
	fmt.Println("Person :", p)

	p1 := Person{"A", "Nuyễn Văn", 26} //khai báo p1 có kiểu dữ liệu là Person, các trường có giá trị theo thứ tự khai báo 
	fmt.Println("Person1: ", p1)

	p2 := Person{
		FirstName: "John",
		LastName:  "Snow",
		Age:       45,
	} //khai báo p2 có kiểu dữ liệu là Person, các trường có giá trị được truyền theo key.
	fmt.Println("Person2: ", p2)

	p3 := Person{FirstName: "Robert"} //khai báo p3 có kiểu dữ liệu là Person, các trường FirstName có giá trị "Robert" các trường khác mang giá trị mặc định
	fmt.Println("Person3: ", p3)
}
```

## Truy xuất đến các trường trong struct
Ta có thể thao tác đến các trường trong struct qua dấu chấm '.' 
```go
var p Person 
p.LastName ="Nguyễn"
p.FirstName = "Thịnh"
fmt.Println("LastName :", p.LastName)
fmt.Println("FirstName :", p.FirstName)
```
## Kết bài
Qua bài này chúng ta đã hiểu kỹ hơn về struct và cách sử dụng chúng, cảm ơn các bạn đã theo dõi.
### tài liệu tham khảo 
https://golang.org/doc/