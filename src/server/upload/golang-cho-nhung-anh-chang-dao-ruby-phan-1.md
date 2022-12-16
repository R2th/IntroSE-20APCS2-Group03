![](https://images.viblo.asia/992aa37f-36f5-42fb-959b-f01f8a2f119c.png)
Nếu bạn đang là lập trình viên Ruby mà muốn tìm hiểu về Golang, thì xin chúc mừng, đây có thể là thứ bạn đang tìm.
Trong bài này, mình sẽ đi qua những thứ cơ bản và tính năng hay của Golang, và mình mong rằng chúng ta có thể từ những công nhân đào Ruby có thể chuyển qua đại gia nuôi chó cảnh :D

## Giới thiệu

> Ruby is a dynamic, interpreted, reflective, object-oriented, general-purpose programming language. It was designed and developed in the mid-1990s by Yukihiro “Matz” Matsumoto in Japan.
> According to the creator, Ruby was influenced by Perl, Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, including functional, object-oriented, and imperative. It also has a dynamic type system and automatic memory management.
> 
> Go (often referred to as Golang) is a programming language designed by Google engineers Robert Griesemer, Rob Pike, and Ken Thompson. Go is a statically typed, compiled language in the tradition of C, with the added benefits of memory safety, garbage collection, structural typing, and CSP-style concurrency. The compiler, tools, and source code are all free and open source.
> 
> — Wikipedia
> 
Giới thiệu sơ qua thì đaị khái, Ruby là một ngôn ngữ lập trình năng động, được giải thích, phản ánh, hướng đối tượng, và hướng mục đích. Nó được thiết kế từ giữa những năm 90 bởi Yukihiro “Matz” Matsumoto tại Nhật Bổn. Theo ổng, thì Ruby bị ảnh hưởng từ Perl, Smalltalk, Eiffel, Ada, và Lisp. Nó có thể hỗ trợ nhiều mô hình lập trình, cả về hướng chức năng, hướng đối tượng, và mệnh lệnh. Nó cũng có một hệ thống kiểu động và quản lý bộ nhớ tự động.

Còn Go thì là một ngôn ngữ lập trình được thiết kế từ những thánh nhân của nền lập trình, những kỹ sư từ Google: Robert Griesemer, Rob Pike, và Ken Thompson. Go là một ngôn ngữ được biên dịch tĩnh, được biên dịch theo truyền thống của C, và được bổ sung các tính năng về an toàn bộ nhớ, thu gom rác, định nghĩa cấu trúc và concurrency kiểu CSP. Trình biên dịch, công cụ và mã nguồn của Go đều là nguồn mở và miễn phí. 

## Thân bài

### 1. "Hello World"
Cùng bắt đầu với bài ví dụ huyền thoại, in ra "Hello World"

#### Ruby
```ruby
puts "Hello World"
```
#### Go
```go
package main

// giống với require trong ruby
import "fmt"

func main(){
  fmt.Println("Hello World!!!")
}
```

Trong Ruby, ta có thể in ra chuỗi với 1 dòng lệnh, nhưng đối với Go, nó rắc rối hơn tí.
Trong đoạn mã Go ở trên, từ khoá `package` được dùng để định nghĩa phạm vi của đoạn code, để xác định nó nằm trong thư viện nào đó hoặc là đoạn code thực thi, và ở trên `package main` dùng để thông báo cho Go compiler biết là đoạn code đó dùng để thực thi. Tất cả các chường trình muốn chạy thì phải sử dụng `package main`
Tiếp theo, `import` thì tương tự `require` trong Ruby, nó dùng để import những packages bên ngoài vào để sử dụng trong chương trình. Ở đoạn code trên, ta đang import package fmt để sử dụng cho việc định dạng input/output.
`main()` function là nơi bắt đầu của chương trình. Vì Go là ngôn ngữ biên dịch nên nó cần phải biết entry point, không giống như Ruby là ngôn ngữ thông dịch. Tất cà những gì cần thực thi và chạy trong Go đều phải nằm trong main function. Trong Go, ngoặc nhọn mở ra đánh dấu cho việc những dòng code tiếp theo đều cần phải chạy, và ngoặc nhọn đóng để đánh dấu cho việc kết thúc, vì vậy, ngoặc nhọn mở phải cùng dòng với block statement như function, conditions.

### 2. Cách chạy code qua command line
#### Ruby
Chỉ cần copy đoạn code trên bỏ vào 1 file tên bất kì, vd hello_world.rb, khi đó ta có thể thực hiện lệnh sau để chạy

```
> ruby hello_world.rb
Hello World!!!
```

#### Go
Tương tự như trên, t cũng copy đoạn mã trên bỏ vào 1 file khác, nhưng với đuôi ".go" thay vì ".rb". Vì Go là ngôn ngữ biên dịch nên cần thêm một bước build trước khi chạy

```
> go build hello-world.go
> ./hello-world
Hello World!!!
```

Hoặc kết hợp 2 bước thành 1:

```
> go run hello-world.go
Hello World!!!
```
Quá đơn giản!!!

### 3. Comment code
#### Ruby
```ruby
puts "Commenting Code in Ruby"
# this is single line comment in ruby
=begin
This is multiline 
Comment in ruby
=end
```

#### Go

```go
package main

import "fmt"

func main(){
  fmt.Println("Commenting in Go")
  // this is single line comment in Go
  /* this is multiline
  Comment in Go */
}
```

### 4. Khai báo biến
Ruby là dynamically typed nên khi khai báo biến không cần phải định nghĩa kiểu, nhưng Go là statically typed nên ta cần phải định nghĩa kiểu dữ liệu ngay từ lúc khai báo

#### Ruby
```ruby
a = 1
b
b = "hello"
```

#### Go
```go
var a int = 1
// OR
// this dynamically declares type for variable a as int.
var a = 1
// this dynamically defines variable a and declares its type as int.
a := 1
```
Như bạn thấy ở trên, Go là statically typed language, dù mình nhìn qua cũng có vẻ như là dynamic type nhưng thực chất nó detect cái kiểu của giá trị được gán để khai báo cho biến đó
```go
// declares variable a as type int
a := 1

// declares variable b as type string
b := "hello"
```

### 5. Kiểu dữ liệu
Một số kiểu dữ liệu của Go:
```go
var a bool = true
var b int = 1
// In go the string should be declared using double quote.
// Using single quote unlike in Ruby can be used only for single character for its byte representation
var c string = "hello world" 
var d float32 = 1.222
var x complex128 = cmplx.Sqrt(-5 + 12i)
```

Trong Ruby, ta có thể gán kiểu dữ liệu khác cho biến đã chứa dữ liệu trước đó được, nhưng điều này không thể thực hiện ở trong Go

#### Ruby
```ruby
a = 1
a = "Hello"
```

#### Go
```go

a := 1
a = "Hello"
// Gives error: cannot use "hello"(type string) as type int is assignment
```

### 6. Hash/Map
Cũng như Ruby, ta có thể định nghĩa hash ở Go, nhưng với tên gọi khác, đó là map.
Cú pháp là `map[string] int`, trong đó, phần trong ngoặc vuông là kiểu dữ liệu cho key, phần cuối là kiểu dữ liệu cho value.

#### Ruby
```ruby
#Ruby:
hash = {name:  'Nikita', lastname: 'Acharya'}
# Access data assigned to name key
name = hash[:name]
```

#### Go
```go
//Go
hash := map[string]string{"name":  "Nikita", "lastname": "Acharya"}
// Access data assigned to name key
name := hash["name"]
```

Ta có thể kiểm tra xem 1 key đã tồn tại trong map chưa với two-value assignment (phép gán 2 giá trị).
Tham khảo ví dụ:
```go
//GO
name := map[string]string{name: "Nikita"}
lastname, ok := name["lastName"]
if ok{
  fmt.Printf("Last Name: %v", lastname)
}else{
  fmt.Println("Last Name is missing")
}
```
Nếu `name` đã có key `lastname` thì `ok` sẽ được gán bằng true và biến `lastname` sẽ được gán giá trị của `name["lastName"]`

### 7. Array
Trong Go cũng có mảng, nhưng ta cần khai báo độ dài cho nó.

#### Ruby
```ruby
#Ruby 
array = [1,2,3]
```

#### Go
```ruby
//Go
array := [3]int{1,2,3}
names := [2]string{"Nikita", "Aneeta"}
```

#### * Slice
Array trong Go bị giới hạn trong trường hợp giá trị của Array bị thay đổi trong lúc chạy. Và Array cũng không cung cấp khả năng lấy subarrray. Chính vì vậy nên Go có thêm một kiểu dữ liệu gọi là `Slice`.
Slice lưu trữ tuần tự các phần tử, và có thể mở rộng bất cứ lúc nào. Khai báo Slice cũng tương tự như Array, nhưng ta không cần định nghĩa độ dài cho nó.

```go
var b []int
```

#### Thêm phần tử vào Array/Slice
Ở Ruby, ta sử dụng toán tử + để thêm phần tử của array này vào array khác
```ruby
#Ruby
numbers = [1, 2]
a  = numbers + [3, 4]
#-> [1, 2, 3, 4]
```
Trong khi đó, ta sử dụng function `append` để thêm phần tử vào Array/Slice trong Go
```go
//Go
numbers := []int{1,2}
numbers = append(numbers, 3, 4)
//->[1 2 3 4]
```

#### Sub Slicing Array
```ruby
#Ruby 
number2 = [1, 2, 3, 4]
slice1 = number2[2..-1] # -> [3, 4]
slice2 = number2[0..2] # -> [1, 2, 3]
slice3 = number2[1..3] # -> [2, 3, 4]
```

```go
//Go
// initialize a slice with 4 len, and values
number2 = []int{1,2,3,4}
fmt.Println(numbers) // -> [1 2 3 4]
// create sub slices
slice1 := number2[2:]
fmt.Println(slice1) // -> [3 4]
slice2 := number2[:3]
fmt.Println(slice2) // -> [1 2 3]
slice3 := number2[1:4]
fmt.Println(slice3) // -> [2 3 4]
```

#### Copy Slice/Array
Trong Ruby, ta có thể copy một array bằng các thực hiện phép gán
```ruby
#Ruby
array1 = [1, 2, 3, 4]
array2 = array2 # -> [1, 2, 3, 4]
```
Nhưng trong Go, ta không thể làm như vậy mà phải khởi tạo ra một mảng mới, sau đó sử dụng function `copy`
```go

//Go
// Make a copy of array1
array1 := []int{1,2,3,4} 
array2 := make(int[],4)
copy(array2, array1)
```

**Lưu ý:** Số lượng phần tử được copy phụ thuộc vào độ dài mảng đích mà ta khai báo
```go

a := []int{1,2,3,4}
b := make([]int, 2)
copy(b, a) // copy a to b
fmt.Println(b)
//=> [1 2]
```
Ở đây chỉ có 2 phần tử được copied với vì ta chỉ khai báo mảng đích (b) có 2 phần tử.

### Phần 2 (cont.)