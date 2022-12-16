Do nhu cầu công việc của dự án ở các giai đoạn tiếp theo có thể yêu cầu cần thực hiện các case kiểm thử liên quan đến hiệu năng như nhiều người dùng đăng nhập vào hệ  thống cùng một lúc, hay tải video lên hệ thống cùng một lúc, ..... nên mình quyết định nghiên cứu thực hành dần JMeter để phục vụ cho công việc.
Theo những gì mình tìm hiểu, có khá nhiều tài liệu viết về JMeter trên mạng, tuy nhiên có những bài rất khó hiểu. Vì thế mình sẽ cố gắng ghi chép lại quá trình tìm hiểu của mình sao cho dễ hiểu và dễ làm theo nhất.

Qua một loạt tài liệu mà mình tìm hiểu thì hướng dẫn ở trang này https://www.guru99.com khá phù hợp với các bạn QA với trình tự trình bày rõ ràng, dễ hiểu. Vì thế mình đã quyết định tóm tắt lại và làm theo những gì trên này hướng dẫn. Hi vọng những kiến thức mình ghi chép lại từ đây và từ các nguồn tham khảo khác có thể giúp bạn mới bắt đầu nắm bắt được JMeter nhanh nhất có thể.

# Đôi nét về JMeter
Nếu có thời gian đọc tài liệu bằng Tiếng Anh ở đây https://www.guru99.com/introduction-to-jmeter.html, bạn sẽ thấy kiến thức giới thiệu khá dễ hiểu và dễ nhớ. Chung quy lại, chúng ta chỉ cần nắm được rằng: JMeter là một phần mềm kiểm thử mã nguồn mở, là một ứng dụng dựa trên JAVA 100%.  JMeter được thiết kế dành cho việc load test các hành vi chức nắng và cả đo lường hiệu năng rất hiệu quả. Nhiều tổ chức đã và đang sử dụng JMeter để phân tích và đo lường hiệu năng của một ứng dụng web hay các ứng dụng dịch vụ khác hiện nay. 

**Tại sao nhiều tổ chức chọn sử dụng JMeter?** 

Đơn giản vì JMeter có khả năng bao quát nhiều loại kiểm thử từ độ tải, chức năng cho đến hiệu năng.... 

Dễ hiểu hơn, nếu một ngày khách hàng hay dự án của bạn yêu cầu bạn thực hiện kiểm thử hiệu năng cho một trang web với 1000 user đăng nhập cùng lúc hay 1000 user tải video lên cùng lúc, thì đầu tiên bạn hãy biết rằng có thể dùng JMeter để thỏa mãn yêu cầu trên. 

**Ưu điểm của JMeter**: JMeter có nhiều ưu điểm mà bạn có thể tìm hiểu ở liên kết giới thiệu về JMeter ở trên. Trong đó có 3 ưu điểm mà mình quan tâm đến khi quyết định chọn tìm hiểu JMeter chính là:
* Thân thiện, dễ dùng. Ngay sau khi cài đặt, mình không mất quá nhiều thời gian để làm quen nó.
* Mã nguồn mở, hoàn toàn miễn phí.
* Có thể được tích hợp với Bean Shell & Selenium để kiểm thử tự động. 

**Cách thức JMeter hoạt động**:
Có khá nhiều tài liệu giải thích về cách thức hoạt động của JMeter nhưng mình thấy dễ hiểu nhất vẫn chính là ở link đã giới thiệu ban đầu. Theo đó, trước tiên JMeter sẽ mô phỏng một nhóm người dùng gửi yêu cầu đến một máy chủ và trả về thông tin thống kê của máy chủ thông qua các biểu đồ. 

Đây là sơ đồ được cung cấp trong tài liệu ở liên kết trên mà mình thấy QA chỉ cần nhìn qua là đủ hiểu được cách thức JMeter hoạt động.

