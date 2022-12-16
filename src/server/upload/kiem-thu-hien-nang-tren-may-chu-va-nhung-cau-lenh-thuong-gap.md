# **I. Bài toán đặt ra khi nào chúng ta cần phải kiểm thử hiệu năng trên máy chủ?**

1. Định nghĩa kiểm thử hiệu năng là gì ?
- Kiểm thử hiệu năng là một loại kiểm thử sử dụng để đảm bảo các ứng dụng phần mềm hoạt động hiệu quả trong công việc dự kiến của ứng dụng. Độ chịu tải, khả năng load dữ liệu, xử lý request mất bao nhiêu giây hay số lượng request xử lý được bao nhiêu trong một đơn vị thời gian, khả năng hồi phục của server là như thế nào và khi nào thì server không thể làm việc được nữa . Tất cả các thông số kỹ thuật đều dựa trên yêu cầu của hệ thống cũng hay yêu cầu của khách hàng. 

2. Tầm quan trọng hay mục tiêu của kiểm thử hiệu năng:

- Thời gian phản hồi: xác định xem ứng dụng phản hồi nhanh hay chậm 

- Khả năng mở rộng: Xác định tải người dùng tối đa mà ứng dụng phần mềm có thể xử lý. 

- Tính ổn định: Xác định xem ứng dụng có ổn định dưới các tải khác nhau hay không. 

Mục tiêu của Kiểm thử hiệu năng không phải là để tìm lỗi, nó là hoạt động cần thiết cho việc phát triển những giải pháp tối ưu hóa hiệu năng cho phần mềm. Kiểm thử hiệu năng giúp chúng ta tránh được các tình huống không lường trước khi triển khai ứng dụng trong môi trường thực tế. 

3. Các loại kiểm thử 

 Test performace bao gồm  loại kiểm thử 

+ Load test 

+ Stress test

+ Capacity Test

+ Endurance test

+ Spike test

+ Volume test 

+ Scalability test

+ Reliability Test 

4. Cách kiểm thử performance 

Kiểm thử performance tùy từng mục đích của hệ thống cũng như yêu cầu của khách hàng mà ta sẽ có biện pháp điều chỉnh thông số cài đặt phù hợp để đưa ra kết quả đúng. Phổ biến nhất hiện nay là chúng ta thường dùng jmeter một công cụ kiểm thử để tạo kịch bản ảo hay nói cách khác là tạo user ảo cùng truy cập vào server. Kịch bản được kết cấu bao gồm các thread user, ramup, duration ,... đưa loạt request vào server mà không cần phải sử dụng máy thật.

Giả sử một bài toán như sau: 

Mùa giải đá bóng năm 2019, Việt Nam góp mặt trong trận đấu tìm nhà vô địch đá bóng châu Á. Do vậy lượng người dân muốn mua vé vào xem đội chủ nhà đá là rất cao. Để giải quyết bài toán đó, hệ thống đặt vé online đã ra đời. Vấn đề ở đây gặp phải là không phải họ mua đều đặn từng ngày mà khi thời gian mở cửa bán vé tất cả lượng lớn người sẽ truy cập vào server sẵn sàng bị sập bất cứ lúc nào. Yêu cầu đặt ra là cần kiểm tra độ chịu tải tối đa cho 1 triệu người truy cập vào hệ thống, server vẫn xử lý  "ngon" và lượng người mà vài triệu người cùng truy cập 1 lúc thì server sẽ tự động hồi lại được trong vòng 3 phút. 

Giải bài toán: 

Đối với trường hợp này ta cần test 2 loại là load test và stress test. 
Với load test : Thông số cài là lần lượt từ từ cho đến 1 triệu request nếu response time ( thời gian server xử lý 1 request ) vẫn nhỏ hơn 10s có thể chấp nhận được là tốt nhưng nếu nó xử lý quá lâu thì chúng ta cần có biện pháp khắc phục, Tương tự vậy ta sẽ xét được stress test nhưng 2 vấn đề gặp phải là chúng ta chỉ có thể nhìn thông số qua jmeter trả về mà không biết được server xử lý đến request nào? nó đang chạy hết server hay chỉ chạy một,? Thời gian trung bình server xử lý thực sự là bao nhiêu ? Chính xác khi nào thì server có thể khôi phục? ...==> tất cả các vấn đề trên, đó là lý do mà nhân viên kiểm thử performance cần xác định sử dụng với test quan sát trực tiếp trên server

# II. Cách truy cập vào server 

1. Có 2 cách truy cập vào server

+ Sử dụng user name và password ==> Cách này dễ sử dụng nhưng kém bảo mật hơn, đối với dự án Nhật họ không thích dùng cái này lắm.
+ Sử dụng ssh key : với cách này thì phải tạo 1 ssh key dưới local , sau đó thì add vào server ==> cách này bảo mật cao khách hàng rất ưa sử dụng 

2. Cách vào server bằng ssh key

Bước 1:  Tạo ssh key thông qua lệnh 

Bật terminal trên máy linux của bạn lên và thực hiện theo các bước sau.

Thực hiện câu lệnh sau để tạo Public key

```
ssh-keygen -t rsa
```

![](https://images.viblo.asia/420d76ea-e8d0-4869-bd37-b6887565552c.PNG)

Sau lệnh này hệ thống sẽ sinh ra 2 key : 

1, Private key  : id_rsa 
2. Public key  : id_rsa.pub

Bước 2 :  Sử dụng public key để thêm tài khoản ssh vào server 

Thực hiện mở file id_rsa.pub = Notepad ==> copy đoạn text bên trong 

( Ngoài ra mình chỉ cần gửi file puplic key cho người giữ server add vào là xong) 

Cuối cùng là truy cập vào server 

```
ssh <username>@<địa chỉ IP>
```
  
 3. Triển khai đo lường các thông số server
    
    3 vấn đề quan trọng :
    
    1. Kiểm tra thông số cpu với câu lệnh
   
   ```
   top 
   ```
   (sử dụng cho hệ điệu hành windown)
    
   2. Kiểm tra ram : Câu lệnh 
   ```
   cat /proc/meminfo
   ```
    
3. Kiểm tra ổ cứng
```
df -h
```

Thường thì nhân viên kiểm thử chỉ quan tâm đến kiểm tra cpu và 3 tham số của cpu 

![](https://images.viblo.asia/c91da8c6-3d20-4f18-b3fa-8c1d059dd82d.png)

3 Thông số cần quan tâm kiểm tra cpu là đó là những thông số trả về của load average 

Như hình trên có 3 số 5.51 , 5.18,  4.47

Load average được tính mỗi 1, 5 và 15 phút để cung cấp cái nhìn sơ bộ toàn bộ hệ thống.

Lưu ý:

Các con số hiển thị trong phần load average phụ thuộc vào số lượng CPU core của server. Ví dụ nếu server có 1 core thì maximum load là 1.00, với 2 core là 2.00 và cứ thế tăng dần.
Thông thường nếu load average >= 0.7 chứng tỏ server bắt đầu có dấu hiệu quá tải. Bạn nên theo dõi và tìm hiểu tối ưu lại server hoặc code, nâng cấp phần cứng để đảm bảo load luôn dưới ngưỡng này.

Bên cạch đó bạn cần biết được số nhân cpu để xác định được số task vụ được thực hiện đồng thời.