Đa số các ngôn ngữ lập trình hiện nay đều hỗ trợ [lập trình hướng đối tượng](https://viblo.asia/p/undefined-07LKXA7kZV4) ở nhiều mức độ khác nhau. Và Go cũng hỗ trợ lập trình hướng đối tượng theo cách riêng của [Go](https://viblo.asia/p/undefined-07LKXA7kZV4). 

Sau đây là một cái nhìn nhanh về OOP trong Go. 

![](https://images.viblo.asia/07ba53e9-2ede-4120-ae33-f191104a1fd9.jpg)
# 1. Các thuật ngữ
>[*“Go has types and values rather than classes and objects.”*](https://nathany.com/good/)
>
Điều quan trọng đầu tiên là bạn phải hiểu rằng có thể lập trình hướng đối tượng trong Go mà không cần phải có đối tượng. Thuật ngữ "Object" sẽ rất khác khi bạn làm việc với Go.

Trong Go, chúng ta có các **giá trị** (values), trong khi các ngôn ngữ OOP truyền thống có các **đối tượng** (objects), hãy phân biệt hai khái niệm này.
## 1.1 Object với Value
Một **đối tượng** là thể hiện của một lớp. Đối tượng được truy vấn thông qua một tham chiếu có tên.

```php
<?php
class SomeObject {
    public $classVar;
    public function __construct( $classVar ) {
        $this->classVar = $classVar;
    }
}

    
$object    = new SomeObject( "Hello, world." );
$reference = $object;
$reference->classVar = "Look! I can access object!";
echo $object->classVar;    
echo $reference->classVar; 
```
Mã PHP này minh họa rằng cả $object$  và $reference$ trỏ đến cùng một instantiation của SomeObject.

Ngoài việc có thể được truy cập bởi các tham chiếu có tên khác nhau, các đối tượng cũng bao gồm các khái niệm như kế thừa và các lớp con, điều này không thể thực hiện được với Go. Vì vậy, khi học Go, tốt nhất là không quan tâm đến các ràng buộc với đối tượng, và tập trung vào việc sử dụng các thuật ngữ chính xác.

```go
package main
import ("fmt")
type SomeStruct struct{
    Field string
}
func main() {
    value := SomeStruct{Field: "Structs are values"}
    copy  := value
    copy.Field = "This is a Copy & doesn't change the variable value"
    fmt.Println(value.Field)
    fmt.Println(copy.Field)
}

```
Trong ví dụ trên, bạn có thể thấy chúng ta gán copy.Field, copy.Field không bao giờ thay đổi các giá trị của nó. Khi chúng ta muốn tham chiếu cùng một trường hợp, giống như C, chúng ta có con trỏ để thực hiện điều đó.

## 1.2 Types & Method Set
Bây giờ các bạn sẽ biết tại sao Go không có các đối tượng, cùng tìm hiểu cách họat động trên một instance của một **Type**, cụ thể là một kiểu cấu trúc.

```go
type SomeStruct struct{
    Field string
}
// foo nằm trong tập các method của SomeStruct
// (s *SomeStruct) là một receiver mà con trỏ SomeStruct trỏ đến
func (s *SomeStruct) foo(field string) {    
    s.Field = field
}
func main() {
    someStruct := new(SomeStruct)
    
    someStruct.foo("a")
    fmt.Println(someStruct.Field)  // "a"
    someStruct.foo("b")
    fmt.Println(someStruct.Field)  // "b"
}
```
Ở đây, chúng ta thấy rằng phương thức foo hoạt động trên cùng một instance của *someStruct* và thay đổi giá trị *Field* của nó.

Nhắc lại, Go không có các đối tượng, nhưng chúng ta có thể thấy sự tương đồng giữa các phương thức nhận và các phương thức lớp.

-----
Bây giờ chúng ta có thể tìm hiểu các OOP patterns trong Go cụ thể như thế nào.
# 2. Đóng gói (Encapsulation)
> [“Encapsulation is the mechanism of hiding of data implementation by restricting access to public methods.”](https://crackingjavainterviews.blogspot.com/2013/04/what-are-four-principles-of-oop.html)
>
Trong hầu hết các ngôn ngữ lập trình phổ biến, việc đóng gói trong OOP dựa trên lớp đạt được thông qua private và public class variables / methods. Trong Go, đóng gói được thực hiện trên các **package** level.

Các thành phần "public" có thể được xuất ra bên ngoài các package và được trình bày bằng cách viết hoa chữ cái đầu tiên. Ở đây, publlic  được đặt trong dấu ngoặc kép bởi vì thuật ngữ chính xác hơn là exported và unexported elements, tuy nhiên dùng từ public sẽ giúp các bạn nắm bắt nhanh hơn. Unexported elements được chỉ định bằng chữ cái đầu tiên và chỉ có thể truy cập được trong package tương ứng.

> Public/protected/private là những từ khóa liên quan đến các lớp, trong khi exporting/importing liên quan đến các packages.
> 
```go
package encapsulation
import "fmt"
// Encapsulation struct có thể exported ra bên ngoài pagekage này (Encapsulation viết hoa chữ cái đầu)
type Encapsulation struct{}
// Hàm Expose có thể exported ra bên ngoài pagekage này (Expose viết hoa chữ cái đầu)
func (e *Encapsulation) Expose() {
    fmt.Println("AHHHH! I'm exposed!")
}
// hàm hide chỉ có thể sử dụng trong package này (hide viết thường chữ cái đầu)
func (e *Encapsulation) hide() {
     fmt.Println("Shhhh... this is super secret")
}
// Unhide sử dụng hàm hide chưa được exported
func (e *Encapsulation) Unhide() {
     e.hide()
     fmt.Println("...jk")
}
```
Trong package *encapsulation*, Encapsulation (struct), Expose (method), và Unhide (method) tất cả đều có thể được sử dụng từ các packages khác. 

```go
import "github.com/amy/tech-talk/encapsulation"
func main() {
    e := encapsulation.Encapsulation{}    
    e.Expose()    
    // e.hide()    //nếu bỏ comment,  xuất hiện lỗi
                   // ./main.go:10: e.hide undefined (cannot refer
                   // to unexported field or method encapsulation.
                   // (*Encapsulation)."".hide)
    
    e.Unhide()
}
```
Chung quy lại, trong Go khái niệm đóng gói khá đơn giản: chữ cái đầu tên viết hoa thì mở, còn viết thường thì đóng. Quy tắt này áp dụng cho hằng, biến, hàm, trường, phương thức, v.v... Có điều trong Go, khái niệm mở hay đóng chỉ áp dụng bên ngoài package. Trong package, mọi cái đều mở dù tên viết hoa hay viết thường.
# 3. Đa hình (Polymorphism)
>[ “Polymorphism describes a pattern in object oriented programming in which classes have different functionality while sharing a common interface.”](https://stackoverflow.com/questions/1031273/what-is-polymorphism-what-is-it-for-and-how-is-it-used)
>
Như chúng ta thường thấy ở các ngôn ngữ lập trình hướng đối tượng, tính đa hình thể hiện khi các lớp kế thừa cùng một lớp. Với việc sử dụng interface, mặc dù không có khái niệm kế thừa nhưng Go cũng hỗ trợ tính đa hình theo cách riêng của nó.

```go
package polymorphism 
import "fmt"
type SloganSayer interface {
    Slogan()
}
// SaySlogan truyền vào một tham số kiểu SloganSayer
func SaySlogan(sloganSayer SloganSayer) {
    sloganSayer.Slogan()
}
// Hillary thỏa mãn SloganSayer interfa
// bằng việc thực thi function Slogan.
// Vì vậy, Hillary cũng là một kiểu của SloganSayer.
type Hillary struct{}
func (h *Hillary) Slogan() {
    fmt.Println("Stronger together.")
}
// tương tự với struct Trump
type Trump struct{}
func (t *Trump) Slogan() {
    fmt.Println("Make America great again.")
}
```
```go
package main 
import "github.com/amy/tech-talk/polymorphism"
func main() {
    hillary := new(polymorphism.Hillary)
    hillary.Slogan()                  // "Stronger together."
    polymorphism.SaySlogan(hillary)   // "Stronger together."
    trump := new(polymorphism.Trump)
    polymorphism.SaySlogan(trump)     // "Make America great again."
}
```

Trong ví dụ trên, ta không cần quan tâm ứng cử viên nào đang nói khẩu hiệu. Miễn là một kiểu implements của SloganSayer interface, chúng ta có thể truyền nó vào SaySlogan.
# 4. Composition (có thể hiểu như inheritance)
Trong **Go**, thừa kế là không tồn tại. Thay vào đó, chúng ta xây dựng các cấu trúc với các yếu tố tổng hợp và tái sử dựng thông qua **embedding** (nhúng).

Go cho phép chúng ta embed các loại bên trong interface hoặc structs. Thông qua embedding, chúng ta có thể biến các phương thức được included từ bên trong hay bên ngoài.
> [ When we embed a type, the methods of that type become methods of the outer type, but when they are invoked the receiver of the method is the inner type, not the outer one.](https://golang.org/doc/effective_go.html#embedding)
> 
```go
package composition 
import "fmt"
type Human struct {
    FirstName   string
    LastName    string
    CanSwim     bool
}
// Amy được embedded với kiểu Human
// và do đó Amy có thể gọi các phương thức của Human
type Amy struct {
    Human
}
// Alan được embedded với kiểu Human 
type Alan struct {
    Human
}
func (h *Human) Name() {
    
    fmt.Printf("Hello! My name is %v %v", h.FirstName, h.LastName)
}
func (h *Human) Swim() {
    
    if h.CanSwim == true {
        fmt.Println("I can swim!")
    } else {
        fmt.Println("I can not swim.")
    }
}
```
# 5. Trừu tượng (Abstraction)
> [“Abstraction means working with something we know how to use without knowing how it works internally.”](http://www.introprogramming.info/english-intro-csharp-book/read-online/chapter-20-object-oriented-programming-principles/#_Toc362296567)
> 
Tương tự như embedding các structs bên trong một struct, chúng ta cũng có thể embed các interfaces trong các structs. Bất kỳ kiểu nào thỏa mãn interface nào cũng sẽ sử dụng được interface đó.

```go
package abstraction
import "fmt"
type SloganSayer interface {
    Slogan()
}
// Campaign có thể accept a SloganSayer trong quá trình khởi tạo
// Campaign cũng là một SloganSayer bởi vì nó cũng implements SloganSayer interface.
type Campaign struct{
    SloganSayer
}
// SaySlogan cũng có thể accept Campaign như là một tham số truyền vào!
func SaySlogan(s SloganSayer) {
    s.Slogan()
}
// Hillary implements the SloganSayer interface
// Hillary là một SloganSayer
type Hillary struct{}
func (h *Hillary) Slogan() {
    fmt.Println("Stronger together.")
}
// Tương tự với Trump 
type Trump struct{}
func (t *Trump) Slogan() {
    fmt.Println("Make American great again.")
}
```
```go
package main
import "github.com/amy/tech-talk/abstraction"
func main() {
    hillary := new(abstraction.Hillary)
    trump := new(abstraction.Trump)
    h := abstraction.Campaign{hillary}
    t := abstraction.Campaign{trump}
    // Triển khai slogan tranh cử của Trump và hilary được trừu tượng hóa đi.
    // Thay vào đó. Campaign chỉ biết rằng có đó là một SloganSayer
    // và do đó có thể gọi Slogan.
    h.Slogan()  // "Stronger together."
    t.Slogan()  // "Make America great again."
    // Chúng ta có thể inject một  SloganSayer vào tham số SaySlogan
    abstraction.SaySlogan(hillary)  // "Stronger together."
    abstraction.SaySlogan(trump)    // "Make America great again."
    // h và t cũng là một loại campaign
    abstraction.SaySlogan(h)  // "Stronger together."
    abstraction.SaySlogan(t)  // "Make America great again."
}
```

-----

Bây giờ bạn đã biết cách mượn các nguyên tắc OOP ban đầu bạn đã quen thuộc, hãy bắt đầu viết một số mã mô-đun. Dưới đây là tóm tắt về cách các [nguyên tắc OOP trong Go](https://viblo.asia/p/undefined-07LKXA7kZV4).
> ### Encapsulation --> *Packages*
> ### Inheritance --> *Composition*
> ### Polymorphism --> *Interfaces*
> ### Abstraction ---> *Embedding*
> 

Bài viết tham khảo từ tác giả [Amy Chen](https://medium.com/@amy?source=post_header_lockup) với bài viết [OOP and Go… Sorta](https://medium.com/behancetech/oop-and-go-sorta-c6682359a41b).