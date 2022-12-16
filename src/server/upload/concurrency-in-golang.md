Xin chào mọi người, đợt này do công việc có biến động nên mình cũng có chuyển sang tìm hiểu một chút về Golang. Hôm nay mình xin phép được chia sẻ với mọi người một chút kiến thức về Concurrent in Golang. Mình dịch từ cuốn sách Go in Action. Mọi góp ý mọi người cứ để ở phần comment nhé. Cảm ơn mọi người nhiều. Bắt đầu nào:

**Concurrency**

* Một việc khó cho lập trình viên đó là viết một chương trình sử dụng hiệu quả tài nguyên của phần cứng mà chương trình sẽ chạy. Những chiếc máy tính hiện đại có nhiều cores, nhưng hầu hết những ngôn ngữ lập trình không có những công cụ hỗ trợ lập trình viên sử dụng hiểu quả những tài nguyên đó. Chúng thường yêu cầu nhiều mã (code) đồng bộ luồng (thread) dẫn đến dễ xảy ra lỗi. 

*  **Concurrency** là một trong những tính năng mạnh nhất của Go. **Goroutines** giống như **Thread**, nhưng sử dụng ít bộ nhớ (memory) hơn nhiều và yêu cầu ít mã (code) hơn để sử dụng. **Channels** là một cấu trúc dữ liệu cho phép bạn gửi thông điệp (messages) giữa các goroutines một các đồng bộ được hỗ trợ sẵn từ Go. Điều này tạo ra một mô hình (model) lập trình mà trong đó bạn gửi thông điệp (messages) giữa các goroutines thay vì việc goroutines chiến đấu để sử dụng chung một dữ liệu. Bây giờ chúng ta cùng tìm hiểu chi tiết hơn nhé.

**Goroutines**

Goroutines là những chức năng (functions) chạy đồng thời với những goroutines khác, bao gồm cả entry point (main function ) của chương trình. Trong những ngôn ngữ khác, bạn sử dụng luồng (thread) để làm những việc tương tự, nhưng trong Go nhiều goroutines thực thi trên một luồng (thread). Ví dụ, nếu bạn viết một webserver và bạn muốn xử lý nhiều request đồng thời, bạn sẽ viết rất nhiều code để sử dụng threads trong C hoặc Java. Trong Go, gói net/http đã hỗ trợ sử lý nhiều request đồng thời sử dụng **goroutines**. Mỗi request đến sẽ được tự động chạy trên goroutine của chính nó. Goroutines sử dụng ít bộ nhớ (memory) hơn luồng (thread) và Go runtime sẽ tự động lập lịch thực thi dựa vào một tập hợp các bộ xử lý logic đã được cấu hình trước. Mỗi bộ xử lý logic được liên kết với một OS thread. 

![Hình minh hoạ](https://images.viblo.asia/d68bf163-2acb-4a20-9e35-9c3a41f9559a.png)

Nếu bạn muốn thực thi một vài đoạn mã (code) đồng thời trong khi bạn chuyển sang một công việc khác, goroutine sẽ giúp bạn đạt được việc đó. Cùng xem ví dụ bên dưới: 
```golang
func log(msg string) {
        // write some logging code here
}

go log("something dire happened")
```

Từ khoá **go** là tất cả những gì bạn cần để lên kế hoạch cho chức năng log chạy như một goroutine và chạy đồng thời với những goroutines khác. Điều này có nghĩ là bạn có thể tiếp tục thực thi những đoạn mã (code) còn lại trong chương trình của bạn trong khi logging xảy ra đồng thời. Như đã nêu trước đó, **goroutines** có chi phí tối thiểu vì thế có thể tạo ra hàng triệu goroutines =)). Cái này mình sẽ chia sẻ thêm ở những phần sau nữa.

Mình sẽ dừng bài viết của mình ở đây. Bài sau mình sẽ chia sẻ về **Channels**. Hi vọng những kiến thức lý thuyết này sẽ giúp các bạn có thêm một cái nhìn về Golang và Concurrency trong Golang. Cảm ơn mọi người :) và hẹn gặp lại.