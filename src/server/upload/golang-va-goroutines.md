# Giới thiệu
Dạo gần đây mình có tìm hiểu về Go hay còn được gọi là Golang thì mình thấy Go có đặc điểm nổi bật là có tốc độ xử lý nhanh và hỗ trợ xử lý đa luồng (concurrency) rất tốt với Goroutines. Do đó ở bài viết này mình sẽ chia sẻ những gì mình học được khi tìm hiểu về ngôn ngữ này.

# Go là gì?
![1_Ifpd_HtDiK9u6h68SZgNuA.png](https://images.viblo.asia/35174c1f-8d5d-4208-acde-701569555c2e.png)
Ngôn ngữ Go ban đầu được thiết kế và phát triển bởi một nhóm kĩ sư Google bao gồm **Robert Griesemer**, **Ken Thompson** và **Rob Pike** vào năm 2007. Go là ngôn ngữ lập trình mã nguồn mở, dạng biên dịch (compiled language), có kiểu tĩnh (statically typed). Go được thiết kế để chạy đa luồng (multiple cores) và hỗ trợ concurrency rất tốt. Bên cạnh đó ngôn ngữ này tương thích đa nền tảng, biên dịch nhanh, chạy nhanh, và còn có cú pháp khá đơn giản nên dễ học, dễ đọc và dễ làm việc.

Trong vòng những năm gần đây, Go là một ngôn ngữ được ưa chuộng khi viết các chương trình Micro Services, vì những đặc tính nhỏ gọn, biên dịch nhanh, import thư viện từ github, cú pháp đơn giản nhưng hiện đại. Một số công nghệ được bằng viết bằng Go tiêu biểu như: Docker, Kubernetes, CockroachDB, ...

Go có những ứng dụng trong một số lĩnh vực như:
* **Cloud & Network Services**
* **Command-line Interfaces (CLIs)**
* **Web Development**
* **DevOps & SRE**

# Goroutines
## Chuẩn bị
Trước khi tìm hiểu về goroutines, mình sẽ nhắc lại một số khái niệm về tiến trình (process) và luồng (thread) trong hệ điều hành.
* **Tiến trình (process)**: có thể hiểu đơn giản là một chương trình đang chạy trong máy tính. Mỗi tiến trình sẽ có một luồng chính (main thread) để chạy chương trình và được hệ điều hành cấp pháp cho một không gian bộ nhớ nhất định. Khi main thread ngừng hoạt động đồng nghĩa với việc chương trình bị tắt.
* **Luồng (thread)**: thread hay còn được gọi là tiểu trình là một luồng trong tiến trình đang chạy. Các luồng được chạy song song trong tiến trình và có thể truy cập đến vùng nhớ được cung cấp bởi tiến trình. Những thread sẽ được cấp pháp riêng một vùng nhớ `stack` để lưu trữ biến riêng của thread đó.

## Goroutines vs system threads
Golang sử dụng goroutine để xử lý đồng thời nhiều tác vụ. Goroutines là hàm hoặc phương thức chạy đồng thời với các hàm hoặc phương thức khác. Việc khởi tạo goroutines sẽ tốn ít chi phí hơn khởi tạo `thread` so với các ngôn ngữ khác. Goroutines và `thread` cũng không giống nhau.

Như đã nói ở trên `thread` sẽ có một kích thước vùng nhớ stack cố định. Vùng nhớ này chủ yếu được sử dụng để lưu trữ những tham số, biến cục bộ và địa chỉ trả về khi chúng ta gọi hàm.

Chính vì kích thước cố định của stack nên đẫn đến hai vấn đề:
* Gặp hiện tượng `stack overflow` với những chương trình gọi hàm đệ quy sâu.
* Lãng phí vùng nhớ đối với chương trình đơn giản.

Với Goroutines thì vẫn đề này đã được khắc phục bằng cách cấp pháp linh hoạt vùng nhớ stack:
* Một Goroutines sẽ được bắt đầu bằng một vùng nhớ nhỏ.
* Khi chương trình chạy nếu không gian stack hiện tại không đủ, Goroutines sẽ tự động tăng không gian stack
* Do chi phí việc khơi tạo nhỏ nên ta có thể dễ dàng giải phóng hàng ngàn goroutines

Trong Java thì các `thread` được quản lý bởi hệ điều hành nên chương trình đang xử lý đồng thời bị phụ thuộc vào hệ điều hành. Còn Golang sử dụng `Go runtime` có cơ chế riêng cho goroutines, nó dùng một số kỹ thuật ghép các `goroutines` với các `thread` của hệ điều hành.


| Thread | Goroutines |
| -------- | -------- |
| Thread được quản lý bởi hệ điều hành và phụ thuộc vào số nhân của CPU     |  Goroutines được quản lý bởi `go runtime` và không phụ thuộc vào số nhân CPU    |
| Thread có kích cỡ vùng nhớ stack cố định     |  Goroutines có kích cỡ vùng nhớ stack tùy theo chương trình    |
| Giao tiếp giữa các thread khá khó. Có đỗ trễ lớn trong việc tương tác giữa các thread     | Goroutines sử dụng channels để tương tác với nhau với độ trễ thấp     |
| Thread có định danh     | Goroutine không có định danh     |
| Khơi tạo và giải phóng thread tốn nhiều thời gian     | Goroutines được khởi tạo và giải phóng bởi `go runtime` nên rất nhanh     |



## Ví dụ về goroutines

Để khởi tạo một goroutine ta sử dụng cú pháp:

```Go
go functionName(tham số 1, tham số 2, ...)
```

Ví dụ
```Go
package main
import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Application start")

	go func() {
		for i := 0; i < 5; i++ {
			fmt.Println("Goroutines: ", i)
		}
	}()

	fmt.Println("Application end")
	time.Sleep(time.Second)
}
```

Output lúc này sẽ là:
```
Application start
Application end
Goroutines:  0
Goroutines:  1
Goroutines:  2
Goroutines:  3
Goroutines:  4
```

Cũng là ví dụ trên nếu mình bỏ phần `time.Sleep(time.Second)` thì ta sẽ có output như sau:
```
Application start
Application end
```

Tại sao lại như vậy? Mặc dù mình đã gọi hàm in ra bằng goroutines rồi nhưng lại không thấy kết quả? Ta có output như vậy bởi vì khi chương trình chạy xong các goroutines sẽ bị hủy. Mình có sử dụng hàm `time.Sleep(time.Second)` để cho chương trình đợi một giây rồi mới kết thúc để goroutines chạy.

Đến đây sẽ phát sinh ra một vấn đề là mình không hề biết hàm được gọi bằng goroutines đó mất bao lâu để thực hiện, không lẽ ta sẽ dự tính thời gian hàm đó chạy rồi cho `sleep` ở hàm main? Không lúc này ta sẽ dùng đến `sync.WaitGroup` và `channel`.

### sync.WaitGroup
Ta sẽ bỏ phần  `time.Sleep(time.Second)` từ ví dụ ban đầu và thêm `WaitGroup` cho nó như sau:
```Go
package main
import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	fmt.Println("Application start")

	wg.Add(1)
	go func() {
		for i := 0; i < 5; i++ {
			fmt.Println("Goroutines: ", i)
		}

		wg.Done()
	}()

	fmt.Println("Application end")
	wg.Wait()
}

```
Output:
```
Application start
Application end
Goroutines:  0
Goroutines:  1
Goroutines:  2
Goroutines:  3
Goroutines:  4
```

Đầu tiên ta tiến hành tạo một `sync.WaitGroup` gọi hàm `Add(1)` vì ở đây mình chỉ gọi 1 goroutines nên sẽ thêm 1 nếu chương trình cần nhiều goroutines hơn thì các bạn sẽ thêm số lượng tương ứng vào `WaitGroup`. Sau đó trong hàm goroutines mình sẽ gọi đến hàm `Done()` để báo hiệu là goroutines đã chạy xong và ở hàm main mình có thêm hàm `Wait()` để chương trình chờ cho goroutines chạy xong rồi mới kết thúc.

### Channel
Channel trong Go là một đường ống kết nối các goroutines để chúng có thể chia sẻ dữ liệu cho nhau.
Để tạo channel ta sử dụng cú pháp:
```Go
make(chan <type>)
```
Gửi dữ liệu vào channel:
```Go
channelName <-
```
Nhận dữ liệu từ channel:
```Go
<- channelName
```

Mặc định quá trình gửi và nhận giữa các goroutines sẽ bị block đến khi cả 2 goroutines đã sẵn sàng để gửi và nhận. Để hiểu rõ hơn ta sẽ đi đến ví dụ bên dưới:
```Go
package main

import (
	"fmt"
	"time"
)

func main() {
	done := make(chan bool)

	fmt.Println("Application start")

	go func() {
		time.Sleep(time.Second)
		for i := 0; i < 5; i++ {
			fmt.Println("Goroutines: ", i)
		}
		done <- true
	}()

	fmt.Println("Application end")
	<-done
}
```
Output lúc này không thay đổi giống ví dụ bên trên. Ở đây mình có tạo một channel trên là `done` có kiểu `boolean` trong goroutine mình có truyền một tín hiệu `true` vào channel thể hiện là goroutine đã chạy xong và ở hàm main mình nhận dữ liệu đó ở cuối chương trình để đợi goroutine đó chạy xong rồi mới kết thúc.

Tiếp đến một ví dụ khác:
```Go
package main

import (
	"fmt"
	"time"
)

func main() {
	done := make(chan bool)

	fmt.Println("Application start")

	go func() {
		for i := 0; i < 5; i++ {
			fmt.Println("Goroutines: ", i)
		}
	}()

	fmt.Println("Application end")
	time.Sleep(time.Second)
	<-done
}

```
Output:
```
Application start
Application end
Goroutines:  0
Goroutines:  1
Goroutines:  2
Goroutines:  3
Goroutines:  4
fatal error: all goroutines are asleep - deadlock!
```
Ở đây ta xuất hiện một lỗi đó là **fatal error: all goroutines are asleep - deadlock!**. Như mình nói ở trên "`quá trình gửi và nhận giữa các goroutines sẽ bị block đến khi cả 2 goroutines đã sẵn sàng để gửi và nhận`" nên ở đây mình chỉ nhận dữ liệu ở hàm main mà trong goroutine kia mình không gửi gì qua channel nên chương trình sẽ bị lỗi.
Tương tự như vậy:
```Go
package main

import (
	"fmt"
	"time"
)

func main() {
	done := make(chan string)

	fmt.Println("Application start")

	done <- "Done"

	fmt.Println("Application end")
	time.Sleep(time.Second)
}
```
Ta cũng sẽ nhận được một lỗi **fatal error: all goroutines are asleep - deadlock!**. Mình tiến hành thêm đầu nhận của channel ở hàm main như sau:
```Go
package main

import (
	"fmt"
	"time"
)

func main() {
	done := make(chan string)

	fmt.Println("Application start")

	done <- "Done"
	fmt.Println(<-done)

	fmt.Println("Application end")
	time.Sleep(time.Second)
}
```
Khi chạy chương trình ta vẫn gặp đúng lỗi đó vì mặc dù ta đã thêm đầu nhận của channel rồi nhưng code được chạy tuần tự khi gặp dòng `done <- "Done"` thì chương trình đã gặp lỗi rồi nên channel vẫn chưa có đầu nhận dữ liệu.

Ta có thể giải quyết vấn đề này bằng `channel buffering`. Ta có đoạn code như sau:
```Go
package main

import (
	"fmt"
	"time"
)

func main() {
	done := make(chan string, 1)

	fmt.Println("Application start")

	done <- "Done"

	fmt.Println("Application end")
	time.Sleep(time.Second)
}
```
Output
```C
Application start
Application end
```
Ở đây khi mình đã khởi tạo `channel buffering` bằng cách truyền tham số thứ 2. `Channel buffering` cho phép ta có thể giới hạn giá trị mà channel nhận mà không cần đầu nhận tương ứng của giá trị đó.

Ngoài ra nếu chúng ta sử dụng channel như một tham số của hàm thì ta có thể định nghĩa xem tham số channel đó chỉ nhận hay gửi dữ liệu như sau:
```Go
package main

import (
	"fmt"
	"time"
)

func sendValue(number string, channel chan<- string) {
	for {
		channel <- number
	}
}

func receiveValue(channel <-chan string) {
	for v := range channel {
		fmt.Println(v)
	}
}
func main() {
	channel := make(chan string, 64)
	go sendValue("Hello", channel)
	go sendValue("Xin chao", channel)

	go receiveValue(channel)
	time.Sleep(time.Second)
}
```
Ouput bạn sẽ thấy chữ "Xin chao" và "Hello" sẽ được in ra liên tục. Ở đây cú pháp `channel chan<- string` thể hiện tham số channel này chỉ dùng để gửi dữ liệu còn `channel <-chan string` thể hiện chỉ để nhận dữ liệu.

# Lời kết

Qua bài viết này mình và các bạn đã cùng tìm hiểu về nguồn gốc, đặc điểm của Golang và goroutines. Những kiến thức trên cũng chỉ là do mình tự tìm hiểu và học từ người khác nếu có sai sót gì mong mọi người có thể góp ý để bài viết hoàn thiện hơn. Hy vọng qua bài viết này các bạn có thể hiểu hơn về cách tạo ra goroutines và cách chúng hoạt động. Cảm ơn các bạn đã theo dõi đến hết bài viết ❤️.

# Tham khảo
* Bộ tài liệu [Advanced Go Programming](https://github.com/zalopay-oss/go-advanced)
* [Go Doc](https://go.dev/doc/)