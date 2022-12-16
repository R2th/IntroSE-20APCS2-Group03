Map là một kiểu dữ liệu trong **Go**, nó bao gồm các key và value được map với nhau. Chúng ta có thể khai báo map trong **Go** bằng cách sử dụng cú pháp sau:

```golang
var m map[string]int
```

Câu lệnh trên khai báo một biến m là một Map, có các key là kiểu String và value là kiểu Integer. Chúng ta có thể thêm các cặp key - value cho Map bằng câu lệnh sau:

```golang
// adding key/value
m ["clearity"] = 2
m ["simplicity"] = 3

// printing the values
fmt.Println(m["clearity"]) // => 2
fmt.Println(m["simplicity"]) // => 3
```

# Typecasting

Một kiểu dữ liệu có thể được convert sang một kiểu khác bằng cách sử dụng **type casting**. Hãy xem một ví dụ bên dưới:

```golang
a := 1.1
b := int(a)
fmt.Println(b)
// => 1
```

Không phải mọi kiểu dữ liệu đều có thể convert được sang kiểu khác. Đảm bảo rằng kiểu dữ có thể chuyển đổi được trước khi thực hiện chuyển đổi

# Conditional Statements

## if else

Đối với câu lệnh điều kiện, chúng ta có thể sử dụng câu lệnh if - else như ví dụ bên dưới:

```golang
if num := 9; num < 0 {
  fmt.Println(num, "is negative")
} else if num < 10 {
  fmt.Println(num, "has 1 digit")
} else {
  fmt.Println(num, "has multiple digits")
}
```

## switch case
Dưới đây là cách sử dụng câu lệnh switch case:

```golang
i := 2
switch i {
  case 1:
    fmt.Println("one")
  case 2:
    fmt.Println("two")
  default:
    fmt.Println("none")
}
```

# Looping

Go có từ khóa **for** được dùng cho vòng lặp:

```golang
i := 0
sum := 0
for i < 10 {
  sum += 1
  i++
}

fmt.Println(sum)
```

Vòng lặp vô hạn trong Go:

```golang
for {

}
```

# Pointer

Khi chúng ta gọi một hàm và truyền tham số vào đó, giá trị của tham số đó sẽ được sao chép vào trong hàm đó, ví dụ:

```golang
package main

import "fmt"

func zero(x int) {
  x = 0
}

func main() {
  x := 5
  zero(x)
  fmt.Println(x) // => 5
}
```

Trong đoạn code trên, hàm *zero()* có tác dụng gán cho biến x giá trị là 0. Trong hàm main() chúng ta khai báo một biến x có giá trị là 5 rồi truyền vào hàm *zero()*, sau đó chúng ta in giá trị của biến x ra màn hình, kết quả vẫn bằng 5. Lý do là vì giá trị của biến x trong hàm *main()* được sao chép vào tham số x của riêng hàm *zero()* chứ hàm *zero()* không nhận một biến x nào cả

Tuy nhiên nếu chúng ta muốn hàm *zero()* thao tác trực tiếp luôn với biến x của hàm *main()* thì chúng ta phải dùng đến con trỏ. Ví dụ:

```golang
package main

import "fmt"

func zero(xPrt *int) {
  *xPtr = 0
}

func main() {
  x := 5
  zero(&x)
  fmt.Println(x) // => 0
}
```

Con trỏ trong Go là một loại biến đặc biệt, được dùng để lưu trữ địa chỉ của biến khác trong bộ nhớ RAM chứ không lưu trữ một giá trị cụ thể nào. Để khai báo một biến con trỏ thì chúng ta thêm dấu **\*** vào trước tên kiểu dữ liệu. Khi chúng ta in giá trị của một biến con trỏ ra màn hình thì giá trị đó sẽ là một số ở hệ hexa (hệ 16), đó là dịa chỉ bộ nhớ mà con trỏ này đang trỏ tới

