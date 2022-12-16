### **Vấn Đề**
Nói đến golang là nói đến Concurrency, nhằm mục đích tăng hiệu năng performance, thì việc trong 1 api hoặc trong 1 logic có rất nhiều  goroutine là chuyện thường xuyên xảy ra. Thì bài viết này mình sẽ nói đến việc giao tiếp giữa 2 goroutine.


-----


### **Giải Quyết**
Để hỗ trợ việc giao tiếp giữa các *goroutine* thì trong *golang* người ta thường dùng *channel* nếu các bạn chưa biết [channel](https://viblo.asia/p/golang-channel-va-cach-su-dung-ByEZkAkg5Q0) là gì và cách dùng nó thì đọc bài giới thiệu này nhé.

### **Code Mẫu**
 Không sử dụng channel để giao tiếp giữa 2 goroutine:
```
package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("main")
	startTime := time.Now()
	process1()
	process2()
	endTime := time.Since(startTime).Milliseconds()
	fmt.Println("tong process 1:", endTime)

}

func process1() {
	startTime := time.Now()
	// ví dụ process 1 này có 3 logic, và 1 logic sẽ tốn 100 millisecond
	// 1. là get thông tin user từ database
	fmt.Println("process1: get info user") // sau này có thể thay login ở dòng này
	time.Sleep(time.Millisecond * 100)
	// 2. sau khi có thông tin user thì lấy history các bình luận thông qua userID
	fmt.Println("process1: get bình luận của user")
	time.Sleep(time.Millisecond * 100)
	// 3. Process này là xem các bình luận nào thuộc bài viết đã được xoá thì cũng xoá bình luận tương ứng đó.
	fmt.Println("process1: xoá bình luận của bình viết không tồn tại")
	time.Sleep(time.Millisecond * 100)
	// => tổn cộng sau khi handle xong thì bạn tốn khoảng hơn 300 millisecond
	endTime := time.Since(startTime).Milliseconds()
	fmt.Println("time process 1:", endTime)
}

func process2() {
	startTime := time.Now()
	// ví dụ process 1 này có 3 logic, và 1 logic sẽ tốn 100 millisecond
	// 1. Get thông tin tất cả các bài viết
	fmt.Println("process2: get thông tin bài viết") // sau này có thể thay login ở dòng này
	time.Sleep(time.Millisecond * 100)
	// 2. Thực hiện fillter các bài viết
	fmt.Println("process2: thực hiện fillter trên code")
	time.Sleep(time.Millisecond * 100)
	// 3. Process này là sort data.
	fmt.Println("process2: xử lý sort data để trả về tăng dần")
	time.Sleep(time.Millisecond * 100)
	// => tổn cộng sau khi handle xong thì bạn tốn khoảng hơn 300 millisecond
	endTime := time.Since(startTime).Milliseconds()
	fmt.Println("time process 1:", endTime)
}
```
Kết quả:
> main

> process1: get info user

> process1: get bình luận của user

> process1: xoá bình luận của bình viết không tồn tại

> time process 1: 303

> process2: get thông tin bài viết

> process2: thực hiện fillter trên code

> process2: xử lý sort data để trả về tăng dần

> time process 1: 303

> tong process 1: 607

=> ở ví dụ trên mình không sài goroutine thì tổng thời gian thực hiện là khoản **605 millisecond**

[RUN](https://go.dev/play/p/PPA7TySrcxk)


-----


 Tới đây chắc nhiều bạn thắc mắc đó là tại sao không sài goroutine để thực hiện đồng thời cả 2 cùng một lúc. Thì mình sẽ giải thích rằng là bạn đã đúng rồi trong trường hợp 2 process này không phụ thuộc lẫn nhau. Không phụ thuộc là data của 2 process này độc lập.
 
 Còn ở đây mình muốn là phụ thuộc lẫn nhau để xử dụng *channel*, trong *process2* đến phần số 2 muốn thực hiện được cần phải có *userID* thì bạn buộc phải waiting *process1* thực hiện xong việc lấy userID thì *process2* mới có để thực hiện.
 
 ```
 package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	fmt.Println("main")
	startTime := time.Now()
	wg := sync.WaitGroup{}
	ch := make(chan string)
	wg.Add(2)
	go process1(&wg, ch)
	go process2(&wg, ch)
	wg.Wait()
	endTime := time.Since(startTime).Milliseconds()
	fmt.Println("tong process:", endTime)
}

func process1(wg *sync.WaitGroup, ch chan string) {
	defer wg.Done()
	startTime := time.Now()
	// ví dụ process 1 này có 3 logic, và 1 logic sẽ tốn 100 millisecond
	// 1. là get thông tin user từ database
	fmt.Println("process1: get info user") // sau này có thể thay login ở dòng này
	time.Sleep(time.Millisecond * 100)
	// 2. sau khi có thông tin user thì lấy history các bình luận thông qua userID
	fmt.Println("process1: get bình luận của user")
	time.Sleep(time.Millisecond * 100)
	ch <- "123123"
	// 3. Process này là xem các bình luận nào thuộc bài viết đã được xoá thì cũng xoá bình luận tương ứng đó.
	fmt.Println("process1: xoá bình luận của bình viết không tồn tại")
	time.Sleep(time.Millisecond * 100)
	// => tổn cộng sau khi handle xong thì bạn tốn khoảng hơn 300 millisecond
	endTime := time.Since(startTime).Milliseconds()
	fmt.Println("time process 1:", endTime)
}

func process2(wg *sync.WaitGroup, ch chan string) {
	defer wg.Done()
	startTime := time.Now()
	// ví dụ process 2 tương tự như process 1 cũng có 3 logic, và 1 logic sẽ tốn 100 millisecond
	// 1. là get thông tin user từ database
	fmt.Println("process2: get info user") // sau này có thể thay login ở dòng này
	time.Sleep(time.Millisecond * 100)
	fmt.Println("process2: blocking process")
	userID := <-ch
	fmt.Println("process2:userID", userID)

	// 2. sau khi có thông tin user thì lấy history các bình luận thông qua userID
	fmt.Println("process2: get bình luận của user")
	time.Sleep(time.Millisecond * 100)
	// 3. Process này là xem các bình luận nào thuộc bài viết đã được xoá thì cũng xoá bình luận tương ứng đó.
	fmt.Println("process2: xoá bình luận của bình viết không tồn tại")
	time.Sleep(time.Millisecond * 100)
	// => tổn cộng sau khi handle xong thì bạn tốn khoảng hơn 300 millisecond
	endTime := time.Since(startTime).Milliseconds()
	fmt.Println("time process 1:", endTime)
}
 ```
 
 Kết quả:
>  main

> process2: get info user

> process1: get info user

> process2: blocking process

> process1: get bình luận của user

> process1: xoá bình luận của bình viết không tồn tại

> process2:userID 123123

> process2: get bình luận của user

> process2: xoá bình luận của bình viết không tồn tại

> time process 1: 303

> time process 1: 404

> tong process: 404

=> với việc sử dụng goroutine kết hợp channel thì tổng thời gian có thể giảm đi khá nhiều, ở đây là khoảng *404 millisecond*

[RUN](https://go.dev/play/p/mziZjDsh3qG)

**Contact**
* facebook: https://www.facebook.com/phucducdev/
* gmail: ducnp09081998@gmail.com or phucducktpm@gmail.com
* linkedin: https://www.linkedin.com/in/phucducktpm/
* hashnode: https://hashnode.com/@OpenDev
* telegram: https://t.me/OpenDevGolang