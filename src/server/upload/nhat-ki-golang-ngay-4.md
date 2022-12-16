# Mở đầu
Hôm nay mình định học về concurrency. Quan điểm cá nhân một chút, mỗi khi học một ngôn ngữ thì mình thường cố học cả hệ tương tưởng đằng sau nó, chả phải tự nhiên mà một ngôn ngữ ra đời và được thịnh hành. Nhiều khi thấy mấy bạn trẻ bảo học xong C, java, hay C# ở trường, mình hỏi học xong là thế nào thì ngoài trừ việc biết hết đống keyword, với vài ba cái if else for while thì đã là biết xong ngôn ngữ. Chịu. Về go thì mình nghe nói nó được tạo ra để tận dụng sức mạnh của multi core. Về khoản đa luồng thì thứ mình khâm phục thực sự là Erlang và Elixir, nghe đâu thiên hạ đồn đại nó kéo được 1 triệu thread mà 1 năm down time có 7s. Quảng cáo tí thôi, quay lại với go nào, go được thiết kế mạnh về concurrency nên mình sẽ tập trung vào nó hơn.
## Mình đã biết gì về đa luồng rồi nhỉ?
Xem nào trước học java biết chút chút:
- Process và thread: Cái này cơ bản quá rồi
- Concurrency và parallelism
- Deadlock và một vài vấn đề với đa luồng

Chuẩn kiến thức cơ bản với lúc ra trường nhỉ, mình làm web nên cũng không động vào cái này mấy, kiến thức hạn chế lắm.
# Resource
Kiến thức không có nên mình kiếm thêm vài thứ để học trước đã. Liệt kê lại những gì mình đã xem.
- 1 video ngắn [https://www.youtube.com/watch?v=LvgVSSpwND8](https://www.youtube.com/watch?v=LvgVSSpwND8)
- 1 bài viết ngắn [https://medium.com/@thejasbabu/concurrency-patterns-golang-5c5e1bcd0833](https://medium.com/@thejasbabu/concurrency-patterns-golang-5c5e1bcd0833)
- 1 bài viết tiếng việt cho dễ hiểu [http://phocode.com/go/go-lap-trinh-go/go-concurrency/](http://phocode.com/go/go-lap-trinh-go/go-concurrency/)

Tiện quảng cáo không công thêm tí, trong lúc tìm tài liệu thì có một bộ tiếng Việt của bên zalo, đọc thấy hay, chắc tiếp theo sẽ học theo bộ đấy [https://github.com/zalopay-oss/go-advanced](https://github.com/zalopay-oss/go-advanced)
# Code thử
## Cái ví dụ fibonaci trong video
```go
package main

import "fmt"

func main() {
	in := make(chan int, 100)
	out := make(chan int, 100)
	go worker(in, out)
	for i := 1; i <= 100; i++ {in <- i}
	close(in)
	for o := range out { fmt.Println(o) }
}

func worker(in <-chan int, out chan<- int) {
	for i := range in {
		out <- fibo(i)
	}
}

func fibo(n int) int {
	if n < 2 {return 1}
	return fibo(n-1) + fibo(n-2)
}
```
Code cho quen tay, ok chạy đc, nhưng đổi 100 thành 3 thôi thì lỗi:
```
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan send]:
main.main()
	simple.go:9 +0xbe

goroutine 19 [chan send]:
main.worker(0xc000090000, 0xc000090080)
	simple.go:16 +0x5f
created by main.main
	simple.go:8 +0x95

Process finished with exit code 2
```
Chưa hiểu lắm, tưởng khai báo capacity lúc khởi tạo thì nếu hết thì nó out chứ, chắc cần đọc thêm rồi. Tối về rỗi đọc.
## Code thử cái gì riêng mình xem, thử tay ấy mà
Code thử cái sort cho concurrency xem.

15p sau...

Khó hơn mình nghĩ, trước cũng code thử merge sort concurrency bằng java rồi, nhưng mà cái này không quen toàn lỗi vớ vẩn. Thôi đi tham khảo trên mạng vậy. Kiếm quanh quanh thì thấy ông này [https://github.com/teivah](https://github.com/teivah), follow rảnh rảnh hóng xem. Chính xác là bài về sort là bài này: [https://github.com/teivah/golang-parallel-mergesort](https://github.com/teivah/golang-parallel-mergesort). Tham khảo tí, tham khảo chứ không copy, ok.

Sau 15p ngồi xem, cuối cùng vấn đề của mình chỉ là cái `var wg sync.WaitGroup`. Đầu óc kém quán
```go
package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

func main() {
	a := make([]int, 100)
	for i:= 0; i < 100; i++ { a[i] = i }
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(a), func(i, j int) { a[i], a[j] = a[j], a[i] })

	fmt.Println("Before: ", a)
	mergeSort(a)
	fmt.Println("After: ", a)
}

func mergeSort(s []int) {
	length := len(s)

	if length > 1 {
		middle := length >> 1

		var wg sync.WaitGroup
		wg.Add(2)

		go func() {
			defer wg.Done()
			mergeSort(s[:middle])
		}()

		go func() {
			defer wg.Done()
			mergeSort(s[middle:])
		}()

		wg.Wait()
		merge(s, middle)
	}
}

func merge(s []int, middle int) {
	helper := make([]int, len(s))
	copy(helper, s)

	l, r := 0, middle
	for i := 0; i < len(s); i++ {
		num := 0
		if l >= middle {
			num = helper[r]
			r++
		} else if r >= len(helper) {
			num = helper[l]
			l++
		} else {
			if helper[l] > helper[r] {
				num = helper[r]
				r++
			} else {
				num = helper[l]
				l++
			}
		}
		s[i] = num
	}
}
```
# Kết
Nay thế đã, mai phải đọc thêm và kiếm thêm ví dụ để làm.