Series Golang:
* [[Series Golang]1: Golang là gì? Tại sao nên dùng golang?](https://viblo.asia/p/series-golang1-golang-la-gi-tai-sao-nen-dung-golang-Eb85ozM2l2G)
* [[Series Golang]2: Vượt chướng ngại vật - Golang](https://viblo.asia/p/series-golang2-vuot-chuong-ngai-vat-golang-eW65GBwxlDO) 
* [[Series Golang]3: Tăng tốc - Golang - Struct, Pointer, Receiver, Interface](https://viblo.asia/p/series-golang3-tang-toc-golang-struct-pointer-receiver-interface-ORNZqp63K0n)
* [[Series Golang]4: Golang - Concurrency, Goroutines, Channels](https://viblo.asia/p/series-golang4-golang-concurrency-goroutines-channels-vyDZOBAaKwj) **<= Bạn đang ở đây**

Ở bài viết trước, mình chia sẽ về Golang là gì, tại sao nên dùng Golang. Nếu bạn chưa biết và chưa động lực để học về golang thì có thể đọc qua để lấy động lực nhé [[Series Golang]1: Golang là gì? Tại sao nên dùng golang?](https://viblo.asia/p/series-golang1-golang-la-gi-tai-sao-nen-dung-golang-Eb85ozM2l2G). Mình cũng tổng hợp những kiến thức liên quan tới biến, Map với bài viết [[Series Golang]2: Vượt chướng ngại vật - Golang](https://viblo.asia/p/series-golang2-vuot-chuong-ngai-vat-golang-eW65GBwxlDO), struct, con trỏ, methods, interface ở bài viết [[Series Golang]3: Tăng tốc - Golang - Struct, Pointer, Receiver, Interface](https://viblo.asia/p/series-golang3-tang-toc-golang-struct-pointer-receiver-interface-ORNZqp63K0n)Các bạn có thể tham khảo nhé. Hôm nay chúng ta sẽ tiếp tục tìm hiểu Golang với chủ đề Concurrency, Goroutines, Channels trong Golang nhé.

## 1. Concurrency
**Concurrency là gì?** Concurrency là khả năng thực hiện nhiều tác vụ cùng một lúc. 

Golang là ngôn ngữ lập trình đồng thời(concurrency), không phải là ngôn ngữ lập trình song song(parallel) giống java.

Chúng ta sẽ cùng tìm hiểu kĩ hơn concurrency là gì, concurrency khác với parallel ở điểm nào ở phần tiếp theo nhé.

**Khác nhau giữa concurrency và Parallel:**

Ví dụ về concurrency trong đời sống: Bạn A là lập trình viên với phong cách vừa code, vừa nghe nhạc. Sau một hồi code mệt mỏi, A dừng tay để uống nước, uống nước xong A lại tiếp tục code. Trong ví dụ này, A vừa code vừa *enjoy* nhạc, hai hành động này xảy ra song song(parallel) - đó chính là **Parallel**. Hành động A dừng code để uống nước, sau đó tiếp tục code. Hành động code tạm dừng để chuyển sang hành động uống nước, uống nước xong A tiếp tục code - đó chính là **concurrency**. 

Parallel sẽ xử lí nhiều tác vụ cùng một thời điểm. Thực hiện tác vụ kiểu parallel là sự kết hợp giữa hardware và software.
* Với trường hợp CPU có nhiều core, mỗi tác vũ sẽ chạy trên core một cách đồng thời. Nếu số tác vụ vượt quá số lượng core của CPU, các tác vụ sẽ được chia ra để xử lí trên các core, sau một khoản thời gian nhất định, các tác vụ đang chạy trên core sẽ được tạm dừng và thay thế bằng những tác vụ khác. Mỗi lần chuyển đổi, bộ xử lí cần phải chuyển context. Một vài trường hợp, nhiều tác vụ cần phải đợi một vài tác vụ khác xử lí xong mới xử lí tiếp được, điều đó dẫn tới yêu cầu cần phải giao tiếp giữa các tác vụ với nhau, sẽ mất khá nhiều thời gian.
* Với trường hợp CPU chỉ có một core, các tác vụ cũng sẽ chia ra để thực hiện trên core đó, cũng chuyển context... như với trường hợp nhiều core ở trên. 


![image](https://miro.medium.com/max/1318/1*bvgViDDOKC3HikokiROgYQ.png)

Concurrency sẽ xử lí nhiều tác vụ một lần. Thực hiện tác vụ kiểu Concurrency chỉ yêu cầu software, các tác vụ sẽ được thay phiên nhau để thực hiện. Một thời điểm chỉ có một tác vụ chạy ở một core. Nó khá giống với parallel chạy trên một core. Các task vụ giao tiếp với nhau qua vùng tài nguyên chung shared resource, điều này dẫn tới vấn đề dữ liệu bị thay đổi không đúng thứ tự. Ví dụ theo logic, task 1 làm giảm biến `a` trong tài nguyên chung(shared resource) xuống một đơn vị. Sau đó task 2 truy xuất biến `a` trong tài nguyên chung(shared resource) và in ra màn hình. Task 1 chạy xong tới task 2, kết quả in ra màn hình là `a-1` -> kết quả mong muốn. Nhưng nếu task 2 chạy trước task 1 thì kết quả in ra màn hình là `a` -> không giống mong muốn. Vậy nên, chúng ta cần phải quản lí thứ tự thực hiện của các task bằng Mutexes, Semaphores, Locks. 

Tuy nhiên, Golang sử dụng `goroutines` để cải thiện và giải quyết đáng kể các vấn đề của concurrency một cách hiệu quả hơn. Goroutines là gì?

## 2. Goroutines
Goroutines là các hàm hoặc phương thức chạy đồng thời với các hàm/phương thức khác. Goroutines được chia thành một số lượng nhỏ OS threads. Chúng chỉ tồn tại trong không gian ảo của runtime. Go có một stack được phân đoạn sẽ tăng hoặc giảm khi cần thiết do Go runtime quản lí, không phải OS.
* Goroutines có những lợi thế khác như thời gian khởi động. Goroutines bắt đầu nhanh hơn thread.
* Goroutines được tạo chỉ với kích thước 2 KB. Một luồng Java có kích thước ngăn xếp khoảng 1 MB, lớn hơn rất nhiều so với Goroutines.
* Goroutines giao tiếp với nhau thông qua channels. Các channel được thiết kế để ngăn ngừa các khả năng xung đột xảy ra khi truy cập bộ nhớ chung nhờ sử dụng Goroutines.

Cú pháp:
```
go <tên function>(<tham so>)
```
Ví dụ:
```
package main

import (  
    "fmt"
)

func hello() {  
    fmt.Println("Hello world goroutine")
}
func main() {  
    go hello()
    fmt.Println("main function")
}
```
Bạn nghĩ kết quả in ra màn hình sẽ là gì nào? Kết quả sẽ in ra `Hello world goroutine` và `main function`?

Oh no, Oh no, oh no. Kết quả thật sự chỉ là `main function`. Lí do bởi vì:
* Khi Goroutines khởi chạy, Golang không chờ Goroutines chạy xong mà thực hiện ngay dòng code tiếp theo. Vậy nên `main function` sẽ in ra trước khi `hello` function được chạy.
* Goroutines của hàm `main` chạy thì các goroutines của các hàm khác mới có thể chạy. Khi Goroutines của hàm main dừng thì tất các các goroutines khác cũng dừng. Vậy nên sau khi Goroutines của hàm `main` in dòng text `main function` ra màn hình xong rồi kết thúc, dẫn tới Goroutines của hàm `hello` cũng bị buộc dừng ngay khi chưa kịp thực hiện code bên trong nó.

Chúng ta có thể giải quyết vấn đề trên bằng cách trì hoãn việc dừng Goroutines của hàm main theo ví dụ sau:
```
package main

import (  
    "fmt"
    "time"
)

func hello() {  
    fmt.Println("Hello world goroutine")
}
func main() {  
    go hello()
    time.Sleep(1 * time.Second)
    fmt.Println("main function")
}
```
Tuy nhiên với trường hợp Goroutines của `hello` xử lí lâu hơn 1 giây thì chúng ta phải làm sao? Chúng ta sẽ tăng thời gian sleep của main goroutines lên? Tăng lên bao nhiêu là đủ? Cách này có vể không ổn lắm. Để giải quyết vấn đề này chúng ta sẽ đến với Channel.
## 3. Channels
Channel là kênh để Goroutines giao tiếp với nhau theo hai chiều gửi, nhận và đồng bộ việc thực thi giữa chúng.
### Khai báo một channel:
Cú pháp:
```
<tên channel> := make(chan <kiểu>)
```
Ví dụ:
```
done := make(chan bool)
```
### Gửi giá trị vào channel
Cú pháp:
```
<tên channel> <- <giá trị>
```
Ví dụ: 
```
done <- true
```
### Nhận giá trị từ channel
Cú pháp:
```
<biến lưu trữ giá trị> <- <tên channel>
```
Ví dụ:
```
result := <-done
```

Ví dụ đầy đủ:
```
package main

import (  
    "fmt"
    "time"
)

func hello(done chan bool) {  
    fmt.Println("hello go routine is going to sleep")
    time.Sleep(4 * time.Second)
    fmt.Println("hello go routine awake and going to write to done")
    done <- true
}
func main() {  
    done := make(chan bool)
    fmt.Println("Main going to call hello go goroutine")
    go hello(done)
    <-done
    fmt.Println("Main received data")
}
```
### Đóng channel
Cú pháp:
```
close(<tên channel>)
```
Ví dụ:
```
package main

import (  
    "fmt"
)

func producer(chnl chan int) {  
    for i := 0; i < 10; i++ {
        chnl <- i
    }
    close(chnl)
}
func main() {  
    ch := make(chan int)
    go producer(ch)
    for v := range ch {
        fmt.Println("Received ",v)
    }
}
```
Các bạn có thể coi thêm một ví dụ khác về channels ở github của mình:
https://github.com/Caophuc799/go-basic/blob/master/channels/main.go 
Tiện thể bạn cho mình vote sao cho github giúp mình luôn nhé. Cảm ơn bạn.
Mình sẽ tiếp tục đưa ra những ví dụ, phân tích thêm về Goroutines, Channels ở bài viết sau.
## 4. Tổng két
Bên trên là những ghi chú, tổng hợp được trong quá trình mình tự học Golang. Mình tự học chủ yếu ở [Golang document](https://golang.org/doc/) và [golangbot.com](https://golangbot.com/learn-golang-series/) và nhiều nguồn khác. Vậy nên, nếu bạn muốn tìm đến một nguồn đầy đủ chính thống có thể vào [Golang document](https://golang.org/doc/) hoặc [golangbot.com](https://golangbot.com/learn-golang-series/). Code mẫu mình cũng tham khảo ở [golangbot.com](https://golangbot.com/learn-golang-series/). Hi vọng những tổng hợp của mình có ích cho các bạn.

Vậy là chúng ta đã cùng đi qua bốn bài cơ bản về Golang bao gồm:
* [[Series Golang]1: Golang là gì? Tại sao nên dùng golang?](https://viblo.asia/p/series-golang1-golang-la-gi-tai-sao-nen-dung-golang-Eb85ozM2l2G)
* [[Series Golang]2: Vượt chướng ngại vật - Golang](https://viblo.asia/p/series-golang2-vuot-chuong-ngai-vat-golang-eW65GBwxlDO)
* [[Series Golang]3: Tăng tốc - Golang - Struct, Pointer, Receiver, Interface](https://viblo.asia/p/series-golang3-tang-toc-golang-struct-pointer-receiver-interface-ORNZqp63K0n)
* [[Series Golang]4: Golang - Concurrency, Goroutines, Channels](https://viblo.asia/p/series-golang4-golang-concurrency-goroutines-channels-vyDZOBAaKwj)

Qua bốn bài trên, các bạn cũng đã có những kiến thức cơ bản nhất định về Golang. Có thể sử dụng Golang trong lập trình.

Sắp tới mình sẽ ra thêm nhiều bài tổng hợp, phân tích những khía cạnh chuyên sâu hơn về Golang. Các bạn cùng đón đọc nhé.


# Sau tất cả
**Sau tất cả, mình là [Ryan Cao](https://ryancao.netlify.app/about/)**, là một developer chân chính đang trên đường chém gió. Để ủng hộ mình các bạn có thể upvote bài viết này, follow [Github Caophuc799](https://github.com/Caophuc799) và đón đọc các bài viết trên [Ryan Cao blog](https://ryancao.netlify.app/) chính thức của mình để mình có thêm động lực chia sẽ những bài viết hay, ý nghĩa khác nhé