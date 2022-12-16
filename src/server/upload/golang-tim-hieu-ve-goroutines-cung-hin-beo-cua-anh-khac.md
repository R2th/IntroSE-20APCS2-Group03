Ở bài này, chúng ta sẽ cùng làm quen với 1 nhân vật mới: anh Khấc – fullstack developer của công ty A, crush của Hìn béo

## Tóm tắt kiến thức
* Goroutines là function/method chạy cùng lúc với function/method khác.
* Goroutines có nhiều lợi ích hơn so với thread:
    * Kích thước nhỏ: khi khởi tạo Goroutines chỉ tốn vài kb trong vùng nhớ stack, có thể resize được. Thread thì tốn ~ 2MB khi khởi tạo, không thể resize.
    * Hàng ngàn Goroutines có thể chạy trong 1 OS thread. Nếu thread này bị block, 1 thread mới được tạo ra. Một vài goroutines ở lại thread cũ để xử lý tiếp, số goroutines còn lại được chuyển qua thread mới để process tiếp. Cái này Go tự xử lý, anh em đọc cho vui, ko cần code gì cả.
    * Xử lý các vấn đề đọc/ghi dữ liệu cùng lúc giữa các vùng nhớ chung đơn giản thông qua channel.
* Start 1 goroutines bằng cách đặt từ khóa `go` trước method/function.

## Chém gió về Goroutines
Anh Khấc là 1 lập trình viên fullstack của công ty A. Anh làm đủ thứ, từ team member, frontend, backend, QA; thậm chí tới cả techlead hay PM nữa 💪.

Thi thoảng, anh hay rủ Phong đi trà đá, nhâm nhi điếu thuốc lào để bàn chuyện chơi bời, gái gú… à nhầm chuyện coding, chia sẻ kinh nghiệm sống 😄.
Đẹp trai, đa tài, nhà mặt phố, đi làm chỉ vì đam mê, anh Khấc trở thành hình tượng được nhiều chị em trong công ty mơ ước 😍, trong đó có Hìn béo. 

Một ngày đẹp trời, Hìn mặc cái váy xinh đẹp mới mua tới chỗ anh Khấc: 

– Anh Khấc, em đang học code Go. Có vài thắc mắc liên quan tới Goroutines, anh giải thích giúp em nhé.

Anh Khấc mỉm cười:
– Được. Nói anh nghe em biết gì về Goroutines rồi?

– Theo em được biết thì Goroutines là công cụ của Golang để thực hiện concurrency. Goroutines giống như thread, nhưng nhỏ hơn nhiều lần. Hàng ngàn goroutines có thể nằm trong 1 thread hệ thống.

– Nếu thread này bị block thì sao 🤔?

– Nếu thread này bị block, 1 thread mới được tạo ra. Một vài goroutines ở lại thread cũ để xử lý tiếp (ví dụ đợi người dùng nhập dữ liệu, sleep), các goroutines còn lại được chuyển sang thread mới để tiếp tục xử lý 🥸.

– Khá lắm. Thế em có thắc mắc gì?

– Em code thử 1 đoạn, nhưng chạy không đúng như mong muốn 

– Viết thử lên bảng anh xem.

Nói đoạn, anh Khấc thò tay vào túi quần, đưa cho Hìn bút của anh – cây bút dạ mà anh hay dùng, không phải bút kia , bảo Hìn viết lên bảng.

```go
package main

import (
	"fmt"
)

func hienCoXinhGaiKhong() {
	fmt.Println("Hien rat xinh gai")
}
func main() {
	go hienCoXinhGaiKhong()
	fmt.Println("Good bye")
}

––– output
Good bye
```

(Bạn đọc có thể chạy thử online ở đây: https://play.golang.org/p/LZMO0L1DGJR)

— Đây anh. Em muốn in ra ngoài output như sau
```
Hien rat xinh gai
Good bye
```
Nhưng chạy kiểu gì cũng chỉ in ra Good bye mà không in ra dòng Hien rat xinh gai

— À vì Go nó biết nhận diện sự thật. Nếu em nói sai thì nó sẽ không chạy đó.

— Đù má anh.

— Anh đùa thôi, do em chưa hiểu kĩ về cách hoạt động của Goroutines đó.

— Là như nào hả anh?

— Em cần nắm được hai điểm: Thứ nhất: khi em sử dụng goroutines để gọi một hàm, thì hàm đó sẽ được return ngay lập tức. Thứ hai: chương trình luôn có một goroutines chính, gọi là main goroutines. Khi goroutines này bị terminated thì toàn bộ chương trình sẽ dừng lại. Các goroutines khác cũng sẽ bị terminated theo.

— Như vậy thì goroutines chạy hàm hienCoXinhGaiKhong bị terminated do goroutines chính bị terminated?

— Đúng vại. Bây giờ em thử cho hàm main sleep 1s thử xem.

```go
package main

import (
	"fmt"
	"time"
)

func hienCoXinhGaiKhong() {
	fmt.Println("Hien rat xinh gai")
}
func main() {
	go hienCoXinhGaiKhong()
	time.Sleep(1 * time.Second)
	fmt.Println("Good bye")
}

–– output
Hien rat xinh gai
Good bye
```

(Bạn đọc có thể chạy online ở đây: https://play.golang.org/p/hrb4jycS3dj)

— Oh, em thấy in ra kết quả rồi nè. Anh Khấc đẹp trai, à nhầm giỏi quá. Hihi 

— Bây giờ anh lấy 1 ví dụ, em thử đoán xem kết quả sẽ như thế nào nhé

```go
package main

import (
	"fmt"
	"time"
)

func test1(){
	time.Sleep(100 * time.Millisecond)
	fmt.Println("Trứng rán cần mỡ")
	time.Sleep(100 * time.Millisecond)
	fmt.Println("Yêu không cần cớ")
}

func test2(){
	time.Sleep(150 * time.Millisecond)
	fmt.Println("Bắp cần bơ")
	time.Sleep(150 * time.Millisecond)
	fmt.Println("Cần cậu cơ")
}

func main() {
	go test1()
	go test2()
	time.Sleep(2 * time.Second)
	fmt.Println("Good bye")
}
```

— Em đoán kết quả sẽ là

```
Trứng rán cần mỡ
Bắp cần bơ
Yêu không cần cớ
Cần anh Khấc cơ
Good bye
```
— Đúng rồi, Hìn đốm lưỡi, à nhầm, thông minh quá. Em nhìn hình sau để hiểu kĩ hơn nè:

![Sơ đồ chạy](https://images.viblo.asia/3518a225-05ac-4812-b399-25790e909757.png)

— Oh. Em hiểu hơn về Goroutines rồi. Nhưng mà cứ dùng sleep nghe có vẻ không ổn anh nhỉ? Chương trình chạy sẽ bị chậm và không được tối ưu lắm.

— Ừ. Viết thế này để em hiểu hơn về Goroutines thôi. Còn nhiều thứ hay ho về concurrency trong Go lắm: `channel`, `wait group`, `deadlock`, `mutex`,… Em dùng những thứ này sẽ kiểm soát được Goroutines mà không cần sleep.

— Nghe thú vị nhỉ. Dạy em mấy cái đấy đi.

— Ừ, từ từ để thằng Phong nó bịa content viết bài đã nhé 🤣

Bài viết được trích từ blog của mình: [Link](https://minhphong306.wordpress.com/2020/04/05/golang-tim-hieu-ve-goroutines-cung-hin-beo-cua-anh-khac/)

Cảm ơn bạn đã bỏ thời gian đọc bài. Nếu có điểm nào chưa đúng, bạn hãy cho mình biết nhé ^^