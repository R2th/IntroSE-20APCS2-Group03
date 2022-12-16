# Go overview
Để bắt đầu với **Go** (hay còn gọi là **Golang**), hãy cũng tìm hiểu qua một chút về ngôn ngữ này. **Go** được phát triển bởi các kỹ sư của Google. Nó được phát triển từ năm 2007 và được công bố năm 2009. Phiên bản mã nguồn mở đầu tiên của **Go** được ra mắt vào tháng 3 năm 2012. Theo như những nhà phát triển của **Go** thì nó là một ngôn ngữ lập trình mã nguồn mở giúp dễ dàng xây dựng những phần mềm đơn giản, đáng tin cậy và hiệu quả.

Trong nhiều ngôn ngữ, có rất nhiều cách để giải quyết một vấn đề cho trước.  Những lập trình viên có thể phải dành ra rất nhiều thời gian để tìm kiếm cách giải quyết tốt nhất để giải quyết một vấn đề

Với **Go**, những nhà phát triển tin rằng với ít tính năng hơn, họ cũng sẽ chỉ cần nghĩ tới một cách giải quyết duy nhất cho vấn đề cần giải quyết. Điều này tiết kiệm được rất nhiều thời gian của lập trình viên và khiến cho việc tối ưu kể cả những **codebase** lớn cũng trở lên dễ dàng. Cũng sẽ không có những tính năng khó hiểu như **maps** hoặc **filters** trong **Go**

> When you have features that add expensiveness it typically adds expense - Rob Pike

# Getting Started
**Go** được tạo ra bởi các **package**. Package **main** cho trình biên dịch Go biết rằng chương trình được biên dịch dưới dạng thực thi, thay vì dùng thư viện. Đây là điểm bắt đầu biên dịch cho một ứng dụng **Go**. Package **main** được định nghĩa như sau:
```go
package main
```

Tiếp theo hay cùng tạo một ứng dụng "Hello world!" đơn giản với **Go** bằng việc tạo ra file *main.go*.

## Workspace
Một **workspace** trong **Go** được định nghĩa bởi biến môi trường **GOPATH**.

**Go** sẽ tìm kiếm mọi package bên trong thư mục được định nghĩa trong **GOPATH**, hoặc được định nghĩa trong **GOROOT**, được đặt mặc định khi cài đặt **Go**. **GOROOT** là đường dẫn đến vị trí **Go** được cài đặt.

Cài đặt **GOPATH** đến thư mục mà bạn mong muốn. Hãy thêm nó vào trong một folder *~/workspace*

```
# export env
export GOPATH=~/workspace

# go inside the workspace directory
cd ~/workspace
```

Tạo một file *main.go* trong folder mà chúng ta vừa tạo với nội dung bên dưới

## Hello World!
```golang
package main

import "fmt"

func main() {
  fmt.Println("Hello World!")
}
```

Trong ví dụ trên, **fmt** là một package tích hợp bên trong **Go**. Nó sẽ thực hiện chức năng định dạng I/O (Input/Output)

Chúng ta import một package trong **Go** bằng từ khóa **import**. **func main** là điểm chính mà mã được thực thi. **Println** là một function bên trong package **fmt** và nó sẽ thực hiện in ra "Hello World!" cho chúng ta

Hãy cùng xem kết quả sau khi chạy file này. Có hai cách để chạy một file trong **Go**. Như chúng ta đã biết, **Go** là một ngôn ngữ biên dịch, vì vậy trước khi chạy nó, chúng ta cần biên dịch trước:

```
go build main.go
```

Câu lệnh này sẽ tạo ra một file thực thi nhị phân để chúng ta có thể chạy:

```
go run main.go
# Hello World!
```

 # Variables
 Các biến trong **Go** luôn phải được định nghĩa một cách rõ ràng. Kiểu dữ liệu trong **Go** sẽ được kiểm tra tại thời điểm biến được khai báo. Một biến trong **Go** có thể được khai báo như sau:

```golang
var a int
```

Trong trường hợp này, giá trị của biến được đặt bằng 0. Sử dụng cú pháp dưới đây để định nghĩa và khởi tạo một biến với những giá trị bất kỳ:

```golang
var a = 1
```

Chúng ta cũng có thể định nghĩa nhiều biến trong cùng một dòng

