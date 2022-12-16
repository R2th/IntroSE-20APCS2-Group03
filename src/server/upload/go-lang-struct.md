# Go Lang - Struct
Đối với bài viết này là bài viết phần hai của mình, nếu các bạn chưa hiểu rõ về cách khai bảo biến.. thì bạn có thể vào phần một của mình [phần một](https://viblo.asia/p/gioi-thieu-ve-go-lang-LzD5dbjOZjY). Đối với phần này mình giời thiệu tiếp về phần thật là quan trọng đó là ***struct*** Có thể nói một cách đối với go làng cách viết struct cứ dành cho một tập hợp các trường (field) do người dùng tự định nghĩa. Mỗi trường có thể có kiểu dữ liệu khác nhau, thậm chí có thể là một ***struct**. 
![](https://images.viblo.asia/402ab0d0-f753-489a-9839-a4ea243d07e5.png)

## Struct
 Trong Go không có class như các ngôn ngũ hướng đối tượng khác (Java, Ruby, C#, Python, PHP . . .) như vậy bạn có thể tự hỏi rằng mình nếu bạn muốn viết một ý tưởng hướng đối tượng cho GO thì bạn phải làm thể nào ? GO không có class, không có inheritance (tính kế thừa), không có method để viết lại (method overriding), không có ngoại lệ (No exception) . . ., Nhưng Go có ***struct***, ***struct*** giúp trong ta để như sau:

- Định nghĩa các trường (field) giống class
- Viết hướng đối tượng cho Go

![](https://images.viblo.asia/3c9a3665-dc12-4edb-98ed-70a0b6d7ae90.jpg)


 ### Cách định nghĩa struct
Cách định nghĩa của struct:
 ```
 type [tên_struct] struct {
  // trường của struct (fields)
 }
 ```
 
 Chúng ta có thể định nghĩa một struct trong Go không khác nhiều lắm do với ngôn ngữ lập trình khác. không để mất thời giản nhiều, chúng ta sẽ bước chân viết một struct ```employee``` và trong ```employee``` mình sẽ có trường (field) như sau ```name```, ```age```, và ```salary```. Chúng ta sẽ viết tất cả cái đó trong một struct như này:
 
 ```
 type Employee struct {
     name string
     age int
     salary int
 }
 ```
 Trong struct trên này  mình có 3 trường (fields)
    
    - name có kiểu dữ liệu là string dành để lưu tên cho employee
    - age có kiểu dữ liệu là int dành để lưu tuổi cho employee
    - salary có kiểu dữ liệu là int dành để lưu tiền lương cho employee
  
### Cách sử dùng struct
Theo thí dụ trên struct cho ```employee``` chúng ta sẽ tiếp tục sử dụng struct trên để lưu những dữ liệu cho ```employee``` như sau:
```
 type Employee struct {
     name string
     age int
     salary int
 }
 // cách thử 1
 var employee := Employee
 employee.name = "samnang"
 employee.age = 30
 employee.salary = 600
 
 // cách thử 2
 employee := Employee{name: "samnang", age: 30, salary: 600}
 
 // cách thử 3
 employee := Employee{"samnang", 30, 600} // samnang -> name, 30 -> age, 600 -> salary 
```

Trong Go có một cách viết struct không cần phải viết tên của struct và được gọi là cách viết ***anonymous struct*** , có cách định nghĩa như sau:
```
employee :=struct{name string; age int; salary int}{"samnang", 30, 600}
```

###  Cách nhúng trường (embedding field) trong struct
#### Struct trong struct
Trong những phần trước đây chúng đã biết những cách đinh nghĩa của struct và viết một trường (fields) của struct với những kiểu dữ liệu ```string```, ```int```, ```float``` . . . nhưng có đối khi chúng ta có thể viết nhúng một struct này sang struct kia được.
```
type Person struct {
   name string
   age int
   sex bool
}

type Employee struct {
    Person
    salary int
}
```
Vi dụ trên cho thấy rằng trong struct Employee được nhúng trường Person là một struct khác vào, như vậy làm cho struct Employee sẽ có trường (fields) bao gồm như sau: ```name```, ```age```, ```sex``` và ```salary```. Nói một cách khác là tất cả trường trong struct ```Person``` sẽ được dùng trong struct ```Employee``` được. Chúng ta có thể sử dụng struct ```Employee``` như sau:
```
employee := Employee{Person{name: "samnang", age: 30, sex: true}, salary: 600}
employee.name  // output samnang
employee.age  // output 30
employee.sex  // output true
employee.salary // output 600

employee.Person := Person{name: "rachana", age: 25, sex: false}
employee.Person.name // output rachana
employee.Person.age // output 25
employee.Person.sex // output false
```
#### kiểu dữ liệu type trong struct
không phải là chỉ một cách nhúng trường struct trong struct, chúng ta cùng có thể nhúng những ```type``` array  như kiểu dữ liệu ```string```, ```int```, ```bool``` .  .  .Chúng ta sẽ đặt một bài toàn càng phức tạp nữa, vi dụ làm đối với những ```Employee``` của mình lại cần phải có phần loại  kỹ năng khác nhau, như vậy chúng ta cần phải add thêm một trường kỹ năng hoặc viết nhúng thêm một struct mới ? đây là một vấn đề, tại vì kỹ năng của employee có thể luôn gồm thành một nhóm (Coder, QA, HR, Communitee) như vậy có thể viết code như sau:
```
type Skills []string

type Person struct {
   name string
   age int
   sex bool
}

type Employee struct {
    Person
    Skills
    salary int
}
```
#### Override nhúng struct trong struct
Cùng có một bài toàn chúng ta phải giải quyết lúc chúng ta có 1 field cùng tên với trường struct mà chúng ta nhúng vào. Chúng ta có thể xem lại vi dụ của mình, nếu trong struct ```Employee``` add thêm một field tên là ```name```, lúc đó chúng ta sẽ gặp một vấn đề đó là ```employee.name``` là của struct ```Person``` hoặc ```Employee```  ? Chúng ta sẽ giải thích như sau:
```
type Skills []string

type Person struct {
   name string
   age int
   sex bool
}

type Employee struct {
    Person
    Skills
    salary int
    name string
}

employee := Employee{Person{name: "A", 30, true}, "Coder", 600, "Samnang"}

employee.name // output  Samnang
employee.Person.name // output A
```
trường ```name``` (Person) đã thay thế (override) với trường ```name``` (Employee) nhưng vẫn giữ lại trong struct của nó (Person)

## Kết Luận
Trong bài viết này chúng ta đã giải thích từng bước đổi với ```struct``` trong GO, chúng ta hỳ vọng rằng các bạn thể lấy kiến thức này để áp dụng trong dự án của các bạn, cùng có là key để giải pháp vấn đề lúc các bạn mới bắt đầu với GO. Nhưng cùng có thể đối khi bài viết có thể giải thích chưa rõ rẵng, vẫn có chỗ mà các bạn nghĩ rằng đang thiểu cần phải bổ sung thêm, bạn có thể comment hoặc gửi email cho mình, mình rất vui sẽ trả lời và update bài viết này thêm.

## Tài Liệu
- [stuct](https://gobyexample.com/structs)
- [OOP in Go](https://code.tutsplus.com/tutorials/lets-go-object-oriented-programming-in-golang--cms-26540)
- [Stuct INstead of Classes - OOP in GO](https://golangbot.com/structs-instead-of-classes/)