Bạn biết gì về Big data, Hadoop, và Spark? Bản thân tôi cũng chưa từng làm việc với chúng bao giờ. Bài viết này là một dạng bài tìm hiểu overview về hai Big data framework này xin được chia sẻ cùng các bạn.
Ngày nay chúng ta được bao bọc bởi dữ liệu từ số lượng vô cùng lớn các website. Với lượng dữ liệu số tăng gấp đôi sau mỗi hai năm, vũ trụ số đang đuổi theo vũ trụ vật lý một cách nhanh chóng. Ước tính đến năm 2020, vũ trụ số có kích thước tới 44 Zettabyte. Số lượng các bit dữ liệu tương đương với số ngôi sao trong vũ trụ vật lý.
![](https://images.viblo.asia/65220fe3-225a-4cb4-beb7-bea6af6f52e0.jpg)
Như nói ở trên, dữ liệu ngày càng gia tăng. Để số hóa hết lượng dữ liệu lớn này ngày càng có nhiều hệ thống phân tán trên thị trường. Trong số các hệ thống này, Hadoop và Spark đọ sức với nhau như những đối thủ cạnh tranh trực tiếp.

Để quyết định chọn lựa framework nào là phù hợp với tổ chức của bạn, việc so sánh hai framework này là quan trọng và cần thiết. So sánh này dựa trên một số tham số thiết yếu sau.
## Hiệu năng - Performance
Về tốc độ xử lý thì Spark nhanh hơn Hadoop. Spark được cho là nhanh hơn Hadoop gấp 100 lần khi chạy trên RAM, và gấp 10 lần khi chạy trên ổ cứng. Hơn nữa, người ta cho rằng Spark sắp xếp (sort) 100TB dữ liệu nhanh gấp 3 lần Hadoop trong khi sử dụng ít hơn 10 lần số lượng hệ thống máy tính.
![](https://images.viblo.asia/de17071c-f13c-41c9-80ad-b39401d16cc2.jpg)
Sở dĩ Spark nhanh là vì nó xử lý mọi thứ ở RAM. Nhờ xử lý ở bộ nhớ nên Spark cung cấp các phân tích dữ liệu thời gian thực cho các chiến dịch quảng cáo, machine learning (học máy), hay các trang web mạng xã hội.

Tuy nhiên, khi Spark làm việc cùng các dịch vụ chia sẻ khác chạy trên YARN thì hiệu năng có thể giảm xuống. Điều đó có thể dẫn đến rò rỉ bộ nhớ trên RAM. Hadoop thì khác, nó dễ dàng xử lý vấn đề này. Nếu người dùng có khuynh hướng xử lý hàng loạt (batch process) thì Hadoop lại hiệu quả hơn Spark.

Tóm lại ở yếu tố hiệu năng, Spark và Hadoop có cách xử lý dữ liệu khác nhau. Việc lựa chọn framework nào phụ thuộc yêu cầu cụ thể từng dự án.
## Bảo mật - Security
Bảo mật của Spark đang được phát triển, hiện tại nó chỉ hỗ trợ xác thực mật khẩu (password authentication). Ngay cả trang web chính thức của Apache Spark cũng tuyên bố rằng, "Có rất nhiều loại mối quan tâm bảo mật khác nhau. Spark không nhất thiết phải bảo vệ chống lại tất cả mọi thứ".

Mặt khác, Hadoop trang bị toàn bộ các mức độ bảo mật như Hadoop Authentication, Hadoop Authorization, Hadoop Auditing, and Hadoop Encryption. Tất cả các tính năng này liên kết với các dự án Hadoop bảo mật như Knox Gateway và Sentry.

Vậy là ở mặt bảo mật thì Spark kém bảo mật hơn Hadoop. Nếu có thể tích hợp Spark với Hadoop thì Spark có thể "mượn" các tính năng bảo mật của Hadoop.

## Chi phí
Trước tiên, cả Spark và Hadoop đều là các framework mã nguồn mở (open source), nghĩa là nó miễn phí. Cả hai đều sử dụng các server chung, chạy trên could, và dường như chúng sử dụng các cầu hình phần cứng tương tự nhau.
![](https://images.viblo.asia/58723ac7-12d3-441c-bdae-e0ab61b1aacb.jpg)
Vậy thì làm sao để đánh giá, so sánh về chi phí giữa hai framework này đây?

Xin được nhắc lại là Spark cần một lượng lướn RAM vì nó xử lý mọi thứ ở bộ nhớ. Đây là yếu tố ảnh hưởng đến chi phí vì giá thành của RAM cao hơn ổ đĩa. Trong khi đó Hadoop bị ràng buộc bởi ổ đĩa, ổ đĩa thì rẻ hơn RAM. Tuy nhiên Hadoop thì cần nhiều hệ thống hơn để phân bổ ổ đĩa I/O.

Do vậy, khi nhu cầu của bạn là xử lý lượng lớn dữ liệu dạng lịch sử thì Hadoop là lựa chọn tốt vì dữ liệu dạng này cần lưu và có thể được xử lý trên ổ đĩa. Còn khi yêu cầu là xử lý dữ liệu thời gian thực thì Spark là lựa chọn tối ưu vì ta chỉ cần ít hệ thống cho sử lý cùng một lượng lớn dữ liệu với thời gian giảm nhiều lần hơn khi sử dụng Hadoop.

## Dễ sử dụng

Một trong những ưu điểm lớn nhất của Spark là tính dễ sử dụng. Spark có giao diện người dùng thân thiện. Spark cung cấp các API thân thiện cho Scala Java, Python, và Spark SQL (hay còn gọi là Shark). Việc Spark được xây dựng từ các khối đơn giản nó giúp ta tạo các hàm do người dùng xác định một cách dễ dàng.

Trong khi đó Hadoop được viết bằng Java và có tiếng xấu là mở đường cho sự khó khăn trong việc viết chương trình không có chế độ tương tác. Mặc dù Pig (một công cụ bổ trợ) giúp lập trình dễ dàng hơn, nhưng nó cũng tốn thời gian để học cú pháp.

**Việc só sánh trên mang đến trong ta cảm giác Spark và Hadoop là "kẻ thù" của nhau. Vậy liệu rằng chúng có mối liên hệ kiểu hiệp lực nào không?**

Câu trả lời là có. Hệ sinh thái Apache Hadoop bao gồm HDFS, Apache Query, và HIVE. Hãy xem Apache Spark có thể sử dụng gì từ chúng.

### Sự hợp nhất của Apache Spark và HDFS
Mục đích của Apache Spark là xử lý dữ liệu. Tuy nhiên, để xử lý dữ liệu, hệ thống cần dữ liệu đầu vào từ thiết bị lưu trữ. Và với mục đích này, Spark sử dụng HDFS. Đây không phải là lựa chọn duy nhất, nhưng là lựa chọn phổ biến nhất vì Apache là bộ não đằng sau cả hai.

### Một sự pha trộn của Apache Hive và Apache Spark

Apache Spark và Apache Hive có tính tương thích cao, vì cùng nhau, chúng có thể giải quyết nhiều vấn đề của nghiệp vụ. Chẳng hạn, giả sử rằng một doanh nghiệp đang phân tích hành vi của người tiêu dùng. Giờ đây, công ty sẽ cần thu thập dữ liệu từ nhiều nguồn khác nhau như mạng xã hội, bình luận, dữ liệu nhấp chuột, ứng dụng di động của khách hàng và nhiều hơn nữa. Tổ chức của bạn có thể sử dụng HDFS để lưu trữ dữ liệu và tổ Apache Hive làm cầu nối giữa HDFS và Spark.

### Kết luận
Theo bạn thì Spark hay Hadoop thắng trong cuộc so sánh này? Trong khi Spark ưu điểm là nhanh, dễ sử dụng, còn Hadoop thì ưu điểm bảo mật mạnh mẽ, lưu trữ lớn, xử lý hàng loạt (batch processs) với chi phí thấp. Chọn framework nào phụ thuộc hoàn toàn vào đặc thù dự án của bạn. Một sự kết hợp cả hai tạo thành sự két hợp hoàn hảo bất khả chiến bại. "Giữa hai các xấu, không chọn cái nào. Giữa hai cái tốt, chọn cả hai" - Tryon Edwards.

### Tài liệu tham khảo
* [dzone - choosing the right big data framework](https://dzone.com/articles/hadoop-vs-spark-choosing-the-right-big-data-framew)