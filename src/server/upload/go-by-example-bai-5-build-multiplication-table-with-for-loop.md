## Giới thiệu
Chào các bạn tới với series về Golang, ở bài trước chúng ta đã tìm hiểu về while và do/while. Ở bài này chúng ta sẽ học về một vòng lập phổ biến nhất là for loop thông qua một ứng dụng đơn giản là in bảng cửu chương.

![image.png](https://images.viblo.asia/b468e16b-e8db-4839-a463-61ea7db035e7.png)

Cách hoạt động của ứng dụng ta như sau, khi bạn chạy chương trình nó sẽ yêu cầu ta nhập vào số trong bảng cửu chương mà ta muốn in, và maximun range mà ta muốn nó in ra.

```
$ ./multi
Enter an Integer Number: 5
Enter the range or end value: 10
5 * 1 = 5
5 * 2 = 10
5 * 3 = 15
5 * 4 = 20
5 * 5 = 25
5 * 6 = 30
5 * 7 = 35
5 * 8 = 40
5 * 9 = 45
5 * 10 = 50
```

## Implement Multiplication Table
Ta tạo một file tên là `main.go` với đoạn code đơn giản như sau.

```main.go
package main

import (
	"fmt"
)

func main() {
	var number int
	var max_range int

	fmt.Print("Enter an Integer Number: ")
	fmt.Scan(&number)
	fmt.Print("Enter the range or end value: ")
	fmt.Scan(&max_range)
}
```

Ta sẽ lấy giá trị của user nhập vào thông qua hai hàm `fmt.Scan(&number)` và `fmt.Scan(&max_range)`, sau khi lấy được hai số này thì ta sẽ sử dụng nó để in ra bảng cửu chương.

Vậy ta tin bảng cửu chương thế nào đây? Ví dụ ta sử dụng if/else để in ra bảng cửu chương nhân 5 đi.

```main.go
package main

import (
	"fmt"
)

func main() {
	var number int
	var max_range int

	fmt.Print("Enter an Integer Number: ")
	fmt.Scan(&number)
	fmt.Print("Enter the range or end value: ")
	fmt.Scan(&max_range)

	if number == 5 {
		fmt.Println("5 * 1 = 5")
		fmt.Println("5 * 2 = 10")
		fmt.Println("5 * 3 = 15")
		fmt.Println("5 * 4 = 20")
		fmt.Println("5 * 5 = 25")
		fmt.Println("5 * 6 = 30")
		fmt.Println("5 * 7 = 35")
		fmt.Println("5 * 8 = 40")
		fmt.Println("5 * 9 = 45")
		fmt.Println("5 * 10 = 50")
	}
}
```

Thì ta sẽ so sánh nếu số người dùng nhập vào là 5 thì ta sẽ in ra bảng cửu chương nhân 5, nhưng nếu dùng if như vậy thì không lẻ có bao nhiêu số ta phải ghi ra hết, code nhìn vừa dài vừa chán. Do đó trong lập trình để thực hiện một đoạn code có tính chất tương tự nhau lập đi lập lại nhiều lần, người ta sẽ dùng các vòng lập, và trong Go chỉ có duy nhất một keywork cho vòng lập, đó là `for`.

## Golang For Loop
Vòng lập for sẽ thực thi một đoạn code lập đi lập lại với một điều kiện nhất định, nếu nó đạt được điều kiện đó thì vòng lập sẽ kết thúc. Ví dụ:

```go
for i := 0; i < 10; i++ {
    fmt.Printf(i)
}
```

Ở đoạn code trên nó sẽ thực thi một đoạn code `fmt.Printf(i)` lập đi lập lại cho tới khi nào số `i` lơn hơn 10 thì kết thúc.

Trong Golang, vòng lập for sẽ có 5 dạng sau đây:
+ Basic loop.
+ While loop.
+ Do/while loop.
+ Infinite loop.
+ For-each range loop.

Với while và do/while loop chúng ta đã tìm hiểu ở [bài trước](https://viblo.asia/p/go-by-example-bai-4-improve-secret-person-game-with-dowhile-and-switch-statement-aWj53xo8K6m).

### Basic Loop
Basic loop có cú pháp như sau.

```go
for initialization; condition; update {
  statement(s)
}
```

`initialization` dùng để khởi tạo giá trị và chỉ thực thi một lần, ví dụ gán `i := 0`. Tiếp đó `condition` là điều kiện để vòng lập chạy, ví dụ `i < 10`. Cuối cùng là biểu thức `update` dùng để cập nhật lại giá trị khởi tạo ban đầu, ví dụ `i++`.

Vòng lập sẽ chạy nếu biểu thức của `condition` còn trả về true, nếu nó trả về false thì vòng lập sẽ kết thúc. Ví dụ `i < 10`, nếu giá trị của `i` còn nhỏ hơn 10 thì vòng lập cứ chạy, nếu lớn hơn 10 thì vòng lập kết thúc.

![image.png](https://images.viblo.asia/a8627e6e-f625-421b-8a29-297a80aa6f34.png)
*<div align="center">Image from [Programiz](https://www.programiz.com/golang/for-loop)</div>*

### Infinite Loop
Infinite loop là một vòng lập vô tận, cú pháp như sau.

```
for {
  statement(s)
}
```

Ví dụ.

```go
sum := 0

for {
    sum++ // repeated forever
}

fmt.Println(sum) // never reached
```

Ta thường sử dụng infinite loop để giữ chương trình luôn hoạt động.

### For-each Range Loop
Đây là cú pháp thường được sử dụng cho các biến kiểu arrays, maps, slices, channels. Cú pháp như sau.

```go
for key, value := range arrays {
    statement(key)
    statement(value)
}
```

Ta sẽ tìm hiểu về cách sử dụng của cú pháp này ở các bài sau.

## Apply to Multiplication Table
Oke, giờ ta sẽ áp dụng vòng lập vào trong chương trình của ta, thay vì ta dùng if/else thì ta có thể dùng vòng lập để in ra bảng cửu chương một cách dễ dàng.

```main.go
package main

import (
	"fmt"
)

func main() {
	var number int
	var max_range int

	fmt.Print("Enter an Integer Number: ")
	fmt.Scan(&number)
	fmt.Print("Enter the range or end value: ")
	fmt.Scan(&max_range)

	for i := 1; i <= max_range; i++ {
		fmt.Printf("%d * %d = %d\n", number, i, number*i)
	}
}
```

Ta sẽ dùng vòng lập for với điều kiện là `i <= max_range` để in ra được các giá trị trong bảng cửu chương với số mà ta muốn với giá trị từ 1 tới max_range. Chạy thử và kiểm tra nào.

```
$ go run main.go
Enter an Integer Number: 9
Enter the range or end value: 11
9 * 1 = 9
9 * 2 = 18
9 * 3 = 27
9 * 4 = 36
9 * 5 = 45
9 * 6 = 54
9 * 7 = 63
9 * 8 = 72
9 * 9 = 81
9 * 10 = 90
9 * 11 = 99
```

Ok ngon 😁, nhưng lúc này chương trình của ta chỉ chạy có một lần, mỗi lần ta muốn in bản cửu chương ta phải chạy lại chương trình nữa, việc này khá mất công. Nên ta có thể dùng infinite loop để giữ chương trình luôn chạy.

Cập nhật lại `main.go` với vòng lập vô tận.

```main.go
package main

import (
	"fmt"
)

func main() {
	var number int
	var max_range int

	for {
		fmt.Print("Enter an Integer Number: ")
		fmt.Scan(&number)
		fmt.Print("Enter the range or end value: ")
		fmt.Scan(&max_range)

		for i := 1; i <= max_range; i++ {
			fmt.Printf("%d * %d = %d\n", number, i, number*i)
		}

		fmt.Println("============")
	}
}
```

Bây giờ thì chương trình của ta mỗi lần nó in ra bảng cửu chương xong thì nó sẽ quay lại chỗ yêu cầu bạn nhập số và đợi bạn nhập vào, chạy thử nào.

```
$ go run main.go
Enter an Integer Number: 6
Enter the range or end value: 10
6 * 1 = 6
6 * 2 = 12
6 * 3 = 18
6 * 4 = 24
6 * 5 = 30
6 * 6 = 36
6 * 7 = 42
6 * 8 = 48
6 * 9 = 54
6 * 10 = 60
============
Enter an Integer Number: 8
Enter the range or end value: 10
8 * 1 = 8
8 * 2 = 16
8 * 3 = 24
8 * 4 = 32
8 * 5 = 40
8 * 6 = 48
8 * 7 = 56
8 * 8 = 64
8 * 9 = 72
8 * 10 = 80
============
Enter an Integer Number:
```

Oke, vậy là ta đã code ứng dụng thành công 😁. Github của toàn bộ series https://github.com/hoalongnatsu/go-by-example.

## Kết luận
Vậy là ta đã tìm hiểu xong về vòng lập `for`, đây là một cú pháp đơn giản và được sử dụng rất nhiều khi ta code, nắm rõ cú pháp của từng loại và cách sử dụng sẽ giúp ta rất nhiều trong việc code. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

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