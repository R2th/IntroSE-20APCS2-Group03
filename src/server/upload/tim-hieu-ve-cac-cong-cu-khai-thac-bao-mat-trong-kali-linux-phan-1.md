# I. Giới Thiệu
Kali Linux là một bản phân phối Linux được phát triển và duy trì bởi Offensive Security khi được tổ chức này phát hành vào năm 2013, là sự thay thế phát triển cho hệ điều hành BackTrack. Đây là một hệ điều hành được xây dựng đặc biệt dành cho Network analyst, Pentester và những người khác làm việc trong lĩnh vực phân tích và an ninh mạng. Kali linux cung cấp cho người dùng rất nhiều những công cụ khác nhau, trong đó phải kể đến các công cụ khai thác bảo mật. Ngày nay những công cụ khai thác bảo mật đã trở nên vô cùng phổ biến và đa dạng, hiện có hơn 300 công cụ được thiết kế và phổ biến trên mạng.

Hôm nay chúng ta sẽ cùng tìm hiểu các công cụ có sẵn trong Kali linux thường được các hacker sử dụng. Hiện tại Kali linux đã phân chia các công cụ này vào 13 kiểu khai thác thông dụng:
![](https://images.viblo.asia/93980bd7-ae7f-436a-81e2-18f245d6f49a.png)

# II. Các công cụ
### 1. Information Gathering – Nmap
Đâu tiên là Nmap - một công cụ không thể thiếu trong quá trình phân tích và tìm kiếm thông tin về mục tiêu. Các tính năng mà Nmap có thể mang lại như:
- Kiểm tra và lập sơ đồ mạng: bao gồm máy chủ, bộ định tuyến và cách chúng kết nối như thế nào
- Tạo lưu lượng (traffic) đến host trên mạng, phân tích phản hồi và đo thời gian phản hồi
- Dò tìm dịch vụ (Service discovery)
- Kiểm tra bảo mật và khai thác lỗ hổng trên hệ thống mạng.

Thực hiện ping kiểm tra kết nối và sử dụng Nmap để quét cổng TCP và UDP
 ![](https://images.viblo.asia/a21cabb1-5404-4ff9-b9fe-8cc8e499d937.png)

Thực hiện quét riêng cổng 445 cũng như quét chi tiết thông tin của địa chỉ IP 192.167.71.190
 ![](https://images.viblo.asia/9f71c5f7-7985-4f00-8936-32087fe650a5.png)

Thực hiện quét 1 loạt địa chỉ IP
 ![](https://images.viblo.asia/a3a42ce0-e575-48d6-aaae-d7f3019652ca.png)

### 2. Vulnerability Analysis - Nikto
Nikto là một công cụ rà quét lỗ hổng bảo mật nhằm tìm ra các điểm yếu đối với các máy chủ web và bạn có thể sử dụng nó với bất kỳ máy chủ web nào (Apache, Nginx, IHS, OHS, Litespeed, v.v.).. Nó có khả năng quét hơn 6700 mục để phát hiện cấu hình sai, các tệp có nguy cơ, v.v. và một số tính năng bao gồm: 
- Quét nhiều cổng trên máy chủ
- Tìm miền phụ
- Liệt kê người dùng Apache
- Kiểm tra các phiên bản lỗi thời
- Hỗ trợ SSL
- Lưu báo cáo dưới dạng HTML, XML, CSV

Thực hiện dùng nikto để quét thử một bài lab CTF của Viblo:
![](https://images.viblo.asia/6778a15b-434e-4477-a39b-709a363de28a.png)

Kết quả trả về cho thấy trang sử dụng web server Apache, PHP phiên bản 7.2.34. Trang web không thực hiện bảo mật clickjacking dẫn tới trang web có thể bị hacker lợi dụng lỗi hổng trên để khai thác. 

Thực hiện dùng nikto để quét trang facebook.com (thông báo gửi về cho thấy trang facebook được bảo mật rất tốt).
 ![](https://images.viblo.asia/b3648a73-411e-4ba1-ba6e-60ca77d8e7aa.png)

### 3. Web Application Analysis – WPScan
WPScan là black box vulnerability scanner cho WordPress được viết bằng PHP chủ yếu tập trung vào các loại lỗ hổng khác nhau trong WordPress, WordPress themes, và plugins. WPScan sử dụng cơ sở dữ liệu của tất cả các plugin và theme có sẵn (khoảng hơn 18000 plugins và 2600 themes) trong quá trình kiểm tra nhằm tìm ra các phiên bản lỗi thời và lỗ hổng bảo mật.

Các options của WPScan
 ![](https://images.viblo.asia/c83c162d-9711-4697-bd62-f715f2afe3b6.png)

Thực hiện quét để lấy thông tin qua URL. (Đây là URL của 1 trang web CTF)
 ![](https://images.viblo.asia/f6ed1213-002c-426e-afae-1573108cbf5e.png)

Kết quả trả về cho ta thấy version của Wordpress cũng như theme đang sử dụng.
 ![](https://images.viblo.asia/702a7cba-d1e5-44be-b011-0554a2739f33.png)

### 4. Database Assetment – Sqlmap
Nhắc đến khai thác về database thì không thể không nhắc tới SQLmap - một công cụ cực kỳ mạnh trong việc khai thác lỗ hổng SQL injection. Trải qua rất nhiều phiên bản thì SQLmap ngày càng hoàn thiện và có nhiều tính năng đa dạng hơn. 

Thực hiện sử dụng khai thác SQLmap để khai thác trên một trang web bị dính lỗi SQL injection (đây là trang của portswigger cho phép ta học về các lỗ hổng web):
 ![](https://images.viblo.asia/a54c339b-f32f-42ad-840f-39787f5119bb.png)

Thực hiện quét Url để kiểm tra lỗi
 ![](https://images.viblo.asia/2f39e1dd-a214-49ee-94af-09aadeeb4d07.png)

Kết quả trả về trong ảnh bên dưới cho thấy sqlmap đã tìm thấy lỗi trên url và tìm được Database mà web đang sử dụng: `Portgresql`.
 ![](https://images.viblo.asia/70d3341c-0b77-4fe2-98d0-afb3a7758fb3.png)

Tiếp tục sử dụng `--dbs` để quét ra tên của database và lấy được tên database là public
 ![](https://images.viblo.asia/aee63981-1093-43b6-b2db-dc9fb6b61a32.png)

Sử dụng `--tables`, ta lấy được tên các bảng dữ liệu hiện có.
 ![](https://images.viblo.asia/463b6cc0-10d5-4f5a-84bf-94ee0a548314.png)

Thực hiện lấy toàn bộ dữ liệu bảng user bằng dump ta có được thông tin bao gồm username và password của người dùng.
 ![](https://images.viblo.asia/a1235618-056f-4754-9e43-16a9f9488ea3.png)

### 5. Social Engineering Attack Tool - Zphisher
Về công cụ khai thác Social Engineering mình đã có một series bài viết khai thác bằng SEToolkit, các bạn có thể tìm đọc tại [đây](https://viblo.asia/p/tim-hieu-ve-social-engineer-toolkit-va-ky-thuat-phishing-facebook-1VgZvQJmKAw). Còn sau đây mình sẽ giới thiệu cho bạn đọc một công cụ khác cũng rất thú vị để khai thác Social Engineering đó là Zphisher.

Thực hiện tải và setup zphisher:
 ![](https://images.viblo.asia/21ccd23f-8598-4c6c-a3d4-21a09ab0b3d2.png)
 
Giao diện của tool Zphisher. Giao diện của Zphisher rất dễ hiểu, ta có thể thấy bên cạnh các options là các trang web mà ta có thể thực hiện phishing với Zphisher. Ở đây ta chọn options 1 để phishing facebook:
 ![](https://images.viblo.asia/4d00ff80-04d8-4210-9174-d8f84d27ede2.png)
 
Vẫn trong hình ảnh bên trên thì sau khi lựa chọn phishing facebook, zphisher cho ta thêm một options để lựa chọn tấn công như:
-	Phishing trang login
-	Vẫn là login nhưng cho ta nhiều tùy chọn cài đặt hơn
-	Phishing trang đặt lại mật khẩu với giao diện check security
-	Phishing login của Messenger
Chọn options 1 để thực hiện phishing trang login cơ bản:
![](https://images.viblo.asia/b2e0318a-5c0e-45b7-891b-b48da3b123bf.png)

Tiếp tục có 3 options cho ta lựa chọn:
-	Localhost: Cho phép ta test thử phishing trên trang local của máy bản thân. Thường dùng để kiểm tra xem Zphisher hoạt động tốt hay không
-	Ngrok.io: Zphisher mở cổng Ngrok từ LAN to WAN để bắt dữ liệu. Chức năng này cần bạn có tài khoản của Ngrok
-	Cloudfare: 1 chức năng mới của Zphisher và rất mạnh. Cho phép ta tạo 1 trang web phishing với HTTPS.

Đầu tiên thực hiện test thử giao diện trên trang localhost:
![](https://images.viblo.asia/2c666054-6f0b-4412-a5bd-6b2d148b3da0.png)

Giao diện cho thấy Zphisher chạy tốt. Thực hiện phishing facebook với options 3: cloudfare. Sau khi chọn xong thì Zphisher sẽ tạo cho ta 2 URL với http và https. Đây là 1 chức năng mới của Zphisher nên còn chưa ổn định. Đôi khi Zphisher không tạo ra được URL với https, trong trường hợp này ta cần reset lại Zphisher là được
 ![](https://images.viblo.asia/f2641e1a-7ce2-4bc2-94ca-57ac8d6a91cc.png)

Gửi đường link cho nạn nhân. Nạn nhân thực hiện truy cập vào trang web và nhập thông tin đăng nhập facebook.
![](https://images.viblo.asia/38b3463c-bc73-46cd-aee1-13438104af37.png)

Truy cập lại giao diện của zphisher và nhận Zphisher đã phát hiện được 1 địa chỉ IP và bắt được thông tin đăng nhập của nạn nhân.
![](https://images.viblo.asia/f7b11671-f033-4638-9e39-14fd9e7df3fc.png)

Giao diện của Zphisher không hiển thị password đã bắt được tuy nhiên toàn bộ thông tin đăng nhập đã được lưu lại trong file usernames.dat. Thực hiện đọc file usernames.dat là sẽ lấy được toàn bộ username và password đã bắt được:  
 ![](https://images.viblo.asia/5453aec9-d58b-42d2-b0bd-b698988b8139.png)

Vậy là phishing trang facebook thành công. Bên cạnh đó thì ta có thể thử 1 vài options khác, như ở bên dưới là giao diện phishing chức năng login với Check Security:
![](https://images.viblo.asia/eb702775-66a2-438d-876d-93b79626a57d.png)

Tại chức năng này thì ta có thể thấy được luôn username và password đã bắt được: 
 ![](https://images.viblo.asia/a12fe0de-48a0-4a12-ad57-7097897c3206.png)
 # III. Kết luận
 Trên đây là những công cụ có sẵn trong kali linux mà mình thường sử dụng. Bài viết chỉ mang tính giới thiệu đến bạn đọc nên các công cụ mình chỉ nếu lên chức năng chính của nó cũng như 1 vài ví dụ đơn giản. Nếu các bạn muốn mình viết bài phân tích sâu hơn về công cụ nào thì có thể để lại comment ở dưới nhé. Hẹn gặp lại các bạn ở phần 2.