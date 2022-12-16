## Kiểu dữ liệu trong golang 
Xin chào các bạn, ở bài biết trước mình đã hướng dẫn [cài đặt và chạy chương trình hello word đầu tiên](https://viblo.asia/p/go-lang-p1-lap-trinh-golang-can-ban-cai-dat-viet-chuong-trinh-hello-word-yMnKMwmjl7P), bài này chúng ta cùng tìm hiểu về các kiểu dữ liệu trong golang nhé<br>
Cũng giống như các ngôn ngữ lập trình khác, việc đầu tiên cần quan tâm là Go hỗ trợ những kiểu dữ liệu nào?<br>
Kiểu dữ liệu trong Go là tĩnh, tức là không thể thay đổi được không giống như một số ngôn ngữ như PHP, Javascript… cho phép thay đổi kiểu dữ liệu trong suốt quá trình chạy.<br>
Go cung cấp cho chúng ta rất nhiều kiểu dữ liệu để sử dụng như:
Kiểu bool 
Kiểu dữ liệu số (numeric type)
 int8, int16, int32, int64, int
uint8, uint16, uint32, uint64, uint
float32, float64
complex64, complex128
byte
rune
Kiểu chuỗi (string)

#### Boolean
Kiểu boolean chỉ gồm 2 giá trị là True và False:
```
var a, b bool
a = True
b = 0 // Tương tự b = False
```
hoặc có thể khai báo và tự động gán kiểu dữ liệu
```
a := true //a được gán bằng true
b := false // b được gán bằng false
```

#### Numeric
Các kiểu số nguyên trong Go là uint8, uint16, uint32, uint64, int8, int16, int32, int64. Các con số 8, 16, 32, 64 là số bít mà máy tính dùng để biểu diễn số nguyên đó. uint tức là unsigned int – là kiểu số nguyên không âm. <br>
Các kiểu số thực trong Go là float32 và float64 <br>
Các kiểu số phức là complex64 và complex128<br>
```
uint8       the set of all unsigned  8-bit integers (0 to 255)
uint16      the set of all unsigned 16-bit integers (0 to 65535)
uint32      the set of all unsigned 32-bit integers (0 to 4294967295)
uint64      the set of all unsigned 64-bit integers (0 to 18446744073709551615)

int8        the set of all signed  8-bit integers (-128 to 127)
int16       the set of all signed 16-bit integers (-32768 to 32767)
int32       the set of all signed 32-bit integers (-2147483648 to 2147483647)
int64       the set of all signed 64-bit integers (-9223372036854775808 to 9223372036854775807)

float32     the set of all IEEE-754 32-bit floating-point numbers
float64     the set of all IEEE-754 64-bit floating-point numbers

complex64   the set of all complex numbers with float32 real and imaginary parts
complex128  the set of all complex numbers with float64 real and imaginary parts

byte        alias for uint8
rune        alias for int32
```

vi dụ
```
package main

import "fmt"

func main() {
	var num1 int = 2
	var num2 int = 3
    fmt.Println("Tong 2 so num1 và num2 là:", num1 + num2)
}
```
#### String
Các chuỗi trong Golang bao gồm các ký tự được đặt trong dấu ngoặc kép "":

```
var s string
s = "Nguyễn Văn Thịnh"
```
Hoặc:
`s := "Nguyễn Văn Thịnh"`
## Lệnh điều khiển trong golang
#### If 
```
package main
import "fmt"

func main() {
	// If Statement
	var x = 25
	if(x % 5 == 0) {
		fmt.Printf("%d is a multiple of 5\n", x)
	}
}
```
#### If - else - if
```
package main
import "fmt"

func main() {
	var BMI = 21.0
	if BMI < 18.5 {
		fmt.Println("You are underweight");
	} else if BMI >= 18.5 && BMI < 25.0 {
		fmt.Println("Your weight is normal");
	} else if BMI >= 25.0 && BMI < 30.0 {
		fmt.Println("You're overweight")
	} else {
		fmt.Println("You're obese")
	}
}
```
#### switch
```
package main
import "fmt"

func main() {
	var dayOfWeek = 6
	switch dayOfWeek {
		case 1: fmt.Println("Monday")
		case 2: fmt.Println("Tuesday")
		case 3: fmt.Println("Wednesday")
		case 4: fmt.Println("Thursday")
		case 5: fmt.Println("Friday")
		default: fmt.Println("Invalid day")
	}
}
```
#### for 
```
package main
import "fmt"

func main() {
	for i := 0; i < 10; i++ {
		fmt.Printf("%d ", i)
	}
}
```
hoặc
```
package main
import "fmt"

func main() {
    i := 2
    for ;i <= 10; i += 2 {
        if num%2 == 0 {
                continue;
        }
	    fmt.Printf("%d ", i)
    }
}
```
## kết bài: 
Qua bài viết này thì các bạn có thể thấy ngôn ngữ golang rất rất giống với ngôn ngữ lập trình C ( vì nó phát triển dựa trên C mà ).<br>
Bài viết sau mình sẽ nói về Array, Slice trong golang.<br>
Cảm ơn các bạn đã theo dõi.