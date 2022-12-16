# Go Lang - Object Oriented
Trong bài viết của mình phần trước mình đã nói khái niêm về [struct](https://viblo.asia/p/go-lang-struct-L4x5xkAglBM). Nhưng có một số các bạn vẫn đang nghỉ ngỡ về cách dùng hàm và thuộc trong struct. Như vậy trong phần này mình sẽ bước chân tiếp tục giờ thiệu các bạn về khái niêm mới trong Go đó là *method*.

![](https://images.viblo.asia/14aeaeb7-7908-4319-967e-3881add3c6e0.png)

## Method
Nói một cách nôna, bạn có thể tự hiểu rằng method cùng giống như hàm *function* nhưng vẫn chưa đủ nghĩa của nó. Nó được gọi là hướng đối tưởng trong Go (GO OO). Mình sẽ giải thích trong một vi dụ như sau: Chúng ta sẽ định nghĩa một struct được gọi là *triangle* và chúng ta mong muốn tính toàn diện tích của nó lúc người nhận độ dài của 3 cạnh của tạm giác bằng cách áp dụng công thức [Heron](https://en.wikipedia.org/wiki/Heron%27s_formula)
```
package main

import (
    "fmt"
    "math"
  )

type Triangle struct {
    a, b, c float64
}

func semiPerimeter(t Triangle) float64 {
    return (t.a + t.b + t.c) / 2
}

func area(t Triangle) float64 {
    p := semiPerimeter(t)
    return math.Sqrt(p * (p - t.a) * (p - t.b) * (p - t.c))
}

func main() {
    t1 := Triangle{12, 2, 2}
    t2 := Triangle{9, 4, 1}
    fmt.Println("Area of r1 is: ", area(t1))
    fmt.Println("Area of r2 is: ", area(t2))
}
```
Vi dụ trên chúng ta đang  tính toàn tam giác bằng cách dùng hàm ***area***. Nhưng hàm nó không là của Triangle Struct (như một hàm của class hướng đổi tưởng). Cách hàm và struct đó toàn độc lập khác nhau. có nghĩa là bạn có thể tạo một hoặc nhiều tên hàm area giống nhau nhưng chỉ có khác biết với đầu nhận vào mà thôi (***receiver***). Vi du:
```
package main

import (
    "fmt"
    "math"
)

type Circle struct {
    radius float64
}

type Rectangle struct {
    width, height float64
}

// method
func (c Circle) Area() float64 {
    return c.radius * c.radius * math.Pi
}

// method
func (r Rectangle) Area() float64 {
    return r.width * r.height
}

func main() {
    c1 := Circle{10}
    c2 := Circle{25}
    r1 := Rectangle{9, 4}
    r2 := Rectangle{12, 2}

    fmt.Println("Area of c1 is: ", c1.Area())
    fmt.Println("Area of c2 is: ", c2.Area())
    fmt.Println("Area of r1 is: ", r1.Area())
    fmt.Println("Area of r2 is: ", r2.Area())
}
```
Theo vi du chúng ta có thể đặt được syntax của cách viết của hàm trên đó là
```
func (r ReceiverType) funcName(parameters) (results)
```
+ **Chú ý:** 
    - Nếu bạn muốn dùng tên của hàm giống nhau thì nó phải có receiver khác nhau
    - Method phải bắt buộc có thể gọi được thuộc tính của Receiver
    - Sử dùng ***.***  cho việc gọi hàm của struct.
 ## Type
  
Trong vi dụ tính diện tích của Circle và Rectangle, ta thấy rằng 2 cái đó được dùng cùng một method Area(), như vậy ta sẽ có receivers là Rectangle và Circle. Nhưng một điều vô lý hàm của Area không có chỗ để truyển theo giá trị, có nghĩa là nếu mình muốn tính một dịch tính mới thì mình phải khởi tạo một struct mới hoàn toàn, nếu ta chỉ muốn khởi tạo một lần duy nhất và hàm Area() có thể truyển theo giá trị. Để giải quyết vấn đề này ta cần phải dùng ***type***.

  ```type typeName typeLiteral```
  
  - Ta sẽ có vi dụ như sau:
  ```
type age int
type money float32
type months map[string]int

m := months {
    "January":31,
    "February":28,
    ...
    "December":31,
}
  ```
 ## Tính kế thừa (Inheritance of method)
  Trong Golang cùng hỗ trợ tính kế thừa nhưng không phải một tính kế thừa rõ ràng như  nguồn ngữ Java, Ruby, PHP ... 
  
```
type Employee struct {
	id int
	name string
	salary float32
}

type Manager struct {
	Employee	// embedding a nameless Employee here
	managedSector string
}

func (e Employee) printNameMethod() {
	fmt.Println("Name: ", e.name)
}

func printNameFunction(e Employee) {
	fmt.Println("Name: ", e.name)
}

func test() {
	m := Manager{Employee{1, "Rafael", 1000.0}, "Engineering"}
	fmt.Println(m.id) 		// or fmt.Println(m.Employee.id)
	printNameFunction(m.Employee) 	// printNameFunction(m) DOES NOT work
	m.printNameMethod() 		// m.Employee.printNameMethod()
}
```
## Kết Luận
Tuy nhiên đối với Go có phần thật khác nhau đối với một số nguồn  ngữ hướng đối tưởng khác (C++, Java, Ruby . . .). Bây giờ chúng ta có thể viết một chương trình hướng đối tượng và các phương thức sử dụng quy tắc viết hoa để quyết định xem công khai hay riêng tư
## Tài liệu
- [Introduction to OOP in Golang
](https://code.egym.de/introduction-to-oop-in-golang-e4841a9c4e3e)
- [Golang Receiver vs Function Argument
](https://grisha.org/blog/2016/09/22/golang-receiver-vs-function/)