![](https://images.viblo.asia/330a3816-b1e4-4efd-a709-9155c6d81de7.png)
<br>
Qua vài bài giới thiệu về ngôn ngữ lập trình golang thì mọi người cũng biết về điểm mạnh của ngôn ngữ ngày chính là khả năng sử lý đa luồng nó là một trong những vấn đề được các nhà phát triển golang chú trọng hàng đầu. Go đưa ra 2 tính năng hỗ trợ concurrency rất mạnh đó là Goroutine và Channel.<br>
Bài viết này sẽ giới thiệu về Goroutine trong Go

# Khái niệm Goroutine
* Goroutine là một hàm có thể chạy đồng thời với các hàm khác.
* Goroutines là những luồng gọn nhẹ, được khởi tạo với chỉ 2KB trong stack size có thể tăng hoặc giảm vùng nhớ tùy yêu cầu sử dụng.
* Những ứng dụng Go có thể có rất nhiều Goroutines chạy đồng thời với nhau.
# Cơ chế hoạt động và cách sử dụng
*  Cơ chế của goroutine khá là đơn giản: 1 function tồn tại một cách đa luồng với các goroutine khác trên cùng một không gian bộ nhớ, Go có bộ điều khiển quản lý các goroutine rồi phân phối chúng vào các bộ xử lý logic và gắn mỗi bộ xử lý logic này với một thread hệ thống được tạo ra trước đó để thực thi các goroutine này. Nói cách khác, mỗi thread hệ thống sẽ xử lý một nhóm goroutine được điều phối thông qua bộ xử lý logic. Với bộ điều khiển quản lý tác vụ đồng thời và cơ chế bộ xử lý logic, những cái khó khăn, phức tạp khi khai báo thread Go đã xử lý hết giúp chúng ta rồi. 
*  Để khởi tạo một goroutine ta chỉ cần thêm phía trước một function call hay method call từ khoá go<br>
**ví dụ: hiển thị tuần tự các số từ 1 đến 20 không sử dụng  goroutine**
```go
package main

import (
	"fmt"
)

func main(){
	g1()
	g2()
}

func g1(){
	for i := 1 ; i <= 10 ; i++ {
		fmt.Println(i)
	}
}

func g2(){
	for i := 11 ; i <= 20 ; i++ {
		fmt.Println(i)
	}
}
```
ví dụ trên có 2 hàm là<br>
g1() : hiển thị các số từ 1 đến 10<br>
g2() : hiển thị các số từ 11 đến 20<br>
Do hàm g1() viết trước hàm g2 nên g1 sẽ thực thi trước g2(), khi đó g2() sẽ phải chờ g1() thực thi xong và kết quả sẽ hiển thị các số từ 1 đến 20 một cách tuần tự.<br>
**ví dụ: hiển thị không tuần tự các số từ 1 đến 20 sử dụng  goroutine**
```go
package main

import (
	"fmt"
	"time"
)

func main(){
	go g1()
	go g2()
	time.Sleep(time.Second)
}

func g1(){
	for i:=1; i< 10;i++ {
		go fmt.Println(i)
	}
}

func g2(){
	for i:=10;i< 20;i++ {
		go fmt.Println(i)
	}
}
```
ví dụ trên có 2 hàm là g1() và g2() ta thêm từ khóa go đằng trước tên hàm để thể hiện đây là hàm goroutine, khi đó 2 hàm g1() và g2() sẽ được thực thi đồng thời mà không cần phải chờ hàm trước nó thức thi xong, ta thêm từ khóa go vào trước các câu lệnh ` fmt.Println(i)` và   `fmt.Println(j) `để cho chương trình biết các lệnh này cũng được thực thi đồng thời.<br>
lệnh `time.Sleep(time.Second)` là để chương trình main sleep 1 giây chờ 2 hàm g1(), và g2() kết thúc.
Và đây là kết quả của chương trình trên.<br>
Bạn thử chạy đoạn code trên nhiều lần sẽ thấy mỗi lần chạy kết quả sẽ khác nhau.
![](https://images.viblo.asia/bcf21b16-5c5a-4c9f-aaae-d75fa1f4fc8e.png)

# Kết bài
Bài này mình đã giới thiệu những điều cơ bản nhất về goroutine trong golang, các bạn hãy thực hành và làm những ví dụ đơn giản để hiểu hơn về nó nhé, bài sau mình sẽ viết về **sync.Mutex** và **Channel**. <br>
Cảm ơn và hẹn gặp lại =)