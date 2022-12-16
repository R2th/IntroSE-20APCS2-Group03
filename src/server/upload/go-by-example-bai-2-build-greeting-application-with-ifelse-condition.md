## Giới thiệu
Chào các bạn tới với series về Golang, ở [bài trước](https://viblo.asia/p/go-by-example-bai-1-introducing-go-bWrZnAWrKxw) chúng ta đã tìm hiểu cơ bản về Go. Từ bài này chúng ta sẽ bắt đầu tìm hiểu về những cú pháp đơn giản trong Golang. Ở trong bài hôm nay thì chúng ta sẽ hiểu về về cách khai báo biến và cách sử dụng cú pháp if/else của Go thông qua một ví dụ đơn giản là code ứng dụng "Greeting".

![image.png](https://images.viblo.asia/43f8f51d-924b-44f2-81cc-6c0c81691a8c.png)

Ta sẽ code một ứng dụng và build nó ra binary file, và khi ta gọi nó ta sẽ truyền vào một biến flag là `lang` với giá trị của `lang` là một trong ba ngôn ngữ en, korean, china. Sau đó nó sẽ in ra câu chào của ngôn ngữ ứng với giá trị ta truyền vào. Ví dụ:

```
$ ./greeting -lang=en

Hello
```

```
$ ./greeting -lang=korean

안녕, 친구
```

```
$ ./greeting -lang=china

你好朋友
```

Oke, bây giờ ta bắt đầu code nào.

## Implement greeting application
Ta tạo một file tên là `main.go`.

```main.go
package main

func main() {

}
```

Trong file trên ta sẽ hai điểm cần lưu ý là cú pháp `package main` và `func main() {}`. 

Đầu tiên là `package main`, ta sẽ thêm cú pháp này ở tất cả các file mà ta cần build thành execute binary file, khi ta chạy câu lệnh `go build` thì câu lệnh này nó sẽ kiếm tất cả các file mà có `package main` để build thành binary file.

Tiếp theo là `func main() {}`, đây là entry point của một ứng dụng mà viết bằng Go, những đoạn code ở `func main()` sẽ được thực thi đầu tiên, ta cần phải khai báo func main ở trong file có package main, nếu không thì ứng dụng của ta sẽ không được thực thi.

Oke ta chỉ nói qua đơn giản vậy thôi, bây giờ ta sẽ tiếp tục code ứng dụng, để có thể in ra được câu greeting của ngôn ngữ tương ứng, ta phải có chỗ để lưu những giá trị đó. Thì để lưu những giá trị như vậy ta sẽ phải dùng **variable**.

## Declare variable
Ta cần phải khai báo ba biến để lưu giá trị của ba câu greeting, trong Golang ta có ba cách khai báo biến như sau.

```
1. var <name> <type>
2. var <name> = <value>
3. <name> := <value>
```

Ví dụ.

```go
var one int
one = 1
```

```go
var one = 1
```

```go
one := 1
```

Cách khai báo thứ 2 và 3 ta nên dùng ở trong một function, còn cách khai báo thứ nhất ta thường dùng để khai báo biến global cho toàn bộ code. Với cách khai báo thứ 2 và 3 thì biến của ta sẽ tự động được gán kiểu dữ liệu của giá trị, còn cách thứ nhất thì ta phải tự động khai báo kiểu dữ liệu.

Như các ngôn ngữ khác thì Go cũng sẽ có một vài kiểu dữ liệu đơn giản là: strings, integers, floats, booleans, ... Ta sẽ nói về kiểu dữ liệu ở các bài sau.

Oke, quay lại ứng dụng greeting, ta khai báo ba biến như sau  (ta sử dụng thử cả ba cách khai báo nhé 😁).

```main.go
package main

var koreanGreeting string

func main() {
	koreanGreeting = "안녕, 친구"
	var enGreeting = "Hello"
	chinaGreeting := "你好朋友"
}
```

Và để đọc được flag của user truyền vào khi thực thi file, ta cần phải sử dụng một package gọi là flag, bây giờ thì ta chưa cần hiểu về package.

```main.go
package main

import (
	"flag"
)

var koreanGreeting string

func main() {
	lang := flag.String("lang", "en", "greeting language")
	flag.Parse()

	koreanGreeting = "안녕, 친구"
	var enGreeting = "Hello"
	chinaGreeting := "你好朋友"
}
```

Khúc này bạn chỉ cần hiểu là ta sẽ dùng flag package để đọc giá trị `lang` mà user truyền vào là được, ta sẽ nói về package sau. Tới đây thì ta đã có đầy đủ những thứ cần thiết để in ra được câu greeting cho user, nhưng còn một điểm là làm sao ta có thể so sánh giá trị của user truyền vào để in ra được câu greeting tương ứng? Đáp áp là ta sẽ dùng các câu lệnh condition, cụ thể là if/else statement.

## Use if/else condition
Trong Go, cú pháp của câu lệnh if/else như sau.

Cú pháp if.

```
if <condition expression> {
    // implement code
}
```

Cú pháp if/else.

```
if <condition expression> {
    // implement code
} else {
    // implement code
}
```

Cú pháp if/elseif.

```
if <condition expression> {
    // implement code
} else if <condition expression> {
    // implement code
}
```

Ví dụ.

```go
if number == 1 {
   fmt.Println("Number is 1")
}
```

```go
if number == 1 {
   fmt.Println("Number is 1")
} else {
    fmt.Println("Number is not 1")
}
```

```go
if number == 1 {
   fmt.Println("Number is 1")
} else if number == 2 {
    fmt.Println("Number is 2")
}
```

Oke, giờ ta ráp câu lệnh if/else vào code của ta như sau, ta sẽ so sánh khi giá trị `lang` là en thì ta sẽ in ra câu greeting của en, sau đó ta sẽ dùng else if để kiểm tra tiếp xem giá trị của `lang` có phải là korean hoặc china hay không.

```go
if *lang == "en" {
    fmt.Println(enGreeting)
} else if *lang == "korean" {
    fmt.Println(koreanGreeting)
} else if *lang == "china" {
    fmt.Println(chinaGreeting)
}
```

Nếu không có giá trị nào đúng, ta sẽ in ra câu là ngôn ngữ không hỗ trợ.

```go
if *lang == "en" {
    fmt.Println(enGreeting)
} else if *lang == "korean" {
    fmt.Println(koreanGreeting)
} else if *lang == "china" {
    fmt.Println(chinaGreeting)
} else {
    fmt.Println("Language is not support")
}
```

Ta cập nhật lại file `main.go` như sau.

```go
package main

import (
	"flag"
	"fmt"
)

var koreanGreeting string

func main() {
	lang := flag.String("lang", "en", "greeting language")
	flag.Parse()

	koreanGreeting = "안녕, 친구"
	var enGreeting = "Hello"
	chinaGreeting := "你好朋友"

	if *lang == "en" {
		fmt.Println(enGreeting)
	} else if *lang == "korean" {
		fmt.Println(koreanGreeting)
	} else if *lang == "china" {
		fmt.Println(chinaGreeting)
	} else {
		fmt.Println("Language is not support.")
	}
}
```

Tới đây thì ứng dụng của ta đã hoàn thành rồi, bây giờ ta build code và kiểm tra ứng dụng thôi.

```
GOOS=linux go build -o greeting
```

```
$ ./greeting -lang=china

你好朋友
```

```
$ ./greeting -lang=japan

Language is not support.
```

Vậy là mọi thứ đã hoạt động đúng 😁. Github của toàn bộ series https://github.com/hoalongnatsu/go-by-example.

## Kết luận
Vậy là ta đã tìm hiểu xong về cách khai báo biến và cách sử dụng câu lệnh if/else, như các bạn thấy thì code của Golang khá là đơn giản và dễ hiểu. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Hiện tại thì công ty bên mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và sở hữu trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java, Go). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java, Go). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.