Hello anh em, nay mình sẽ viết về method và interface trong golang.<br>
Trong Go không có class, chúng ta có thể dùng struct thay cho class, vậy còn phương thức thì sao?
Phương thức (Method) là một hàm (function) được khai báo cho riêng một kiểu dữ liệu đặc biệt, kiểu dữ liệu này được gọi là receiver argument nó được đặt giữa từ khóa func và tên của phương thức. receiver argument này có thể là kiểu struct (cấu trúc) hoặc non-struct (phi cấu trúc). receiver argument phải có sẵn để truy cập bên trong phương thức.<br>
# Method
Cùng xem ví dụ tính diện tích hình chữ nhật :
``` go
package main

import (
	"fmt"
)

// Struct type - `Rectangle`
type Rectangle struct {
	X, Y float64
}

// Method with receiver `Rectangle`
func (p Rectangle) Acreage() float64 {
	return p.Y * p.X
}

func main() {
	p := Rectangle{2.0, 4.0}

	fmt.Println("Point : ", p)
	fmt.Println("Diện tích là : ", p.Acreage())
}
```

Ở trên ta khai báo một struct Rectangle với 2 thuộc tính X, Y là chiều dài và chiều rộng,
```
func (p Rectangle) Acreage() float64 {
	return p.Y * p.X
}
```
Khai báo một method Acreage(), nhận vào 1 đối tượng của struct Rectangle và trả về kết quả kiểu float64 là tích của X và Y <br>
**Qua ví dụ trên ta thấy method có vẻ giống function nhỉ, vậy method và function khác gì nhau ?**
Thực ra method chính là function nhưng dữ liệu nhận vào của method là kiểu struct (cấu trúc) hoặc non-struct.
# Method cùng tên nhưng khác đối số
Ta cùng xem ví dụ về method tính diện tích, có method tính diện tích hình vuông nhận vào 1 struct 'Square' và một method tính diện tích hình chữ nhật 'Rectangle' , 2 method này cùng tên là Acreage().<br>
Ví dụ :
```go
package main

import (
	"fmt"
)

type Square struct {
	X float64
}

// Method with receiver `Square`
func (s Square) Acreage() float64 {
	return s.X * s.X
}

type Rectangle struct {
	X, Y float64
}

// Method with receiver `Rectangle`
func (r Rectangle) Acreage() float64 {
	return r.X * r.Y
}

func main() {
	s := Square{4}
	r := Rectangle{3, 4}

	fmt.Println("Diện tích hình vuông là : ", s.Acreage())
	fmt.Println("Diện tích hình chữ nhật là : ", r.Acreage())
}
```
**Chú ý !**
1. Nếu bạn muốn dùng tên của hàm giống nhau thì nó phải có receiver khác nhau
1. Các phương thức có thể trùng tên nếu được xác định trên các kiểu dữ liệu khác nhau trong khi các hàm thì không được phép trùng tên
# Method có receivers là con trỏ
Ta có thể viết method nhận vào một con trỏ và thay đổi giá trị trên ô nhớ mà nó trỏ tới.
Ví dụ: cho 1 điểm có tọa độ X và Y, tăng vị trí X = X + dx, Y = Y + Dy
ở ví dụ này nếu muốn thay đổi giá trị thực của X và Y thì ta phải nhận vào con trỏ trỏ đến địa chỉ X và Y rồi thay đổi giá trị trên cái địa chỉ đó.<br>
Cùng xem ví dụ sau
```go
package main

import (
	"fmt"
)

type Point struct {
	X, Y float64
}

func (p *Point) Translate(dx, dy float64) {
	p.X = p.X + dx
	p.Y = p.Y + dy
}

func main() {
	p := Point{3, 4}
	fmt.Println("Point p = ", p)

	p.Translate(7, 9)
	fmt.Println("After Translate, p = ", p)
}
```
* Ta khai báo struct point với 2 thuộc tính x và y
* Có function Translate() có receivers là con trỏ trỏ đến p (p được khởi tạo từ struct point) nhận vào  2 giá trị dx và dy và thay đối giá trị p.X, P.Y 
Và đây là kết quả của trường trình trên
```
Point p =  {3 4}
After Translate, p =  {10 13}
```
# Method on non-struct 
Ở các ví dụ trên ta đã dùng method có receiver argument là struct rồi giờ cùng xem method có receiver argument là non-struct.<br>
ví dụ: đảo ngược chuỗi
```go
package main

import (
	"fmt"
)

type MyString string

func (myStr MyString) reverse() string {
	s := string(myStr)
	runes := []rune(s)

	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func main() {
	myStr := MyString("OLLEH")
	fmt.Println(myStr.reverse())
}
```
*  Tạo một non-struct tên là MyString có kiểu string
*  Tạo một method tên là reverse() có receiver argument là myStr (non-struct) , method này làm nhiệm vụ đảo ngược chuỗi
*  Khởi tạo non-struct truyền vào chuỗi "OLLEH"
*  Sau khi gọi method reverse() kết quả trả về là "HELLO"
# Interface
Định nghĩa về interface trong OOP là ‘‘Interface xác định hành vi của một đối tượng’’.<BR>
Trong Go, một interface là tập hợp các khai báo phương thức  mà cho phép chúng ta có thể định nghĩa hoạt động cho nó được. Khi một kiểu dữ liệu định nghĩa tất cả các phương thức trong một interface, thì nó được gọi là implement interface đó).
* Ví dụ về con vịt và mèo  có hàm những sau này:<br>
Vịt: Sleep(), Eat() và Swim().<br>
Mèo: Sleep(), Eat() và Climb().<br>
Trong ta thấy rằng Vịt và Mèo có 2 hàm giống nhau đó là đó là sleep() và eat() chung ta có thể tạo một class khác đó là con vật có những hàm Sleep() và Eat() là được gọi là Interface và Vịt và Mèo có thể lấy hàm đó để dùng được.<br>
* Chúng ta có thể tham khảo ví dụ này (mình cóp nhặt trên mạng)<br>
 Ví dụ :  Viết một chương trình đơn giản tính tổng chi phí của một công ty dựa trên mức lương của từng nhân viên. Giả định tất cả các chi phí tính bằng USD.
