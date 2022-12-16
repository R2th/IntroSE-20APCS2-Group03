### 1. Introduction

Concurrency được coi là một trong những tính năng hấp dẫn nhất của Go để tận dụng năng lực xử lý của CPU. 

Concurrency gần giống với Thread, trong Go thì việc giao tiếp giữa các **goroutines** khá đơn giản với **channel**, có thể truyền dữ liệu giữa các goroutine với nhau bằng bất cứ loại dữ liệu nào. 

Nếu như 1 Thread của Java được tạo ra, nó sử dụng xấp xỉ **1MB** bộ nhớ của Heap, nếu bạn tạo ra 1000 Thread như vậy, chúng sẽ tạo ra áp lực lớn lên Heap dẫn tới việc hệ thống bị crash bởi vì thiếu hụt bộ nhớ, mặt khác, việc giao tiếp giữa 2 hoặc nhiều Thread cực kỳ khó khăn.

Nhưng với Go thì khác, khi việc sử dụng bộ vi xử lý multi-core khả thi, Goroutines hoàn toàn có thể thay thế được Thread. Mỗi Goroutines chỉ sử dụng **2KB** bộ nhớ từ Heap, như vậy bạn có thể tạo ra hàng triệu goroutines bất kỳ lúc nào.

Go khuyến khích cách tiếp cận mỗi thread chỉ access đến giá trị chia sẻ tại đúng một thời điểm nhất định và giá trị chia sẻ này được truyền giữa các thread thông qua các kênh giao tiếp.  Có thể hình dung cơ chế này giống như việc chạy hai chương trình single-threaded trên 1 CPU và để 2 chương trình này trao đổi thông tin với nhau, quá trình trao đổi thông tin sẽ đóng vai trò đồng bộ hoá dữ liệu giữa 2 chương trình này.

Bài viết này sẽ giới thiệu các khái niệm cơ bản về concurrency trong Go.

