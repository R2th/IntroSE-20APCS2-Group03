## I. Giới thiệu về JMeter
###  1. JMeter là gì? 
  - Apache JMeter là một phần mềm mã nguồn mở thuần Java, được ra đời bởi Stefano Mazzocchi - Kỹ sư phần mềm thuộc công ty Apache Software Foundation.
  - Được phát triển nhằm kiểm tra độ chịu tải (Load test) và Hiệu năng (Performance test).
  - ![](https://images.viblo.asia/33d083fd-f5e8-4a45-8b5c-3088bda67de7.png)

###  2. Tính năng của Apache JMeter
 - JMeter được sử dụng để mô phỏng các hành vi của người dùng thực và kiểm tra hiệu năng của một máy chủ web. Thông qua đó, chúng ta có thể biết được hiệu suất của trang web khi có đồng thời 100, 1000 hay 10000,... người dùng truy cập đồng thời.
 - Nhờ vào những ưu điểm dưới đây mà JMeter trở thành một công cụ mạnh mẽ trong lĩnh vực kiểm thử tự động về hiệu năng và độ chịu tải của trang web
  + Giấy phép nguồn mở: JMeter hoàn toàn miễn phí.
  + GUI thân thiện : JMeter cực kỳ dễ làm quen và sử dụng
  + Nền tảng độc lập: Có thể chạy trên nhiều nền tảng
  + Trực quan hóa kết quả kiểm tra: Kết quả kiểm tra được thể hiện ở nhiều định dạng khác nhau như biểu đồ, bảng, cây và tệp nhật ký.
  + Cài đặt dễ dàng
  + Mô phỏng: JMeter cót thể mô phỏng nhiều người dùng với các luồng đồng thời, tạo ra một tải nặng đối với trang web đang thử nghiệm.
###  3. Quá trình làm việc cơ bản
  - JMeter mô phỏng một nhóm người dùng, gửi yêu cầu đến máy chủ đích và trả về thông tin thống kê của máy chủ.
  - ![](https://images.viblo.asia/7e9eebfe-8fc1-462c-a69e-3234ef343766.png)
## II. Thực hiện kế hoạch kiểm thử hiệu năng bằng JMeter
### 1. Cài đặt JMeter
- Apache JMeter viết bằng Java nên muốn chạy JMeter trước hết bạn phải cài JRE hoặc JDK. ([tại đây](https://stackjava.com/install/cai-dat-java-9-cai-dat-bien-moi-truong-java.html))
- Truy cập [link](http://jmeter.apache.org/download_jmeter.cgi) để cài đặt JMeter.
- Giải nén file .zip vừa tải về và clicking chọn file .jar để chạy công cụ JMeter
- ![](https://images.viblo.asia/32aa2a12-5b5c-412a-9131-f156ae6a488f.png)
### 2. Tạo một kế hoạch kiểm thử với JMeter
- Khi thực hiện kiểm thử hiệu năng, chúng ta cần xác định được: 
 + Normal load: Số người trung bình truy cập trang web của bạn
 + Heavy load: Số người dùng tối đa truy cập trang web của bạn
 + Mục đích của việc kiểm thử trang web của bạn là gì?
- Thực hiện một kế hoạch kiểm thử hiệu năng với JMeter bao gồm các bước sau: 
- ![](https://images.viblo.asia/6229d4a3-5932-4a44-8fe7-1a18abd9d05a.png)

#### 2.1 Thêm Thread Group
- Khởi động JMeter.
- ![](https://images.viblo.asia/3e372e9c-7dd5-41af-a6eb-eeb442e18a03.PNG)
- Click **Test Plan >> Add >> Threads (Users) >> Thread Group**
- Tại Thread Group, các thông tin cần quan tâm bao gồm: 
  + **Name**: Tên thread  
  + **Number of Threads (users)**: Số người dùng truy cập vào trang web
  + **Ram-up Period (in seconds)**: Thời gian thực hiện
  + **Loop Count**: Số lần lặp.
- Thông số về **Ram-up Period** và **Number of Threads (users)** cho chúng ta biết được thời gian trì hoãn khi một người dùng tiếp theo sử dụng.
- ![](https://images.viblo.asia/c2de0185-a349-4f91-906a-aebb9f62ab62.png)
- Với các thông số trên, chúng ta có thể thấy, với Number of Threads = 100, Ram-up = 10. Có nghĩa là trong vòng 1s sẽ có 10 request được gửi đến server.
#### 2.2 Thêm JMeter Elements
 - **HTTP Request Defaults** : Click **Thread group** >> **Add** >> **Config Element** >> **HTTP Request Defaults**.
 - ![](https://images.viblo.asia/174b3ea7-2988-4ddb-8196-a54c76671133.png)
 - Tại bảng điều khiển HTTP Request Defaults, nhập URL của trang web cần test vào ô "Server name or IP".
 - ![](https://images.viblo.asia/7176c13c-5f87-4604-a1c7-4a5d8a6a3c76.png)
- **HTTP Request**: Click **Thread group** >> **Add** >> **Sampler** >> **HTTP Request**.
- ![](https://images.viblo.asia/37f969f4-114c-4f3c-8ff8-11584e627fad.png)
- Trên cửa sổ HTTP Request, trường Path sẽ chỉ ra URL request nào bạn muốn gửi tới máy chủ, nếu để trống thì JMeter sẽ mặc định gửi đến URL đã được nhập vào tại HTTP Request Defaults.
#### 2.3 Thêm Grap Result
- Click **Thread Group** >> **Add** >> **Listener** >> **Graph Results**.
- ![](https://images.viblo.asia/0596f706-93b7-4b33-9e52-aa473125591f.png)
- ![](https://images.viblo.asia/16ed4d4b-3598-423a-ac4c-388f71e8cfac.png)
- Ngoài Graph Results, JMeter còn hỗ trợ cho người dùng nhiều phương thức hiển thị kết quả như: **View Results Tree**, **Summary Report**, **Aggregate Report**, ...


-----

Tài liệu tham khảo
- https://www.guru99.com/jmeter-performance-testing.html
- https://viblo.asia/p/jmeter-phan-1-apache-jmeter-la-gi-huong-dan-cai-dat-apache-jmeter-Az45bbew5xY