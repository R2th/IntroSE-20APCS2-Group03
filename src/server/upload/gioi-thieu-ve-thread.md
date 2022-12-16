# Thread là gì?
Một *thread* là đơn vị thực thi nhỏ nhất có thể được quản lý bởi hệ điều hành. *Process* là một nhóm các thread có liên kết, thực thi cùng nhau trên cùng một môi trường và cùng chia sẻ tài nguyên trên đó với nhau. Nghĩa là các thread trong cùng một process chia sẻ với nhau cùng một memory space và có thể giao tiếp trực tiếp với nhau. 

Một thread không thể tồn tại bên ngoài một process. Ngoài ra, mỗi một thread chỉ có thể tồn tại trong một process.

Một thread còn có thể coi là một light-weight processes. Một *single-threaded process* là một process chỉ tồn tại duy nhất một thread, một *multi-threaded process* là một process có thể tồn tại một hoặc nhiều thread.

Thread được sử dụng chủ yếu để cải thiện ứng dụng thông qua việc tính toán song song (parallelism). Trên thực tế chỉ có một thread được thực thi tại một thời điểm bởi CPU, nhưng CPU có thể chuyển đổi nhanh chóng giữa các thread để tạo hiệu ứng giống như các thread đang được thực thi song song với nhau.

Một *task* là một đơn vị công việc đơn lẻ được thực hiện bởi một thread. Một thread có thể hoàn thành nhiều task độc lập nhưng chỉ có thể có một task tại một thời điểm.

![](https://images.viblo.asia/45fbdc07-4e24-4c75-9ad9-a975770e3e77.png)

Hình trên mô tả một ví dụ về một process model. Một process duy nhất với 3 thread. Nó cũng cho ta thấy cách chúng có thể map với một số lượng n CPU tùy ý có sẵn trong hệ thống.

# Phân biệt các kiểu thread
Có thể khá là bất ngờ khi mà tất cả các ứng dụng java, bao gồm các ứng dụng phức tạp đến các ứng dụng Hello word đều là ứng dụng đa luồng. Để làm rõ vấn đề này, ta sẽ tìm hiểu về *system-defined threads* và *user-defined threads* trong java.

Một *system-defined thread* là một thread được tạo ra bởi JVM và chạy ở background của ứng dụng. Ví dụ,  garbage-collection (gc) thread là một system-defined thread, nó được tạo ra bởi JVM và chạy trên background, giúp giải phóng bộ nhớ không sử dụng. Hầu hết các system-defined thread sẽ không cần và không được các developer để ý tới trong phần lớn trường hợp. Khi một system-defined thread gặp sự cố và không thể khôi phục lại được, chẳng hạn như hết bộ nhớ, nó sẽ tạo ra Java error thay vì Exception.  Mặc dù có thể bắt được error nhưng thông thường thì các ứng dụng sẽ không thể tiếp tục hoạt động bình thường sau đó. (Tham khảo thêm tại [đây](https://stackoverflow.com/questions/912334/differences-between-exception-and-error))

Một *user-defined thread* đều có thể được đánh dấu là  là một thread được các developer của ứng dụng đó tạo ra để thực hiện một số task cụ thể nào đó. Tất cả các ứng dụng mà chúng ta tạo ra từ trước đến nay đều là ứng dụng đa luồng, nhưng phần lớn chúng chỉ chứa một user-defined thread, chính là thread gọi đến hàm `main()`. Để đơn giản, ta có thể gọi các ứng dụng này là các ứng dụng đơn luồng, do chúng ta thường không quan tâm nhiều đến các system-defined thread.

**Note**: Một *daemon thread* là một thread mà sẽ không ngăn JVM giải phóng khi mà chương trình đã kết thúc. Một ứng dụng java chỉ kết thúc khi tất cả các thread đang hoạt động đều là *daemon thread*. Ví dụ, nếu garbage-collection thread là thread duy nhất còn đang chạy thì JVM sẽ tự động tắt. Cả *system-defined thread* và *user-defined thread* đều có thể được đánh dấu là *daemon thread*. (Tham khảo thêm về daemon thread tại [đây](https://www.geeksforgeeks.org/daemon-thread-java/))

# Thread Concurrency
Ở đầu bài viết, ta đã đề cập đến vấn đề xử lý đa luồng cho phép hệ điều hành thực thi nhiều thread cùng một lúc. Thuật ngữ *concurrency* được sử dụng để chỉ thao tác thực thi nhiều thread và processes trong cùng một thời điểm. Tất nhiên, với hệ thống CPU đơn nhân, chỉ có một task thực sự được thực hiện tại một thời điểm nhất định. Ngay cả trong các hệ thống multi-core hoặc multi-CPU, thường có nhiều luồng hơn so với các CPU processors có sẵn. Vậy làm thế nào để hệ điều hành quyết định những gì sẽ được thực thi khi có nhiều thread có sẵn?

Hệ điều hành sử dụng *thread scheduler* để xác định xem thread nào sẽ được thực thi tại một thời điểm nhất định. Tiếp tục với ví dụ đã nêu ở phần trên 

![](https://images.viblo.asia/45fbdc07-4e24-4c75-9ad9-a975770e3e77.png)

Ví dụ, thread scheduler được sử dụng là *round-robin schedule* trong đó mỗi thread khả dụng có cùng chu kỳ CPU để thực thi và các thread được truy cập theo thứ tự vòng tròn. Nếu có 10 thread khả dụng, mỗi thread có thể nhận được 100 mili giây để thực thi, và quá trình quay trở lại thread đầu tiên sau khi thread cuối cùng được thực thi.

Khi một thread đa sử dụng hết thời gian được phân bố của mình trong chu kỳ sử dụng CPU nhưng vẫn chưa hoàn tất quá trình xử lý, *context switch* sẽ được thực hiện. *Context switch* là một process lưu trữ trạng thái hiện tại của một thread và sau đó khôi phục lại trạng thái này để tiếp tục thực thi. Lưu ý, thường sẽ có tài nguyên bị tiêu tốn liên quan đến *context switch* để tiết kiệm thời gian tải lại trạng thái của thread.

Cuối cùng, một thread có thể interrupt hoặc supersede một thread khác nếu nó có mức ưu tiên cao hơn thread kia. Mức độ ưu tiên của thread ( thread priority) là một giá trị numeric liên kết với thread và được thread scheduler kiểm tra mỗi khi xác đinh xem thread nào được thực thi. Trong java, mức độ ưu tiên của thread được định nghĩa bằng một giá trị `integer`. Class `Thread` có sẵn ba hằng số static `MAX_PRIORITY`(10), `MIN_PRIORITY`(1), `NORM_PRIORITY`(5) . Theo mặc định, các user-defined thread sẽ nhận được giá trị ưu tiên là `Thread.NORM_PRIORITY`, nếu cần thự hiện một thread ngay lập tức, tăng giá trị này lên 6 hoặc cao hơn hoặc sử dụng `Thread.MAX_PRIORITY`. Nếu hai thread có cùng mức độ ưu tiên, thread scheduler sẽ tùy ý chọn thread xử lý trước trong hầu hết các tình huống.

# Sự quan trọng của Thread Scheduling
Ngày nay mặc dù multi-core CPU đã rất phổ biến, nhưng single-core CPU đã là tiêu chuẩn trong máy tính cá nhân trong suốt nhiều thâp kỷ. Trong thời gian này, các hệ điều hành đã phát triển các thuật toán thread-scheduling và context-switching phức tạp cho phép thực thi hàng chục hoặc thậm chí hàng trăm thread trên hệ thống single-core CPU. Các thuật toán lập lịch này cho phép tạo ra hiệu ứng rằng nhiều task đang được thực hiện cùng một lúc trong một hệ thống một CPU. Ví dụ, một người dùng có thể nghe nhạc trong khi đang đọc báo và nhận thông báo về tin nhắn mới trong cùng một lúc. Vì số lượng thread thường lớn hơn rất nhiều so với lượng CPU đang có sẵn ngay cả trong các hệ thống multi-core, do đó các thuật toán  thread-scheduling vẫn được sử dụng trong các hệ điều hành ngày nay.

-----

Tài liệu tham khảo

Jeanne Boyarsky, Scott Selikoff. *OCP Oracle Certified Professional Java SE 8 Programmer II Study Guide Exam*

https://afteracademy.com/blog/what-is-a-thread-in-os-and-what-are-the-differences-between-a-process-and-a-thread