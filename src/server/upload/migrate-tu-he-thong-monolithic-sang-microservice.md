### Giaosucan's blog - chia sẻ kiến thức theo cách bá đạo
### http://www.giaosucan.com/

Câu chuyện của công ty DK
DK là nhà phân phối linh kiện điện tử lớn thứ 5 thế giới Họ xây dựng một hệ thống ERP Distribution Management System để phục vụ cho việc phân phối bán lẻ từ năm 2002 trên nền tảng MFC, viết bằng C/C++ với hơn 2 triệu dòng code. Đến nay cũng đã gần 20 năm.
![](https://images.viblo.asia/8e31e375-b013-45a1-bf25-1826a14b5f3f.png)

Hệ thống hiện tại đang gặp nhiều vấn đề như sau
+ Nhiều công nghệ phát triển cách đây hơn 20 năm như MFC đến nay đã lỗi thời, nhất là khi .NET, .NET core ra đời
+  Design ban đầu là thiết kế đơn khối (Monolithic) trở nên cồng kềnh do quá nhiều chức năng được thêm vào , khó maintain, quá trình build, deploy source code mất nhiều thời gian. Việc triển khai mở rộng hệ thống thật sự phức tạp
+ Khó thay đổi framework, hệ thống viết bằng C/C++ và MFC, nếu chuyển đổi sang .NET core ,C# gần như phải viết lại toàn bộ.
Họ quyết định thay đổi lại thiết kế chuyển đổi architect từ monolithic sang kiến trúc microservice. Với mục tiêu tận dụng thế mạnh của kiến trúc microservice như khả năng dễ deploy, sử dụng được nhiều technical stack, scaling….
Tuy nhiên nói thì dễ nhưng làm thì khó, mặc dù kiến trúc microservice có nhiều ưu điểm hơn kiến trúc đơn khối nhưng đội kĩ sư của DK gặp phải những vấn đề như sau
+ Database của DKE có hơn 500 tables, sử dụng Oracle DB relationship quan hệ giữa các bảng vô cùng phức tạp. Mỗi table có trung bình vài trăm nghìn record 🡪 Làm thế nào để break out database này sang multi- database trong kiến trúc microservice và migrate dữ liệu sang ??
![](https://images.viblo.asia/0c6d2006-c68e-441c-8a80-7e9e76f99dfb.png)

+ Việc migrate từ mono sang microservice không thế thực hiện ngay lập tức, mà phải mất nhiều năm. Như vậy không thể take down hệ thống mono để chuyển được, mà phải thực hiện kiểu roll-out. Vậy làm thế nào để 2 hệ thống này chạy song song ?
+ Trong quá trình migrate, thì hệ thống cũ có thể vẫn được update liên tục, làm sao có thể reflect change này sang hệ thống mới kịp thời
Ngoài ra có rất nhiều challenging khác không thể kể hết được.
Giải pháp
Trong vòng gần 2 năm, các kĩ sư của DK đã nghiên cứu thử nghiệm rất nhiều phương pháp khác nhau để thực hiện việc migrate. Bài viết này chia sẻ một số giải pháp ở mức độ overview 
Nghiệp vụ của DK là Distributed management system, hiểu nhanh là phân phối bán lẻ. Phương pháp domain drive design được áp dụng để phân tích nghiệp vụ và break out hệ thống thành từng module riêng lẻ như Order, Payment, Sale. Để hiểu được DDD là gì, độc giả có thể tham khảo series Hiểu Domain theo cách bá đạo của giaosucan’s blog
![](https://images.viblo.asia/2e6ffaed-f67a-4443-8aff-61b965f685dd.png)

Từ kết quả của việc phân tích business của DDD, các kĩ sư đã có thể estimate được module, số microservice cần tạo
Các microservice được tách thành internal service và external service. Internal service được viết bằng NodeJS trực tiếp tương tác với database, gửi nhận dữ liệu bất đồng bộ cho external service (expose API) to client qua message queue. Về sau thì phần internal microservice được chuyển thành .NET core
Phần API viết bằng .Netcore và sử dụng thư viện Swagger để generate ra API specs


Theo microservice best practice, để đảm bảo loose coupling, database sẽ được tách ra thành nhiều database nhỏ own bởi các microservice. Tuy nhiên lý thuyết thì chém vậy, như đưa vào thực tế với database quan hệ chằng chịt, dependency lẫn nhau, và cả triệu record data thì break out là chuyện không đơn giản.
Team đã sử dụng phương pháp break out và migrate data thành từng phần như gom những bảng thuộc sale thì một database own bởi các sale service, payment thành 1 một database, own bởi payment service.
Oracle Golden Gate được thử nghiệm để migrate giữa database mới sang database cũ.
![](https://images.viblo.asia/aeab526d-a9e8-4756-b73f-b7e3aa347bf9.png)

Mặc dù việc thử nghiệm trên từng module riêng lẻ cho kết quả hứa hẹn, nhưng việc break toàn bộ database vẫn là bài toán phức tạp do vấn đề chuyển đổi tính đồng nhất dữ liệu (ACID) sang BASE của microservice 
Do đó, việc migrate sang microservice vẫn đang dừng ở phần code logic, các microservice vẫn point vào 1 database duy nhất.
Để biết các kĩ sử DK xử lý như thế nào, đón đọc bài tiếp