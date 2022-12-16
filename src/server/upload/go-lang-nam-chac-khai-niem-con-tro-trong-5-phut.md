Hello anh em. Tiếp tục với series về golang căn bản nay mình sẽ nói về con trỏ trong golang cũng như các ngôn ngữ khác. Bắt đầu thôi !
# Con trỏ là gì ?
Chắc hẳn ai đã từng học qua ngôn ngữ C hay C++ thì đều biết đến khái niệm con trỏ, đối với nhiều người khi nhắc đến con trỏ thôi cũng toát mồ hồi rồi :persevere: , nhưng thực ra con trỏ không khó nhưng chúng ta nghĩ chỉ là chúng ta chưa tìm hiểu nghiêm túc nó thôi.<br>
Con trỏ là một loại biến đặc biệt, được dùng để lưu trữ địa chỉ của biến khác trong bộ nhớ RAM chứ không lưu trữ một giá trị cụ thể nào.
<br>
Ví dụ: <br>
Một biến a mang giá trị 5 và lưu tại địa chỉ ô nhớ 0x10123456
Mội biến b lưu địa chỉ của biến a (0x10123456)  vậy b được gọi là con trỏ trỏ đến a.
# Khai báo con trỏ trong golang
## Khai báo nhưng không gán địa chỉ
```go
package main

import "fmt"

func main() {
	var p *int

	fmt.Println("p = ", p)
}
```

Đoạn code trên là để khai báo con trỏ p nhưng không gán địa chỉ nào cho nó nên khi chay chương trình kết quả sẽ là :
`p =  <nil>`

## khai báo và gán địa chỉ
```go
package main

import "fmt"

func main() {
	var a = 5.67
	var p = &a

	fmt.Println("Value stored in variable a = ", a)
	fmt.Println("Address of variable a = ", &a)
	fmt.Println("Value stored in variable p = ", p)
}
```
Đoạn code trên ta khai báo biến a mang giá trị bằng 5,67<br>
var p = &a ta đang gán địa chỉ của biến a cho p có kiểu *int => p là con trỏ lưu địa chỉ của biến a<br>
Toán tử & được sử dụng để lấy địa chỉ của một biến. <br>
Chạy chương trình sẽ cho kết quả tương tự như sau 
```
Value stored in variable a =  5.67
Address of variable a =  0xc00001e0d0
Value stored in variable p =  0xc00001e0d0
```
*  Ví dụ về thay đổi giá trị được lưu trữ trong biến thông qua con trỏ
```go
package main

import "fmt"

func main() {
	var a = 100
	var p = &a

	fmt.Println("a = ", a)
	fmt.Println("p = ", p)
	fmt.Println("*p = ", *p)

	*p = 2000
	fmt.Println("a (after) = ", a)
}
```
Đoạn code trên cho kết quả <br>
```
a =  100
p =  0xc00001e0d0
*p =  100
a (after) =  2000
```
giải thích :<br>
đầu tiên ta gán giá trị a = 100, sau đó khai báo con trỏ p lưu địa chỉ của biến a <br>
`fmt.Println("a = ", a)` : hiển thị giá trị biến a (100)<br>
`fmt.Println("p = ", p)` : hiển thị giá trị con trỏ p, lúc này p đang lưu địa chỉ của biến a nên p có giá trị 0xc00001e0d0 <br>
`fmt.Println("*p = ", *p)` : hiển thị giá trị lưu tại địa chỉ p(0xc00001e0d0 ) , vì biến a lưu trữ trên địa chỉ này nên *p hiển thị giá trị của biến a (100) <br>
`*p = 2000` :  thay đổi giá trị trên địa chỉ p(0xc00001e0d0 ) lên 2000 , lúc trước giá trị bằng 100.<br>

