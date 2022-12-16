## Giới thiệu
Chào các bạn tới với series về Golang, ở bài trước chúng ta đã tìm hiểu về các loại dữ liệu trong Golang. Ở bài hày chúng ta sẽ tìm hiểu thêm về hai cú pháp của Go Flow Control nữa là Do/While và Switch statement thông qua việc improve thêm cho Secret Person Game của ta.

![image.png](https://images.viblo.asia/04f170fa-a9e9-453b-9155-00699dfdb40b.png)

Với Secret Person Game của ta đã code ở bài trước, khi ta chạy chương trình thì user sẽ nhập vào số thứ tự mà họ đoán đó là người bí mật, nếu đúng thì ta sẽ in ra câu bạn đã đoán trúng, còn nếu không thì sẽ in ra câu ngược lại.

```
$ ./secret
Number of secret person 0: Max, 1: Alex, 2: Tom.
Please enter your answer with numer 0 - 2: 1
Congratulations!! You answer is correct, Alex is the secret person.
```

Nhưng game của ta sẽ có một chỗ cần cải thiện là phần cho user nhập vào số thứ tự của người bí mật, hiện tại thì người bí mật của ta chỉ có số thứ tự từ 0 tới 2, nhưng khi chương trình chạy thì user muốn nhập vào số nào cũng được hết.

```
$ ./secret
Number of secret person 0: Max, 1: Alex, 2: Tom.
Please enter your answer with numer 0 - 2: 3
Sorry!! You answer is incorrect, 2: Tom is the secret person.

$ ./secret
Number of secret person 0: Max, 1: Alex, 2: Tom.
Please enter your answer with numer 0 - 2: 10
Sorry!! You answer is incorrect, 2: Tom is the secret person.
```

Điều này gây ra sự khá bất hợp lý trong game, nên ta sẽ cải thiện thêm là chỉ cho user nhập vào số từ 0 tới 2, nếu họ nhập số nào đó khác thì ta sẽ bắt họ nhập lại.

```
$ ./secret
Number of secret person 0: Max, 1: Alex, 2: Tom.
Please enter your answer with numer 0 - 2: 3
Please enter your answer with numer 0 - 2: 4
Please enter your answer with numer 0 - 2: 10
```

Chỉ khi nào ta nhập số từ 0 tới 2 thì chương trình mới chạy tiếp.

```
Please enter your answer with numer 0 - 2: 2
Sorry!! You answer is incorrect, 1: Alex is the secret person.
```

Ok, giờ ta tiến hành code nào 😁.

## Improve Secret Person Game
Code của ta hiện tại như sau.

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

	scanner := bufio.NewScanner(os.Stdin)
	fmt.Printf("Please enter your answer with numer 0 - 2: ")
	scanner.Scan()
	input := scanner.Text()
	answer, err := strconv.Atoi(input)

	if err != nil {
		log.Panic(err)
	}

	if answer == secretPersonNumber {
		if secretPersonNumber == 0 {
			fmt.Printf("Congratulations!! You answer is correct, %s is the secret person.\n", personZero)
		} else if secretPersonNumber == 1 {
			fmt.Printf("Congratulations!! You answer is correct, %s is the secret person.\n", personOne)
		} else if secretPersonNumber == 2 {
			fmt.Printf("Congratulations!! You answer is correct, %s is the secret person.\n", personTwo)
		}
	} else {
		if secretPersonNumber == 0 {
			fmt.Printf("Sorry!! You answer is incorrect, 0: %s is the secret person.\n", personZero)
		} else if secretPersonNumber == 1 {
			fmt.Printf("Sorry!! You answer is incorrect, 1: %s is the secret person.\n", personOne)
		} else if secretPersonNumber == 2 {
			fmt.Printf("Sorry!! You answer is incorrect, 2: %s is the secret person.\n", personTwo)
		}
	}
}
```

Đoạn code ta lấy dữ liệu nhập vào của user.

```go
scanner := bufio.NewScanner(os.Stdin)
fmt.Printf("Please enter your answer with numer 0 - 2: ")
scanner.Scan()
input := scanner.Text()
answer, err := strconv.Atoi(input)

