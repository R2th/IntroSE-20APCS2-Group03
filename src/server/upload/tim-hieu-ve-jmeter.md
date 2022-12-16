# Phần I. Tìm hiểu về JMeter
## 1. JMeter là gì?
### 1.1 Định nghĩa
- Có rất nhiều định nghĩa về JMeter nhưng nói đơn giản thì JMeter hay còn gọi là kiểm thử hiệu năng, là một phần mềm được dùng để test function, khả năng chịu tải và hiệu suất của một trang web, một hệ thống, thậm chí còn dùng để chạy Automation Test cho cả API. 

- Thử tưởng tượng nếu cùng 1 lúc có 100 người dùng truy cập vào một trang web thì liệu rằng trang web đó có đáp ứng và đảm bảo được tốc độ truy cập của 100 người dùng, thời gian phản hồi của 100 request đó sẽ vẫn nhanh hay không? Và rất không khả thi khi dùng 100 PC để mô phỏng cho 100 người dùng. Chính vì vậy JMeter ra đời. 

- Apache JMeter được phát triển từ ngôn ngữ lập trình Java. 

- Ngoài JMeter thì hiện nay cũng có rất nhiều tool kiểm thử hiệu năng như: LoadRunner, WebLoad, LoadView, Tricentis Flood, LoadComplete v.v...
![](https://images.viblo.asia/8a58ef70-2b2c-40b9-901a-329085df3486.png)

### 1.2 Sự quan trọng của JMeter đối với website 
- Một website được nhiều người sử dụng thì phải đảm bảo các yếu tố sau:
 + tính năng phần mềm hoạt động chính xác
 + thời gian phản hồi (response time) của trang web nhanh
 + hệ thống chạy ổn định, đảm bảo cho sự trải nghiệm của người dùng liền mạch
 
- Một trang web chạy chậm sẽ dẫn đến sự trải nghiệm người dùng không tốt và có tác động tiêu cực đến tài chính của Công ty đó. Vì vậy hiện nay các công ty phát triển phần mềm rất chú trọng trong việc thực hiện kiểm thử hiệu năng trước khi khởi chạy hoặc sau mỗi lần update.

- Với sự trợ giúp của JMeter chúng ta có thể mô phỏng một lượng tải lớn trên server, network v.v... từ các máy khác nhau để thực hiện kịch bản tương tự thực tế.
## 2. Tác dụng của JMeter
- Giúp tìm ra các điểm nghẽn của hệ thống.
- Xác định được số lượng người dùng cùng lúc mà hệ thống, ứng dụng có thể đáp ứng được.
- Giúp tìm ra được những tác động về hiệu năng sau mỗi bản update.
## 3. Tính năng của JMeter 
Các tính năng chính của JMeter bao gồm:
- Giấy phép (License)
- Giao diện đồ hoạ người dùng (Graphical User Interface – GUI)
- Hỗ trợ Giao thức/ Máy chủ (Server/Protocol Support)
- Nền tảng (Platform)
- Mô phỏng (Simulation)
- Hỗ trợ Phân phối tải (Supports Distributed Testing)
- Hiển thị kết quả (Test Result Visualation)
- Báo cáo (Reporting)
- Các loại kiểm thử (Testing Types)
- Record and Playback
- Framework
- Cài đặt (Installation)
- Kiến thức (Knowledge)
## 4. Cách thức hoạt động của JMeter
### 4.1 Sơ đồ cách thức hoạt động của JMeter 
![](https://images.viblo.asia/4cb67330-d63f-4cc7-ad27-845830976800.png)

### 4.2 Trọng tâm của việc kiểm thử hiệu năng
- Thời gian phản hồi: check xem ứng dụng phản hồi nhanh hay chậm
- Khả năng mở rộng: xác định tải người dùng tối đa mà ứng dụng phần mềm có thể xử lý.
- Tính ổn định: Xác định xem ứng dụng có ổn định dưới các tải khác nhau hay không.
## 5. Quy trình làm việc của JMeter
Bắt đầu => JMeter sinh ra các requests, gửi đến server đích + mô phỏng số lượng người dùng gửi request đến server đích => Server phản hồi lại các request => JMeter lưu lại các phản hồi => JMeter sẽ thu thập, tính toán, thống kê => Tạo ra 1 report dựa trên thống kê này => Kết thúc quá trình test hiệu năng.

# Phần II. Cách cài đặt JMeter
## 1. Điều kiện cài đặt 
### 1.1 Yêu cầu phần mềm
- Phải có Java mới dùng được JMeter
- JMeter 5.0 chỉ hỗ trợ chạy được trên Java 8 và 9
### 1.2 Yêu cầu hệ điều hành
- Windows: jmeter.bat
- MacOS: jmeter.sh
- Linux: jmeter.sh
## 2. Các bước cài đặt
- Step 1: Download JMeter tạo trang [Apache JMeter](https://jmeter.apache.org/download_jmeter.cgi) 
- Step 2: Click .zip đối với Windows và tgz đối với MacOS và Linux
![](https://images.viblo.asia/c386d7f4-69a2-4e16-82c4-36f07b97cfdf.png)
- Step 3: Sau khi hoàn thành việc download và thực hiện giải nén chúng ta sẽ được folder như bên dưới.
+ Folder bin: chứa các files templates, .bat, .sh, .jar để start JMeter. Và cũng chứa các file User và JMeter properties.
+ Folder lib: chứa tất cả file jar bắt buộc.
![](https://images.viblo.asia/0495b106-68eb-4140-a06b-4643364c2dc7.png)
- Step 4:  Click vào folder bin 
+ .bat: muốn khởi chạy được giao diện người dùng của JMeter thì phải chạy file này trên Windows.
+ .sh: muốn khởi chạy được giao diện người dùng của JMeter thì phải chạy file này trên MacOS và Linux.
![](https://images.viblo.asia/b6495757-9d33-4526-8516-96d4877cde31.png)
- Step 5: Khởi chạy JMeter 
**Trên Windows**: lick đúp vào file bên dưới thì giao diện người dùng của JMeter sẽ hiển thị.
![](https://images.viblo.asia/eeacf2f5-4a68-4086-848a-66b8a964df8f.png)
**Trên MacOS**: tham khảo trang sau https://jmetervietnam.wordpress.com/2019/02/16/bai-3-huong-dan-cai-dat-jmeter/

**Lưu ý:  **

1. Chỉ việc download file nén, sau đó giải nén và có thể sử dụng nó luôn chứ không cần phải cài đặt
2. Trên trang chủ sẽ có 2 phần: Binaries và Source. 
-  Người dùng bình thường sẽ download ở Binaries
-  Người muốn chỉnh sửa, phát triển thêm các tính năng trong JMeter sẽ download ở Source

*Bài viết được tham khảo và tổng hợp từ trang:* https://jmetervietnam.wordpress.com/2019/02/13/bai-1-gioi-thieu-ve-jmeter/