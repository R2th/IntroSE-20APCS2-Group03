## Hadoop

Hadoop là framework dựa trên 1 giải pháp tới từ Google để lưu trữ và xử lý dữ liệu lớn. Hadoop sử dụng giải thuật MapReduce xử lý song song các dữ liệu đầu vào. Tóm lại, Hadoop được sử dụng để phát triển các ứng dụng có thể thực hiện phân tích thống kê hoàn chỉnh trên dữ liệu số lượng lớn.

Ưu điểm của Hadoop: 

-   Hadoop cho phép người dùng viết và kiểm tra nhanh trên hệ thống phân tán. Hadoop sử dụng hiệu quả và tự động phân tán dữ liệu và công việc qua nhiều máy trong cùng cụm.
-   Hadoop không yêu cầu phần cứng của các máy trong cụm, bất cứ máy tính nào cũng có thể là 1 phần của cụm Hadoop. Hadoop sẽ phân công công việc hợp lý cho mỗi máy phù hợp với khả năng của mỗi máy.
-   Hadoop cung cấp hệ thống có khả năng chịu lỗi và tính sẵn có cao. Thay vào đó thư viện Hadoop đã được thiết kế để xử lý lỗi từ tầng ứng dụng.
-   Cụm có thể add thêm hoặc remove đi các cluster trong cụm mà không ảnh hưởng tới các tiến trình đang chạy
-   Một lợi thế lớn khác của Hadoop là ngoài là mã nguồn mở, nó tương thích trên tất cả các nền tảng vì nó dựa trên Java

## Spark 

Trước khi Spark ra đời, Hadoop đang là một công cụ mạnh mẽ và phổ biến, tuy nhiên Hadoop có những hạn chế nhất định và Spark ra đời để cải thiện các hạn chế đó.

Spark ra đời với mục tiêu: 

-   Tối ưu hóa để xử lý lặp đi lặp lại đối với các bài toán học máy
-   Phân tích dữ liệu tương tác trong khi vẫn giữ được khả năng mở rộng và khả năng chịu lỗi của Hadoop MapReduce
-   Xử lý dữ liệu tinh vi
-   Xử lý dữ liệu streaming với độ trễ thấp

## Hadoop & Spark

Hadoop và Spark đồng hành với nhau, kết hợp cả hai, Spark có thể tận dụng các tính năng mà nó còn thiếu, chẳng hạn như hệ thống tệp. Spark cũng có thể tận dụng các lợi ích về bảo mật và quản lý tài nguyên của Hadoop. Với YARN, việc phân cụm Spark và quản lý dữ liệu dễ dàng hơn nhiều.

Bên dưới là danh sách bài viết về Spark và Hadoop cơ bản thông qua hiểu những khái niệm cơ bản và thực hành: 

- [Mô hình lập trình MapReduce cho Bigdata](https://demanejar.github.io/posts/mapreduce-programming-model/)
- [Giới thiệu tổng quan Hadoop](https://demanejar.github.io/posts/hadoop-introduction/)
- [Cài đặt và triển khai Hadoop single node](https://demanejar.github.io/posts/install-and-deploy-hadoop-single-node/)
- [Hadoop Ecosystem](https://demanejar.github.io/posts/hadoopo-ecosystem/)
- [HDFS](https://demanejar.github.io/posts/hdfs-introduction/)
- [Các câu lệnh thao tác với file và thư mục trên HDFS](https://demanejar.github.io/posts/hdfs-commands/)
- [Hadoop MapReduce và chương trình WordCount cơ bản với MapReduce](https://demanejar.github.io/posts/hadoop-mapreduce-and-wordcount-project/)
- [Tổng hợp các câu hỏi về Apache Hadoop](https://demanejar.github.io/posts/hadoop-question/)
- [Giới thiệu tổng quan về Spark](https://demanejar.github.io/posts/spark-introduction/)
- [Spark RDD](https://demanejar.github.io/posts/spark-rdd/)
- [Cài đặt Apache Spark standalone](https://demanejar.github.io/posts/install-apache-spark-ubuntu/)
- [Chương trình Word Count với spark-submit và spark-shell](https://demanejar.github.io/posts/word-count-with-spark-submit-and-spark-shell/)
- [Spark SQL, Dataframe và Dataset](https://demanejar.github.io/posts/spark-sql-dataframe-dataset/)
- [Phân tích dữ liệu bán lẻ với Spark SQL](https://demanejar.github.io/posts/retail-data-analytics-with-spark-sql/)
- [Window function, pivot trong Spark SQL](https://demanejar.github.io/posts/spark-sql-window-function-pivot/)
- [Window function, pivot trong Spark SQL (Part 2)](https://demanejar.github.io/posts/spark-sql-window-function-pivot-part-2/)
- [Spark Streaming](https://demanejar.github.io/posts/spark-streaming/)
- [Project Socket Stream với Spark Streaming](https://demanejar.github.io/posts/socket-stream/)
- [Project Log Analyzer với Spark Streaming](https://demanejar.github.io/posts/log-analyzer/)
- [Cài đặt Zeppelin Notebook](https://demanejar.github.io/posts/install-zeppelin/)
- [Spark Streaming với Kafka](https://demanejar.github.io/posts/spark-streaming-kafka/)
- [Giải thích về các chế độ chính khi chạy Spark](https://demanejar.github.io/posts/mode-in-spark/)
- [Bài toán phân cụm với Spark ML và xây dựng ứng dụng với Flask](https://demanejar.github.io/posts/sparkml/)

Rất nhiều các bài viết khác về Bigdata và liên quan liên tục được cập nhật tại [https://demanejar.github.io/](https://demanejar.github.io/).

Tham khảo: [https://demanejar.github.io/](https://demanejar.github.io/posts/hadoop-introduction/)