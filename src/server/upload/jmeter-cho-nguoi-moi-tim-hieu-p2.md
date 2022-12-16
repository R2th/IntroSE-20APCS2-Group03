Ở [bài viết trước](https://viblo.asia/p/jmeter-cho-nguoi-moi-tim-hieu-RQqKLvj0l7z) mình đã giới thiệu tới mọi người những khái niệm cơ bản về jmeter, những tính năng cơ bản và ví dụ một số trường hợp được áp dụng bởi jmeter. Tiếp theo bài phần 2 này mình sẽ tổng quát các hoạt động và cài đặt nó như thế nào.

# Jmeter hoạt động như thế nào
![](https://images.viblo.asia/c3893c77-b5f5-46c6-b9f6-6eb1ef6c1819.png)

Jmeter mô phỏng một nhóm người dùng gửi các requests đến một server mục tiêu cần test, và trả về hiển thị thống kê tốc độ thực thi của server, ứng dụng thông qua report hay biểu đồ.

Bạn có thể chưa nghe, nhưng jmeter chỉ là một HTTP Client có khả năng chạy nhiều phiên song song. Và điểm lợi của nó là có thể cấu hình được theo ý bạn muốn. Ví dụ như mô phỏng lại người dùng mua sắm trên trang thương mại điện tử một cách rõ ràng.

Về cơ bản:
* Định nghĩa một luồng công việc: Bao gồm các thành phần logic (như if, for, while)
* Swarm hệ thống: Jmeter sinh ra hàng nghìn luồng theo luồng công việc của bạn
* Thu thập và phân tích kết quả: Hãy đánh giá tốc độ và những gì mà bạn nhìn thấy.

Về mặt kỹ thuật, Jmeter là một HTTP Client đa luồng có khả năng thực hiện các luồng công việc phức tap tương tác với ứng dụng web. Tất nhiên Jmeter không bị giới hạn ở HTTP, có FTP, SMTP... Nhưng do thực tế hầu hết là sử dụng http.

Như vậy bạn cứ tạm hiểu Jmeter hoạt động trên cấp độ giao thức. Nó mô phỏng các tưởng tác mạng, yêu cầu với một ứng dụng web.

# Cài đặt
## 1. Yêu cầu hệ thống
* Máy đã cài java: Jmeter là một ứng dụng phát triển dựa trên java-based
* CPU: Chúng tôi gợi ý nên sử dụng cpu multicore, bởi nó hoạt động rất mạnh và nhiều điểm lợi của đa luồng.
* Memory: 16GB Ram là tốt nhất. Với con số này bạn có thể mô phỏng tới 1000 người dụng đồng thời và đủ cho hệ thống quản lý.
* Disk: Jmeter ko dựa nhiều vào ổ đĩa nhưng thao tác nó trên ổ SSD là một điểm cộng.
* Network: Nên sử dụng mạng LAN 1Gbps. Khi mô phỏng lượng người dùng lớn thì vấn đề thiếu băng thông mạng là dễ dàng xảy ra.

Và rất nhiều thông số cũng ko quá quan trọng khác.

## Kiểm tra phiên bản Java
Để kiểm tra nếu java đã được cài đặt. Chạy câu lệnh bên dưới trên command-line.
![](https://images.viblo.asia/a8c1fa90-79d1-4e1d-b69d-ef8229b32b5d.png)

Kể từ Jmeter 4.0 java 8 trở lên được hỗ trợ. Nếu phiên bản cũ hơn, vui lòng xem chi tiết [tại đây](https://jmeter.apache.org/usermanual/index.html)

Kết quả với command-line sẽ như sau: 
```
ubuntu@desktop:~$ java -version
java version "1.8.0_161"
Java(TM) SE Runtime Environment (build 1.8.0_161-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.161-b12, mixed mode)
```

Ở đây chúng ta đã có java 8, bản build 161 đang được cài đặt.

Nếu bạn chưa cài java, vui lòng tải xuống và cái đặt Java JDK. Để biết thêm chi tiết về cách thiết lập Java trên các hệ điều hành khác nhau. Tham khảo [tại đây](https://www.java.com/en/download/help/download_options.xml)

Chúng tối sẵn sàng tải xuống và cài đặt ngay bây giờ.

## Cài đặt jmeter
Rất đơn giản để cài đặt jmter với các bước sau:
* Tải về [jmeter](https://jmeter.apache.org/download_jmeter.cgi)
* Chạy jmeter trong folder bin/. Các tiện ích thực thi phụ thuộc vào OS(.bat với windows, .sh với linux/mac)
* Jmeter sẽ khơi chạy với giao diện UI

Sau 1 vài giây bạn sẽ nhìn thấy:
![](https://images.viblo.asia/8903bbc4-4b31-40fb-94fb-3d6ae0ee95f1.png)https://images.viblo.asia/8903bbc4-4b31-40fb-94fb-3d6ae0ee95f1.png

=> đã có thể bắt đâu làm việc với jmeter.

## Kết Luận
Trên đây là bài viết sơ qua về jmeter, cách cài đặt môi trường để mọi người mới tiếp cận có thể dễ dàng sử dụng nó. Hy vọng sẽ giúp ích tới các bạn. Cảm ơn rất nhiều vì đã đón đọc :)