## Con trỏ là gì ?

Chắc hẳn ai học C/C++ cũng đã nghe qua khái niệm con trỏ. Con trỏ trong Go cũng giống như trong C/C++ là một loại biến đặc biệt được được dùng để lưu trữ địa chỉ của biến khác trong bộ nhớ RAM.

![](https://images.viblo.asia/c6fc53ad-81da-48f6-a4e8-7bb6364d52d7.png)

Nhìn vào hình trên, biến b có giá trị 156 và được lưu tại địa chỉ 0x1040a124. Biến a lưu địa chỉ của biến b, và được gọi là trỏ đến b.
## Khai báo và gán địa chỉ con trỏ trong golang
### Khai báo
Con trỏ có kiểu dữ liệu `*int` nếu nó trỏ đến địa chỉ bộ nhớ của dữ liệu kiểu int, và nó có kiểu dữ liệu `*string` nếu nó trỏ đến địa chỉ bộ nhớ của dữ liệu kiểu string.

Cú pháp để tạo và định nghĩa con trỏ là `var p *Type` trong đó Type là kiểu dữ liệu của dữ liệu mà nó trỏ tới

Ví dụ:
```
package main

import "fmt"

func main() {
	var p *int

	fmt.Println("p = ", p)
}
```

Đoạn code khi chạy sẽ cho kết quả là: `p = <nil>` do chưa gán địa chỉ cho con trỏ.

Ngoài cách khai báo trên, Go còn hỗ trợ 1 kiểu khai báo khác `new(<kiểu dữ liệu>)`. Nó sẽ giúp tạo ra 1 biến không tên của kiểu dữ liệu và trả về con trỏ của kiểu dữ liệu đó.

```
package main

import "fmt"

func main() {
  p := new(int)
  
  fmt.Println(p)
  fmt.Println(*p)
}
```
Kết quả:

```
0xc000016108
0
```

Khác so với khai bảo ở trên là kiểu new không cần 1 giá trị để con trỏ p trỏ tới mà Go sẽ khởi tạo mặc định 1 giá trị
* với kiểu int là 0
* với kiểu string là "" (string rỗng)
* với kiểu bool là false
...

và các giá trị mặc định này cũng có địa chỉ cho nó.

Hàm new này không được sử dụng nhiều và nó cũng không phải từ khóa nên chúng ta có quyền đặt tên biến và hàm trùng với nó. Lúc này, hàm new do Go cung cấp sẽ mất tác dụng

### Gán địa chỉ
Để gán địa chỉ cho con trỏ ta có thể xem ví dụ sau

```
package main

import "fmt"

func main() {
	a := 1 
	p := &a

	fmt.Println("Value stored in variable a = ", a)
	fmt.Println("Address of variable a = ", &a)
	fmt.Println("Value stored in variable p = ", p)
}
```
Đoạn code trên khai báo biến a mang giá trị 1. `&a` sẽ lấy ra địa chỉ của biến a. `p := &a` sẽ khai báo và gán giá trị địa chỉ của biến a cho p. p sẽ là con trỏ lưu địa chỉ biến a

Đoạn code trên sẽ cho kết quả:
```markdown
Value stored in variable a =  1
Address of variable a =  0xc000016108
Value stored in variable p =  0xc000016108
```

Ngoài ra ta có thay đổi giá trị được lưu trữ trong biến thông qua con chỏ bằng cách tham chiếu ngược đến con trỏ

Vi dụ:
```
package main

import "fmt"

func main() {
	a := 1
	p := &a

	fmt.Println("a = ", a)
	fmt.Println("p = ", p)
    fmt.Println("*p = ", *p)

	*p = 2
	fmt.Println("a (after) = ", a)
}
```
Đoạn code trên sẽ cho kết quả:
```markdown
a =  1
p =  0xc000016108
*p =  1
a (after) =  2
```
Trong ví dụ trên ta có thể thấy p đang lưu địa chỉ của biến a, ta có thể lấy giá trị biến a thông qua con trỏ p bằng cách sử dụng `*p` và cũng có thể sử dụng `*p` để thay đổi giá trị của biến a.

Đầu tiên ta gán giá trị a = 1, sau đó khai báo con trỏ p lưu địa chỉ của biến a (p := &a)

`fmt.Println("a = ", a)` : hiển thị giá trị biến a (1)

`fmt.Println("p = ", p)` : hiển thị giá trị con trỏ p, lúc này p đang lưu địa chỉ của biến a nên p có giá trị 0xc000016108

`fmt.Println("*p = ", *p)` : hiển thị giá trị lưu tại địa chỉ p(0xc000016108) , vì biến a lưu trữ trên địa chỉ này nên *p hiển thị giá trị của biến a (1)

`*p = 2 `: thay đổi giá trị trên địa chỉ p(0xc000016108) lên 2 , lúc trước giá trị bằng 1.

vì giá trị lưu ở địa chỉ 0xc000016108 đã thay đổi từ 1 thành 2 nên lúc này biến a có giá trị 2

`fmt.Println("a (after) = ", a)` : kết quả là 2

## Con trỏ trỏ tới con trỏ
Liệu có thể sử dụng con trỏ để lưu địa chỉ của 1 con trỏ, Cùng xem ví dụ dưới đây
```
package main

import "fmt"

func main() {
	a := 1
	p := &a
	pp := &p

	fmt.Println("a = ", a)
	fmt.Println("address of a = ", &a)

	fmt.Println("p = ", p)
	fmt.Println("address of p = ", &p)

	fmt.Println("pp = ", pp)

	fmt.Println("*pp = ", *pp)
	fmt.Println("**pp = ", **pp)
}
```
Kết quả của chương trình
```scala
a =  1
address of a =  0xc000016108
p =  0xc000016108
address of p =  0xc00000e028
pp =  0xc00000e028
*pp =  0xc000016108
**pp =  1
```
`a := 1` gán giá trị cho biến a bằng 1

`p := &a` khởi tạo con trỏ p lưu địa chỉ của biến a (có địa chỉ là 0xc000016108)

`pp := &p` khởi tạo con trỏ pp lưu địa chỉ của con trỏ p (có địa chỉ là 0xc00000e028)

Các dòng tiếp theo hiên thị thông tin
* a : giá trị của biến a
* &a : địa chỉ lưu biến a
* p : giá trị của p, lúc này giá trị của p là địa chỉ của a
* &p : địa chỉ của con trỏ p
* pp: lúc này pp lưu địa chỉ của con trỏ p (0xc00000e028)
* *pp : giá trị của cái địa chỉ lưu trên pp -> chính là cái địa chỉ lưu trên p (0xc000016108) => là địa chỉ của biến a
* ** pp: giá trị của giá trị của cái địa chỉ lưu trên pp => là gía trị của a = 1

## Phép toán trên con trỏ
Trong C/C++ ta có thể sử dụng các phép toán trên con trỏ. Ví dụ như
```markdown
int a=1;

int *p;

p = &a;

pa ++;
```
Giả sử biến a được lưu trữ tại địa chỉ 1000 => p lưu giá trị 1000. Vì số nguyên có kích thước là  2  bytes, nên sau biểu thức  “p++;” p sẽ có giá trị là 1002 mà không là 1001.

Vậy trong Go điều tường tự có xảy ra. Hãy cũng xem ví dụ sau:

```
package main

import "fmt"

func main() {
	a := 1
	p := &a
    p++

	fmt.Println(p)
}
```
Khi chạy đoạn code này ta sẽ thấy thông báo lỗi:

```css
# command-line-arguments
./main.go:8:4: invalid operation: p++ (non-numeric type *int)
```

Điều này là do Go không hỗ trợ các phép toán trên con trỏ. Vậy nên các bạn không cần phải thử các phép toán khác trên con trỏ giống như C/C++ nhé.

## Ứng dụng con trỏ trong Golang
Ta cùng xem 1 ví dụ sau:

```go
package main

import "fmt"

func main() {

  a := 1
  updateByValue(a)
  fmt.Println(a)

  updateByPointer(&a)
  fmt.Println(a)

}

func updateByValue(a int) {
  a = 2
}
func updateByPointer(a *int){
  *a = 2
}
```

Hàm updateByValue() truyền vào giá trị biến a và thay đổi biến a thành 2
Hàm updateByPointer() truyền vào con trỏ biến a và thay đổi biến a thành 2

Ta có thể thấy hàm updateByValue không thể thay đổi giá trị của biến a thành 2. Thực chất là do ta chỉ truyền vào "bản sao" giá trị của biến a vào nên ta không thể làm thay đổi được a. Khi dùng hàm updateByPointer() thì giá trị của biến a có thể thay đổi vì ta truyền địa chỉ biến a vào và có thể thay đổi trực tiếp giá trị trên địa chỉ đó.

Ta cùng xem 1 ví dụ khác:

```go
package main

import "fmt"

func main() {

  a := []int{1, 2}
  updateInValue(a)
  fmt.Println(a)
}

func updateInValue(a []int) {
  a[0] = 2
}
```

Trong ví dụ trên ta dùng hàm updateInValue để thay đổi giá trị của phần tử đầu tiên của slices và hàm này có thể thay đổi được giá trị.

Do đó tùy từng trường hợp mà ta mới cần phải sử dụng con trỏ. 
![](https://images.viblo.asia/40c9c732-32ad-4a5c-a1ff-b213b3677448.png)
Trong Go các kiểu dữ liệu có thể chia thành 2 loại Value Types và Reference Types. Đối với kiểu Value Types cần phải để sử dụng con trỏ khi thay đổi một cái gì đó trong function còn đối với kiểu Reference Types thì không cần phải lo tới con trỏ khi làm điều trên.

## Tham Khảo: 
https://medium.com/rungo/pointers-in-go-a789eafccd53