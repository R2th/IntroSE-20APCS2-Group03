Series Golang:
* [[Series Golang]1: Golang là gì? Tại sao nên dùng golang?](https://viblo.asia/p/series-golang1-golang-la-gi-tai-sao-nen-dung-golang-Eb85ozM2l2G)
* [[Series Golang]2: Vượt chướng ngại vật - Golang](https://viblo.asia/p/series-golang2-vuot-chuong-ngai-vat-golang-eW65GBwxlDO) **<= Bạn đang ở đây**
* [[Series Golang]3: Tăng tốc - Golang - Struct, Pointer, Receiver, Interface](https://viblo.asia/p/series-golang3-tang-toc-golang-struct-pointer-receiver-interface-ORNZqp63K0n)
* [[Series Golang]4: Golang - Concurrency, Goroutines, Channels](https://viblo.asia/p/series-golang4-golang-concurrency-goroutines-channels-vyDZOBAaKwj)

Ở bài viết trước, mình chia sẽ về Golang là gì, tại sao nên dùng Golang. Nếu bạn chưa biết và chưa động lực để học về golang thì có thể đọc qua để lấy động lực nhé [[Series Golang]1: Golang là gì? Tại sao nên dùng golang?](https://viblo.asia/p/series-golang1-golang-la-gi-tai-sao-nen-dung-golang-Eb85ozM2l2G). Bây giờ chúng ta sẽ cùng tìm hiểu sâu hơn về Golang nhé.

## 1. Setup
Đầu tiên, chúng ta cần cài đặt môi trường để tập tành code. Bạn có thể cài đặt Golang theo hướng dẫn trên [trang chính thức](https://golang.org/doc/install) của Go. Hoặc bạn có thể code trực tiếp trên [Go Playground](https://play.golang.org/)

## 2. Hello world
Cũng như cách bắt đầu học với ngôn ngữ khác, chúng ta sẽ cùng bắt đầu với chương trình hello world thần thánh. 
```
package main

import (
    "fmt"
)

func main() {
    fmt.Println("Hello, playground")
}
```
Để chạy chương trình, chúng ta dùng lệnh

```
go run <ten file>
```
Ví dụ: `go run helloworld.go`

Chúng ta cũng có thể build trước khi chạy:

```
go build
./main
```

### Go CLI
Ngoài ra những câu lệnh trên, chúng ta còn có một số lệnh như:

```go build``` dùng để compile code

```go run``` dùng để compile code và thực thi ngay sau khi compile xong

```go fmt``` formats code của tất cả các file trong thư mục hiện tại

```go install``` dùng để compile code và cài đặt các package cần thiết 

```go get <url repository>``` dùng để download the raw source code của ai đó

```go test``` run test

### Lưu ý
Đối với cú pháp của Go, Go quy ước khi kết thúc một câu lệnh sẽ xuống hàng và không dùng dấu chấm phẩy. Điểm này khá giống với [Standardjs](https://standardjs.com/) của javascript. Khi bạn làm việc với các ngôn ngữ khác, tên biến thường phải đặt rõ ràng, phải biểu đạt được ý nghĩa, mong muốn của người lập trình. Nhiều trường hợp mình thấy tên biến khá dài. Tuy nhiên trong Go, người ta **thông thường** đặt tên biến là một vài kí tự viết tắt hoặc chữ cái đầu của biến mà họ muốn biểu đạt. Đây là điểm khá đặc biệt mà cá nhân mình thấy nó hơi khác so với những ngôn ngữ mình đã gặp.

## 3. Khai báo biến

Trong go có khá nhiều cách khai báo biến. Sau đây mình cùng các bạn sẽ đi qua các kiểu khai báo biến này.

### **Khai báo một biến**
Cú pháp để khai báo một biến: 
```var <tên biến> <kiểu của biến>```

Ví dụ:
 ```
 var name string
 ```
Sau khi khai báo xong, bạn có thể gán giá trị cho biến bằng cú pháp: 
```<ten biến> = <giá trị>```

Ví dụ:
```
package main

import "fmt"

func main() {
	var name string
	name = "Alice"
	fmt.Println("My name is", name)
}
```
**Lưu ý:** Khi chúng ta khai báo  biến nhưng không gán giá trị cho biến đó, nó sẽ lấy giá trị mặc định. Nếu là số sẽ là 0, nếu là string sẽ là “”, nếu boolean sẽ là `false`

### **Khai báo kiểu suy luận(inference)**
Ngoài cách khai báo ở trên, chúng ta có thể khai báo theo kiểu suy luận với cú pháp: ```var <tên biến> = giá trị``` 
Ví dụ:
```
package main

import "fmt"

func main() {
	var index = 1
	fmt.Println("Index: ", index)
}
```
Với với dụ trên, biến index sẽ suy luận kiểu của nó dựa bên phải dấu `=`. Bên phải dấu `=` là số 1 thuộc kiểu int, vậy nên biến index thuộc kiểu int.

### **Khai báo nhiều biến**
**Trường hợp khai báo nhiều biến có cùng kiểu:**

Cú pháp:

`var <danh sách tên biến cách nhau bằng dấu ,> <kiểu>`
Ví dụ:
```
var firstName, lastName string
```
**Trường hợp khai báo nhiều biến khác kiểu:**

Cú pháp:
```
var (
   <ten biến> <kiểu> // hoặc 
   <tên biến> = <giá trị>
)
```
Chúng ta sẽ sử dụng `var` sau đó là dấu ngoặc tròn, bên trong ngoặc trong là danh sách các biến được khai báo tên và kiểu hoặc tên và gía trị.
Ví dụ:
``` 
package main

import "fmt"

func main() {
	var (
        firstName string
        lastName string
    )

	firstName = "Peter"
	lastName = “Parker
	fmt.Println("My name is", firstName, lastName)
}
```

### **Khai báo nhanh**
Cú pháp: `<tên biến> := giá trị`

Ví dụ: 
```
package main

import "fmt"

func main() {
	index := 1
	fmt.Println("Index: ", index)
}

```

## 4. Map
### **Map là gì?** 

Map là một kiểu dữ liệu có sẵn do Golang cung cấp, map là tập hợp giữ key value. Value được liên kết với key, mỗi value chỉ có thể truy xuất bằng key tương ứng.

Key trong map có thể là string, number hay bất kì [kiểu nào có thể so sánh được](https://golang.org/ref/spec#Comparison_operators).

Để khởi tạo map, chúng ta dùng cú pháp:
```
make(map[<kiểu của key>]<kiểu của value>)
```
ví dụ:
```
var personAge := make(map[string]int)
```
**Lưu ý:** khi khi báo map, chúng ta cần sử dụng `make` để yêu cầu golang cấp phát vùng nhớ cho map. Nếu không sử dụng make, biến map sẽ có giá trị `nil`.
Ví dụ:
```
var personAge map[string]int // biến personAge sẽ có giá trị nil
```

Khi khai báo map, chúng ta có thể khởi tạo giá trị mặc định. Tuy nhiên với trường hợp này, chúng ta không cần dùng `make`. 
Ví dụ: 
```
var personAge := map[string]int {
 “Jack": 24,
}
```
### **Thêm một phần tử:**

Để thêm một phần tử, chúng ta dùng cú pháp tương tự ví dụ sau:
```
personAge[“Tony"] = 56
```
Mình thấy cái này khá giống với object trong javascript

### **Truy xuất một phần tử:**
Để truy xuất một phần tử, chúng ta chỉ cần dùng tên biến, theo sau là key. Cú pháp:

`<tên biến>[< key >]`

Ví dụ: 
```
fmt.Println("Age of Tony", personAge[“Tony"])
```
Nếu chúng ta truy xuất tới một phần tử không tồn tại, map vẫn trả về giá trị mặc định.
Ví dụ:
```
var personAge := map[string]int {
 “Jack": 24,
}
fmt.Println("Age of Thomas", personAge[“Thomas”])
// kết quả in ra màn hình sẽ là Age of Thomas 0
```
Vì vậy, để biết được phần tử có trong map hay không, chúng ta có thể sử dụng cú pháp sau:
```
value, ok := personAge[“Thomas”]
```
Nếu `ok` là true thì phần tử tồn tại trong map, nếu `ok` là `false` thì phần tử đó không chưa tồn tại trong map

### **Xóa một phần tử:**
Chúng ta có thể dùng cú pháp:
`delete(<tên map>, <key>)`
Câu lệnh delete không trả về giá trị gì.

### **So sánh map:**
Golang không hỗ trợ so sánh hai map. Vậy nên, nếu cần so sánh hai map, chúng ta có thể sử dụng thư viện “reflect” hoặc tự hiện thực việc so sánh các phần tử trong map

**Lưu ý:**
Map là kiểu tham chiếu, tức là biến map sẽ lưu trữ địa chỉ vùng nhớ chứa nội dung. Khi map được gán cho một biến mới, biến mới cũng sẽ lưu địa chỉ vùng nhớ chứa nội dung của map. Vậy nên khi biến map này thay đổi giá trị, biến map kia cũng ánh xạ tương ứng.

Ví dụ: 
```
var personAge := map[string]int {
 “Jack": 24,
}
newPersonAge := personAge
```
Với câu lệnh trên, Golang sẽ khởi tạo vùng nhớ có địa chỉ là 0x0001(hoặc vùng nhớ bất kì, mình chỉ ví dụ vùng nhớ có địa chỉ là 0x0001), và biến `personAge` lưu giá trị 0x0001. Khi biến `newPersonAge` được gán bằng `personAge`, nghĩa là `newPersonAge` cũng lưu giá trị 0x0001
Vì hai biến cùng trỏ đến một vùng nhớ nên sẽ lấy cùng một giá trị. Khi giá trị của map thay đổi thì các biến trỏ tới nó cũng phản ánh giống nhau


## 5. Tổng kết
Bên trên là những ghi chú, tổng hợp được trong quá trình mình tự học Golang. Mình tự học chủ yếu ở [Golang document](https://golang.org/doc/) và [golangbot.com](https://golangbot.com/learn-golang-series/) và nhiều nguồn khác. Vậy nên, nếu bạn muốn tìm đến một nguồn đầy đủ chính thống có thể vào [Golang document](https://golang.org/doc/) hoặc [golangbot.com](https://golangbot.com/learn-golang-series/). Code mẫu mình cũng tham khảo ở [golangbot.com](https://golangbot.com/learn-golang-series/)

Hi vọng những tổng hợp của mình có ích cho các bạn.

Ở phần tiếp theo mình sẽ tổng hợp về [[Series Golang]3: Tăng tốc - Golang - Struct, Pointer, Receiver, Interface](https://viblo.asia/p/series-golang3-tang-toc-golang-struct-pointer-receiver-interface-ORNZqp63K0n)


# Sau tất cả
**Sau tất cả, mình là [Ryan Cao](https://ryancao.netlify.app/about/)**, là một developer chân chính đang trên đường chém gió. Để ủng hộ mình các bạn có thể upvote bài viết này, follow [Github Caophuc799](https://github.com/Caophuc799) và đón đọc các bài viết trên [Ryan Cao blog](https://ryancao.netlify.app/) chính thức của mình để mình có thêm động lực chia sẽ những bài viết hay, ý nghĩa khác nhé