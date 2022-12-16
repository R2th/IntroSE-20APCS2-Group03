# Giới thiệu về Go Lang
Trước khi bước chân của tôi vào viết một bài này, tôi là một người lập trình viên Ruby, thực ra tôi rất thích Ruby. Nhưng một năm trước đây, tôi đã gặp một dự án thực sự là cần về performance về backend (API). Lúc đó tôi cùng đã lựa chọn ruby, nhưng sau khi một thời gian 2 tháng, mình cùng đã gặp một bạn của mình cùng đã nói chuyện về nhau về ngôn ngữ lập trình, lúc đó bạn của mình đã đưa một phương án đó là thay đổi ngôn ngữ lập trình để tặng tóc hệ thống đó [GO Lang](https://golang.org/).
![](https://images.viblo.asia/2da1b781-a372-497f-a4f4-aa40147d1b51.png)
# Go Lang là gì ?
Go Lang là một mã nguồn mở được sáng tạo ra từ lập trình viên của Google (Robert Griesemer, Rob Pike, và Ken Thompso) trong năm 2009. Đối với GO các bạn có thể tạo một application thật là đơn giản, nhanh chóng và đáng tin cậy. Đối với Go Lang là một ngồn ngữ thật mạnh và chạy tốt hơn do với Ruby. Người ta thường sử dụng Go cho backend application hoặc Hệ thông API nâng cao. Năm 2019 sắp tới, Go sẽ phát triển GO Module càng dễ hơn đối với  kết nội GOPATH module cho những chỗ khác trong một hệ thông cái đặt, có nghĩa là trước đây, nếu bạn muốn tạo một dự án sử dụng GO, thì bạn phải tạo vào thử mục GOPATH (place you path bin go), nhưng sau này 2019 thì bạn có thể tạo những chỗ nào cùng đc, cái đó đối Go được gọi là [Go Modules](https://blog.golang.org/modules2019) (Support GO 1.11 hoặc version mới hơn).

# Cách cái đặt Go
Mình xin giời thiệu một cái đơn giản nhất cho việc cái đặt GO Lang trong hệ thông. Vào trang web [https://golang.org/dl/](https://golang.org/dl/) chọn download version GO mà bạn muốn tài về. Trong bài viết này mình sẽ lựa chọn ```go1.11.4.linux-amd64.tar.gz```.  sau khi bạn đã tài về xong 100%. bạn cần phải trích xuất file ```tar.gz``` cho vào thử mục ```/usr/local``` bằng câu lệnh sau 
```
$ tar -C /usr/local -xzf go1.11.4.linux-amd64.tar.gz
```
sau khi trích xuất file cho vào mục trên rồi, bạn cần phải add môi trường cho ```GO``` bằng cách vào file ```~/.zshrc``` hoặc ```~/.bash_profile```
```
export GOPATH=$HOME/go
export PATH=$PATH:/usr/local/go/bin
```
sau đó bạn phải chạy reload lại file môi trường của bạn: 
```
$ source ~/.zshrc
hoặc
$ source ~/.bash_profile
```
bạn có thể chạy lại xem thử để biết rằng ```GO Lang``` của bạn đã cái đặt xong hay chưa:
```
$ go version
go version go1.11.4 linux/amd64
```
# Hello với GO
Sau khi bạn đã kiểm trả xong ```Go``` của bạn đã cái đặt hay chưa !!. Mình sẽ tạo một dự án hello.go trong một thử mục khác (bạn có thể tạo thử mục nào cùng được theo ý của bạn).
```
$ mkdir go_project && cd "$_"
$ mkdir hello && cd "$_"
```
chung ta sẽ tạo một file đặt tên là ```hello.go``` bằng câu lệnh ```touch hello.go``` và trong file đây chung ta sẽ viết code đơn giản như sau:
```
package main

import "fmt"

func main() {
	fmt.Printf("Hello Go")
}
```
sau khi viết code xong như trên, để chạy lại thử kết quả của file ```hello.go``` bạn phải chạy câu lệnh sau này:
```
$ go run hello.go
Hello Go
```
Tuy nhiên bạn có thể build một application của bạn bằng câu lệnh đưới này, sau khi chạy câu lệnh dưới này, ```Go``` sẽ tạo cho bạn nhưng file ```*.go``` trong thử mục mà bạn đang ở trở thành những file (executable) bằng tên cùng file ```*.go``` sau đó bạn có thể chạy theo cách dưới thực hiện file Go của bạn vừa build xong.
```
$ go build
$ ./hello
Hello Go
```

# Nền tảng của Go Lang
Trong phần  này  mình sẽ giờ thiệu các bạn về nền tảng của Go Lang, Go không khác làm đối với nền tảng của đó do với ngôn ngữ lập trình khác cùng bao gồm

 - Cách định nghĩa biến
 - Cách định nghĩa Constants
 - Cách định nghĩa loại tiểu học (Elementary types)
 - Cách định nghĩa nhóm biến
 - . . .
 ## Cách định nghĩa biến
 
 có rất nhiều cách định nghĩa biến trong GO, nhưng đối với một cách đơn giản nhất của cách định nghĩa đó là dùng từ khóa ```var```:
 ```
 var varibleName type
 var vname1, vname2, vname3 type
 var varibleName type = value
 ```
 nhưng đối với conversion đối với cách đinh nghĩa biến cả 3 trên nếu bạn muốn định nghĩa một biến và gắn value cho nó thì bạn phải viết như sau:
 ```
 var a string = "a"  // bad
 
 a := "a" // good
 ```
 ```:=```  sẽ thay thế với  ```var``` và ```type``` được gọi là cách định nghĩa ngằn. Trong Go sử dụng ```_```(blank) để định nghĩa cho một biến mà bạn không muốn dùng tới, (trong ruby, python cùng như vậy)
 ```
 _, a: = 2, 3
 ```
 
 ## Cách định nghĩa Constants
 Trước mặt chung ta phải biết là Constant là gì ? Constant là một biến được định nghĩa value mà không thể thay đổi được trong qua trình Compile, bạn không thể thay đổi value của constants được và cách viết constants như sau:
 ```
 const constantName = Value
 
 const PI float32 = 3.14
 ```
 
 ## Cách định nghĩa loại tiểu học (Elementary types)
 ### Boolean
 Trong Go, chung ta ```bool``` để định nghĩa biến boolean, với giá trị của biến là ```true``` hoặc ```false```. Đối với mặc định sẽ lấy giá trị là ```false``` . ***Bạn không thể biển đổi một loại tiểu học giữa Number và Boolean !***
 ```
 var isActive bool
  enable, disable := true, false
 ```
 ### Numberical
 Trong Go, đối với kiểu dữ liệu ```integer``` được bao gồm là ```signed``` và ```unsigned integer```. Go cùng có ```int``` và ```unit``` cùng một thời gian và có độ dài như nhau, nhưng 2 cái đó (int, unit) sẽ phụ thuộc vào hê thông của bạn,  bên cái đó GO dùng 32-bit và 64-bit trong hệ thông để tạo ra những kiểu dữ liệu bao gồm là ``` rune, int8, int16, int32, int64, byte, uint8, unit16, unit32, unit64```. ***```rune``` là một những họ hàng của ```int32``` và ```byte``` là họ hàng của ```unit8```***. và bạn không thể tính toàn 2  hoặc nhiều giá trị khác, vì nó sẽ bị lỗi trong khi compile.
 ```
 var a int8
 
 var b int32
 a = 1
 b = 2
 c := a + b // error 
 ```
 lý do lỗi do, ```int32``` có độ dài hơn ```int8```
 
 Đối với GO chỉ có kiểu dữ liệu ```float32``` và ```float64``` , nhưng không có ```float```, nhưng có một cách đơn giản để gắn giá trị đó là dùng cách ```brief statement```.

Một cái thật là bất ngỡ đối với ngô ngữ GO đó là chung ta có thể định nghĩa kiểu dữ liệu ```complex number``` ([Complex number
](https://en.wikipedia.org/wiki/Complex_number)) , được gọi là ```complex128``` (tạo ra từ 64-bit thật và 64-bit ảo), nếu bạn thích dùng kiểu dữ liệu complex nhỏ hơn thì bạn có thể lựa chọn ```complex64```(tạo ra từ 32-bit thật và 32-bit ảo) và được viết giống phép toàn học complex như sau: 
```
RE+IMi
```
- ```RE``` là phần thật (real part)
- ```IM``` là phần ảo (imaginary part)
- ```i``` là một chữ ảo (imaginary number)
Vi du:
```
var ao complex64 = 1+1i
```
### String
Go dùng ```UTF-8``` để định nghĩa kiểu dữ liệu string, và được viết trong ```""``` hoặc ```''```.
```
var myName string
var emptyAdrress string = ""
no, yes, maybe := "no", "yes", "maybe"
```
***bạn không thể thay đổi được string bằng cách dùng index của string đó***
```
name := "me"
name[0] = 'N' // first index của string là "me"
fmt.printf(name)
=> me
```
***bạn có thể thay đổi string bằng cách dùng byte của string đó được***
```
name := "me"
changeName = []byte(name)
changeName[0] = 'N'
name := string(changeName)
fmt.Printf(name)
=> Ne
```
## Cách định nghĩa nhóm biến
Go hộ trỡ chung ta có thể định nghĩa một nhóm biến cùng một kiểu dữ liễu được, với một cách đơn giản như sau:
```
var a int
var b float32
var c string

var (
    a int
    b float32
    c string
)
```
## Rule định nghĩa biến
 Bởi vì Go là một ngồn ngữ định nghĩa biến ngắn gọn cho nền có những rule cần phải chú ý lúc chung ta nghĩa định biến trong Go:
 
 - Bất kỳ biến nào được bắt đâu từ ```chữ hoa (capital letter)```, nó có nghĩa là ```exported``` hoặc ```private```, hoặc ```riêng tư```.
 - Tất cả cách định nghĩa hàm (function) và constants  là giống nhau, không có ```public``` hoặc ```private``` trong ngồn ngữ Go.
# Kết luận
Trong phần giờ thiệu trên mình chỉ mới đưa cho các bạn những cơ bản vè cách định nghĩa kiểu dữ liệu trong Go, tuy nhiên trong bài này không thể chi tiết hết theo từng phần đó, nhưng đó cùng là một cái bắt đầu đối với một số bạn chưa từng bao giờ viết code bằng GO, Với phần tiếp theo, Mình sẽ đưa cho các bạn những phần thật là hợp dẫn trong GO (function, struct, array, map, condition).

# Tài liệu:
- [The Go Programming Language Specification
](https://golang.org/ref/spec)
- [How to install go](https://golang.org/doc/install)