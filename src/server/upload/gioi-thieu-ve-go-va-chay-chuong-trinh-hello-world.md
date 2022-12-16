## 1. Nguồn gốc của ngôn ngữ Go
Ngôn ngữ Go ban đầu được thiết kế và phát triển bởi một nhóm kĩ sư Google bao gồm Robert Griesemer, Ken Thompson và Rob Pike vào năm 2007. Mục đích của việc thiết kế ngôn ngữ mới bắt nguồn từ một số phản hồi về tính chất phức tạp của C++11 và nhu cầu thiết kế lại ngôn ngữ C trong môi trường network và multi-core.

Vào giữa năm 2008, hầu hết các tính năng được thiết kế trong ngôn ngữ được hoàn thành, họ bắt đầu hiện thực trình biên dịch (compiler) và Go runtime với Russ Cox là nhà phát triển chính. Trước năm 2010, ngôn ngữ Go dần dần được hoàn thiện. Vào tháng 9 cùng năm, ngôn ngữ Go chính thức được công bố dưới dạng Open source.

Ngôn ngữ Go thường được mô tả là "Ngôn ngữ tựa C" hoặc là "Ngôn ngữ C của thế kỉ 21". Từ nhiều khía cạnh, ngôn ngữ Go thừa hưởng những ý tưởng từ ngôn ngữ C, như là cú pháp, cấu trúc điều khiển, kiểu dữ liệu cơ bản, thủ tục gọi, trả về, con trỏ, v,v.., hoàn toàn kế thừa và phát triển ngôn ngữ C, hình bên dưới mô tả sự liên quan của ngôn ngữ Go với các ngôn ngữ khác.
![](https://images.viblo.asia/ad1db065-2e14-4773-8812-9fd65b8ffe15.png)
Phía bên trái sơ đồ thể hiện tính chất concurrency của ngôn ngữ Go được phát triển từ học thuyết CSP công bố bởi Tony Hoare vào năm 1978. Học thuyết CSP dần dần được tinh chế và được ứng dụng thực tế trong một số ngôn ngữ lập trình như là Squeak/NewSqueak và Alef, cuối cùng là Go.

Chính giữa sơ đồ cho thấy tính chất hướng đối tượng và đóng gói của Go được kế thừa từ Pascal và những ngôn ngữ liên quan khác dẫn xuất từ chúng. Những từ khóa package, import đến từ ngôn ngữ Modula-2. Cú pháp hỗ trợ tính hướng đối tượng đến từ ngôn ngữ Oberon, ngôn ngữ Go được phát triển có thêm những tính chất đặc trưng như là implicit interface để chúng hỗ trợ mô hình duck typing.

Phía bên phải sơ đồ cho thấy ngôn ngữ Go kế thừa và cải tiến từ C, Cũng như C, Go là ngôn ngữ lập trình cấp thấp, nó cũng hỗ trợ con trỏ (pointer) nhưng ít nguy hiểm hơn C.
```
"Go is the result of C programmers designing a new programming language, and Rust is the result of C++ programmers designing a new programming language"
```
Một vài những tính năng khác của ngôn ngữ Go đến từ một số ngôn ngữ khác:
- Cú pháp iota được mượn từ ngôn ngữ APL.
- Những đặc điểm như là lexical scope và nested functions đến từ Scheme.
- Go hỗ trợ slice để truy cập phần tử nhanh và có thể tự động tăng giảm kích thước.
- Mệnh đề defer trong Go.
## 2. Hello World
Việc đầu tiên là cài đặt chương trình Go lang theo hướng dẫn trên trang chủ golang.org.

Để bắt đầu, chương trình đầu tiên thường in ra dòng chữ "Hello World", đoạn code bên dưới là chương trình này.
```
// package main chứa điểm thực thi đầu tiên của toàn chương trình
package main

// import gói thư viện "fmt" hỗ trợ in ra màn hình
import "fmt"

// main là hàm đầu tiên được chạy
func main() {

    // in ra dòng chữ "Hello World"
    fmt.Println("Hello World")
}
```
Lưu file trên thành `hello.go` và chạy bằng lệnh sau.
```
$ go run hello.go
Hello World
// hoặc có thể biên dịch ra file thực thi
$ go build
$ ./hello
Hello World
```