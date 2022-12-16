## 1. Golang là gì
Go hay còn được biết đến như Golang là một ngôn ngữ lập trình mã nguồn mở (open source), dạng biên dịch (compiled) kiểu tĩnh (statically type) được phát triển bởi Google.

Mục đích chính của Golang là hỗ trợ phát triển các web apps có tính sẵn sàng cao đồng thời giúp việc mở rộng nhanh và dễ dàng hơn.

Golang có thể ứng dụng trong nhiều lĩnh vực như trong phát triển Web Server,  phát triển ứng dụng mobile hay trong các hệ thống microservice hay ERP.

Golang có các ưu điểm so với các ngôn ngữ khác như: 
+ Golang là một ngôn ngữ biên dịch, mã nguồn sẽ được biên dịch sang mã nhị phân (binary), đây là phần còn thiếu trong Javascript - NodeJs.
+ Với Golang, chúng ta sẽ không cần cài đặt các dependencies từ server bởi vì Go đã liên kết tất cả các mô-đun cũng như các dependenciesthành một file nhị phân.
+ Golang sử dụng các goroutine riêng biệt giúp tiết kiệm bộ nhớ và nâng cao hiệu năng cho ứng dụng.
## 2. Cài đặt 
Golang hỗ trợ cả cả ba nền tảng Mac, Windows, Linux. Bạn có thể tải bộ cài đặt tương ứng tại [đây](https://golang.org/doc/install)
#### Windows
Trên Windows sau khi tải tập tin cài đặt Go dành cho Windows về máy bạn chỉ cần click đúp vào tập tin và tiến hành cài đặt Go theo hướng dẫn.
Theo mặc định máy tính sẽ cài đặt Go trong thư mục `c:\Go`, thư mục này còn được gọi là thư muc `$GO_ROOT`. Ngoài ra, trình cài đặt cũng sẽ tự động thêm thư mục `c:\Go\bin` vào biến môi trường trên máy. Thư mục này còn được gọi là thư mục `$GO_PATH`

#### MacOS
Tương tự như Windows thì bạn cũng có thể cài đặt Golang sử dụng tập tin cài đặt với phần mở rộng.pkg dành cho các máy tính chạy hệ điều hành Mac OSX. Golang sẽ được cài đặt tại `/usr/local/go` và tự động thêm thư mục `/usr/local/go` vào biến môi trường `PATH`
#### Linux
Tải file cài đặt có đuôi .tar và giải nén ở thư mục `/usr/local`.
Thêm thư mục `/usr/local/go` vào biến môi trường PATH 
```sh
$ export PATH=$PATH:/usr/local/go
```

## 3. Chương trình Hello World đầu tiên 
Sau khi đã cài đặt xong, chúng ta sẽ bắt tay vào code chương trình Hello World "thần thánh".
```go
# helloworld.go
package main

import "fmt"

func main()  {
	fmt.Println("Hello World")
}
```
Để chạy chương trình ta dùng câu lệnh
```go
$ go run helloworld.go
```
Nếu muốn build trước khi chạy ta sử dụng câu lệnh 
```go
$ go build 
$ ./helloworld
```

## 4. Biến
Khai báo và sử dụng biến là vấn đề cực kỳ quan trọng khi tìm hiểu 1 ngôn ngữ mới. Với Golang, biến có thể được khai báo bằng nhiều cách khác nhau 
#### Khai báo một biến 
Cú pháp:  **var name type**
```go
package main

import "fmt"

func main()  {
	var name string
	name = "Nguyen Tuan Vu"
	fmt.Println("Hello ", name)
}
```

Đôi khi để cho ngắn gọn ta có thể sử dụng cách khai báo nhanh 
```go
name := "Nguyen Tuan Vu"
// Hoac 
var name string = "Nguyen Tuan Vu"
```
Hoặc cách khai báo tự suy luận kiểu dữ liệu 
```go
var name = "Nguyen Tuan Vu"
```

#### Khai báo nhiều biến 
Ta cũng có thể khai báo nhiều biến trên 1 câu lệnh. 
```go
name,age := "Nguyen Tuan Vu", 21
```

## 5. Lệnh điều khiển 
Cú pháp của lệnh điều khiển trong golang khá giống với các ngôn ngữ khác 
#### If .... else
```go
package main

import "fmt"

func main() {
	var vibloPost int = 5
    
	if vibloPost >= 4 {
		fmt.Println("Ban da vuot qua su kien May Fest")
	} else {
		fmt.Println("Ban chua vuot qua su kien May Fest")
	}
}
```
#### For 
```go
package main
import "fmt"

func main() {
	for i := 0; i < 10; i++ {
		fmt.Printf("%d ", i)
	}
}
```

hoặc 
```go
package main
import "fmt"

func main() {
    i := 0
	for i < 10 {
		fmt.Printf("%d ", i)
        i = i + 1
	}
}
```

Ngoài ra chúng ta có thể sử dụng nhiều biến trong vòng lặp for 
```go
package main
import "fmt"

func main() {
	for i, j := 0, 5; i <= 5 && j>=0; i,j = i+1, j-1 {
		fmt.Printf("%d %d\n", i, j)
	}
}

/*
Ket qua
0 5
1 4
2 3
3 2
4 1
5 0
*/

```

## 6. Mảng, Slice
#### Mảng 
Mảng là tập hợp các phần tử có cùng một kiểu dữ liệu .
Có nhiều cách khác nhau để khai báo 1 mảng 
```go
// khai bao don gian nhat
var a [3]int
a[0] = 1
a[1] = 2
a[2] = 3

// khai bao short hand
a := [3]int{1, 2, 3}

// Bo qua chieu dai cua mang
a := [...]int{1, 2, 3}
```
Vòng lặp mảng sử dụng range 
```go
package main
import "fmt"

func main() {
	a := [3]int{1, 2, 3}
	for i, v:= range a {
		fmt.Printf("Phan tu thu %d la: %d\n", i, v)
	}
}
```
##### Lưu ý khi sử dụng mảng 
* **Mảng là một kiểu giá trị**:  Mảng trong Go là các loại giá trị không phải tham chiếu như các ngôn ngữ khác. Do đó ta thể tạo ra 1 copy của bản gốc bằng cách gán một mảng mới bằng mảng gốc ban đầu. Mọi thay đổi của mảng mới sẽ không ảnh hưởng đến mảng gốc 
```go
package main
import "fmt"

func main() {
	a := [3]int{1, 2, 3}
	b := a
	b[0] = 4
	fmt.Println("Mang a ", a)
	fmt.Println("Mang b ", b)
}

/*
Mang a  [1 2 3]
Mang b  [4 2 3]
*/
```
+ **Kích thước của mảng là 1 phần của kiểu giá trị**: [3]int và [5]int là các kiểu khác nhau. Chính vì thế mảng không thể thay đổi kích cỡ.
```go
package main

func main() {
	a := [3]int{1, 2, 3}
	var b [5]int
	b = a // Loi khong su dung kieu [3]int cho kieu [5]int
}
```
#### Slice
Như đã nói ở trên mảng có nhược điểm là không thể thay đổi được kích cỡ và truyền giá trị. Slice được sinh ra để giải quyết các điểm hạn chế này. Slice là các tham chiếu đến mảng hiện có. Slice vô cùng linh hoạt.

Trước tiên, chúng ta cùng tìm hiểu cách tạo ra 1 slice
```go
package main

import (  
    "fmt"
)

func main() {  
    a := [5]int{1, 2, 3, 4, 5}
    var b []int = a[1:4] // [2, 3, 4]
    fmt.Println(b)
}
```
Sửa đổi một slice 
```go
package main

import "fmt"

func main() {
	arr := [...]int{1, 2, 3, 4, 5}
	slice := arr[1:4] // [2, 3, 4]
	for i, _ := range slice {
		slice[i]++
	}
	fmt.Println(slice) // [3, 4, 5]
	fmt.Println(arr) // [1, 3, 4, 5, 5]
}
```
Tiếp theo chúng ta cần phân biệt độ dài và sức chứa của 1 slice.
+ **Độ dài** của 1 slice là số lượng phần tử có trong slice đó. Ta có gọi độ dài của slice bằng : `len(slice)`
+ **Sức chứa** của 1 slice là số lươngj phần tử cơ bản bắt đầu từ mục mà slice đó được tạo ra
```go 
package main

import "fmt"

func main() {
	arr := [...]int{1, 2, 3, 4, 5}
	slice := arr[1:4] // [2, 3, 4]
	fmt.Println("Do dai cua slice la", len(slice)) 
	// 3 vi slice duoc tao ra tu index 1, 2, 3 cua mang arr  
	fmt.Println("Suc chua cua slice la", cap(slice)) 
	// 4 vi slice bat dau tu index 1, mang arr tu index 1 den cuoi mang co 4 phan tu  
}
```
Thay đổi độ dài và sức chứa của slice  
```go
package main

import "fmt"

func main() {
	arr := [...]int{1, 2, 3, 4, 5}
	slice := arr[1:4] // [2, 3, 4]
	fmt.Println("slice co do dai la", len(slice), "va suc chua la", cap(slice))
	// slice co do dai la 3 va suc chua la 4
	slice = arr[0: cap(slice)]
	fmt.Println("slice sau khi thay doi co do dai la", len(slice), "va suc chua la", cap(slice))
	// slice sau khi thay doi co do dai la 4 va suc chua la 5
}
```
Như đã biết, mảng bị giới hạn về độ dài và không thể tăng lên được. Vậy làm thế nào để thêm phần tử vào mảng. Để giải quyết vấn đề này ta  sử dụng slice và thêm phần tử mới vào bằng cách sử dụng hàm append.
```go
package main

import "fmt"

func main() {
	slice := []int{1, 2, 3, 4, 5}
	fmt.Println("slice co do dai la", len(slice), "va suc chua la", cap(slice))
	// slice co do dai la 5 va suc chua la 5
	slice = append(slice, 6)
	fmt.Println("slice sau khi thay doi co do dai la", len(slice), "va suc chua la", cap(slice))
	fmt.Println(slice)
	// slice sau khi thay doi co do dai la 6 va suc chua la 10
	// Suc chua cua slice da duoc tang len gap doi
}
```

## Tham khảo

https://tour.golang.org/

https://golangbot.com/learn-golang-series/

https://www.tutorialspoint.com/go/index.htm