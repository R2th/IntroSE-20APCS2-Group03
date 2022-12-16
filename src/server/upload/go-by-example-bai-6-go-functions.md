## Giới thiệu
Chào các bạn tới với series về Golang, ở bài trước chúng ta đã tìm hiểu về [for loop](https://viblo.asia/p/go-by-example-bai-4-improve-secret-person-game-with-dowhile-and-switch-statement-aWj53xo8K6m). Ở bài này chúng ta sẽ tìm hiểu function, đây là một cú pháp cơ bản và quan trọng ở trong Go.

![image.png](https://images.viblo.asia/132aefa2-7fe4-4ef0-abd8-71386498ca34.png)

Chúng ta sẽ tìm hiểu function thông qua việc xây dựng một mini game đơn giản là running game. Game của ta như sau, ta có hai người chơi và 10 vòng đua, mỗi vòng thì mỗi người chơi sẽ chạy được một số bước nhất định, sau khi kết thúc 10 vòng số lượng bước của ai nhiều hơn thì người đó thắng.

```bash
$ ./running
Enter name for user one: tom
Enter name for user two: alex
========
Ready for round 1 ...
User tom go 9 step
User alex go 5 step
========
Ready for round 2 ...
User tom go 1 step
User alex go 1 step
========
Ready for round 3 ...
User tom go 2 step
User alex go 5 step
========
Ready for round 4 ...
User tom go 4 step
User alex go 3 step
========
Ready for round 5 ...
User tom go 2 step
User alex go 7 step
========
Ready for round 6 ...
User tom go 2 step
User alex go 3 step
========
Ready for round 7 ...
User tom go 1 step
User alex go 5 step
========
Ready for round 8 ...
User tom go 7 step
User alex go 0 step
========
Ready for round 9 ...
User tom go 0 step
User alex go 5 step
========
Ready for round 10 ...
User tom go 9 step
User alex go 0 step
========
User tom win with 37 step
```

## Build Running Game
Tạo một file tên là `main.go`, ta sẽ bắt đầu với việc cho người dùng nhập vào tên của hai người chơi.

```main.go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	var UserOneName, UserTwoName string
	fmt.Print("Enter name for user one: ")
	fmt.Scan(&UserOneName)
	fmt.Print("Enter name for user two: ")
	fmt.Scan(&UserTwoName)
}
```

Sau đó ta sẽ dùng vòng lập for để giả lập 10 vòng đua.

```main.go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	var UserOneName, UserTwoName string
	fmt.Print("Enter name for user one: ")
	fmt.Scan(&UserOneName)
	fmt.Print("Enter name for user two: ")
	fmt.Scan(&UserTwoName)

	UserOneTotalStep, UserTwoTotalStep := 0, 0

	for round := 1; round <= 10; round++ {
		fmt.Println("========")
		fmt.Printf("Ready for round %d ...\n", round)
	}
}
```

Trong mỗi vòng đua ta sẽ random số bước cho người chơi.

```main.go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	var UserOneName, UserTwoName string
	fmt.Print("Enter name for user one: ")
	fmt.Scan(&UserOneName)
	fmt.Print("Enter name for user two: ")
	fmt.Scan(&UserTwoName)

	UserOneTotalStep, UserTwoTotalStep := 0, 0

	for round := 1; round <= 10; round++ {
		fmt.Println("========")
		fmt.Printf("Ready for round %d ...\n", round)

		source := rand.NewSource(time.Now().UnixNano())
		r := rand.New(source)
		step := r.Intn(10)
		fmt.Printf("User %s go %d step\n", UserOneName, step)
		UserOneTotalStep += step

        source = rand.NewSource(time.Now().UnixNano())
		r = rand.New(source)
		step = r.Intn(10)
		fmt.Printf("User %s go %d step\n", UserTwoName, step)
		UserTwoTotalStep += step

		time.Sleep(500 * time.Millisecond)
	}
}
```

Cuối cùng ta sẽ kiểm tra số bước của người chơi nào lớn hơn thì người đó sẽ thắng.

```main.go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	var UserOneName, UserTwoName string
	fmt.Print("Enter name for user one: ")
	fmt.Scan(&UserOneName)
	fmt.Print("Enter name for user two: ")
	fmt.Scan(&UserTwoName)

	UserOneTotalStep, UserTwoTotalStep := 0, 0

	for round := 1; round <= 10; round++ {
		fmt.Println("========")
		fmt.Printf("Ready for round %d ...\n", round)

		source := rand.NewSource(time.Now().UnixNano())
		r := rand.New(source)
		step := r.Intn(10)
		fmt.Printf("User %s go %d step\n", UserOneName, step)
		UserOneTotalStep += step

        source = rand.NewSource(time.Now().UnixNano())
		r = rand.New(source)
		step = r.Intn(10)
		fmt.Printf("User %s go %d step\n", UserTwoName, step)
		UserTwoTotalStep += step

		time.Sleep(500 * time.Millisecond)
	}

	if UserOneTotalStep > UserTwoTotalStep {
		fmt.Printf("User %s win with %d step\n", UserOneName, UserOneTotalStep)
	} else {
		fmt.Printf("User %s win with %d step\n", UserTwoName, UserTwoTotalStep)
	}
}
```

Code của ta cũng đơn giản, giờ ta sẽ xem với code ở trên thì function sẽ giúp được gì.

## Go Functions
Trong đoạn code trên bạn sẽ thấy có đoạn code nó lập lại là.

```go
source := rand.NewSource(time.Now().UnixNano())
r := rand.New(source)
step := r.Intn(10)
fmt.Printf("User %s go %d step\n", UserOneName, step)
UserOneTotalStep += step
```

Tuy không có gì sai cả nhưng việc lập một đoạn code giống nhau như vậy sẽ khiến code của ta trông dài hơn và khó kiểm soát hơn về sau nếu ta nâng số người chơi lên là 3 hoặc 4. Do đó trong lập trình, những đoạn code có logic giống nhau và cần sử dụng lại nhiều lần ta có thể định nghĩa nó ở một chỗ, và lôi ra nó sử dụng lại. Ta sẽ sử dụng function để làm việc này.

Function là một cú pháp cho phép ta định nghĩa một đoạn logic nhỏ ở một chỗ, và những lần sau nếu muốn sử dụng lại logic đó ta chỉ cần gọi function là được. Cú pháp khai báo function trong Go.

```go
func <function-name>(param 1, param 2, ..., param n) <return-type> {
    // code
}
```

Ta có 4 phần khi khai báo một function là:
+ `func` keywork.
+ `<function-name>` tên của function.
+ `(param 1, param 2, ..., param n)` định nghĩa các biến ta sẽ truyền vào function.
+ `<return-type>` kiểu dữ liệu của giá trị mà hàm sẽ trả về.

Trong đó chỉ có `func` keywork và `<function-name>` là bắt buộc phải có khi khai báo function.

Ví dụ của function.

```go
func greet() {
    fmt.Println("Good Morning")
}
```

### Function Call
Và để gọi function thì ta sẽ dùng tên của function và theo sau nó là hai dấu `()`. Ví dụ ta sẽ khai báo và gọi function như sau.

```go
package main 
import "fmt"

// function to add two numbers
func addNumbers() {
  n1 := 1
  n2 := 2

  sum := n1 + n2
  fmt.Println("Sum: ", sum)
}

func main() {
  // function call
  addNumbers()
}
```

Ở ví dụ trên ta tạo một function tên là `addNumbers`, ở trong function là định nghĩa hai biến và ta cộng nó lại sau đó ta in ra. Để gọi function này thì ở trong `main()` ta gọi nó cộng với hai dấu `()` như sau `addNumbers()`. Dưới đây là minh họa cách nó hoạt động.

![image.png](https://images.viblo.asia/c98f4e75-45e6-4060-a3d3-ec614fdc5d0a.png)
*<div align="center">Image from [Programiz](https://www.programiz.com/golang/function)</div>*

### Function Parameters
Với function addNumbers ở trên thì ta gán cứng hai giá trị cho nó, việc này dẫn tới function của ta không được linh hoạt lắm, lúc nào ta gọi thì nó cũng chỉ in ra một số. Do đó để function của ta trở nên linh hoạt hơn thì thay vì định nghĩa biến trong function thì ta sẽ truyền nó qua biến được truyền hàm (được gọi là parameters).

Ví dụ.

```go
package main 
import "fmt"

// function to add two numbers
func addNumbers(n1 int, n2 int) {
  sum := n1 + n2
  fmt.Println("Sum: ", sum)
}

func main() {
  // function call
  addNumbers(5, 6)
}
```

Ở trên ta sẽ định nghĩa hai biến n1 và n2 ở trong dấu `()` khi khai báo function, và khi ta gọi function là sẽ truyền hai này vào với giá trị ta muốn `addNumbers(5, 6)`. Minh họa cách hoạt động.

![image.png](https://images.viblo.asia/f0a78972-371f-4058-b90d-d29c4dea3c5a.png)
*<div align="center">Image from [Programiz](https://www.programiz.com/golang/function)</div>*

### Return Type
Nếu ta muốn function trả về giá trị thì ta sẽ cần khai báo thêm kiểu dữ liệu của giá trị mà function muốn trả về, sau đó ở trong function ta sẽ dùng `return` keywork để trả về giá trị.

Ví dụ.

```go
package main 
import "fmt"

// function to add two numbers
func addNumbers(n1 int, n2 int) int {
  return n1 + n2
}

func main() {
  // function call
  sum := addNumbers(5, 6)
  fmt.Println("Sum: ", sum)
}
```

Ở trên ta sẽ dùng `return` để trả về giá trị cộng lại của hai biến `n1 + n2`. Minh họa cách hoạt động.

![image.png](https://images.viblo.asia/262c229c-50f4-4682-99e5-af61f5acce8c.png)
*<div align="center">Image from [Programiz](https://www.programiz.com/golang/function)</div>*

Ta cũng có thể return về nhiều giá trị trong cùng một function. Ví dụ.

```go
package main
import "fmt"

// function definition
func calculate(n1 int, n2 int) (int, int) {
  sum := n1 + n2
  difference := n1 - n2

  // return two values
  return sum, difference
}

func main() {
  // function call
  sum, difference := calculate(21, 13)
  fmt.Println("Sum: ", sum, "Difference: ", difference)
}
```

**Lưu ý nếu ta đã định nghĩa kiểu dữ liệu của giá trị trả về thì ta phải return đúng kiểu dữ liệu đó, nếu không Go sẽ báo lỗi.**

## Apply to Multiplication Table
Oke, đó là những thứ cơ bản về function mà ta cần biết, giờ ta sẽ áp dụng nó vào trong code của running game, ta sẽ đưa đoạn code.

```go
source := rand.NewSource(time.Now().UnixNano())
r := rand.New(source)
step := r.Intn(10)
fmt.Printf("User %s go %d step\n", UserOneName, step)
UserOneTotalStep += step
```

Vào trong function. Sửa lại file `main.go`.

```main.go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	var UserOneName, UserTwoName string
	fmt.Print("Enter name for user one: ")
	fmt.Scan(&UserOneName)
	fmt.Print("Enter name for user two: ")
	fmt.Scan(&UserTwoName)

	UserOneTotalStep, UserTwoTotalStep := 0, 0

	for round := 1; round <= 10; round++ {
		fmt.Println("========")
		fmt.Printf("Ready for round %d ...\n", round)

		UserOneTotalStep += UserGoToStep(UserOneName)
		UserTwoTotalStep += UserGoToStep(UserTwoName)

		time.Sleep(500 * time.Millisecond)
	}

	fmt.Println("========")
	if UserOneTotalStep > UserTwoTotalStep {
		fmt.Printf("User %s win with %d step\n", UserOneName, UserOneTotalStep)
	} else {
		fmt.Printf("User %s win with %d step\n", UserTwoName, UserTwoTotalStep)
	}
}

func UserGoToStep(user string) int {
	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)

	step := r.Intn(10)
	fmt.Printf("User %s go %d step\n", user, step)

	return step
}
```

Kiểm tra chương trình thử nào.

```
$ go run main.go
Enter name for user one: Aurora     
Enter name for user two: Goship
========
Ready for round 1 ...
User Aurora go 5 step
User Goship go 8 step
========
Ready for round 2 ...
User Aurora go 9 step
User Goship go 5 step
========
Ready for round 3 ...
User Aurora go 8 step
User Goship go 4 step
========
Ready for round 4 ...
User Aurora go 6 step
User Goship go 9 step
========
Ready for round 5 ...
User Aurora go 3 step
User Goship go 3 step
========
Ready for round 6 ...
User Aurora go 7 step
User Goship go 2 step
========
Ready for round 7 ...
User Aurora go 1 step
User Goship go 6 step
========
Ready for round 8 ...
User Aurora go 1 step
User Goship go 2 step
========
Ready for round 9 ...
User Aurora go 2 step
User Goship go 6 step
========
Ready for round 10 ...
User Aurora go 3 step
User Goship go 3 step
========
User Goship win with 48 step
```

Oke, chường trình ta đã chạy đúng 😁.

## Kết luận
Vậy là ta đã tìm hiểu xong về function, các bạn cần nằm về cách khai báo function, cách định nghĩa parameters, return type và cách gọi function. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

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