![](https://images.viblo.asia/51c0f646-c80a-4036-b19e-167196739d34.png)

Ngoài ra, các kiến thức khác như JMeter version nào thì tương ứng với Java version nào, theo mình không cần thiết lắm cho QA. Tuy nhiên, nếu có thời gian bạn có thể tìm hiểu trong phần cuối cùng ở liên kết giới thiệu trên.

# Cài đặt JMeter

Như đã giới thiệu trên JMeter là một ứng dụng JAVA nên tất nhiên cần phải có JAVA version tương thích cài đặt. 
Và, JMeter tương thích với các hệ điều hành, gồm Linux, Windows, Mac OS, Ubuntu. 

**Các bước cài đặt JMeter**

**1.** Kiểm tra xem Java đã được cài đặt chưa.

Theo mình, Java là phần mềm phổ biến nên hầu hết các máy của QA đều có cài đặt sẵn nó. Vì thế, thay vì tải xuống và cài đặt JAVA ngay lập tức, trước hết hãy mở Terminal (Linux) hoặc CMD (Windows) lên và gõ lệnh `java -version` trước. Nếu máy bạn đã cài đặt JAVA, bạn sẽ thấy version JAVA hiển thị như bên dưới.

![](https://images.viblo.asia/404cc0be-0f30-4b6d-b418-942a42825009.PNG)

Nếu JAVA chưa cài đặt, bạn chỉ cần tải phiên bản mới nhất của Java SE Development Kit tại https://www.oracle.com/technetwork/java/javase/downloads/index.html và làm theo hướng dẫn cài đặt Java chi tiết tại đây https://www.guru99.com/install-java.html . 

**2.** Tải và cài đặt JMeter.
Phiên bản mới nhất của JMeter khi mình tìm hiểu là 5.0 . Với phiên bản 5.0, lưu ý là JMeter yêu cầu Java 8 hoặc 9, vì thế nếu phiên bản Java của bạn nhỏ hơn 8 thì hãy tải về bản Java mới hơn và cài đặt lại.

Bạn có thể tải JMeter xuống tại https://jmeter.apache.org/download_jmeter.cgi . Tại đây, chọn tệp Binaries (zip hoặc tgz) để tải xuống như hình bên dưới:

![](https://images.viblo.asia/8e8b44a0-f7a7-4214-bf10-bce231d57091.PNG) .

**Lưu ý**: Đôi lúc, link tải JMeter có thể thay đổi. Chẳng hạn như khi mình nhấp vào link theo hướng dẫn ở đây https://www.guru99.com/guide-to-install-jmeter.html thì nội dung không còn tồn tại nữa, vì thế mình đã tìm thêm trên Google và tải được JMeter về từ trang đã đưa trên. 

Sau khi tải JMeter về, việc cài đặt lại vô cùng đơn giản. Không có màn hình cài đặt gì cả, thay vào đó bạn chỉ việc giải nén tập zip/tgz mà bạn đã tải về vào thư mục mình muốn là đã hoàn tất việc cài đặt. 


Cài đặt JMeter cực kỳ dễ dàng và đơn giản. Bạn chỉ cần giải nén tệp zip/tar vào thư mục mà bạn muốn. Không có màn hình cài đặt, chỉ cần giải nén là việc cài đặt của bạn đã hoàn tất.

Sau khi giải nén xong, cấu trúc thư mục sẽ giống như hình bên dưới (Bạn chỉ cần lưu ý nhớ những gì được khoanh đỏ là đủ.

![](https://images.viblo.asia/d35bd4fe-6c5b-416f-bf32-06b61a412443.PNG)

**3.** Khởi chạy JMeter.

Bạn có thể khởi chạy JMeter ở 3 chế độ: GUI (hay dùng), Non-GUI (gồm Server và Command Line).

* Trên Windows, bạn chỉ cần vào *apache-jmeter-5.0/bin* và nhấp vào file `jmeter.bat` để khởi động JMeter trong chế độ GUI:

![](https://images.viblo.asia/0488a13e-5d28-485a-8b84-28621cd2831f.PNG)

JMeter sẽ được khởi động ở chế độ GUI như bên dưới. Bạn chỉ cần chú ý các thành phần cơ bản, hay dùng đã được làm dấu như bên dưới: 

![](https://images.viblo.asia/c5fcac37-2edf-459b-9dce-791d0e210b50.PNG)

Ngoài ra bạn có thể khởi động JMeter ở chế độ Server bằng cách vào *apache-jmeter-5.0/bin* và nhấp vào `jmeter-server.bat` . Chế độ Server này thì hiện mình ít khi dùng so với chế độ GUI. Ngoài ra, vì JMeter chạy trong chế độ GUI sẽ tiêu thụ nhiều bộ nhớ của máy tính nên đôi lúc để tiết kiệm tài nguyên, mình có thể chọn chạy JMeter trong Command line với một số các tùy chọn như bên dưới (`jmeter --?` để hiển thị các tùy chọn).

![](https://images.viblo.asia/39e824d7-cf64-4388-9dda-ff32f31f0ef6.PNG)

..............................................................

**Tài liệu tham khảo:** 
Chuỗi bài viết được tham khảo bằng cách dịch lại từ Guru99 và có chỉnh sửa theo những gì mình vừa tìm hiểu và thực hành: 
* https://www.guru99.com/introduction-to-jmeter.html
* https://www.guru99.com/guide-to-install-jmeter.html