Khi gán giá trị cho biến con trỏ, chúng ta cũng phải đưa vào đó một địa chỉ bộ nhớ nào đó chứ không đưa một giá trị vào, để lấy địa chỉ bộ nhớ của một biến thì chúng ta dùng dấu **&** trước tên biến

Ngoài chức năng khai báo biến con trỏ, dấu **\*** còn có tác dụng lấy giá trị của địa chỉ bộ nhớ mà con trỏ đang tham chiếu tới, ngược lại chúng ta cũng có thể gán giá trị cho địa chỉ đó thông qua dấu **\***. Ví dụ:

```golang
package main

import "fmt"

func main() {
  var x *int
  var y int

  y = 0
  x = &y

  fmt.Println(x)
  fmt.Println(&x)

  *x = 1

  fmt.Println(*x)
  fmt.Println(y)
}
```

Trong đoạn code trên, chúng ta:
 - Khai báo x là biến con trỏ kiểu int, y là một biến int bình thường
 - Gán giá trị cho y là 0
 - Cho x trỏ tới địa chỉ bộ nhớ của y
 - Lúc này x sẽ mang giá trị là địa chỉ bộ nhớ của y, chúng ta có thể dùng dấu & để lấy địa chỉ của bộ nhớ y, hoặc dùng dấu **\*** để lấy giá trị tại địa chỉ của y
 - Gán giá trị cho y (hay giá trị tại địa chỉ bộ nhớ mà x đang tham chiếu tới) là 1 bằng cách dùng dấu **\***

# Functions

Function **main** định nghĩa trong package **main** là nơi bắt đầu của một chương trình Go.
Ngoài ra chúng ta cũng có thể định nghĩ được những Function khác:

```golang
func add(a int, b int) int {
  c := a + b
  return c
}

func main() {
  fmt.Println(add(2, 1)) // => 3
}
```
Như chúng ta có thể thấy ở ví dụ trên, một function trong Go được định nghĩa bằng từ khóa **func** và tiếp theo là tên của function. Những tham số của một function nhận vào được đi kèm với kiểu của tham số đó, và cuối cùng là kiểu của giá trị trả về. Một biến được trả về trong function cũng có thể được xác định trước như sau:

```golang
func add(a int, b int) (c int) {
  c = a + b
  return
}

func main() {
  fmt.Println(add(2, 1)) // => 3
}
```

Biến c được định nghĩa như là một biến trả về. Vì vậy biến c sẽ tự động trả về mà không cần phải ghi rõ trong câu lệnh return

Chúng ta cũng có thể trả về nhiều giá trị từ một function bằng cách chia cách các giá trị bằng dấu "**,**"

```golang
func add(a int, b int) (int, string) {
  c := a + b
  return c, "successfully added"
}

func main() {
  sum, message := add(2, 1)
  fmt.Println(message)
  fmt.Println(sum)
}
```

# Method, Structs and Interfaces

Go không phải là một ngôn ngữ hướng đối tượng, nhưng với **Structs**, **Interfaces** và **Method** thì nó khiến chúng ta cảm thấy như đang sử dụng một ngôn ngữ hướng đối tượng

## Struct

Một Struct là một kiểu giá trị, một tập hợp các trường khác nhau. Một Struct thường được dùng để nhóm các giá trị lại với nhau. Ví dụ, nếu chúng ta một nhóm các giá trị của một kiểu "Person", chúng ta định nghĩa ra những thuộc tính của "Person" như "name", "age", "gender". Một Struct có thể được định nghĩa như sau:

```golang
type Person struct {
  name string
  age int
  gender string
}
```

Với một struct "Person" đã được định nghĩa như trên, chúng ta có thể khởi tạo một "Person" như sau:

```golang
// cách 1: khởi tạo một Person bằng các khai báo cả các trường và giá trị của các trường đó
p = person{name: "Bob", age: 42, gender: "Male"}
// cách 2: chỉ khai báo các giá trị
person("Bob", 42, "Male")
```

