**Elastic Search là gì?**

Elastic Search viết tắt là ES, đó là một phần mềm công cụ tìm kiếm được phát hành theo giấy phép Apache Liense. Công cụ Search engine này tổ chức phân tán, được xây dựng theo cơ chế RESTful API như một server cloud. Được phát triển bằng java. Dựa trên nền tảng kế thừa và phát triển từ Lucene Apache.
Với các dữ liệu nhỏ và vừa bạn có thể tìm kiếm trên file, trên các nền tảng dữ liệu như Oracle, MySQL, MongoDB… nhưng đối với những trường hợp dữ liệu lớn thì bạn nên chọn cách tối ưu hơn bằng việc chuyển dữ liệu đó sang Elasticsearch và thực hiện tìm kiếm trên Elasticsearch sẽ mang lại hiệu quả rất lớn.

**Ưu điểm**

Có khả năng tìm kiếm mạnh mẽ dựa trên Apache Lucene và phân tích dữ liệu.
Có khả năng mở rộng theo chiều ngang.
Dù bạn có tìm kiếm từ khóa sai chính tả hay không đúng cú pháp thì vẫn được hỗ trợ trả về kết quả rất tốt.
Hỗ trợ đặc tả những câu truy vấn phức tạp một cách cụ thể và rõ ràng bằng JSON, các Structured Query DSL (Domain-Specific Language ), Elasticsearch client như Java, Php, JS, Ruby,….

**Nhược điểm**

Tuy Elasticsearch được tạo ra với mục đích tìm kiếm, nhưng với những nhiệm vụ khác ngoài search Curd thì elastic yếu hơn so với những database khác như Mongodb, Mysql …. Do vậy người ta ít khi dùng elasticsearch làm database chính như MongoDB hay Mysql.
Trong elasticsearch không có khái niệm database transaction, vì thế Elasticsearch không đảm bảo được dữ liệu của các hoạt động như Insert, Update hay Delete, khi chúng ta thực hiện thay đổi nhiều bản ghi nếu xảy ra lỗi thì sẽ làm cho logic của mình bị sai hay dẫn tới mất dữ liệu. Đây cũng là 1 phần khiến elasticsearch không nên là database chính.
Đối với những hệ thống thường xuyên cập nhật dữ liệu thì việc sử dụng Elasticsearch sẽ rất tốn kém cho việc đánh index dữ liệu.

**Cơ chế làm việc với Elasticsearch**

![](https://stackjava.com/wp-content/uploads/2018/07/elasticsearch-1.png)

Toàn bộ dữ liệu tổng hợp, dữ liệu được người dùng tải lên sẽ lưu vào database, tiếp theo chúng được đồng bộ hóa sang Elasticsearch. Từ đó, khi người dùng tìm kiếm thì sẽ tìm kiếm trên Elasticsearch, tốc độ vừa nhanh, vừa giảm tải cho database.

**Cài đặt ElasticSearch**

**Yêu cầu**

Trước khi cài đặt Elasticsearch bạn nên chắc rằng máy bạn đã từ Java 8 trở lên và phải thiết lập biến môi trường JAVA_HOME cho java, nếu không sẽ không cài đặt được.
Bằng cách kiểm tra bằng lệnh java -version bạn sẽ biết máy máy mình đã cài Java chưa và phiên bản Java đang cài là bao nhiêu. Kiểm tra biến môi trường JAVA_HOME đã được thiết lập chưa bằng lệnh: echo $JAVA_HOME

**Cài đặt**

Cách cài đặt Elasticsearch tuy không khó, nhưng khá phức tạp và nhiều bước, dưới đây là những hướng dẫn sơ lược nhưng các bạn cũng nên tìm hiểu thêm ở các nguồn tài liệu khác để không bị lấn cấn khi cài đặt và khởi động nha.
Để cài đặt Elasticsearch trên Ubuntu ta có 2 cách là cài từ Repository hoặc cài từ file .deb

**Cách 1: Cách Elasticsearch bằng APT Repository**

Cài bằng apt-transport-https

![](https://lh6.googleusercontent.com/eYeD3z2UDUb-cCdh2Ur9NOJvbKKPbGUvDMp5NdABoz3Fsb4aq5X6YWKLV1GX7105bWqJuJjKG4lcvtRitRJnJHVYfvJp4BXV2BYaSuU2z6kAiW0abnhKqZEVsVlsRaWr5Ls0GoSz)

**Cách 2: cài đặt elasticsearch bằng gói .deb**

Chạy các lệnh dưới đây để tải và cài đặt elasticsearch bằng file .deb

![](https://lh4.googleusercontent.com/ZDM8CnI0Z-JDp8LOmlLZq5bUmI8y91PP2cFSQ5ewePLlxn2AhlUTDcmty5CXakGhyYXZd0JiTxlWyBeDie4e_hZ70IvBMF85P7Iyhs4)

**Tài liệu tham khảo**

Để có thể được hướng dẫn cài đặt hoàn thiện hơn thì vẫn còn một số các hoạt động, các API để xử lý vào thao tác với Index trong Elasticsearch, nhưng với phần tìm hiểu ở trên về một công cụ mạnh mẽ như elasticsearch là đủ để có thể thao tác, sử dụng và làm quen với elasticsearch. Các bạn có thể tham khảo ở các trang tài liệu dưới đây.

Elasticsearch - Search APIs - Tutorialspoint

Elasticsearch in 5 minutes - Elasticsearch Tutorial.com

Elastic Stack and Product Documentation | Elastic

Elasticsearch là gì? | Khái niệm cơ bản về Elasticsearch