if err != nil {
    log.Panic(err)
}
```

Ở đoạn này thì cho dù user nhập gì ta cũng sẽ lấy và sử lý, nên ta cần improve code ở chỗ này lại một chút, nếu user nhập số không nằm trong khoảng từ 0 tới 2 thì ta sẽ bắt họ nhập lại. Vậy ta làm việc đó như thế nào?

### Loop Flow Control
Ở trong lập trình sẽ có một vài cú pháp được gọi là loop statement, những cú pháp này sẽ có một điều kiện nào đó để thực thi lập đi lập lại một đoạn code nhất định cho tới khi điều kiện của nó được thỏa mãn.

Thì ta sẽ áp dụng một trong các loop statement vào trong game của ta, nếu user nhập số không nằm trong khoảng 0 tới 2 thì ta bắt user nhập lại. Thông thường trong các ngôn ngữ ta sẽ có câu lệnh loop là: while, do while và for. Ta sẽ tìm hiểu về while và do/while loop.

Cú pháp while và do/while thông thường sẽ như sau.

```java
while (condition) {
    work();
}
```

```java
do {
    work();
} while (condition);
```

Nhưng không như những ngôn ngữ khác, ở trong Golang ta sẽ không hề có keyword nào cho câu lệnh while và do/while. Mà ta sẽ dùng `for` keyword để implement while và do/while loop.

### Go while loop
Ở trong Go, ta sẽ thực hiện câu lệnh while loop bằng cú pháp sau.

```go
for condition {
  // code block
}
```

Nếu câu điều kiện (condition) của ta bằng true thì đoạn `code block` sẽ được thực thi lập đi lập lại cho tới khi nào câu điều kiện bằng false. Ví dụ:

```main.go
package main

import ("fmt")

func main() {
  number := 1

  for number <= 5 {
    fmt.Println(number)
    number++
  }
}
```

Kết quả.

```bash
1
2
3
4
5
```

Đoạn code trên sẽ in ra giá trị của biến number, sau đó tăng giá trị của biến number lên, và nó sẽ in cho tới khi nào giá trị của number còn nhỏ hơn hoặc bằng 5. Nếu giá trị number lớn hơn 5 thì vòng lập của ta sẽ kết thúc.

### Go do/while loop
Tương tự như while thì Go cũng không có keyword cho do/while, ta sẽ thực hiện câu lệnh do/while loop bằng cú pháp.

```go
for {
    // code block

    if condition {
        break
    }
}
```

Khác với while sẽ kiểm tra câu điều kiện trước rồi mới nhảy vào thực thi đoạn code của nó, thì do/while sẽ nhảy vào thực thi đoạn code trước rồi mới kiểm tra câu điều kiện. Ví dụ:

```main.go
package main

import ("fmt")

func main() {
	multiplier := 1

	// run while loop for 10 times
	for {
		product := 6 * multiplier

		fmt.Printf("6 * %d = %d\n", multiplier, product)
		multiplier++
        
        if multiplier > 10 {
            break
        }
	}
}
```

Kết quả.

```bash
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
```

### Apply to game
Oke, giờ ta áp dụng 1 trong hai câu lệnh loop của ta vào chương trình game của ta. Ta sẽ sử dụng câu lệnh nào đây? Cậu lệnh while hay do/while?

Dựa vào sự khác biết giữa câu lệnh while và do/while ta nói ở trên, câu lệnh while sẽ kiểm tra điều kiện trước rồi mới thực thi vòng lập, còn do/while sẽ thực thi vòng lập trước rồi mới kiểm tra điều kiện.

Thì với chương trình game của ta người dùng phải nhập giá trị vào trước, rồi ta mới kiểm tra điều kiện là giá trị của người dùng nhập vào có nằm trong khoảng từ 0 tới 2 hay không. Do đó ta sẽ dùng do/while cho chương trình game của ta. Sửa lại đoạn code.

```main.go
scanner := bufio.NewScanner(os.Stdin)
fmt.Printf("Please enter your answer with numer 0 - 2: ")
scanner.Scan()
input := scanner.Text()
answer, err := strconv.Atoi(input)

if err != nil {
    log.Panic(err)
}
```

Thành.

```main.go
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
```

Ta sẽ chuyển đoạn code.

```go
fmt.Printf("Please enter your answer with numer 0 - 2: ")
scanner.Scan()
input := scanner.Text()
answer, err = strconv.Atoi(input)
```

Vào trong phần do/while loop, lúc này ta sẽ lấy giá trị nhập vào của người dùng, và kiểm tra giá trị đó có lớn hơn bằng 0 hoặc nhỏ hơn bằng 2 hay không. Nếu có thì ta sẽ kết thúc vòng lập bằng keyword `break`, nếu không thì đoạn code trên sẽ được thực thi lại và bắt người dùng nhập lại giá trị mới cho tới khi nào giá trị nhập vào thỏa điều kiện.

Full code.

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

	if answer == secretPersonNumber {
		if secretPersonNumber == 0 {
			fmt.Printf("Congratulations!! You answer is correct, %s is the secret person.\n", personZero)
		} else if secretPersonNumber == 1 {
			fmt.Printf("Congratulations!! You answer is correct, %s is the secret person.\n", personOne)
		} else if secretPersonNumber == 2 {
			fmt.Printf("Congratulations!! You answer is correct, %s is the secret person.\n", personTwo)
		}
	} else {
		if secretPersonNumber == 0 {
			fmt.Printf("Sorry!! You answer is incorrect, 0: %s is the secret person.\n", personZero)
		} else if secretPersonNumber == 1 {
			fmt.Printf("Sorry!! You answer is incorrect, 1: %s is the secret person.\n", personOne)
		} else if secretPersonNumber == 2 {
			fmt.Printf("Sorry!! You answer is incorrect, 2: %s is the secret person.\n", personTwo)
		}
	}
}
```

Ta chạy chương trình và kiểm tra.

```
$ go run main.go
Number of secret person 0: Max, 1: Alex, 2: Tom.
Please enter your answer with numer 0 - 2: 6
Please enter your answer with numer 0 - 2: 7
Please enter your answer with numer 0 - 2: 8
Please enter your answer with numer 0 - 2: 9
Please enter your answer with numer 0 - 2: 1
Sorry!! You answer is incorrect, 2: Tom is the secret person.
```

Oke, game của ta đã chạy đúng như mục đích của ta 😁. Tiếp theo ta sẽ học thêm một cú pháp nữa mà sẽ giúp ta rút ngọn code lại một chút, ở đoạn code.

```main.go
if answer == secretPersonNumber {
    if secretPersonNumber == 0 {
        fmt.Printf("Congratulations!! You answer is correct, %s is the secret person.\n", personZero)
    } else if secretPersonNumber == 1 {
        fmt.Printf("Congratulations!! You answer is correct, %s is the secret person.\n", personOne)
    } else if secretPersonNumber == 2 {
        fmt.Printf("Congratulations!! You answer is correct, %s is the secret person.\n", personTwo)
    }
} else {
    if secretPersonNumber == 0 {
        fmt.Printf("Sorry!! You answer is incorrect, 0: %s is the secret person.\n", personZero)
    } else if secretPersonNumber == 1 {
        fmt.Printf("Sorry!! You answer is incorrect, 1: %s is the secret person.\n", personOne)
    } else if secretPersonNumber == 2 {
        fmt.Printf("Sorry!! You answer is incorrect, 2: %s is the secret person.\n", personTwo)
    }
}
```

Chỗ này ta dùng if/elseif hơi nhiều, trong lập trình thì thông thường nếu câu lệnh if/elseif của ta mà dùng để so sánh hai giá trị có bằng nhau hay không. Ví dụ `a == 1` (a có bằng 1 không), mà số lần sử dụng if hoặc elseif lên trên khoảng 3 lần thì ta nên dùng một câu lệnh khác cho code của ta gọn hơn.

### Go switch case
Câu lệnh mà ta sẽ sử dụng là switch case, cú pháp như sau.

```go
switch expression {
  case value1:
    // code block 1
  case value2:
    // code block 2
  case value3:
    // code block 3
  ...
  default:
    // default code block
}
```

Thay vì phải kiểm tra từng biểu thức so sánh == với câu lệnh if, thì ta có thể để giá trị mà ta muốn so sánh vào `expression` của keyword `switch`, sau đó nếu giá trị  expression mà bằng với:
+ `case value1` thì code block 1 được thực thi.
+ `case value2` thì code block 2 được thực thi.
+ `case value3` thì code block 3 được thực thi.

Nếu không có giá trị nào bằng với expression thì code ở chỗ keyword `default` sẽ được thực thi.

Ta cập nhật lại code của file `main.go` lại với switch case như sau.

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

Code của ta lúc này đã gọn hơn nhiều 😁.

## Kết luận
Vậy là ta đã tìm hiểu xong về cú pháp while và do/while cộng với switch case trong Go.  Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

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