```golang
var b, c int = 2, 3
```

# Data Types
Giống như những ngôn ngữ khác, **Go** hỗ trợ nhiều kiểu cấu trúc dữ liệu khác nhau. Hãy cùng thử khám phá chúng:

## Number, String, and Boolean

Một số loại kiểu dữ liệu dạng số là int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64, uintptr, ...

Kiểu chuỗi trong **Go** được lưu thành một chuỗi các bytes. Nó được khai báo với từ khóa **string**

Một giá trị boolean được lưu trữ và khởi tạo bằng từ khóa **bool**

**Go** cũng hỗ trợ những dữ liệu kiểu số phức tạp, chúng có thể được khởi tạo với từ khóa **complex64** và **complex128**

```golang
var a bool = true
var b int = 1
var c string = 'hello world'
var d float 32 = 1.222
var x complex128 = cmplx.Sqrt(-5 * 12i)
```

## Array, Slices, and Maps

Một mảng là một tập hợp trình tự các phần tử có cùng kiểu dữ liệu. Mảng có một chiều dài cố định được định nghĩa lúc khởi tạo, vì thế, nó không thể mở rộng hơn chiều dài đó. Một mảng có thể được định nghĩa như sau:

```golang
var a [5]int
```

Chúng ta cũng có thể khai báo mảng đa chiều như sau:

```golang
var multiD [2][3]int
```

Mảng trong **Go** không cung cấp khả năng để lấy ra một mảng con. Để làm điều đó, **Go** có một kiểu dữ liệu gọi là **slice**

Slice lưu trữ một chuỗi các phần tử có thể được mở rộng bất cứ lúc nào. Khai báo slice cũng giống như khai báo array trong **Go**, chỉ khác là khi khai báo slice chúng ta không cần phải khai báo độ dài của slice hay số phần tử, ví dụ:

```golang
var b []int
```

Dòng khai báo trên sẽ tạo ra một slice với độ dài bằng 0 và số phần tử bằng 0. Tuy nhiên chúng ta vẫn có thể khai báo slice với độ dài hay số phần tử nhất định bằng câu khai báo dưới đây:

```golang
numbers := make([]int, 5, 10)
```

Đoạn code trên sẽ khởi tạo một slice có độ dài là 5 và sức chứa là 10

Chúng ta có thể nghĩ slice như là một lớp của array. Slice sử dụng array như là một cấu trúc cơ bản. Một slice thì sẽ có 3 thành phần: "sức chứa, độ dài, và một con trỏ tới mảng" như hình bên dưới:

![](https://images.viblo.asia/7381118b-79f8-49ca-9853-3edc5bed551e.png)

Chúng ta có thể tăng sức chứa của slice bằng cách sử dụng chức năng *append* hoặc *copy*. *Append* sẽ thêm giá trị vào cuối slice và sẽ tăng sức chứa của slice nếu cần

```golang
numbers = append(numbers, 1, 2, 3, 4)
```

Một cách khác nữa để gia tăng sức chứa của slice là sử dụng chức năng *copy*. Sử dụng *copy* sẽ tạo ra một slice mới với sức chứa lớn hơn slice cũ và sao chép toàn bộ phần tử của slice gốc

```golang
// create a new slice
number2 := make([]int, 15)
// copy the original slice to new slice
copy(number2, number)
```

Chúng ta cũng có thể tạo một slice con của một slice. Ví dụ:

```golang
// initialize a slice with 4 len and values
var number2 = []int{1, 2, 3, 4}
fmt.Println(number2) // => [1, 2, 3, 4]

// create sub slices
slice1 := number2[2:]
fmt.Println(slice1) // => [3, 4]

slice2 := number2[:3]
fmt.Println(slice2) // => [1, 2, 3]

slice3 := number2[1:4]
fmt.Println(slice3) // => [2, 3, 4]

slice4 := number2[2:4]
fmt.Println(slice4) // => [3, 4]

slice5 := number2[number2[0]:number2[len(number2)-1]]
fmt.Println(slice5) // => [2, 3, 4]     
```

Đến đây là kết thúc phần 1 của bài viết, các bạn cùng chờ đón phần 2 nhé!

**Bài viết gốc:** [Learning Go - from zero to hero](https://medium.freecodecamp.org/learning-go-from-zero-to-hero-d2a3223b3d86)