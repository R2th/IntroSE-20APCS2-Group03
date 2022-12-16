Series Golang:
* [[Series Golang]1: Golang là gì? Tại sao nên dùng golang?](https://viblo.asia/p/series-golang1-golang-la-gi-tai-sao-nen-dung-golang-Eb85ozM2l2G)
* [[Series Golang]2: Vượt chướng ngại vật - Golang](https://viblo.asia/p/series-golang2-vuot-chuong-ngai-vat-golang-eW65GBwxlDO) 
* [[Series Golang]3: Tăng tốc - Golang - Struct, Pointer, Receiver, Interface](https://viblo.asia/p/series-golang3-tang-toc-golang-struct-pointer-receiver-interface-ORNZqp63K0n) **<= Bạn đang ở đây**
* [[Series Golang]4: Golang - Concurrency, Goroutines, Channels](https://viblo.asia/p/series-golang4-golang-concurrency-goroutines-channels-vyDZOBAaKwj)

Ở bài viết trước, mình chia sẽ về Golang là gì, tại sao nên dùng Golang. Nếu bạn chưa biết và chưa động lực để học về golang thì có thể đọc qua để lấy động lực nhé [[Series Golang]1: Golang là gì? Tại sao nên dùng golang?](https://viblo.asia/p/series-golang1-golang-la-gi-tai-sao-nen-dung-golang-Eb85ozM2l2G). Mình cũng tổng hợp những kiến thức liên quan tới biến, Map với bài viết [[Series Golang]2: Vượt chướng ngại vật - Golang](https://viblo.asia/p/series-golang2-vuot-chuong-ngai-vat-golang-eW65GBwxlDO). Các bạn có thể tham khảo nhé. Hôm nay chúng ta sẽ tiếp tục tìm hiểu Golang với chủ đề struct, con trỏ, inteface, methods

## 1. Pointer(Con trỏ)
Con trỏ là một biến lưu trữ địa chỉ của một biến khác trong bộ nhớ.

![Ảnh](https://golangbot.com/content/images/2017/05/pointer-explained.png)

Ví dụ: `var a *int = &b`
```

func main() {
	b := 255
	var a *int = &b
	fmt.Printf("Type of a is %T\n", a)
	fmt.Println("address of b is", a)
}
```
Trong ví dụ trên, `*int` dùng để khai báo biến `a` thuộc kiêu con trỏ `int`. Toán tử `&` dùng để lấy địa chỉ của biến. Biến `a` được khai báo thuộc kiểu con trỏ, và nó lưu giữ địa chỉ của biến b trong bộ nhớ.


Biến con trỏ khi bạn khởi tạo nhưng không gán giá trị cho nó, thì nó sẽ có giá trị nil. 

Ví dụ: 
```
package main

import (
	"fmt"
)

func main() {
	a := 25
	var b *int // biến b sẽ có giá trị nil
	if b == nil {
		fmt.Println("b is", b)
		b = &a
		fmt.Println("b after initialization is", b)
	}
}
// Kết quả in ra màn hình
// b is <nil>
// b after initialization is 0xc0000be000
```

### Khai báo biến con trỏ theo cách rút gọn:
Bạn có thể khai báo biến con trỏ theo cách rút gọn như cách khai báo một biến bình thường mà mình đã giới thiệu ở trên.
Cú pháp:
```
<tên biến> := địa chỉ
```

Ví dụ:
```
a := &b
```
### Khai báo biến con trỏ bằng câu lệnh `new`
Cú pháp: 
```
<tên biến> := new(<type>)
```
Ví dụ:
```
size := new(int)
*size = 85
```
Với kiểu khai báo này, golang sẽ cấp phát một vùng nhớ chứa giá trị 0 cho biến size. Với dòng lệnh `*size = 85`, vùng nhớ mà biến size tham khảo tới sẽ được gán giá trị 85

### Các điều cần lưu ý khi sử dụng con trỏ
```
func main() {
	b := 255
	a := &b
	fmt.Println("address of b is", a)
	fmt.Println("value of b is", *a)
	*a++
	fmt.Println("new value of b is", b)
}
// kết quả in ra màn hinh
// address of b is 0xc000128000
// value of b is 255
// new value of b is 256
```
Biến con trỏ sẽ lưu trữ địa chỉ của một vùng nhớ. Với ví dụ trên, biến `a` sẽ lưu trữ địa chỉ vùng nhớ của biến `b`. Mặc dù `a` và `b` là hai biến tách biệt, nhưng chúng đều trỏ tới một vùng nhớ, vậy nên khi bạn thay đổi giá trị biến `a` thì giá trị biến `b` cũng thay đổi tương ứng

**Truyền biến con trỏ vào function:** chúng ta có thể thay đổi giá trị của biến đó thông qua function đó.
```
package main

import (  
    "fmt"
)

func change(val *int) {  
    *val = 55
}
func main() {  
    a := 58
    fmt.Println("value of a before function call is",a)
    b := &a
    change(b)
    fmt.Println("value of a after function call is", a)
}
// kết quả in ra màn hình
// value of a before function call is 58  
// value of a after function call is 55 
```
Trong ví dụ này, biến con trỏ `b` được truyền vào hàm change theo kiểu tham chiếu, vậy nên khi biến `val` thay đổi giá trị trong hàm `change`, thực chất, vùng nhớ của biến `b` thay đổi giá trị. Điều đó dẫn tới việc hàm `change` có thể thay đổi được giá trị của biến `b`

## 2. Struct
Nếu các bạn đã từng sử dụng C++ có lẽ đã quá quen với struct. Struct là kiểu do người dùng tự định nghĩa, là tập hợp nhiều trường có thể có cùng kiểu hoặc khác kiểu nhau. Struct được dùng với một nhóm các dữ liệu được tập hợp thành một đơn vị có ý nghĩa, dễ dàng cho việc quản lí.
Giả sử bạn cần quản lí nhân viên, nhân viên có các thông tin như tên, tuổi, ngày sinh... Bạn sẽ dùng từng biến riêng lẻ để quản lí, phần code sẽ rất cồng kềnh, khó quản lí. Vì vậy, chúng ta có thể sử dụng struct để gom các thông tin liên quan tới nhân viên thành một biến, và sử dụng các thuộc tính của biến đó theo cách mình mong muốn. 

### Khai báo struct
Để khai báo struct, chúng ta có thể dùng cú pháp sau:
```
type <Name> struct {
	// các thuộc tính và kiểu 
}
```
Ví dụ:
```
type Employee struct {  
    firstName string
    lastName  string
    age       int
}
```
### Sử dụng struct
Bạn có thể sử dụng struct như ví dụ sau:
```
type Employee struct {  
    firstName string
    lastName  string
    age       int
    salary    int
}

func main() {

    //creating struct specifying field names
    emp1 := Employee{
        firstName: "Sam",
        age:       25,
        salary:    500,
        lastName:  "Anderson",
    }

    //creating struct without specifying field names
    emp2 := Employee{"Thomas", "Paul", 29, 800}

    fmt.Println("Employee 1", emp1)
    fmt.Println("Employee 2", emp2)
}
```
Kết quả:
```
Employee 1 {Sam Anderson 25 500}  
Employee 2 {Thomas Paul 29 800}  
```

### Truy xuất một trường trong struct
Để truy xuất một trường trong struct, bạn có thể dùng cú pháp `<tên biến struct>.<trường>`

Ví dụ: để truy xuất trường `firstName` của `emp1` ở bên trên, mình sẽ dùng `emp.firstName`
### Anomymous structs
Ngoài việc khai báo một struct cụ thể, bạn có thể tạo ra một struct ẩn danh như ví dụ sau:
```
func main() {  
    emp3 := struct {
        firstName string
        lastName  string
        age       int
        salary    int
    }{
        firstName: "Andreah",
        lastName:  "Nikola",
        age:       31,
        salary:    5000,
    }

    fmt.Println("Employee 3", emp3)
}
```
Với kiểu khai báo struct này, bạn không thể sử dụng lại việc khai báo struct. Nếu bạn muốn tạo ra một `emp4` có cùng kiểu với `emp3`, bạn phải khai báo lại kiểu như cách `emp3` được khai báo.

### Lưu ý:
Khi một biến struct được đinh nghĩa mà không có giá trị khởi tạo, giá trị của các trường sẽ là giá trị mặc định.
Ví dụ: 
```

type Employee struct {  
    firstName string
    lastName  string
    age       int
    salary    int
}

func main() {  
    var emp4 Employee //zero valued struct
    fmt.Println("First Name:", emp4.firstName)
    fmt.Println("Last Name:", emp4.lastName)
    fmt.Println("Age:", emp4.age)
    fmt.Println("Salary:", emp4.salary)
}
// kết quả in ra màn hình:
// First Name:  
// Last Name:  
// Age: 0  
// Salary: 0 
```

## 3. Methods
Methods trong Go là gì? Golang không hỗ trợ class, khi lập trình viên muốn quản lí một đối tượng, họ có thể sử dụng struct để thay thế cho class. Tuy nhiên, struct chỉ hỗ trợ quản lí các thuộc tính, còn các methods của class thì struct không hỗ trợ. Làm việc với Golang bạn không cần lo lắng về việc đó. 

Methods là một function được khai báo cho một kiểu dữ liệu riêng biệt, kiểu dữ liệu này gọi là receiver, receiver nằm giữa từ khóa func và tên phương thức. Kiểu receiver có thể là kiểu struct hoặc non-struct  
Cú pháp:
```
func (t Type) methodName(parameter list) { 
    // body của method 
}
```
Ví dụ:
```
type Employee struct {
	name     string
	salary   int
	currency string
}

/*
 displaySalary() method has Employee as the receiver type
*/
func (e Employee) displaySalary() {
	fmt.Printf("Salary of %s is %s%d", e.name, e.currency, e.salary)
}

func main() {
	emp1 := Employee{
		name:     "Sam Adolf",
		salary:   5000,
		currency: "$",
	}
	emp1.displaySalary() //Calling displaySalary() method of Employee type
}

```
Ở ví dụ trên, `displaySalary` chính là một methods của struct Employee. Sau khi khai báo methods, chúng ta có thể gọi methods bằng cách `emp1.displaySalary()`

### So sánh methods và functions:
Ở ví dụ trên, chúng ta có thể chuyển methods thành functions theo cách sau:
```
type Employee struct {
	name     string
	salary   int
	currency string
}

/*
 displaySalary() method converted to function with Employee as parameter
*/
func displaySalary(e Employee) {
	fmt.Printf("Salary of %s is %s%d", e.name, e.currency, e.salary)
}

func main() {
	emp1 := Employee{
		name:     "Sam Adolf",
		salary:   5000,
		currency: "$",
	}
	displaySalary(emp1)
}
```
Chúng ta có thể dùng function bình thường để thay thế cho methods. Vậy tại sao chúng ta lại sử dụng methods thay vì sử dụng function bình thường?
Để trả lời cho câu hỏi này, chúng ta có hai lí do chính sau:
* Lí do thứ nhất: Vì Golang không phải là ngôn ngữ hướng đối tượng, vậy nên chúng ta phải sử dụng một số thứ thay thế như struct để quản lý các thuộc tính, và methods để quản lí các methods trong class.
* Lí do thứ hai: Methods có thể định nghĩa trùng tên nhau nhưng khác kiểu. Function lại không hỗ trợ điều đó. 

### Pointer receivers và value receivers:
Golang hỗ trợ cả value receiver(vd: `func (e Employee) changeName...`) và pointer receiver(vd: `func (e *Employee) changeAge...`). Các ví dụ về methods ở trên là value receiver.

Ví dụ về pointer receiver và value receiver:
```
package main

import (
	"fmt"
)

type Employee struct {
	name string
	age  int
}

/*
Method with value receiver
*/
func (e Employee) changeName(newName string) {
	e.name = newName
}

/*
Method with pointer receiver
*/
func (e *Employee) changeAge(newAge int) {
	e.age = newAge
}

func main() {
	e := Employee{
		name: "Mark Andrew",
		age:  50,
	}
	fmt.Printf("Employee name before change: %s", e.name)
	e.changeName("Michael Andrew")
	fmt.Printf("\nEmployee name after change: %s", e.name)

	fmt.Printf("\n\nEmployee age before change: %d", e.age)
	e.changeAge(51)
	fmt.Printf("\nEmployee age after change: %d", e.age)
}
```
Kết quả in ra màn hình là: 
```
Employee name before change: Mark Andrew
Employee name after change: Mark Andrew

Employee age before change: 50
Employee age after change: 51
```

**Sự khác nhau giữa pointer receiver và value receiver là gì?**

Pointer receiver giống với con trỏ được truyền vào function theo kiểu tham chiếu, trong methods chúng ta có thể thay đổi được giá trị của receiver. Đối với value receiver, chúng ta chỉ có thể truy cập giá trị, nhưng không thể thay đổi được giá trị của nó. Khi muốn thay đổi giá trị receiver bên trong methods, bạn có thể dùng pointer receiver. Khi methos chỉ muốn truy cập giá trị của receiver, không làm thay đổi gì giá trị của receiver, bạn có thể dùng value receiver.

## 4. Interface
**Định nghĩa:** Interface là tập hợp các khai báo phương thức, khi một kiểu dữ liệu định nghĩa tất cả phương thức trong interface thì nó được gọi là implement interface đó.

Có thể hiểu đơn giả là interface là một đại diện, được dùng cho trường hợp các kiểu dữ liệu có một vài phương thức chung, và chúng ta muốn sử dụng phương thức chung đó.
Ví dụ về interface:
```
package main

import (  
    "fmt"
)

//interface definition
type VowelsFinder interface {  
    FindVowels() []rune
}

type MyString string

//MyString implements VowelsFinder
func (ms MyString) FindVowels() []rune {  
    var vowels []rune
    for _, rune := range ms {
        if rune == 'a' || rune == 'e' || rune == 'i' || rune == 'o' || rune == 'u' {
            vowels = append(vowels, rune)
        }
    }
    return vowels
}

func main() {  
    name := MyString("Sam Anderson")
    var v VowelsFinder
    v = name // possible since MyString implements VowelsFinder
    fmt.Printf("Vowels are %c", v.FindVowels())

}
```

Ở ví dụ này, Interface `VowelsFinder` có phương thức là `FindVowels`. Sau đó kiểu `MyString` định nghĩa methods `FindVowels`. Chúng ta có thể hiểu `MyString` là một hiện thực(implement interface) của `VowelsFinder`. Lúc đó, trong hàm `main`, biến v có kiểu là interface `VowelsFinder`. Sau đó biến v được gán giá trị bằng biến `name`. Điều này được chấp nhận, vì biến `name` là một hiện thực(implement) của `VowelsFinder`

Chúng ta hãy cùng đến với một ví dụ về tính lương của nhân viên. Nhân viên sẽ có nhiều loại như nhân viên hợp đồng, nhân viên lâu năm..., mỗi loại sẽ có một cách tính lương khác nhau. Ví dụ: chúng ta có hai loại nhân viên là `Permanent` và `Contract`. Cách tính lương mỗi loại sẽ khác nhau. Bây giờ, chúng ta cần tính tổng lương phải trả cho tất cả nhân viên.
```

type Permanent struct {  
    empId    int
    basicpay int
    pf       int
}

type Contract struct {  
    empId    int
    basicpay int
}

//salary of permanent employee is the sum of basic pay and pf
func (p Permanent) CalculateSalary() int {  
    return p.basicpay + p.pf
}

//salary of contract employee is the basic pay alone
func (c Contract) CalculateSalary() int {  
    return c.basicpay
}

func main() {  
    pemp1 := Permanent{1, 5000, 20}
    pemp2 := Permanent{2, 6000, 30}
    cemp1 := Contract{3, 3000}
    fmt.Printf("Total Expense Per Month $%d", pemp1.CalculateSalary() + pemp2.CalculateSalary() + cemp1.CalculateSalary())
}
```
Bạn có thể dùng phép tính cộng `pemp1.CalculateSalary() + pemp2.CalculateSalary() + cemp1.CalculateSalary()` để tính tổng lương. Quá đơn giản với trường hợp số lượng nhân viên nhỏ. Giả sử số lượng nhân viên lớn, mỗi nhân viên là một loại khác nhau, lưu trữ trong một mảng, cách tính tổng lương phức tạp, cần phải gọi một hàm `totalExpense` để tính tổng lương. Vậy tham số của `totalExpense` sẽ có kiểu là slice `Permanent`
```
totalExpense(s []Permanent) 
```
hay slice `Contract`
```
totalExpense(s []Contract) 
```
Nếu tham tham số của `totalExpense` là slice `Permanent` thì nhân viên có kiểu là `Contract` sẽ không thể tương thích với `totalExpense` và ngược lại. Vậy nên chúng ta cần có một kiểu có thể bao quát được `Permanent` và `Contract`

Bên dưới là cách sử dụng interface để giải quyết trường hợp chúng ta đang gặp phải.
```
package main

import (  
    "fmt"
)

type SalaryCalculator interface {  
    CalculateSalary() int
}

type Permanent struct {  
    empId    int
    basicpay int
    pf       int
}

type Contract struct {  
    empId    int
    basicpay int
}

//salary of permanent employee is the sum of basic pay and pf
func (p Permanent) CalculateSalary() int {  
    return p.basicpay + p.pf
}

//salary of contract employee is the basic pay alone
func (c Contract) CalculateSalary() int {  
    return c.basicpay
}

/*
total expense is calculated by iterating through the SalaryCalculator slice and summing  
the salaries of the individual employees  
*/
func totalExpense(s []SalaryCalculator) {  
    expense := 0
    for _, v := range s {
        expense = expense + v.CalculateSalary()
    }
    fmt.Printf("Total Expense Per Month $%d", expense)
}

func main() {  
    pemp1 := Permanent{
        empId:    1,
        basicpay: 5000,
        pf:       20,
    }
    pemp2 := Permanent{
        empId:    2,
        basicpay: 6000,
        pf:       30,
    }
    cemp1 := Contract{
        empId:    3,
        basicpay: 3000,
    }
    employees := []SalaryCalculator{pemp1, pemp2, cemp1}
    totalExpense(employees)

}
```
Hàm `totalExpense` nhận tham số là slice `SalaryCalculator`.      `SalaryCalculator` là interface có phương thức `CalculateSalary`. `Permanent` và `Contract` cũng có methods `CalculateSalary`, hai struct này là hiện thực của interface `SalaryCalculator`. Hàm `totalExpense` sẽ gọi tới phương thức `CalculateSalary` tương ứng tùy theo cách hiện thực của nó. 

Kiểu interface rất có ích trong việc mở rộng đến bất kì loại nhân viên mới nào mà không cần thay đổi logic code. Bạn chỉ cần định nghĩa phương thức `CalculateSalary` của loại nhân viên mới đó là có thể hoạt động được.

### Switch kiểu
Với kiểu interface, bạn có thể kiểm tra kiểu cụ thẻ của nó, với mỗi kiểu có thể xử lí một cách khác nhau như ví dụ sau:
```
package main

import (
	"fmt"
)

func findType(i interface{}) {
	switch i.(type) {
	case string:
		fmt.Printf("I am a string and my value is %s\n", i.(string))
	case int:
		fmt.Printf("I am an int and my value is %d\n", i.(int))
	default:
		fmt.Printf("Unknown type\n")
	}
}
func main() {
	findType("Naveen")
	findType(77)
	findType(89.98)
}
```
Kết quả in ra màn hình:
```
I am a string and my value is Naveen
I am an int and my value is 77
Unknown type
```
## 5. Tổng két
Bên trên là những ghi chú, tổng hợp được trong quá trình mình tự học Golang. Mình tự học chủ yếu ở [Golang document](https://golang.org/doc/) và [golangbot.com](https://golangbot.com/learn-golang-series/) và nhiều nguồn khác. Vậy nên, nếu bạn muốn tìm đến một nguồn đầy đủ chính thống có thể vào [Golang document](https://golang.org/doc/) hoặc [golangbot.com](https://golangbot.com/learn-golang-series/). Code mẫu mình cũng tham khảo ở [golangbot.com](https://golangbot.com/learn-golang-series/)

Hi vọng những tổng hợp của mình có ích cho các bạn.

Ở phần tiếp theo mình sẽ tổng hợp về [[Series Golang]4: Golang - Concurrency, Goroutines, Channels](https://viblo.asia/p/series-golang4-golang-concurrency-goroutines-channels-vyDZOBAaKwj)


# Sau tất cả
**Sau tất cả, mình là [Ryan Cao](https://ryancao.netlify.app/about/)**, là một developer chân chính đang trên đường chém gió. Để ủng hộ mình các bạn có thể upvote bài viết này, follow [Github Caophuc799](https://github.com/Caophuc799) và đón đọc các bài viết trên [Ryan Cao blog](https://ryancao.netlify.app/) chính thức của mình để mình có thêm động lực chia sẽ những bài viết hay, ý nghĩa khác nhé