Chúng ta có thể dễ dàng lấy giá trị của các trường dựa vào dấu "**.**"

```golang
p.name // => Bob
p.age // => 42
p.gender // => Male
```

Chúng ta cũng có thể lấy giá trị của các thuộc tính trong Struct bằng Pointer như sau:

```golang
pp = &person{name: "Bob", age: 42, gender: "Male"}
pp.name // => Bob
```

## Methods

Method là một kiểu dữ liệu đặc biệt của function với một **receiver**. Một receiver có thể là một giá trị hoặc cũng có thể là một Pointer. Chúng ta hãy cùng thử tạo một Method với tên là "describe" và có một receiver có type là Person:

```golang
package main
import "fmt"

// khởi tạo struct
type person struct {
  name string
  age int
  gender string
}

// khởi tạo method
func (p *person) describe() {
  fmt.Printf("%v is %v years old", p.name, p.age)
}

func (p *person) setAge(age int) {
  p.age = age
}

func (p person) setName(name string) {
  p.name = name
}

func main() {
  pp := &person{name: "Bob", age: 42, gender: "Male"}
  pp.describe()
  // => Bob is 42 years old
  pp.setAge(45)
  fmt.Println(pp.age)
  // => 45
  pp.getName("Hari")
  fmt.Println(pp.name)
  // => Bob
}
```

Như chúng ta có thể thấy ở ví dụ trên, method có thể được gọi đến qua dấu "**.**" như "pp.describe". Chúng ta cần chú ý rằng receiver là một Pointer. Với receiver là một Pointer, chúng ta sẽ chuyển một tham chiếu đến giá trị, vì vậy nếu chúng ta thực hiện bất cứ thay đổi nào, nó sẽ thay đổi trực tiếp đến Pointer. Nó cũng sẽ không tạo thêm bất cứ một bản sao mới nào của đối tượng, giúp tiết kiệm bộ nhớ

Chúng ta có thể để ý rằng trong ví dụ trên, giá trị của "age" đã được thay đổi trong khi giá trị của "name" không thay đổi là do phương thức "setName" là một **receiver type** trong khi đó "setAge" là một **pointer type**

## Interfaces

Interface trong Go là một tập hợp các Method. Interfaces giúp chúng ta nhóm những phương thức của một type lại với nhau. Hãy thử tạo một Interfaces có tên là "animal" như sau:

```golang
type animal interface {
  description() string
}
```

Trong đoạn code trên, "animal" là một kiểu Interface. Bây giờ chúng ta hãy thử tạo 2 đối tượng của "animal" mà có thể thực thi được interface "animal":

```golang
package main
import "fmt"

type animal interface {
  description() string
}

type cat struct {
  Type string
  Sound string
}

type snake struct {
  Type string
  Poisonous bool
}

func (s snake) description() string {
  return fmt.Printf("Poisonous: %v", s.Poisonous)
}

func (c cat) description() string {
  return fmt.Printf("Sound: %v", c.Sound)
}

func main() {
  var a animal
  a = snake{Poisonous: true}
  fmt.Println(a.description()) // => Poisonous: true
  a = cat{Sound: "Meow!!"}
  fmt.Println(a.description()) // => Sound: Meow!!
}
```

Trong function main, chúng ta tạo một biến a có thuộc kiểu animal. Chúng ta khởi tạo 2 struct là "cat" và "snake" thuộc type animal và sử dụng Println để in ra màn hình a.description. Chúng ta thực hiện phương thức description trên "cat" và "snake" khác nhau, vì vậy chúng ta có 2 cách mô tả khác nhau cho 2 con vật.

Đến đây là kết thúc phần 2 của bài viết, hãy cùng chờ đón phần cuối của bài viết nhé!

**Bài viết gốc**: [Learning Go - from zero to hero](https://medium.freecodecamp.org/learning-go-from-zero-to-hero-d2a3223b3d86)