![](https://images.viblo.asia/456e447c-cdf5-4738-915f-6333f3e8724c.jpg)

### 2. Goroutine

**Goroutine** là một luồng được quản lý bởi Go runtime. Có thể hiểu đơn giản rằng goroutine là một hàm được chạy đồng thời cùng với các hàm khác.

Cú pháp của goroutine rất đơn giản, ta chỉ việc thêm lệnh `go` vào trước mỗi hàm cần gọi

```
package main

import (
	"fmt"
	"time"
)

func say(n int, s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Printf("%v goroutine say: %v %v\n", n, i, s)
	}
}

func main() {
	go say(1, "hello, world.")
	say(2, "hello, world.")
}
```

Output:
```
1 goroutine say: 0 hello, world.
2 goroutine say: 0 hello, world.
2 goroutine say: 1 hello, world.
1 goroutine say: 1 hello, world.
1 goroutine say: 2 hello, world.
2 goroutine say: 2 hello, world.
...
```

Trong đoạn code trên có 2 hàm goroutine, hàm đầu tiên là hàm **main()**, hàm thứ hai là hàm **say()** khi được gọi trong câu lệnh **go say(1, "hello, world.")**. Nếu như chúng ta gọi hàm **say()** một cách bình thường thì khi gọi, hàm **main()** sẽ phải dừng tất cả mọi thứ lại, đợi cho hàm **say()** thực hiện công việc của nó xong rồi trả lại quyền điều khiển cho hàm **main()** thì hàm **main()** mới tiếp tục công việc của nó.

Bạn có thể tạo ra cả ngàn routines cũng được:
```
func main() {
	for i := 0; i < 1000; i++ {
		go say(i, "hello, world.")
	}
	say(1000, "hello, world.")
}
```

### 3. Channel

**Channel** là một tính năng mà qua đó cho phép các goroutines trao đổi dữ liệu với nhau.

Channel được khởi tạo với cú pháp như sau:
```
ch := make(chan int)
```

chúng được sử dụng với operator `<-`
```
ch <- v    // Send v to channel ch.
v := <-ch  // Receive from ch, and
           // assign value to v.
```

Cụ thể chúng ta đến với ví dụ sau:

```
package main

import (
	"fmt"
	"time"
)

func send(c chan int) {
	for i:= 0; i < 5; i++ {
        fmt.Printf("send %v to channel\n", i)
		c <- i // send i to channel
	}
}

func receive(c chan int) {
	for i:= 0; i < 5; i++ {
        time.Sleep(1 * time.Millisecond)
		s := <- c // receive channel
		fmt.Println(s)
	}
}

func main() {
	c := make(chan int)
	go send(c)
	go receive(c)
	time.Sleep(100 * time.Millisecond)
	fmt.Println("end")
}
```

Trong ví dụ trên, hàm `send` truyền giá trị của `i` vào channel `c`. Hàm `receive` nhận các giá trị từ channel `c` và assgin nó cho `s` rồi in ra màn hình.

Output:
```
send 0 to channel
0
send 1 to channel
1
send 2 to channel
2
send 3 to channel
3
send 4 to channel
4
end
```

Việc sử dụng channel cho phép đồng bộ hóa dữ liệu giữa các goroutine bởi vì khi một goroutine truyền dữ liệu vào channel, goroutine đó sẽ dừng chương trình của nó và đợi đến khi có một goroutine khác lấy dữ liệu ra khỏi channel rồi thì nó mới tiếp tục.

Ở ví dụ trên, hàm send truyền i = 0 vào channel, nó sẽ đợi hàm receive lấy dữ liệu đó ra khỏi channel rồi mới tiếp tục thực hiện truyền i = 1 vào channel.

### 4. Buffered Channel

Như đã nói ở trên, các goroutine khi truyền dữ liệu vào channel thì phải có một goroutine khác lấy dữ liệu ra hoặc ngược lại, nếu không các goroutine sẽ đi vào trạng thái “chờ”.

Tuy nhiên chúng ta có thể cho phép goroutine không chờ nữa bằng cách dùng các buffered channel. Buffered Channel tức là channel đó giới hạn dữ liệu vào.
Vẫn với ví dụ bên trên, ta thay `c := make(chan int)` thành `c := make(chan int, 5)`:

```
package main

import (
	"fmt"
	"time"
)

func send(c chan int) {
	for i:= 0; i < 5; i++ {
        fmt.Printf("send %v to channel\n", i)
		c <- i // send i to channel
	}
}

func receive(c chan int) {
	for i:= 0; i < 5; i++ {
        time.Sleep(1 * time.Millisecond)
		s := <- c // receive channel
		fmt.Println(s)
	}
}

func main() {
	c := make(chan int, 5)
	go send(c)
	go receive(c)
	time.Sleep(100 * time.Millisecond)
	fmt.Println("end")
}
```

Output:

```
send 0 to channel
send 1 to channel
send 2 to channel
send 3 to channel
send 4 to channel
0
1
2
3
4
end
```

Hàm `send` liên tục đưa dữ liệu vào channel `c` mà không đợi hàm `receive` lấy nó ra.

### 5. Điều hướng Channel

Chúng ta có thể cho phép một channel chỉ đọc hoặc chỉ ghi.
```
send(c chan <- int)
```
Dòng code trên quy định channel chỉ được phép truyền dữ liệu vào.
```
receive(c <- chan int)
```
Dòng code trên quy định channel chỉ được phép đọc dữ liệu.

### 6. Range and Close

Sender có thể **close** một kênh để chỉ ra rằng sẽ không có thêm giá trị nào được gửi:
```
close(c)
```
Receiver có thể kiểm tra xem một **channel** đã được đóng chưa bằng cách gán tham số thứ hai cho biểu thức như sau:
```
value, ok: = <- c
```

`ok` là `false` nếu không có thêm giá trị nào để nhận và `channel` bị đóng.

Vòng lặp `for i := range c` nhận các giá trị từ channel liên tục cho đến khi nó được đóng lại.

Ví dụ:
```
package main

import "fmt"

func main() {
	c := make(chan string, 2)
	c <- "one"
    c <- "two"
	close(c)
	for i := range c {
		fmt.Println(i)
	}
    _, ok := <- c
	fmt.Println(ok)
}
```

Output:
```
one
two
false
```


### 7. Select

**Cú pháp của `select` trong Go gần giống như lệnh `switch`**

```
package main

import "fmt"

func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <- quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 5; i++ {
			fmt.Println(<- c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
}
```

Output:
```
0
1
1
2
3
quit
```

Channel `c` sẽ có khả năng nhận dữ liệu sau khi goroutine `go func()` lấy dữ liệu ra: `fmt.Println(<- c)`. Channel `quit` sẽ bị block cho đến khi dữ liệu được send vào nó.

Trong ví dụ trên, hàm `fibonacci` sẽ liên tục tính dãy fibonacci, send giá trị của `x` vào channel `c` cho đến khi channel `quit` nhận được giá trị.

Điều này có nghĩa là câu lệnh `select` sẽ thực thi một khối lệnh trong các `cases` nếu như case của channel đó không bị block.

**Nếu có nhiều trường hợp có thể tiến hành, một trong số chúng sẽ được chọn ngẫu nhiên:**
```
package main

import "fmt"

func fibonacci(c1, c2 chan int) {
		select {
		case c <- 1:
			fmt.Println("channel1")
		case quit <- 1:
			fmt.Println("channel2")
		}
}

func main() {
	c1 := make(chan int, 1)
	c2 := make(chan int, 1)
	fibonacci(c1, c2)
}
```

Ví dụ trên sẽ in ra `channel1` hoặc `channel2` một cách ngẫu nhiên.

**Tương tự như `switch` thì `select` cũng có `default` case:**
```
select {
case i := <- c:
    // use i
default:
    // receiving from c would block
}
```

Nó được thực hiện khi tất cả các case khác bị block.

### 8. sync.Mutex

Chúng ta đã thấy `channel` thực sự là một tính năng tuyệt vời để giao tiếp giữa các `goroutines`. Nhưng nếu chúng ta không cần sự giao tiếp giữa chúng thì sao? Làm thế nào khi nhiều `goroutines` cùng truy cập vào một tài nguyên chung?

Khi một chương trình chạy `concurrently` , các đoạn code dùng chung tài nguyên không thể truy cập bởi nhiều `goroutines` cùng lúc. Đoạn code như vậy được gọi là `critical section`. Ví dụ, giả định chúng ta có đoạn code sau:

```
package main
import (
	"fmt"
	"time"
	"math/rand"
)
// Khai báo biến count được truy cập bởi tất cả các routine
var count = 0
 
// Sao chép count vào temp, thực hiện một vài xử lý (tăng dần) và lưu lại vào count
// tạm dừng một khoảng ngẫu nhiên được thêm vào giữa lúc đọc và ghi count
func process(n int) {
	// Vòng lặp tăng count 10 lần
	for i := 0; i < 10; i++ {
		time.Sleep(time.Duration(rand.Int31n(2)) * time.Millisecond)
		temp := count
		temp++
		time.Sleep(time.Duration(rand.Int31n(2)) * time.Millisecond)
		count = temp
	}
	fmt.Printf("Count after i= %v Count: %v\n", n, count)
}
 
func main() {
	// lặp gọi process() 3 lần
	for i := 1; i < 4; i++ {
		go process(i)
	}
 
	// Tạm dừng để đợi cho tất cả routine hoàn thành
	time.Sleep(25 * time.Millisecond)
	fmt.Println("Final Count:", count)
}
```

Ouput:
```
Count after i= 1 Count: 11
Count after i= 3 Count: 12
Count after i= 2 Count: 13
Final Count: 13
```

Rõ ràng mong muốn của chúng ta là `Final Count: 30`, bởi chúng ta đã thực hiện count 30 lần. Nhưng kết quả lại chỉ là `13`.
Nguyên nhân là vì các `goroutines` cùng truy cập vào biến `count` dẫn đến xung đột.

Go cung cấp `Mutex` trong `sync` package để giải quyết vấn đề trên.

**Mutex** viết tắt của **Mut**ual **Ex**clusion. Có nghĩa là loại trừ lẫn nhau. Hiểu nôm na là toilet chỉ có một buồng, nhưng cả hai ông đều muốn vào, tất nhiên sẽ phải có một ông phải đứng đợi ngoài.

Cách làm khá đơn giản, ta chỉ cần bọc khối lệnh `critical section` bởi 2 functions: `Mutex.Lock()` và `Mutex.Unlock()`:
```
package main
import (
	"fmt"
	"time"
	"sync"
	"math/rand"
)

var mu sync.Mutex

var count = 0
 
func process(n int) {
	for i := 0; i < 10; i++ {
		time.Sleep(time.Duration(rand.Int31n(2)) * time.Millisecond)
		mu.Lock() // lock
		temp := count
		temp++
		time.Sleep(time.Duration(rand.Int31n(2)) * time.Millisecond)
		count = temp
		mu.Unlock() // unlock
	}
	fmt.Printf("Count after i= %v Count: %v\n", n, count)
}
 
func main() {
	for i := 1; i < 4; i++ {
		go process(i)
	}
 	time.Sleep(25 * time.Millisecond)
	fmt.Println("Final Count:", count)
}
```

Output:
```
Count after i= 3 Count: 19
Count after i= 1 Count: 29
Count after i= 2 Count: 30
Final Count: 30
```

### 9. Kết luận

Concurrency là một tính năng hấp dẫn và cực kỳ mạnh mẽ của Go. Bài viết này giúp bạn hiểu những khái niệm cơ bản của `concurrency` trong Go như: `goroutine`, `channel`,...

Hi vọng bài viết sẽ giúp các bạn mới tiếp xúc với Go hiểu hơn về nó. Nhớ upvote cho mình nếu bạn thấy bài viết hữu ích nhé! :wink: