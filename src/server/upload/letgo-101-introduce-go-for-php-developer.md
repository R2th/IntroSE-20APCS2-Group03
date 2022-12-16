# Giới thiệu
Xin chào các bạn, mình thì chủ yếu lập trình web bằng PHP thôi, nhưng dạo gần đây mình tự dưng phải học Go =)) Vâng, cái tên Go chắc hẳn cũng khá nổi tiếng rồi, thực ra mình đã muốn học từ lâu nhưng chưa bao giờ gọi là có thời gian để học nghiêm túc. Giờ cờ đã đến tay ngại gì không thử :D

![](https://images.viblo.asia/779aa562-0b37-4587-ad52-0a9c2720b2b5.png)

Go nổi tiếng là vì được thiết kế, phát triển tại Google, bởi các lập trình viên nổi tiếng Ken Thompson, Rob Pike và Robert Griesemer vào năm 2007. Và vì nó liên quan đến khá nhiều phần mềm, tool chúng ta sử dụng hàng ngày như [Docker](https://github.com/docker/docker), [Kubernetes](https://github.com/GoogleCloudPlatform/kubernetes), [Traefik Proxy](https://github.com/containous/traefik), [Drone CI](https://github.com/drone/drone), [Caddy Server](https://github.com/mholt/caddy), [Hugo](https://gohugo.io/), [Gogs Git service](https://github.com/gogs/gogs), [Influxdb](https://github.com/influxdata/influxdb)... chủ yếu là các phần mềm hệ thống, cli tool, server, infrastructure, các hệ thống backend cần hiệu năng, tốc độ xử lý cao. Có một sự thật hơi hack đó là [source code](https://github.com/golang/go) của Go cũng được viết bằng... Go?? :D

Go được ra đời với mục đích là kết hợp được sự mềm dẻo của các ngôn ngữ thông dịch, dynamic type với hiệu năng và sự an toàn của các ngôn ngữ biên dịch, static type, và tận dụng được kiến trúc CPU đa nhân trên các máy tính hiện đại để xử lý tính toán song song, đồng thời.

Go là một ngôn ngữ biên dịch như C/C++, Java,… Nhưng có 1 điểm khác biệt có thể coi là điểm mạnh của Go đó là crosss-compiling, tức là compile cho nhiều nền tảng kiến trúc hay OS khác nhau mà không cần sử dụng OS đó, ví dụ bạn code Go trên Linux nhưng có thể build ra file thực thi (static binary hay executable file) chạy được trên cả Windows và Mac, chỉ cần download về và chạy trực tiếp, không phải config, compile lại trên từng platform như C/C++ nữa. Điều này cũng thúc đẩy sự ra đời của hàng loạt các công cụ, CLI tool phục vụ cho DevOps hay System Admin. Ví dụ, khi làm web chúng ta hay có chức năng gửi email, nguyên tắc là không được dùng các hệ thống mail  thật để test vì có thể để lộ thông tin dự án, hoặc code lỗi dẫn đến spam user... nên thường phải có một mail server giả lập để gửi và nhận mail như MailCatcher nhưng vấn đề là mình làm PHP, giờ lại phải cài cả Ruby vào để chạy MailCatcher thì rắc rối quá, giải pháp thay thế đó là [MailHog](https://github.com/mailhog/MailHog), chỉ cần download từ Github về và run...

Triết lý thiết kế của Go đó là đưa ra một solution tốt nhất chứ không phải đưa ra nhiều lựa chọn, chẳng hạn sẽ chẳng có kế thừa, chẳng có toán tử điều kiện 3 ngôi (như `?:`, `??` như PHP) mà chỉ cần `if/else` là đủ, cũng không cần các chuẩn code convention PSR 1, 2 như PHP mà Go cung cấp luôn công cụ để format code và chỉ cần 1 format là đủ, cũng chẳng cần đến các chuẩn về autoloading PSR 0, 4 như PHP mà Go quy định luôn cấu trúc folder để source code...

Go cũng có nhiều framework phục vụ cho việc phát triển Web, API như PHP. Nói chung PHP làm được gì thì Go cũng làm được. Nhưng nói về Web thì vẫn chưa được phổ cập như PHP. Go có stop được ElePHPant không =))
![Really??](https://images.viblo.asia/018e5a2e-f2a6-4424-b9ef-416797f4eb5e.png)

# Bắt đầu
## Hello World
Mở bài có vẻ dài rồi, tiếp theo chúng ta sẽ đi vào làm quen với cú pháp của Go. Ở giai đoạn làm quen này, để mọi thứ đơn giản chúng ta sẽ sử dụng website Go Playground https://play.golang.org/ để thực hành luôn mà không cần phải cài cắm thêm gì cả.
Chương trình đơn giản đầu tiên nó trông như thế này và lại là Hello World?!
```go
package main

import "fmt"

func main() {
	fmt.Println("Hello Gophers' World!")
}
```

> Nếu viết bằng PHP thì sẽ là:
> ```php
> namespace Main;
>
> use Some\Library\Format;
>
> function main() {
>     Format::println("Goodbye World!!!");
> }
>
> main();
> ```
> Đây là mình chủ viết cho giống kiểu của Go, chứ thực ra chỉ cần `<?php echo "Hello Gophers' World!";` là xong à :D 
> 

Điểm khác biệt đầu tiên đó là code Go không cần dấu `;` ở mỗi dòng code. Các điểm tương tự có thể là `package` <=> `namespace`, `func` <=> `function`...

## Package

Mọi chương trình viết từ Go đều được đặt trong 1 `package` và package chính dùng để chạy là `main`. Để sử dụng các package khác thì chúng ta phải import theo tên package, ví dụ muốn in 1 đoạn text ra console thì ta dùng package `fmt` (Format?).  Các package có thể từ [Standard library](https://golang.org/pkg/) hay các thư viện ngoài hoặc tự phát triển.
Cú pháp import nhiều có thể là:
```go
import "fmt"
import "math"
```
Hoặc nhóm lại bằng cặp ngoặc đơn được gọi là *"factored" import statement*, cú pháp này được prefer hơn:
```go
package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Printf("Now you have %g problems.\n", math.Sqrt(7))
}
```

> Có thể bạn chưa biết `use` statement cũng support import theo nhóm, nhưng không được cho phép trong PSR-2 :D
> ```php
>
> use App\Services\{
>     Product,
>     Comment,
>     Order
> }
> ```

## Exported name

Một điều bạn có thể không quen đó là function `fmt.Println` thì tên function `Println` được viết hoa ở đầu. Đối với PHP thì function name convention thường là `camelCase` => `println`. 

Nhưng đối với Go, function được viết hoa ở đầu nó mang một ý nghĩa đặc biệt, đó là `Exported Name`. Ví dụ `Println` là 1 exported name từ `fmt` package, `Pi` là 1 exported name từ package `math`. Khi import package, chúng ta chỉ có thể gọi đến các exported names (function, const...) như `math.Pi`, `fmt.Println`, không thể gọi `fmt.println` hay `math.pi`.

=> Đây là một convention của Go. Có thể hiểu `exported name` gần tương đương với 1 `public` member của 1 class trong PHP.

## Khai báo biến 

Biến trong Go trước khi sử dụng phải được khai báo bằng từ khóa `var`:
```go
// Single variable, type int
var number int
var name string = "name"

// Multiple variables, same type
var c, php, java bool
var success, fail bool = true, false
```
Nếu có giá trị khởi tạo cho biến, chúng ta có thể bỏ qua việc khải báo kiểu dữ liệu, Go sẽ tự động đóan kiểu dữ liệu từ giá trị khởi tạo:
```go
var c, php, java = true, false, "no!"
```
`var` có thể khai báo biến ở level (scope) package hay function:
```go
package main

import "fmt"

var c, php, java bool

func main() {
	var number int
	fmt.Println(c, php, java, number)
}
```
Biến được khai báo mà không có giá trị khởi tạo thì sẽ được mặc định gán bằng **Zero value**:
- `0` cho các biến kiểu số
- `false` cho kiểu bool
- "" - empty string cho string

Hoặc có thể dùng toán tử `:=` để khai báo biến, nhưng toán tử này chỉ dùng được để khai báo biến trong function:
```go
package main

import "fmt"

func main() {
	var i, j int = 1, 2
	k := 3
	c, php, java := true, false, "no!"

	fmt.Println(i, j, k, c, php, java)
}
```

Các kiểu dữ liệu cơ bản là:
- `bool`
- `string`
- `int`, `int8`, `int16`, `int32`, `int64`
- `uint`, `uint8`, `uint16`, `uint32`, `uint64`, `uintptr`
- `float32`, `float64`
- `byte`
- Và có cả kiểu số phức `complex64`, `complex128`

Ép kiểu bằng biểu thức `T(v)`:
```go
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)
```
Hoặc:
```go
i := 42
f := float64(i)
u := uint(f)
```

Các biến sau khi được khai báo bằng `var` hoặc `:=`, khi muốn thay đổi giá trị của biến này chúng ta sẽ sử dụng dấu `=` để gán lại giá trị, chứ không dùng dấu `:=` được nữa.

## Constant

Constant được khai báo bằng từ khóa `const`, constant có thể là character, string, boolean, hoặc numer.
```go
package main

import "fmt"

const Pi = 3.14

func main() {
	const World = "Thế giới"
	fmt.Println("Hello", World)
	fmt.Println("Happy", Pi, "Day")

	const Truth = true
	fmt.Println("Go rules?", Truth)
}
```

## Function

Function trong Go được khai báo bắt đầu bằng từ khóa `func`, function có thể có tham số hoặc không.
```go
package main

import "fmt"

func add(x int, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(42, 13))
}
```
Ví dụ hàm `add` nhận hai tham số x, y kiểu `int` và kết quả trả về là một số kiểu `int`. Vì là ngôn ngữ dạng strongly type nên các biến, function đều phải khai báo kiểu dữ liệu. Cơ mà có chút khác biệt mà có thể chúng ta đã quen từ C, Java đó là kiểu dữ liệu đi sau tên biến, tên function.
> Đối với PHP mặc dù không bắt buộc nhưng từ PHP 7 bạn cũng có thể ràng buộc kiểu dữ liệu cho biến, function:
> ```php
> function add(int $x, int $y): int
> {
>     return $x + $y;
> }
> ```
>

Function trong Go có thể trả về nhiều giá trị, bằng cách nhóm kiểu dữ liệu trả về trong `()`:
```go
package main

import "fmt"

func swap(x, y string) (string, string) {
	return y, x
}

func main() {
	a, b := swap("hello", "world")
	fmt.Println(a, b)
}
```

# Flow control
## For
Go chỉ có một loại vòng lặp đó là `for`, không có `while` mà cũng chẳng cần `do-while`.

Cấu trúc của `for` cũng gồm 3 phần như trong PHP, ngăn cách nhau bởi dấu `;`:
- `Init statement`: được chạy trước lần lặp đầu tiên
- `Condition statement`: được thực hiện trước mỗi lần lặp
- `Post statement`: được chạy sau khi kết thúc mỗi lần lặp

Khác với PHP sau từ khóa `for` không có cặp ngoặc đơn `()` và cặp ngoặc `{}` là luôn luôn bắt buộc.

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

`Init statement` thường là khai báo và khởi tạo biến theo dạng rút gọn `:=` và biến được khỏi tạo ở đây chỉ tồn tại trong scope của `for` (khác với PHP):
```go
func main() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
    fmt.Println(i)    // ERROR here: undefined: i
	fmt.Println(sum)
}
```

Cả 3 phần là không bắt buộc, khi bỏ 2 phần `Init statement` và `Post statement`  đi chúng ta có thể bỏ luôn dấu `;` và chúng ta sẽ có một thứ tương tự như `while`, thật là biến ảo =))
```go
package main

import "fmt"

func main() {
	sum := 1
	for sum < 1000 {
		sum += sum
	}
	fmt.Println(sum)
}
```
Và khi bỏ đi cả 3 phần, chúng ta sẽ có trong tay vòng lặp vô hạn:
```go
package main

func main() {
	for {
	}
}
```

Các bạn thấy đấy, chỉ cần `for` là đủ dùng rồi, đúng theo nguyên tắc thiết kế của Go.

## If
Tương tự với `for`, thì sau điều kiện `if` cũng không cần dấu `()` và cặp ngoặc `{}` thì luôn luôn bắt buộc, đảm bảo convention luôn được thống nhất mà không phải do người khác quyết định nữa :D 
```go
package main

import (
	"fmt"
)

func main() {
    number := 1 + 1
    if number == 3 {
        fmt.Println("Good news! You will inherit millions of dollars.")
	}
}
```

`if` cũng có thể có `Init statement` trước khi kiểm tra điều kiện, và cũng giống như `for` biến được khởi tạo chỉ tồn tại cho đến khi `if` kết thúc (bao gồm cả các block `else if`, `else`):
```go
if result := rand.Intn(100); result < 10 {
    fmt.Printf("%d < 10", result)
} else if result == 10 {
    fmt.Printf("%d = 10", result)
} else {
    fmt.Printf("%d > 10", result)
}
fmt.Println(result) // undefined: result
```
> Tương đương với trong PHP chúng ta có thể viết:
>  ```php
>  if (($result = random_int(0, 1000)) < 10) {
>      //
>  }
>  ```
>  Có vẻ mấy dấu ngoặc hơi loằng ngoằng nhỉ?!
>  

Các toán tử điều kiện cũng giống như PHP: `&&`, `||`.

## Switch
Lệnh `switch` trong Go có khác biệt là không cần `break` trong mỗi case (mặc định các case tự break), do chỉ có trường hợp thỏa mãn đầu tiên được chạy (tính từ trên xuống dưới). 
Biểu thức sau `case` không cần phải là hằng số mà có thể là function call, nhưng lưu ý là kiểu dữ liệu của giá trị sau switch và giá trị sau case phải giống nhau:

```go
i := 0
switch i {
case 0:
case f():
}
```

Ở đây `f()` sẽ không được gọi nếu `i` bằng 0, và giá trị trả về của `f()` phải cùng kiểu với `i` là kiểu `int`.

Điều kiện switch có thể được lược bỏ, khi đó nó tương đương với `switch true`, đây có thể là một cách để thay cho chuỗi `if-else` dài dòng:
```go
t := time.Now()
switch {
case t.Hour() < 12:
    fmt.Println("Of course you have a purpose -- to find a purpose.")
case t.Hour() < 17:
    fmt.Println("You look tired.")
default:
    fmt.Println("You work very hard.  Don't try to think as well.")
}
```

Có thể gộp nhiều giá trị vào `case` bằng một danh sách ngăn cách bởi dấu `,`:
```go
pokemon := pokedex.GetPokemon()
switch pokemon {
case "Pikachu", "Pichu", "Raichu", "Plusle":
    return "Electric Type"
}
```
> Trong PHP, vì nếu không gọi `break` thì switch sẽ tiếp tục chạy nên có thể viết tương tự chẳng hạn:
> ```php
> $pokemon = Pokedex::getPokemon();
> switch ($pokemon) {
>     case "Pikachu":
>     case "Pichu":
>     case "Raichu":
>     case "Plusle":
>         return "Electric Type";
> }

## Defer
Trì hoãn (`defer`) là một khái niệm khá mới trong điều khiển luồng. Nó cho phép một câu lệnh được gọi ra nhưng không thực thi ngay mà hoãn lại đến khi các lệnh xung quanh trả về kết quả.  Ví dụ: 

```go
func main() {
	fmt.Print("Goodbye ")
    defer fmt.Print("World ")
    fmt.Print("Complicated ")
}
```
=> Kết quả là: `Goodbye Complicated World`

Các lệnh được gọi qua từ khóa defer sẽ được đưa vào một ngăn xếp (stack), hoạt động theo cơ chế vào sau ra trước (last-in-first-out). Lệnh nào defer sau sẽ được thực thi trước, giống như xếp 1 chồng đĩa thì chiếc đĩa sau cùng (ở trên cùng) sẽ được lấy ra trước. Ví dụ: 
```go
func main() {
    for i := 0; i < 10; i++ {
        defer fmt.Printf("%d ", i)
    }
}
```
=> Kết quả: `9 8 7 6 5 4 3 2 1 0`

> Chú ý là khi gọi lệnh defer thì giá trị của biến trong câu lệnh được xác định tại thời điểm gọi chứ không phải tại thời điểm thực thi.
> 

# Tổng kết
Trong bài này chúng ta đã đi qua phần giới thiệu về Go và học về các cú pháp khai báo biến với `var`, `:=`, các kiểu dữ liệu cơ bản `int`, `bool`, `string`, cách khai báo function `func`, các lệnh flow control `for`, `if-else`, `switch-case` và một số khái niệm mới như `package`, `Exported Name`, `defer`.

Phần tiếp theo chúng ta sẽ tìm hiểu về một số kiểu dữ liệu cao cấp hơn trong Go như `array`, `slice`, `struct` và `map`.

Cảm ơn các bạn đã theo dõi.