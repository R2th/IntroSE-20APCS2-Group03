# Go là gì?
![](https://cdn-images-1.medium.com/max/800/1*30aoNxlSnaYrLhBT0O1lzw.png)
**Go** hay **Golang** là một ngôn ngữ lập trình, được bắt nguồn từ Google. Hiện nay ngôn ngữ lập trình này được open source và maintain bởi các kĩ sư lập trình của Google. Ban đầu, bộ compliter của Go được viết bằng ngôn ngữ C nhưng sau nhiều phiên bản, bộ compiler giờ đã được viết lại hoàn chỉnh bằng chính Go.

# Những đặc điểm chính của Go
* Go là ngôn ngữ statically typed.
* Go có sẵn một bộ Garbage collection và Memory safety.
* Chuỗi kí tự trong Go đều được mặc định encode về UTF-8.
* Có cú pháp cực kì đơn giản.

# Hướng dẫn cài đặt

1. **Linux**

Bạn tải phiên bản dành cho Linux tại địa chỉ: [https://golang.org/dl/](https://golang.org/dl/). Sau đó ta sử dụng command sau để giải nén thư mục /usr/local
> sudo tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz
> 
Sau đo ta cần thêm biến */usr/local/go/bin* vào biến môi trường PATH. Bạn có thểm bằng cách sử dụng những câu lệnh này vào trong file *.bashrc*
```
$ echo "export PATH=$PATH:$(go env GOPATH)/bin" >> ~/.profile
$ source ~/.profile
``` 

2. **Mac**

Với Mac đơn giản hơn, bạn vẫn vào [https://golang.org/dl/](https://golang.org/dl/) và tải phiên bản dành cho mac và install như bình thường. 

Package này sẽ tự động cài đặt go vào thư mục */usr/local/*  và set đường dẫn */usr/local/go/bin* vào biến PATH. Nếu bạn đang để bất cứ terminal nào thì ta cần reset để biến PATH mới có hiệu lực.

3. **Windown**

Ta tải bản Windown MSI Installer từ  [https://golang.org/dl/](https://golang.org/dl/) . Ta mở installer và làm theo hướng dẫn. Mặc định, instraller sẽ cài Go tại **C:\Go**

Để kiểm tra lại xem ta đã cài đặt  đã hoàn tất chưa, ta mở terminal và gõ command như sau:

![](https://images.viblo.asia/15b327f3-7903-4e35-bd50-34aa439b5c60.png)

# GOPATH, Go workspace

Go rằng buộc chúng ta thư mục tổ chức để lưu giữ các đoạn code:
> Toàn bộ Go code và package bạn import phải nằm trong một workspace. Một workspace là một thư mục trong hệ thống mà đường dẫn là một biến môi trường tên là **GOPATH**
> 

Thư mục workspace sẽ chứa những thư mục con như sau:

* **src:** Nơi đây sẽ chứa toàn bộ source code chương trình Go.

> Trong Go, mọi chương trình đều phải nằm trong một package. Do đó, mỗi khi bạn khởi tạo một project Go mới, bạn cần tạo một thư mục trong **$GOPATH/src** và làm việc trong đó.

* **bin:** Nơi đây sẽ chứa mã nhị phân là những đoạn code Go từ src được compile.
* **pkg:** Nơi đây sẽ chứa các package mà ta sẽ import và sử dụng trong nhưng đoạn code Go trong thư mục *src*.
> Nơi đây chứa các thư file source code đã được compiled và có đuôi **.a**. Toàn bộ package này đã được tối ưu máy và Go. 
> 

> Trong Go, để import một package ta sử dụng **import "tên package"** hay **import "main/<tên package con>"**. Cú pháp này làm mình liên tưởng tới cú pháp trong ES6. Go sẽ tìm kiếm các package này trong **$GOROOT/src** hay **$GOPATH/src**. 
> 
=> Việc sử dụng các package object này giúp giảm thời gian compile cho chương trình bạn muốn chạy. Mỗi package đều là một collection các chương trình Go, đều phải chạy qua bộ compiler của Go mỗi khi chương trình chính được compile. Nếu package đã được compile và được chuyển vào thư mục pkg, nó sẽ không được compile lại.

# Chạy chương trình đầu tiên

Trước tiên, ta cần tạo một GO workspace ở địa chỉ $HOME/go.

Đầu tiên, ta cần set giá trị GOPATH:
```
$ sudo nano ~/.profile
# Thêm vào cuối file 2 dòng
export GOPATH=$HOME/go
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin
# Lưu lại và chạy
$ source ~/.profile
```

Sau đó ta vào thư mục *$HOME/go* và tạo một thư mục là *src/home*

Cuối cùng là tạo một file tên là hello.go và bắt đầu viết code:
```go
package main

import "fmt"

func main() {
	fmt.Printf("Hello, World\n")
}
```

Các đơn giản nhất để chạy một chương trình là sử dụng lệnh *go run*:
![](https://images.viblo.asia/c28e494a-ace8-4ce8-841f-019535e35695.png)

Như ví dụ trên, fmt là một package có sẵn của Go dùng để format dữ liệu I/O tương tự như bên C.

Chú ta import các package bằng từ khóa **import**, **func main()** sẽ là nơi chương trình bắt đầu thử thi. **Println** là một function nằm trong package **fmt** giúp hiển thị ra đoạn string "Hello, World".

**Ngoài ra bạn có thể build code Go của bạn thành mã nhị phân bằng câu lệnh go build**
```shell
$ cd $GOPATH/src/hello
$ go build
$ ./hello
Hello world
```

**Cài package vào thư mục bin bằng câu lệnh go install**

```shell
$ cd $GOPATH/src/hello
$ go install
$ cd $GOPATH/bin
$ ./hello
Hello world
```

# Go Package
![](https://miro.medium.com/max/700/1*16AcelCn5LA1lL7TJPslTw.png)
Ta có coi một package là một gói các đoạn code, giúp bạn tổ chức chương trình của bạn. Nó giúp bạn có thể gói một hoặc nhiều file  source code vào một file duy nhất và có thể sử dụng lại

Bạn có thể coi một package trong Go như một namespaces trong các ngôn ngữ khác. Điểm duy nhất khác biệt là sẽ không có các Package con, và các package sẽ nhỏ và nhiều.

*  Tất cả source code đều phải nằm trong một package

>Chương trình của Go được cấu tạo bởi một hoặc nhiều package.
>
* Single concept

> Ta chỉ bỏ nhưng đoạn code liên quan vào trong package và phải đặt tên pacakge theo đúng chuẩn. Bạn có thể đọc guide cách đặt tên package tại đây [https://blog.golang.org/package-names](https://blog.golang.org/package-names).
> 

* Có thể chưa không hoặc nhiều function và state

> Package trong go có thể chỉ cần chứa duy nhất một function như tỉnh tổng 2 số. Package không nhất thiết phải to như các ngôn ngữ khác.
> 
* Tái sử dụng
> Ta có thể export function và data tử một pacakge khác.
> 
* Import duy nhất một lần

> Bạn có thể import một package trong nhiều package khác, và nó sẽ chỉ được import duy nhất một lần mà thôi.
> 


# Comments trong Go

Nếu bạn là một người đã có kinh nghiệm lập trình JavaScript hay C++, Go sử dụng cú pháp tương tự. Để comment một dòng, bạn sử dụng //comment, và cho nhiều dòng thì ta sử dụng /* comment */

```go
// Commet một dòng

/*
    Comment nhiều dòng
*/
```
# Dấu ngoặc đơn

Nhìn vào đoạn code bên trên, bạn có thể nhận ra rằng Golang không có ngoặc đơn, khác hoàn toàn so với các ngôn ngữ khác như C, C++, JavaScript.

Go vẫn sử dụng dấu ngoặc đơn để cắt các câu lệnh giống C, nhưng có một điểm khác là các dấu ngoặc đơn này sẽ không xuất hiện trong source code. Thay vào đó, Lexer trong Go sẽ tự động thêm các dấu ngoặc đơn vào các câu lệnh trước khi chương trình để complite.
Nơi bạn có thể bắt gặp dấu ngoặc đơn thường xuyên là trong vòng lặp for thi các câu lệnh phải được ngăn cách và câu lệch switch-case.

**Vòng lặp for**
```go
package main

import "fmt"

func main() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum)
}

```
# Tổng kết
Đây là bài đầu tiên trong series học Golang của mình. Mình sẽ tiếp tục cập nhật ở những bài tới. Nếu có bất cứ vấn đề gì, vui lòng comment vào phía bên dưới :clap: