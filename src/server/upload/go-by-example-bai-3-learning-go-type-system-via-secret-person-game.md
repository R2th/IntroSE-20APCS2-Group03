## Giới thiệu
Chào các bạn tới với series về Golang, ở bài trước chúng ta đã tìm hiểu về cách khai báo biến và câu lệnh if/else. Ở bài này chúng ta sẽ tìm hiểu về Go Type System thông qua một mini game là Guess Secret Person.

![image.png](https://images.viblo.asia/75515b74-2ee0-4630-97e3-2503f3c912cb.png)

Mini game của ta sẽ như sau, ta sẽ có ba người là Max - Alex - Tom, và một trong ba người này sẽ ngẫu nhiên trở thành người bí mật. Ta sẽ gán số thứ tự cho Max là 0, Alex là 1 và Tom là 2, và ta sẽ chọn người bí mật một cách random theo số thứ tự của họ. Khi ta chạy game thì nó sẽ in ra cho ta đoạn hướng dẫn như sau.

```
$ ./secret
Number of secret person 0: Max, 1: Alex, 2: Tom.
Please enter your answer with numer 0 - 2:
```

Và ta sẽ nhập vào số thứ tự của người mà ta đoán đó là người bí mật, ta chỉ có một lần chọn duy nhất. Nếu ta đoán đúng thì game sẽ in ra cho ta kết quả thế này.

```
Number of secret person 0: Max, 1: Alex, 2: Tom.
Please enter your answer with numer 0 - 2: 0
Congratulations!! You answer is correct, Max is the secret person.
```

Còn nếu ta chọn sai thì game sẽ in ra cho ta câu sau.

```
Number of secret person 0: Max, 1: Alex, 2: Tom.
Please enter your answer with numer 0 - 2: 1
Sorry!! You answer is incorrect, 0: Max is the secret person.
```

## Go Type System Overview
Trước khi động vào code game, ta sẽ nói qua các loại dữ liệu trong Go trước. Sau đó ta sẽ nói rõ hơn về từng loại thông qua từng bước khi code game.

Golang có hai kiểu dữ liệu cơ bản là Basic Types và Composite Types.

###  Basic Types
Basic Types trong Golang sẽ có các loại dữ liệu sau:
1. **string type**: khai báo `var <name> string`, type sử dụng cho các biến mà lưu trữ giá trị chuỗi.
2. **boolean type**: khai báo `var <name> bool`, type sử dụng cho các biến mà lưu trữ giá trị true, flase.
3. **numeric types**: type sử dụng cho các biến mà lưu trữ dữ giá trị số.
+ **integer**: int8, uint8 (byte), int16, uint16, int32 (rune), uint32, int64, uint64, int, uint, uintptr.
+ **float**: float32, float64.
+ **complex**: complex64, complex128.

### Composite Types
Composite Types trong Golang sẽ có các loại dữ liệu sau:
1. **pointer types**: dạng pointer giống C.
2. **struct types**: dùng để định nghĩa cấu trúc của một đối tượng.
3. **function types**.
4. **array types**: một mảng chứa giá trị với length cố định.
5. **slice type**: một mảng chứa giá trị với length có thể thay đổi.
6. **map types**: kiểu dữ liệu key value.
7. **channel types**.
8. **interface types**: dùng để định nghĩa interface cho một đối tượng.

**Composite Types** thuộc về kiến thức nâng cao, ở bài hiện tại thì ta chưa cần tìm hiểu về nó, mình sẽ nói rõ về các loại dữ liệu thuộc Composite Types ở các bài sau. Ở bài này ta chỉ cần nắm về **Basic Types** là được 😁.

## Implement Secret Person Game
Ta tạo một file tên là `main.go`.

```main.go
package main

func main() {

}
```

### String type

Trước tiên ta phải định nghĩa biến để chứa tên của 3 người chơi trong game này của ta, là Max - Alex - Tom. Vì tên của từng người chơi trong game của ta đều là **dạng chuỗi**, nên ta sẽ **chọn type là string** cho biến mà dùng để chứa tên của 3 người chơi.

```main.go
package main

import (
    "fmt"
)

func main() {
    var personZero, personOne, personTwo string
    personZero = "Max"
    personOne = "Alex"
    personTwo = "Tom"
    
    fmt.Println("Number of secret person 0: Max, 1: Alex, 2: Tom.")
}
```

Ta khai báo từng biến với kiểu dữ liệu là string, sau đó ta gán giá trị vào từng biến. Ta có thể viết tắt lại đoạn code ở trên như sau.

```main.go
package main

import (
    "fmt"
)

func main() {
    var personZero, personOne, personTwo string
    personZero, personOne, personTwo = "Max", "Alex", "Tom"
    
    fmt.Println("Number of secret person 0: Max, 1: Alex, 2: Tom.")
}
```

Tiếp theo ta sẽ chọn ngẫu nhiên 1 trong 3 người này sẽ là người bí mật, vì ta không thể gán cứng cho một người là người bí mật được, do nếu làm vậy thì khi ta chơi game xong 1 lần ta biết được người bí mật là ai thì những lần sau ta cứ chọn người đó là thắng game => không game nào thiết kế như vậy cả. Vậy ta chọn random 1 trong 3 người trên như thế nào?

### Random in Golang
Để làm được việc đó thì ta sẽ dùng hàm random ở trong Golang.

```random.go
package main

import (
	"math/rand"
)

func main() {
    fmt.Println(rand.Intn(3))
}
```

Ở trên ta nhập vào số 3, hàm random sẽ trả về số trong khoảng `0 <= n < 3` cho ta. Tuy nhiên khi ta xài hàm random trong Golang ta phải lưu ý một điểm, là mỗi lần ta chạy hàm random thì nó chỉ trả về một kết quả duy nhất, ví dụ nếu ở trên `rand.Intn(3)` nó trả về cho ta kết quả là 1, thì mấy lần sau nó sẽ luôn luôn trả về kết quả là 1.

**Để mỗi lần ta chạy hàm random nó sẽ trả về kết quả mới, ta phải thực hiện thế này.**

```go
source := rand.NewSource(time.Now().UnixNano())
r := rand.New(source)
fmt.Println(r.Intn(3))
```

Vì sao nó như vậy thì các bạn google nhé 😂. Oke, ta ráp đoạn code trên vào code của ta.

```main.go
package main

import (
    "fmt"
	"math/rand"
)

func main() {
    var personZero, personOne, personTwo string
	personZero, personOne, personTwo = "Max", "Alex", "Tom"

	fmt.Println("Number of secret person 0: Max, 1: Alex, 2: Tom.")

	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)
    var secretPersonNumber int
	secretPersonNumber = r.Intn(3)
}
```

### Numeric types

Bạn sẽ thấy kết quả được trả về được gán với biến `secretPersonNumber`, vì kết quả hàm random trả về **là dạng số nên ta chọn type int** cho biến `secretPersonNumber`. Nếu các bạn nhớ ở bài trước thì ta sẽ có 3 cách khai báo biến là.

```
1. var <name> <type>
2. var <name> = <value>
3. <name> := <value>
```

Ta có thể sử dụng cách thứ 2 hoặc 3 để rút ngắn lại đoạn code phía trên.

```main.go
package main

import (
    "fmt"
	"math/rand"
)

func main() {
    var personZero, personOne, personTwo string
	personZero, personOne, personTwo = "Max", "Alex", "Tom"

	fmt.Println("Number of secret person 0: Max, 1: Alex, 2: Tom.")

	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)
    secretPersonNumber := r.Intn(3)
}
```

Thông thường ta sẽ dùng cách thứ 3 để gán giá trị của một hàm trả về cho một biến (chỉ là vì nhìn vậy nó gọn hơn thôi chứ không có gì đặc biệt nhé).

Tiếp theo game của ta sẽ cần cho dùng nhập vào số thứ tự của người chơi, ta sẽ thực hiện việc đó bằng những hàm cho phép ta đọc kết quả mà người dùng nhập vào terminal.

### Read input from STDIN
Trong Golang, để đọc giá trị người dùng nhập vào terminal thì ta sẽ dùng các hàm của thư viện bufio, ta thực hiện như sau.

```go
reader := bufio.NewReader(os.Stdin)
fmt.Print("Enter a number: ")
input, _ := reader.ReadString('\n')
```

Đây là đoạn code dùng để đọc giá trị của người dùng, hàm `reader.ReadString('\n')` sẽ đọc giá trị ta nhập vào cho tới khi ta bấm enter để xuống dòng.

Ví dụ.

```stdin.go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Enter a number: ")
	input, _ := reader.ReadString('\n')

	fmt.Printf("You have enter %s", input)
}
```

```
$ go run main.go
Enter a number: 12
You have enter 12

$ go run main.go
Enter a number: 99
You have enter 99
```

Tiếp theo, do giá trị mà ta đọc được từ người dùng nhập vào là chuỗi, còn giá trị của số thứ tự của ta là số, nên ta cần phải chuyển đổi từ kiểu int sang kiểu string. Ở trong Go ta sẽ dùng hàm `strconv` (String Convert) để chuyển **string sang int**.

```go
answer, err := strconv.Atoi(input)
```

Kết hợp với đoạn code ở trên.

```stdin.go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Enter a number: ")
	input, _ := reader.ReadString('\n')

	out, err := strconv.Atoi(input)
	if err != nil {
		fmt.Printf("Error is: %v\n", err)
	}

	fmt.Println(out)
}
```

Ta chạy thử.

```
$ go run main.go
Enter a number: 1
Error is: strconv.Atoi: parsing "1\n": invalid syntax
```

Tuy nhiên ta sẽ gặp lỗi, vì hàm `reader.ReadString('\n')` khi nó đọc sẽ lấy luôn kí tự `\n` vào, do đó khi ta convert từ string sang int nó sẽ bị lỗi, nên để tránh lỗi này trước khi ta chuyển kiểu dữ liệu ta cần cắt kí tự `\n` đi. Ta sẽ dùng hàm `strings.TrimSuffix`.

```stdin.go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Enter a number: ")
	input, _ := reader.ReadString('\n')
	input = strings.TrimSuffix(input, "\n")
	out, err := strconv.Atoi(input)
	if err != nil {
		fmt.Printf("Error is: %v\n", err)
	}

	fmt.Println(out)
}
```

Oke, tới đây thì ta đã đã biết cách đọc giá trị của người dùng nhập vào, tuy nhiên đoạn code ở trên khá dài, Golang có hỗ trợ cho ta rất nhiều hàm có các chức năng tương tự nhau, sử dụng đúng hàm sẽ giúp code của ta rất gắn ngọn. Ta có thể rút ngắn đoạn code ở trên như sau.

```stdin.go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Printf("Enter a number: ")
	scanner.Scan()
	input := scanner.Text()
	out, _ := strconv.Atoi(input)

	fmt.Println(out)
}
```

Hàm scanner cũng sẽ đọc giá trị của người dùng nhập vào, nhưng khác biệt ở một điểm là nó sẽ cắt kí tự `\n` giùm ta luôn.

Oke, ráp đoạn code trên vào code game của ta.

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
}
```

### End game

Sau đó ta sẽ so sánh nếu giá trị người dùng nhập vào bằng với giá trị secretPersonNumber thì ta sẽ in ra câu kết quả bạn chọn là chính xác, còn không thì ngược lại.

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

Oke, tới đây thì game của ta đã hoàn thành, ta build nó thành binary file và kiểm tra thử nào.

```
GOOS=linux go build -o secret
```

```
$ ./secret
Number of secret person 0: Max, 1: Alex, 2: Tom.
Please enter your answer with numer 0 - 2: 0
Sorry!! You answer is incorrect, 2: Tom is the secret person.
```

```
$ ./secret
Number of secret person 0: Max, 1: Alex, 2: Tom.
Please enter your answer with numer 0 - 2: 1
Congratulations!! You answer is correct, Alex is the secret person.
```

Ta đã code game secret person thành công 😁. Github của toàn bộ series https://github.com/hoalongnatsu/go-by-example.

## Kết luận
Vậy là ta đã tìm hiểu xong đơn giản về Go Type System và hiểu được các loại Basic Types và cách dùng chúng. Bên cạnh đó ta còn tìm hiểu thêm về hàm random và cách để đọc giá trị người dùng nhập vào terminal sau đó gán nó vào một biến. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

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