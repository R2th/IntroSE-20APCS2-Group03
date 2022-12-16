# Mục lục
1. [Những lý do để chọn GoLang là ngôn ngữ lập trình tiếp theo bạn nên tìm hiểu?](https://daothaison.me/go-1-nhung-ly-do-de-chon-go-lang-la-ngon-ngu-lap-trinh-tiep-theo-ban-nen-tim-hieu-daothaison1560763324)
2. [Bắt đầu với ngôn ngữ lập trình Go](https://daothaison.me/go-2-bat-dau-voi-ngon-ngu-lap-trinh-go-daothaison1560763325)

---
Trong một lần tham gia vào dự án, gặp phải nhiều hạn chế của ngôn ngữ lập trình hiện tại mình đang sử dụng (PHP), khi tìm hiểu về giải pháp khắc phục, mình tìm thấy Golang như một vị cứu tinh ở thời điểm đó. Sau một thời gian ngắn tìm hiểu về  `Go`, từ góc nhìn của 1 người mới tiếp cận, mình "mới nhìn thấy" một số ưu điểm khiến `Go` sẽ là ngôn ngữ lập trình tiếp theo mà mình sẽ tìm hiểu và sử dụng.


# I. Về Go.
> Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.

Giới thiệu về `Go` một chút thì `Go` là một ngôn ngữ lập trình nguồn mở giúp dễ dàng xây dựng phần mềm đơn giản, đáng tin cậy và hiệu quả. `Go` được tạo ra vào năm 2007 bởi gã khổng lồ Google, ban đầu,mục tiêu của `Go` là nhắm tới sử dụng nội bộ trong các công ty sở hữu cơ sở hạ tầng riêng, nhưng tiềm năng đã đẩy `Go` dần trở nên phổ biến hơn. Năm 2009, `Go` chính thức được release và phát triển mạnh mẽ như ngày hôm nay.

# II. Những lý do khiến Go trở thành ngôn ngữ lập trình tiếp theo mà bạn nên tìm hiểu.
## 1. Go phát triển nhanh hơn bất kỳ ngôn ngữ nào khác.

Đầu năm 2017, theo thống kê của [trang Zdnet](https://www.zdnet.com/article/googles-go-beats-java-c-python-to-programming-language-of-the-year-crown/), Go vượt qua các đối thủ, độ phổ biến đạt 2.6%, leo từ vị trí 54 ở năm 2016 lên vị trí 13. Chưa hề có 1 ngôn ngữ nào có tốc độ phổ cập nhanh như vậy.

## 2. Go biên dịch ra nhiều nền tảng.

Mình tiếp cận `C/C++` từ thời sinh viên, đặc biệt yêu thích chúng, nhưng có lẽ do thời đại Web cùng lúc – dễ kiếm tiền, nên mình chuyển sang sử dụng PHP để kiếm cơm. Tuy nhiên, ưu điểm biên dịch ra mã máy của C giúp tốc độ thực thi nhanh và vấn đề triển khai cũng rất gọn gàng với chỉ 1 file duy nhất, chương trình có tính ổn định cao là những ưu điểm của biên dịch so với thông dịch.

Ngôn ngữ lập trình `Go` cũng biên dịch như `Java`, nhưng không như `Java` phải cần `Java Virtual Machine` để thực thi vì `Java` biên dịch ra `Byte code`, `Go` biên dịch ra `mã máy (Machine code)` nên có thể chạy ngay với hệ điều hành nó biên dịch ra mà không cần cài đặt gì thêm. Có nghĩa là từ máy tính của mình, có thể biên dịch ra các chương trình chạy trên `Mac, Window, Linux,` sau khi biên dịch, chỉ cần 1 file duy nhất, copy đến hệ điều hành đích là chạy, rất đơn giản. Đây là tính năng ấn tượng nhất, bao gồm cả việc build rất nhanh!

## 3. Sử dụng nhiều Core
Ở những năm 90, một trong những thay đổi lớn của phần cứng máy tính chính là việc bổ sung thêm các `core`. `Quad-core và octa-core CPUs` giúp nâng cao đáng kể hiệu năng xứ lý. Tuy nhiên, các ngôn ngữ lập trình được tạo ra vào trước thời điểm đó chỉ chạy trên các máy tính đơn nhân, và chúng được xây dựng không phải chủ đích để chạy trên `multi-core`. Nhưng `Go` thì khác, việc sinh sau đẻ muộn đã tạo ra lợi thế cho nó, phần cứng máy tính có thể mở rộng core, khiến cho Go trở thành ngôn ngữ có thể dễ dàng scale hơn.

## 4. Concurrency và Goroutines

`Concurrency` là tính năng chủ lực của ngôn ngữ lập trình `Go` để tận dụng năng lực xử lý của CPU. Thông thường các ngôn ngữ lâp trình khác phải phụ thuộc sự cấp phát tài nguyên của hệ điều hành để có thể chạy `Concurrency`, trong khi đó `Go` có thể chạy `Concurrency` mà không phụ thuộc hệ điều hành. `Concurrency` gần giống với `thread`, trong `Go` thì việc giao tiếp giữa các `goroutine` khá đơn giản với `channel`, có thể truyền dữ liệu giữa các `goroutine` với nhau bằng bất cứ loại dữ liệu nào. Nếu như 1 `Thread` của Java được tạo ra, nó sử dụng xấp xỉ 1MB bộ nhớ của Heap, nếu bạn tạo ra 1000 Thread như vậy, chúng sẽ tạo ra áp lực lớn lên heap dẫn tới việc hệ thống bị tắt bởi vì thiếu hụt bộ nhớ, mặt khác, việc giao tiếp giữa 2 hoặc nhiều Thread cực kỳ khó khăn. Nhưng với `Go` thì khác, khi việc sử dụng `bộ vi xử lý multi-core` khả thi, `Goroutines` hoàn toàn có thể thay thế được Thread. Mỗi `Goroutines` chỉ sử dụng 2KB bộ nhớ từ heap, như vậy bạn có thể tạo ra hàng triệu goroutines bất kỳ lúc nào.

Ví dụ về sử dụng Goroutines
``` Go
package main
import "fmt"
func f(from string) {
    for i := 0; i < 3; i++ {
        fmt.Println(from, ":", i)
    }
}

func main() {
    f("direct")
    
    // Sử dụng go f() để thực thực hàm f() trong goroutines.
    go f("goroutine")
    
    go func(msg string) {
        fmt.Println(msg)
    }("going")
    
    fmt.Scanln()
    fmt.Println("done")
}

// Output
direct : 0
direct : 1
direct : 2
goroutine : 0
going
goroutine : 1
goroutine : 2
<enter>
done
```

Ngoài ra, `Goroutines` còn đem lại những lợi ích:

- Goroutines sử dụng bộ nhớ một cách linh hoạt cho `segmented stack`, sẽ tự tăng memory khi cần thiết.
- Thời gian khởi động của Goroutines nhanh hơn so với Thread
- Communicate giữa các Goroutines sử dụng channel cực an toàn.
- Goroutines và OS thread không tồn tại 1:1. Mỗi Gorountine có thể chạy đồng thời nhiều threads, chúng có thể ghép vào OS threads.

## 5. Dễ dàng maintain.

Cú pháp của `Go` cực kỳ đơn giản, không có những cú pháp quá phức tạp giống như các ngôn ngữ khác. Những người phát triển Go đến từ Google, nơi có quy mô code-base lớn và hàng nghìn developers cùng làm việc, vì vậy source code phải đơn giản để bất kỳ developer nào cũng có thể hiểu được và mỗi đoạn code đều hạn chế tối thiểu side effect. Điều đó làm cho code có thể maintain một cách dễ dàng và đơn giản để thay đổi.

Mặt khác, `Go` bỏ qua nhiều đặc tính của lập trình hướng đối tượng OOP.
- Không có Class. Mọi thứ đều được gói vào trong các package. `Go` chỉ có structs.
- Không hỗ trợ kết thừa.
- Không constructor, annotation, generics hay exceptions.

Điều đó khiến `Go` trở nên khác biệt so với phầ n còn lại. Nhìn theo mặt tích cực, nó khiến code trở nên ngắn gọn, dễ hiểu hơn.

# Tạm kết
Ngoài ra, `Go` còn được chống lưng bởi Google, điều này giúp ta tin tưởng vào lộ trình phát triển của Go, độ phổ cấp của nó trong tương lai. Hơn nữa, có rất nhiều công nghệ phát triển bên cạnh `Go`, như [Go kit](https://github.com/go-kit/kit) - là 1 thư viện để xây dựng microservices, giải quyết các vấn đề về phân tán hệ thống, kiến trúc ứng dụng , Cloud computing, realtime web, web server. Ngôn ngữ lập trình Go chỉ mới có 6 năm tuổi đời nên sẽ còn có nhiều điều để phát triển so với các bậc tiền bối C, C++, Java.