```go
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
    empId  int
    basicpay int
}

//tiền lương của nhân viên permanent bằng tổng của basic pay và pf
func (p Permanent) CalculateSalary() int {  
    return p.basicpay + p.pf
}

//tiền lương của nhân viên contract chỉ là basic pay
func (c Contract) CalculateSalary() int {  
    return c.basicpay
}

/*
tổng chi phí được tính bằng cách duyệt qua từng phần tử của slice SalaryCalculator
và tính tổng mức lương của từng nhân viên
*/
func totalExpense(s []SalaryCalculator) {  
    expense := 0
    for _, v := range s {
        expense = expense + v.CalculateSalary()
    }
    fmt.Printf("Total Expense Per Month $%d", expense)
}

func main() {  
    pemp1 := Permanent{1, 5000, 20}
    pemp2 := Permanent{2, 6000, 30}
    cemp1 := Contract{3, 3000}
    employees := []SalaryCalculator{pemp1, pemp2, cemp1}
    totalExpense(employees)

}
```
  Ở chương trình trên chúng ta khai báo một interface tên là SalaryCalculator có một phương thức là CalculateSalary() int.<br>

Chúng ta có 2 loại nhân viên trong công ty là Permanent (nhân viên chính thức) và Contract (nhân viên hợp đồng) được định nghĩa bằng kiểu struct. Mức lương của nhân viên Permanent là tổng của basicpay và pf còn đối với nhân viên Contract thì chỉ là basicpay. Điều này được thể hiện trong các phương thức CalculateSalary tương ứng. Bằng cách khai báo phương thức này, cả 2 struct Permanent và Contract đều đang implement interface SalaryCalculator.<br>

Hàm totalExpense được khai báo bên dưới thể hiện sự tiện ích của việc sử dụng interface. Hàm này nhận một slice các interface SalaryCalculator []SalaryCalculator làm tham số. Trong hàm main() chúng ta truyền một slice với các phần tử gồm cả 2 kiểu Permanent và Contract vào hàm totalExpense. Hàm totalExpense tính toán chi phí bằng cách gọi đến phương thức CalculateSalary của kiểu tương ứng, điều này được thực hiện ở câu lệnh expense = expense + v.CalculateSalary().<br>

Ưu điểm lớn nhất của hàm totalExpense này là nó có thể được mở rộng đến bất kỳ loại nhân viên mới nào mà không cần phải thay đổi code. Giả sử công ty bổ sung một loại nhân viên mới là Freelancer với cách tính lương khác. Freelancer này chỉ việc truyền vào đối số slice của hàm totalExpense mà không phải thay đổi bất kỳ 1 dòng code nào trong hàm totalExpense. Freelancer cũng implement interface SalaryCalculator.<br>

Output của chương trình trên là: Total Expense Per Month $14050<br>
# Kết bài 
cảm ơn mọi người đã theo dõi đón đọc những bài viết của mình, phần sau chúng ta cùng tìm hiểu về concurrency trong golang nhé