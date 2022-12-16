Channel trong Golang được hiểu đơn giản là một ống dẫn mà có thể truyền hoặc nhận giá trị, cú pháp thông qua.
> <-

-----

### **Cú Pháp**

*  Để tạo ra một channel:
```
chan := make(chan int)
```
*chan* là channel có kiểu là int, sau này chúng ta có thể khai báo nhiều loại *type* cho channel tuỳ vào mục đích sử dụng, ví dụ như *string*, *struct*,...

* Gửi giá trị đến channel *chan*:
```
ch <- sendvalue
```
giá trị *sendvalue* có kiểu là type *int* được gửi để *chan*

* Nhận giá trị từ channel *chan*:
```
receivevalue := <-chan
```
 sau khi nhận giá trị kiểu *int* từ *sendvalue* 
 
### ** Ví Dụ.**
1. Ví dụ 1 là dùng channel để nhận value từ một function đơn giản.
```
package main

import "fmt"

func exChannel(ch chan int) {
	sendvalue := 5
	ch <- sendvalue
}

func main() {
	ch := make(chan int)
	go exChannel(ch)
	receice := <-ch
	fmt.Println(receice)
}
```
kết quả là:
> 5

[RUN](https://go.dev/play/p/NwddnCifx20)

2. Ví dụ 2 này sẽ nhận nhiều giá trị từ 1 function khác.
```
package main

import (
	"fmt"
	"time"
)

func main() {
	stop := make(chan bool)
	ch := make(chan int)
	go exChannelArray(ch, stop)
	for {
		select {
		case receice := <-ch:
			fmt.Println(receice)
		case <-stop:
			return
		}
	}
}

func exChannelArray(ch chan int, stop chan bool) {
	for i := 0; i < 9; i++ {
		ch <- i
	}
	time.Sleep(time.Second)
	stop <- true
}

``` 
Kết quả:
> receice: 0
receice: 1
receice: 2
receice: 3
receice: 4
receice: 5
receice: 6
receice: 7
receice: 8

[Run](https://go.dev/play/p/yYrk9Bmw9tv)

Trong ví dụ trên có phần for select nếu không hiểu thì comment mình sẽ giải thích nhé.
```
for {
		select {
		case receice := <-ch:
			fmt.Println(receice)
		case <-stop:
			return
		}
	}
```

Cảm ơn các bạn đã đọc, các bạn có thể yêu cầu thêm về các chủ đề khác trong golang nhé.

Tks anh,em: 

**Contact**
* facebook: https://www.facebook.com/phucducdev/
* gmail: ducnp09081998@gmail.com or phucducktpm@gmail.com
* linkedin: https://www.linkedin.com/in/phucducktpm/
* hashnode: https://hashnode.com/@OpenDev
* telegram: https://t.me/OpenDevGolang