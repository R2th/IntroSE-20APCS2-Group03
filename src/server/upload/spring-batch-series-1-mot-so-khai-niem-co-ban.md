## Dưới đây là một số khái niệm cơ bản mà mình tìm hiểu được, về từng phần mình sẽ nói rỏ hơn trong các bài post khác.

### 1. Batch processing

Batch processing (Xử lý hàng loạt) là chương trinh thực hiện một loạt các bước mà không có sự can thiệp của người dùng, có thể thực hiện qua lập lịch biểu và được cung cấp tài nguyên cho phép.

> Computerized batch processing is the running of "jobs that can run without end user interaction, or can be scheduled to run as resources permit.

### 2. Spring Batch

Spring Batch là một framework tài nguyên mở cho batch processing. Spring Batch cung cấp các phương thức, chứng năng được xây để xử lý các khối lượng dữ liệu lớn. [Spring Batch](https://spring.io/projects/spring-batch)
### 3. Mybatis
MyBatis là một class persistence framework được tạo ra để hỗ trợ cho việc sử dụng SQL, dùng để lưu trữ và nâng cao khả năng liên kết. [Mybatis](https://mybatis.org/mybatis-3/)
### 4. Cấu trúc của Spring Batch

![image](https://images.viblo.asia/759fe334-2a00-4363-b87a-bd44fd2f12e8.jpg)

- JobLaucher là một interface cho một thực thi Job thực hiện truyền tham số đầu vào .
- Job đã được định nghĩa ở trên sẽ nhận tham số truyền vào từ JobLaucher và thực thi từng bước đã được định nghĩa trong Job.
- Step được định nghĩa để điều khiển các cách thức hoạt động của batch processing. Trong Step tồn tại thành phần là Item Reader, Item Writer, Item Processor.
- JobRepository cung cấp CRUD cho JobLaucher, Job, Step trong quá trình thực thi.