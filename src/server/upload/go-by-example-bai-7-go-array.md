## Giới thiệu
Chào các bạn tiếp tục với series về Golang, ở bài trước chúng ta đã tìm hiểu về [Go Function](https://viblo.asia/p/go-by-example-bai-6-go-functions-maGK7r1L5j2). Ở bài này chúng ta sẽ tìm hiểu về một kiểu dữ liệu khá quan trọng trong Go là Array, và nó sẽ là tiền đề để chúng ta tìm hiểu tiếp về các loại dữ liệu khác là Slice và Map.

![image.png](https://images.viblo.asia/c147764a-a0c3-4b72-851d-39b08fbd469a.png)

Nếu mọi người nhớ ở bài 3 là [Go Type System](https://viblo.asia/p/go-by-example-bai-3-learning-go-type-system-via-secret-person-game-RQqKLRoMl7z) chúng ta đã làm một ứng dụng là Secret Person Game, code của nó như sau.

```main.go
package main

import (
	"bufio"
	"fmt"
	"log"
	"math/rand"
	"os"
	"strconv"
	"time"
)

func main() {
	var personZero, personOne, personTwo string
	personZero, personOne, personTwo = "Max", "Alex", "Tom"

	fmt.Println("Number of secret person 0: Max, 1: Alex, 2: Tom.")

	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)
	secretPersonNumber := r.Intn(3)

	var answer int
	var err error
	scanner := bufio.NewScanner(os.Stdin)

	for {
		fmt.Printf("Please enter your answer with numer 0 - 2: ")
		scanner.Scan()
		input := scanner.Text()
		answer, err = strconv.Atoi(input)

		if err != nil {
			log.Panic(err)
		}

		if answer >= 0 && answer <= 2 {
			break
		}
	}

	var secretPerson string
	switch secretPersonNumber {
	case 0:
		secretPerson = personZero
	case 1:
		secretPerson = personOne
	default:
		secretPerson = personTwo
	}

	if answer == secretPersonNumber {
		fmt.Printf("Congratulations!! You answer is correct, %s is the secret person.\n", secretPerson)
	} else {
		fmt.Printf("Sorry!! You answer is incorrect, %d: %s is the secret person.\n", secretPersonNumber, secretPerson)
	}
}
```

Với mỗi person ta đều phải tạo một biến để lưu trữ tên của person đó, nếu có tới 10 person thì ta phải tạo 10 biến. Việc này tuy không có gì sai nhưng nó sẽ khiến code của ta rất dài và khó kiểm soát. Do đó trong lập trình để lưu những dữ liệu mà có tính chất giống nhau người ta sẽ dùng Array.

## Array
Array là một kiểu dữ liệu dùng để lưu trữ tập họp của nhiều data có tính chất giống nhau. Ví dụ array có 5 phần tử dùng để lưu trữ một tập họp nhiều giá trị số.

![image.png](https://images.viblo.asia/9edb3056-4224-468b-a004-4e5c09a81288.png)

*<div align="center">Image from [Go In Action](https://www.manning.com/books/go-in-action)</div>*

> Trong lập trình thì Array bắt đầu từ phần tử thứ 0

Với array ở trên thì:
+ Phần tử thứ ở vị trí thứ 0 nó lưu giá trị 0.
+ Phần tử thứ ở vị trí thứ 1 nó lưu giá trị 20.
+ Phần tử thứ ở vị trí thứ 2 nó lưu giá trị 30.
+ Phần tử thứ ở vị trí thứ 3 nó lưu giá trị 40.
+ Phần tử thứ ở vị trí thứ 4 nó lưu giá trị 50.

### Array in Golang

Trong Golang ta sẽ khai báo array theo cú pháp sau.

```go
var <name> [lenght]<type>
```

Với `<name>` là tên biến, lenght là chiều dài của array, type là kiểu dữ liệu của các phần tử trong array.

Ví dụ.

```go
var num [5]int
```

Biến `num` của ta sẽ là một array với chiều dài là 5, các phần tử trong array num có kiểu dữ liệu là int.

**Lưu ý: một khi ta khai báo array thì ta sẽ không thể thay đổi chiều dài và kiểu dữ liệu của nó được.** Nếu ta muốn thay đổi chiều dài của array thì ta phải tạo array mới và copy dữ liệu của array cũ qua.

### Array initializing
Với array khi ta khai báo biến mà không gán giá trị cho nó thì nó sẽ được gán cho giá trị mặc định của dữ liệu.

Với kiểu dữ liệu int thì giá trị mặc định của biến sẽ là 0. Với kiểu string thì giá trị mặc định của biến sẽ là empty string (hai dấu ""). Và array cũng vậy, khi ta khai báo một mảng mà không gán giá trị cho nó, toàn bộ phần tử của nó sẽ được gán cho giá trị mặc định.

Ví dụ với mảng `num [5]int` ở trên khi ta khai báo mà ta không gán giá trị cho nó thì nó sẽ có giá trị mặc định như sau.

![image.png](https://images.viblo.asia/4f07be98-7d39-4e77-807a-c0cdbb4e5c70.png)

*<div align="center">Image from [Go In Action](https://www.manning.com/books/go-in-action)</div>*

Các phần tử của mảng đều có giá trị 0.

### Array initializing with value
Một cách nhanh hơn để ta khai báo và khởi tạo dữ liệu cho array là ta sẽ dùng array literal. Array literals cho phép ta khai báo số lượng của các phần tử và gán giá trị cho các phần tử đó.

Ví dụ.

```go
// Declare an integer array of five elements.
// Initialize each element with a specific value.
num := [5]{0, 20, 30, 40, 50}
```

Nếu bạn không muốn khai báo lenght của array, mà ta muốn lenght của array sẽ bằng với số lượng phần tử được khai báo, ta sẽ dùng dấu `...`

```go
// Declare an integer array.
// Initialize each element with a specific value.
// Capacity is determined based on the number of values initialized.
num := [...]{0, 20, 30, 40, 50}
```

Nếu ta chỉ cần khai báo giá trị cho một vài phần tử trong mảng, và muốn giá trị của các phần tử còn lại sẽ là giá trị mặc định của kiểu dữ liệu, thì ta làm như sau.

```go
// Declare an integer array of five elements.
// Initialize index 1 and 2 with specific values.
// The rest of the elements contain their zero value.
array := [5]int{1: 10, 2: 20}
```

Lúc này thì phần tử thứ 1 và thứ 2 của ta sẽ có giá trị là 10 và 20, còn giá trị của các phần tử còn lại sẽ là 0.

![image.png](https://images.viblo.asia/eb931c87-c2bc-4c6b-8584-9b86dbf19a02.png)
*<div align="center">Image from [Go In Action](https://www.manning.com/books/go-in-action)</div>*

### Access array value
**Trong array thì phần tử của nó sẽ được gọi là index.** Để truy cập giá trị của một phần tử trong array, ta dùng hai dấu `[]`.

```go
num := [5]{0, 20, 30, 40, 50}

fmt.Println(num[1]) // 20
fmt.Println(num[3]) // 40
```

Sau khi ta khai báo array, ta cũng có thể gán lại giá trị của từng phần tử riêng biệt như sau.

```go
num := [5]{0, 20, 30, 40, 50}
fmt.Println(num[1]) // 20

num[1] = 10
fmt.Println(num[1]) // 10
```

Array trong Go sẽ có một điểm khác biệt với các ngôn ngữ khác là array trong Go nó là `value type`, chứ không phải `reference type` giống các ngôn ngữ khác. Reference type ta sẽ nói sau.

Khi một biến nó là dạng `value type` thì có nghĩa ta có thể dùng nó để gán giá trị cho một biến khác được. Ví dụ với array thì khi ta gán một array này cho một array khác, nó sẽ copy toàn bộ giá trị của array này sang array khác.

Ví dụ.

```go
// Declare a string array of five elements.
var arrayOne [5]string

// Declare a second string array of five elements.
// Initialize the array with colors.
arrayTwo := [5]string{"Red", "Blue", "Green", "Yellow", "Pink"}

// Copy the values from arrayTwo into arrayOne.
arrayOne = arrayTwo
```

Hai array của ta lúc này sẽ như sau.

![image.png](https://images.viblo.asia/7ce8b73e-0b9f-461e-b973-05892bbcf979.png)
*<div align="center">Image from [Go In Action](https://www.manning.com/books/go-in-action)</div>*

Nếu ta có thay đổi giá trị của một trong hai array thì nó cũng không ảnh hưởng tới thằng còn lại.

```go
fmt.Println(arrayOne[0]) // Red
fmt.Println(arrayTwo[0]) // Red

arrayTwo[0] = "Black"
fmt.Println(arrayOne[0]) // Red
fmt.Println(arrayTwo[0]) // Black
```

Trong khi các ngôn ngữ khác thì array của nó sẽ là dạng `reference type`, có nghĩa là ta không thể dùng nó để gán giá trị cho một biến khác được. Vì nếu ta gán `reference type` cho một biến khác thì chỉ cần biến trước nó thay đổi thì biến được gán giá trị nó cũng sẽ thay đổi theo.

Ví dụ đối với Java.
```java
arrayOne = arrayTwo
System.out.println(arrayOne[0]) // Red
System.out.println(arrayTwo[0]) // Red


arrayTwo[0] = "Black"
System.out.println(arrayOne[0]) // Black
System.out.println(arrayTwo[0]) // Black
```

Còn trong Go thì array của nó không như vậy.

### Passing arrays between functions
Đây là một vấn đề rất quan trọng, khi ta truyền array vào trong một function thì ta sẽ có hai cách truyền là truyền theo dạng `value type` hoặc `reference type`. **Nếu trong function của ta, ta không có làm gì mà sẽ thay đổi giá trị của array được truyền vào, thì ta nên truyền array vào theo dạng `reference type`**.

Ta sẽ xem qua ví dụ sau để biết tại sao ta lại nên làm như vậy. Ví dụ bây giờ ta có một array kiểu int với 1 triệu phần tử, với 1 phần tử sẽ chiếm 8 bytes của bộ nhớ thì với 8 triệu phần tử ta sẽ có 8 triệu bytes = 8 megabytes. Vậy chuyện gì sẽ xảy ra nếu ta truyền array với 8 triệu phần tử này vào một function?

Nếu ta truyền theo dạng `value type`.

```go
// Declare an array of 8 million bytes.
var num [1e6]int

// Pass the array to the function foo.
foo(array)

// Function foo accepts an array of one million integers.
func foo(num [1e6]int) {
...
}
```
 
 Lúc này thì khi ta truyền biến num vào hàm foo thì Go nó sẽ copy toàn bộ 8 triệu phần tử của array và truyền vào function, vì ta đang truyền nó vào theo kiểu `value type`.

Còn nếu ta truyền array vào theo kiểu `reference type` thì sẽ như sau.

```go
// Allocate an array of 8 megabytes.
var array [1e6]int

// Pass the address of the array to the function foo.
foo(&array)

// Function foo accepts a pointer to an array of one million integers.
func foo(array *[1e6]int) {
...
}
```

Vì bây giờ ta đang truyền theo dạng `reference type` nên Go nó sẽ chỉ truyền vào hàm foo giá trị của địa chỉ bộ nhớ mà đang chỉa tới array value, và giá trị của địa chỉ bộ nhớ chỉ có 8 bytes.

Nên bạn sẽ thấy được là thay vì ta phải truyền vào hàm một array với 8 triệu bytes dữ liệu khi dùng `value type` thì với `reference type` ta chỉ cần truyền 8 bytes dữ liệu. Nếu bạn chưa hiểu nhiều về `reference type` thì sẽ thấy nó hơi khó hiểu nên ta chỉ cần nhớ là khi function của ta không thay đổi giá trị của array, thì ta nên truyền array vào function theo kiểu `reference type`.

### Array iteration
Ta có thể duyệt qua array và in ra toàn bộ giá trị của nó bằng for loop.

```go
array := [5]string{"Red", "Blue", "Green", "Yellow", "Pink"}

for i := 0; i < len(array); i++ {
    fmt.Println(array[i])
}
```

Kết quả.

```
Red
Blue
Green
Yellow
Pink
```

Ok, đây là những thứ ta cần biết về array trong Go. Bây giờ ta sẽ sử dụng array để rút gắn đoạn code của Secret Person Game.

## Apply to Secret Person Game
Thay vì từng person ta phải khai báo cho nó một biến như ở trong đoạn code ban đầu.

```go
var personZero, personOne, personTwo string
personZero, personOne, personTwo = "Max", "Alex", "Tom"
```

Thì ta có thể lưu toàn bộ person vào trong một array tên là persons.

```go
persons := [3]string{"Max", "Alex", "Tom"}
```

Và sau đó thay vì ta phải so sánh từng số rồi gán cho biến secretPerson với biến person tương ứng.

```go
var secretPerson string
switch secretPersonNumber {
case 0:
    secretPerson = personZero
case 1:
    secretPerson = personOne
default:
    secretPerson = personTwo
}
```

Thì ta có thể truy cập array persons với phần tử tương ứng.

```go
secretPerson = persons[secretPersonNumber]
```

Ta cập nhật lại file `main.go` như sau.

```main.go
package main

import (
	"bufio"
	"fmt"
	"log"
	"math/rand"
	"os"
	"strconv"
	"time"
)

func main() {
	persons := [3]string{"Max", "Alex", "Tom"}

	fmt.Println("Number of secret person 0: Max, 1: Alex, 2: Tom.")

	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)
	secretPersonNumber := r.Intn(3)

	var answer int
	var err error
	scanner := bufio.NewScanner(os.Stdin)

	for {
		fmt.Printf("Please enter your answer with numer 0 - 2: ")
		scanner.Scan()
		input := scanner.Text()
		answer, err = strconv.Atoi(input)

		if err != nil {
			log.Panic(err)
		}

		if answer >= 0 && answer <= 2 {
			break
		}
	}

	if answer == secretPersonNumber {
		fmt.Printf("Congratulations!! You answer is correct, %s is the secret person.\n", persons[answer])
	} else {
		fmt.Printf("Sorry!! You answer is incorrect, %d: %s is the secret person.\n", secretPersonNumber, persons[secretPersonNumber])
	}
}
```

Ta chạy chương trình và kiểm tra.

```
$ go run main.go
Number of secret person 0: Max, 1: Alex, 2: Tom.
Please enter your answer with numer 0 - 2: 1
Sorry!! You answer is incorrect, 2: Tom is the secret person.
```

Ok, ta đã áp dụng array vào game của ta thành công 😁. Github của toàn bộ series https://github.com/hoalongnatsu/go-by-example.

## Kết luận
Vậy là ta đã tìm hiểu xong về Go Array, ta cần nắm về array để hiểu rõ hơn về các kiểu dữ liệu tiếp theo là Slice và Map. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

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