## 1. HTTP(S) Test Script Recorder
Khi mới sử dụng JMeter, khi bạn chưa biết nên tạo 1 test plan cho kế hoạch kiểm thử của bạn như thế nào. HTTP(S) Test Script Recorder sẽ hỗ trợ bạn tạo tự động Testplan cơ bản, cho phép bạn có thể ghi lại script thông qua các hành động của bạn khi sử dụng ứng dụng web bằng trình duyệt.
## 2. Thêm HTTP(S) Test Script Recorder
- Ở màn hình chính của JMeter → Chọn **Templates** → Ở cửa sổ Template, chọn option **Recording** → Chọn **Create**.
![image.png](https://images.viblo.asia/8bf5de9d-67fe-4aa0-ab21-21ce7969a88b.png)
- Ở màn hình **Parameters** → Chọn **Create**.
    - Các bạn có thể thay đổi các giá trị tương ứng hoặc để default như vậy (Ở đây, mình có thay đổi host)
![2021-07-13_19-51-15-T2.png](https://images.viblo.asia/4a24739b-b675-4fa1-a9b2-614b6d43957b.png)
- JMeter sẽ tạo cho bạn 1 Test plan
![image.png](https://images.viblo.asia/638e2e58-1ba9-444c-a277-049d466759eb.png)
    - Bao gồm các thành phần sau:
        - User Defined Variables
        - HTTP Request Defaults
        - HTTP Cookie Manager
        - Thread group với các giá trị default. (Các thành phần trên đây tạm thời chúng ta sẽ chưa tìm hiểu kỹ, hiểu đơn giản nó sẽ là các elements cơ bản trong testplan của bạn)
![image.png](https://images.viblo.asia/f08c3934-7277-4d8d-9ceb-5261f18e1568.png)
        - HTTP(S) Test Script Recorder - đây là thành phần mà chúng ta cần quan tâm nhất trong bài này.
![image.png](https://images.viblo.asia/61e5bca1-d470-4708-8c6e-5b4cb753ce34.png)
## 3. Cấu hình cho HTTP(S) Test Script Recorder
### a. Các thành phần cơ bản
![image.png](https://images.viblo.asia/46fddcb3-0b76-4c6e-b2e2-2fe926fd3b46.png)
- **#1. Name** : Thay đổi thành một tên bất kỳ, default sẽ là HTTP(S) Test Script Recorder.
- **#2. Port**: JMeter sẽ dựa vào Port này để ghi lại các hành động của người dùng khi thực hiện trên web. Thông thường sẽ set 8888.
- **#3. HTTPs Domains**: JMeter có thể tự động lấy được tên miền của bạn nên có thể set hoặc để trống.
### b. Test plan creation
![image.png](https://images.viblo.asia/8fbae2b1-958c-49bf-9528-a3a1ece9548f.png)
- Có 2 thành phần cơ bản:
    - **Targer Controller** : Là nơi đặt lại vị trí lưu trữ sau khi JMeter ghi lại các script (hành động của user). Thông thường sẽ set để nó lưu vào HTTP(S) Test Script Recorder tương ứng.
    - **Grouping**: Chọn cách để gộp nhóm các scripts.
### c. Requests Filtering tab
- Là nơi lọc các thành phần tạo nên trang web đầy đủ như Images, adds, buttons,... Vì thực chất chúng ta chỉ cần HTTP Request and Response, nên sẽ có một số thành phần không cần thiết thì chúng ta cấu hình tại đây để lọc bớt.
![image.png](https://images.viblo.asia/119ccfe5-6579-488e-b496-eff8eb683986.png)
- Nếu bạn không xác định được nên lọc bớt những thành phần nào, có thể chọn [Add suggested Excludes], JMeter sẽ hỗ trợ phần này.
## 4. Cấu hình cho trình duyệt
- Ở đây, mình sẽ sử dụng Firefox để cấu hình.
- [Download Firefox browser](https://www.mozilla.org/en-US/firefox/new/) nếu bạn chưa cài đặt.
![image.png](https://images.viblo.asia/124f8aba-f28f-47ea-94c8-8b2f259272ae.png)
- Mở trình duyệt → Chọn **Hamburger menu** ở góc phải → Chọn **Settings** → **Network Settings** → **Settings button**.
- Ở cửa sổ Connection Settings: 
![image.png](https://images.viblo.asia/b4b7d29e-2acb-4d3f-985d-d7a05c600dd3.png)
- Config lại Proxy Access to the Internet  → Chọn **Manual proxy configuration**  → Điền **localhost** của bạn vào → Điền **port** (8888)  → Tích chọn **Also use this proxy for FTP and HTTPS** → Nhấp **OK**.
- Quay trở lại JMeter → nhấp vào **Start** ở HTTP(S) Test Scripts Recorder
![image.png](https://images.viblo.asia/418b2f62-f074-45e8-9cb2-3b4264c705b3.png)
- Lúc này, file **Root CA certificate** sẽ được tạo trong thư mục bin của JMeter. Bởi vì các trình duyệt luôn kiểm tra xem chứng chỉ dành cho domain có chính xác, hợp lệ và vẫn còn hạn sử dụng. Vì vậy chúng ta cần setting cho chứng chỉ đó hợp lệ và có thể sử dụng được trình duyệt.
- Mở trình duyệt → Tìm kiếm Certificate → View Certificates → Authorities → Import→ Đến thư mục bin → Chọn ApacheJMeterTemporaryRoootCA → Chọn Open → Tick chọn vào Trust this CA to identify websites → Chọn OK.
![image.png](https://images.viblo.asia/fd1a0dcf-492d-4b63-8d45-eeaf0049ffbd.png)
## 5. Thực hiện Script
- Khi JMeter hiển thị cửa sổ Transactions control, thì bạn có thể thực hiện trên trình duyệt, các script sẽ được JMeter lưu lại vào Testplan.
![image.png](https://images.viblo.asia/ba440a9f-8d5c-42bf-ab67-ae23e0087cd3.png)
- Thực hiện nhập thông tin user = "tomsmith" và password = "SuperSecretPassword!" → Chọn **Login** → Sau khi login thành công →  Chọn **Logout**
![image.png](https://images.viblo.asia/81565ced-da17-4029-b66d-f3cf7b3a72e2.png)
- JMeter sẽ ghi lại script vào vị trí tương ứng với các Requests.
![image.png](https://images.viblo.asia/068d50df-ca18-433f-812c-3aa0dc8a8d0b.png)
- Bạn có thể mở các Listeners để xem kết quả chạy Scripts tại **View Result Tree**
![image.png](https://images.viblo.asia/ee8f071c-db57-4421-aea0-7df2880e5f33.png)
- Vậy là chúng ta đã hoàn thành 1 Test plan với scripts được tạo tự động nhờ vào HTTP(S) Test Script Recorder.
- Chúc các bạn thành công !!!


-----

Tài liệu tham khảo
- https://jmeter.apache.org/usermanual/jmeter_proxy_step_by_step.html
- https://chercher.tech/jmeter/record-jmeter-scripts