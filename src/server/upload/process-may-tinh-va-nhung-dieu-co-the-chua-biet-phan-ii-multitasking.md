Tiếp nối phần I mình đã tìm hiểu Process như thế nào, các component của 1 **Process**, và cách **Process** hoạt động. Phần tiếp theo này chúng ta cùng xem liệu **Multitasking** có phải là bến đỗ hạnh phúc khi muốn optimize thời gian chạy của 1 chương trình

Vậy **Multitasking** là gì? Bản chất nó là một phương thức cho phép nhiều Process cùng chia sẻ các vi xử lý (**CPUs**) và các tài nguyên khác của hệ thống. Mỗi CPU (**Core**) chỉ thực thi 1 tác vụ (Task) tại 1 thời điểm duy nhất. Tuy nhiên **Multitasking** cho phép mỗi một CPU có thể chuyển đổi giữa các tác vụ đang thực thi mà không cần phải chờ từng tác vụ kết thúc. Tuỳ theo mỗi hệ điều hành mà việc chuyển đổi này có thể xảy ra khi các tác vụ đầu ra vào (**I/O Operation**) được khởi tạo và chờ kết thúc, hay khi một tác vụ nào đó giải phóng khỏi CPU, hay khi có ngắt phần cứng (**Hardware Interrupts**) và khi bộ lập lịch của hệ điều hành quyết định một Process nào đó đã hết thời gian sử dụng CPU để chạy

Một dạng phổ biến của **Multitasking** là phương thức để xen kẽ việc thực thi của các Process cũng như Thread, và thậm chí là cả các tác vụ chạy riêng của **Kernel** , hay còn được gọi là **CPU's time-sharing**.  Mặc dù tính năng sau chỉ khả thi trong các nhân ưu tiên như Linux. Preemption có một side-effect khá quan trọng cho các **Process** có tương tác, vì được ưu tiên đối với các **CPU bound Process**. Thường sẽ có 2 loại Process: 
* **CPU bound** là các Process có tốc độ thực thi phụ thuộc vào tốc độ **CPU**. Một tác vụ thực hiện việc tính toán trên một tập nhỏ các số, ví dụ nhân 2 ma trận, tính số thập phân của số PI
* **I/O bound** là các Process có tốc độ thực thi phụ thuộc vào tốc độ hệ thống **I/O**. Ví dụ như tương tác với ổ đĩa (**Disk**) hay networking. Một chương trình đọc file là 1 I/O bound Process bởi vì nó bị bottleneck khi đọc dữ liệu từ **Disk**
Thế nên người dùng sẽ ngay lập tức được cấp tài nguyên máy tính khi bấm một phím hay khi di chuyển chuột. Trong hệ thống chia sẻ thời gian (**time-sharing systems**), context switches được thực hiện rất nhanh, thế nên cảm giác như nhiều Process được thực thi một cách đồng thời trên cùng một CPU. Việc thực thi động thời nhiều **Process** được gọi là **Concurrency**. Mình xin lưu ý là Concurrency not Parallel. Mình sẽ có một bài viết chia sẻ về topic này. Hoặc các bạn có thể tham khảo [ở đây](https://medium.com/@itIsMadhavan/concurrency-vs-parallelism-a-brief-review-b337c8dac350#:~:text=makes%20them%20different.-,Concurrency%20is%20about%20dealing%20with%20lots%20of%20things%20at%20once,at%20the%20same%20time%20instant.)

Thông thường một Process của hệ thống máy tính sẽ bao gồm:
**Image** là mã máy có thể thực thi giao tiếp với một chương trình
**Memory** (thường là Virtual Memory) là nơi bao gồm mã thực thi, dữ liệu I/O, một call stack (theo dõi các chương trình con đang hoạt động), một heap để lưu trữ các dữ liệu tính toán tạm thời trong thời gian chạy (runtime)
**OS descriptor** được phân bổ cho các Process, **Data Source**, **Data Sink**
Thuộc tính **Security** như thông tin người sở hữu Process, danh sách quyền của Process đó
Trạng thái **CPU** như là nội dung các thanh ghi (registers) và địa chỉ vật lý của bộ nhớ.

Các thông tin trên sẽ được hệ điều hành lưu trữ dưới dạng dữ liệu có cấu trúc gọi là **Process Control Block**

![](https://images.viblo.asia/4d693fe8-1a14-4df2-97e4-c67f90d20a89.png)

Hệ điều hành sẽ giữ các **Process** tách biệt hoàn toàn với nhau, và cấp phát tài nguyên khi **Process** cần, thế nên các **Process** sẽ không ảnh hưởng lẫn nhau và gây lỗi hệ thống (ví dụ như Deadlock, Thrashing). Hệ điều hành cung cấp cơ chế cho việc giao tiếp giữa các Process để cho phép các Process tương tác một các an toàn

Đến đây các bạn có thể thấy việc thực thi Multitasking sẽ giúp các ứng dụng có thể chạy một cách đồng thời và giải quyết vấn đề Latency trong hệ thống khi việc thực thi các tác vụ sẽ làm việc theo cách bất đồng bộ. Khái niệm **Asynchronous** hay **Concurrency** trong bài viết các bạn sẽ gặp rất nhiều trong các ngôn ngữ phát triển như NodeJS với **Event loop**, Golang với **Goroutine** .... Ý tưởng triển khai các bạn sẽ thấy khá giống nhau khi việc xử lý các bạn có thể xử lý Multitasking. Phần tiếp theo mình sẽ đưa thêm các ví dụ cụ thể khi triển khai trong ngôn ngữ Go. Have a nice day