vì giá trị lưu ở địa chỉ 0xc00001e0d0 đã thay đổi từ 100 thành 2000 nên lúc này biến a có giá trị 2000<br>
`fmt.Println("a (after) = ", a)`  : kết quả là 2000<br>
node : Tham chiếu ngược một con trỏ nghĩa là truy cập vào giá trị của biến mà con trỏ trỏ tới. *p là cú pháp tham chiếu ngược đến p
## Con trỏ trỏ tới con trỏ :sweat_smile:
Nói đến cái tiêu đề thôi cũng thấy hại não rồi nhỉ. cùng xem đoạn code dưới đây
```go
package main

import "fmt"

func main() {
	var a = 7.98
	var p = &a
	var pp = &p

	fmt.Println("a = ", a)
	fmt.Println("address of a = ", &a)

	fmt.Println("p = ", p)
	fmt.Println("address of p = ", &p)

	fmt.Println("pp = ", pp)

	fmt.Println("*pp = ", *pp)
	fmt.Println("**pp = ", **pp)
}
```
Kết quả khi chay chương trình là <br>
```
a =  7.98
address of a =  0xc000094010
p =  0xc000094010
address of p =  0xc000098018
pp =  0xc000098018
*pp =  0xc000094010
**pp =  7.98
```
Giải thích <br>
`var a = 7.98` gán giá trị cho biến a băng 7,98<br>
`var p = &a` khởi tạo con trỏ p lưu địa chỉ của biến a  (0xc000094010)<br>
`var pp = &p` khởi tạo con trỏ pp lưu địa chỉ của con trỏ p (0xc000098018)<br>
Các dòng tiếp theo hiên thị thông tin<br>
a : giá trị của biến a<br>
&a : địa chỉ lưu biến a<br>
p : giá trị của p, lúc này giá trị của p là địa chỉ của a <br>
&p : địa chỉ của con trỏ p<br>
pp: lúc này pp lưu địa chỉ của con trỏ p (0xc000098018)<br>
*pp : giá trị của cái địa chỉ lưu trên pp -> chính là cái địa chỉ lưu trên p (0xc000094010) => là địa chỉ của biến a<br>
** pp: giá trị của giá trị của cái địa chỉ lưu trên pp :joy::joy: => là gía trị của a 7,98<br>
## Hai con trỏ cùng trỏ tới 1 địa chỉ
```go
package main

import "fmt"

func main() {
	var a = 75
	var p1 = &a
	var p2 = &a

	if p1 == p2 {
		fmt.Println("Both pointers p1 and p2 point to the same variable.")
		fmt.Println("*p1 = ", *p1)
		fmt.Println("*p2 = ", *p2)
	}

}
```
Kết quả của chương trình là <br>
```
Both pointers p1 and p2 point to the same variable.
*p1 =  75
*p2 =  75
```
Giải thích :<br>
var p1 = &a  khởi tạo con trỏ p1 lưu địa chỉ của biến a<br>
var p2 = &a khởi tạo con trỏ p2 lưu địa chỉ của biến a<br>
khi đó 2 con tro p1,p2 cùng trỏ tới địa chỉ của biến a nên p1 == p2<br>
vì vậy nên giá trị *p1 = 75 và *p2 cũng bằng 75
# Ứng dụng của con trỏ trong golang
  Con trỏ trong golang có rất nhiều ứng dụng, ta cùng phân tích 1 ví dụ sau
 ```go
import "fmt"

func main() {

	a := 5
	
	thayDoiTrenGiaTri(a)
	fmt.Println(a)
	
	thayDoiTrenDiaChi(&a)
	fmt.Println(a)

}

func thayDoiTrenGiaTri(a int) {
	a = 100
}
func thayDoiTrenDiaChi(a *int){
	*a = 200
}
```
Giải thích :<br>
Một hàm thayDoiTrenGiaTri() truyền vào giá trị biến a và thay đổi biến a = 100<br>
một hàm thayDoiTrenDiaChi() truyền vào địa chỉ biến a và thay đổi giá trị lưu trên địa chỉ đó *a = 200<br>
* Ta có thể thấy khi dùng hàm thayDoiTrenGiaTri() thì giá trị biến a chỉ thay đổi ở trong hàm đó và giá trị biến a ngoài hàm main không thay đổi, thực chất là do ta chỉ chuyền "bản sao" giá trị của a vào nên ta không thể tác động để thay đổi a
* khi dùng hàm thayDoiTrenDiaChi() thì giá trị biến a có thể thay đổi vì ta truyền địa chỉ biến a vào và có thể thay đổi trực tiếp giá trị trên địa chỉ đó.<br>
**Do đó tùy vào mục đích bài toán ta có thể cân nhắc khi nào sử dụng con trỏ**
# Kết bài 
Qua bài viết này chúng ta có thể hiểu rõ hơn về con trỏ trong golang cũng như các ngôn ngữ khác, nếu chưa hiểu bạn hãy đọc và ngẫm lại 1, 2 lần nữa sẽ hiểu thôi 
:grinning:<br>
 <3 upvote nhé, viết mỏi tay quá <br>
Cảm ơn các bạn<br>