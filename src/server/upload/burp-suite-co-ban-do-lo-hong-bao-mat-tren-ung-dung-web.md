Đây không phải là 300 bài code thiếu nhi hay đại loại vậy, mà mình sẽ nói về BurpSuite - 1 công cụ đắc lực cho tester cũng như pentester. 
Các kiến thức sẽ là basic mới bắt đầu cho người mới học như mình nhé ( đùa đấy :) )
- Vậy tại sao lại chọn Burpsuite? Dễ thôi, vì nó free mà :v
- Thế nên, trong bài viết này mình sẽ tóm gọn lại các chức năng cơ bản mà BurpSuite có thể làm được nhé.

OK Let's Go....
# 1. BurpSuite là gì?
Lần này mình sẽ đi thẳng vào vấn đề, không lòng vòng hải phòng nữa nhé.
- Thứ nhất: Burp Suite là một công cụ pentest ứng dụng web. 
- Thứ 2: Không như các công cụ khác, Burp chỉ hỗ trợ trong quá trình pentest chứ còn chạy full scan như acunetix thì vẫn còn nhiều hạn chế (phần scan audit).
- Thứ 3: Giao diện đẹp, trực quan thân thiện (+1 respect) :)
- Đó là do mình tóm gọn, còn thực tế theo lý thuyết thì .....

Burp Suite được hiểu là một ứng dụng được tích hợp nhiều tính năng phục vụ kiểm tra tính bảo mật của ứng dụng web. Các tính năng này sẽ phục vụ kiểm tra bảo mật những thành phần khác nhau trong ứng dụng web hiện đại ngày nay.

Burp Suite giúp người dùng đánh giá các tiêu chí bảo mật web như: Tiến hành kiểm tra cơ chế xác thực, kiểm tra các vấn đề về phiên bản người dùng hay liệt kê cũng như đánh giá các tham số đầu vào của ứng dụng trang web. 

À thôi, lý thuyết nhiêu đấy chắc là đủ rồi, chúng ta sẽ cùng tìm hiểu xem cách cài đặt và sử dụng một số chức năng cơ bản của BurpSuite nha !!!
# 2. Cài Đặt Và Cấu Hình BurpSuite
## 2.1 Cài Đặt
Chúng ta sẽ cài Burp từ trang chủ của ***PortSwigger***.
Truy cập vào website http://portswigger.net/ để download Burp Suite bản mới nhất về. 

> Sẽ có 3 lựa chọn phiên bản Enterprise + Professional ( tốn phí hoặc có thuốc luôn rồi nha :)) và Community (bản miễn phí).
> 
> À mà tôi đang dùng bản Pro nha, đừng ai nghĩ tôi dùng thuốc nhá :joy:

![](https://images.viblo.asia/d182a0ed-d50b-4a81-9a10-e448102afb7f.PNG)

Do Burp Suite viết bằng  **Java**. Vậy nên, máy phải cài **Java** nếu muốn sử dụng Burp nhé. 
Sau khi download, chỉ cần chạy file .JAV  :v: à nhầm .JAR lên để mở chương trình.

![](https://images.viblo.asia/e5106e1a-fa66-406f-96f8-a05f206a76b5.PNG)

Chọn **tempo project** rồi cứ next cho đến khi vào ***dashboard***.
## 2.2 Cấu Hình
Burp được thiết kế để sử dụng cùng với trình duyệt. Nó hoạt động giống như một HTTP proxy server, và tất cả HTTP(S) traffic đều sẽ đi qua **Burp**. Trước khi tiến hành làm việc với Burp, cần cấu hình để trình duyệt của mình làm việc với nó.

Bước 1: Kiểm tra **option proxy** của Burp

![](https://images.viblo.asia/3deb8424-fcce-457e-bec6-410323f4d501.PNG)

Bước 2: Thay đổi **proxy setting** của **Web Browser** với proxy là **127.0.0.1** và **port 8080** sao cho khớp với **option proxy** của **BurpSuite**

![](https://images.viblo.asia/5acdc9d9-c732-4d21-bc64-70eda8ee4d0e.PNG)

Hoặc còn cách nữa là sử dụng extension **"Fox Proxy"** để chuyển đổi qua lại giữ proxy thường và proxy của **Burp** nhé. (**Fox Proxy** có trong cửa hàng Extension của Chrome và Addon của Firefox). Mình toàn xài cái này, vì nó tiện khỏi phải đổi qua đổi lại setting.

![](https://images.viblo.asia/dedede10-0832-4874-9010-d0644b66262c.PNG)

Bước 3: Test thử đã bắt được request chưa bằng cách bật ON ở tab **intercept** lên ở proxy lúc nãy lên sau đó lên 1 trang web nào đó.

![](https://images.viblo.asia/300d90c2-2a16-4d90-b621-077507225b3c.PNG)

Quay sang **Burp** kiểm tra đã bắt được request chưa ( không liên quan nhưng bài này hay cực nha :laughing: )

OK, vậy là xong phần cài đặt, chúng ta cùng vào món chính nào !!
# 3. Các Chức Năng Cơ Bản Của Burp Suite
## 3.1 TARGET
**TARGET** : là nơi chứa các thông tin tổng quan về web. Cho phép xem **site map** và điều chỉnh phạm vi mục tiêu và có thể được xác định bằng cách điền loại giao thức, host/IP, port.
Ngoài ra ở đây còn có thể chọn 2 option scan đó là **passive scan** và **active scan** mà mình sẽ nói ở phần dưới nha.

![](https://images.viblo.asia/c71a5b4c-cbb1-4ede-9bbd-7ac0b37495dd.PNG)

## 3.2 Proxy
**PROXY** : Tab Proxy hiển thị chi tiết các request đi qua Burp Proxy. Tại đây, bạn có các tùy chọn **Forward**, **Drop**, **Chỉnh sửa** hay chuyển sang các action khác **(repeater, intruder, etc...)** *(lấy lại cái hình lúc nãy)*

Thông tin về header và các thông tin của request được show lên ở phần bên phải là **INSPECTOR**
![](https://images.viblo.asia/300d90c2-2a16-4d90-b621-077507225b3c.PNG)

## 3.3 Intruder
**Intruder** : cho phép test ứng dụng web bằng cách gửi các **payloads** đã được định nghĩa trước lên server, sau đó xem xét kết quả trả về ( kiểu như **brute-force** vậy nha )

**VÍ DỤ** : Thử đăng nhập vào 1 trang web bằng tài khoản và mật khẩu đơn giản
- http://testphp.vulnweb.com/login.php => Mặc định tài khoản và mật khẩu là **test** 

Đầu tiên ta sẽ bắt gói tin khi login rồi sau đó ném sang **Intruder**

![](https://images.viblo.asia/3ed0e4dc-fdd1-4900-a0a7-4129c69d19d0.PNG)

Sau khi sang tab **Intruder** ta sẽ thấy đường link và port của website

![](https://images.viblo.asia/1b062b7d-b23f-4323-a0f7-ef95579abbdd.PNG)

Custom lại chỗ cần inject payloads vào
Ở đây là phần **uname** và **pass** được đặt trong cặp dấu $ ( tượng trưng chứ không phải nha :) ) ta có thể định dạng lại chỗ cần inject vào bằng cách thêm cặp dấu **đô-la** vào bằng cách bấm vào nút **Add đô-la** hay **clear đô-la**

![](https://images.viblo.asia/fcd344b7-b12c-46d4-a341-3f30fc984a91.PNG)

Sang phần **payloads**, có thể chọn **payloads** có sẵn hoặc tự custom ( ở đây mình chọn sẵn 1 cái list word simple có sẵn của Burp nhé ) => Sau đó bấm vào **Start attack**

![](https://images.viblo.asia/5ba00907-f3ea-4528-be7b-f67aba6c19fb.PNG)

Chúng ta sẽ kiểm tra request mà có **status code** trả về thành công => 200
![](https://images.viblo.asia/5800e53f-69a6-4a64-9cec-466adfa39f7f.PNG)

Đúng như mong đợi, username và pass đã login thành công đúng như tài khoản ban đầu.

## 3.4 Repeater
**Repeater** : Có thể tùy ý thay đổi và gửi lại những request khác nhau tới server. Đồng thời sẽ nhận về response từ server để có thể phân tích được gói tin ( cái này như reqbin vậy đó ). 
Chúng ta có thể bấm sang tab **repeater** bấm vào dấu edit để thêm host và port của **target**, sau đó nhập vào phần request ở khung bên trái rồi gửi đi.

![](https://images.viblo.asia/87132776-5418-40ea-9d9a-6c199a25a8f9.PNG)

Nhưng không, ở đây chúng tôi ít làm thế :) , đa số sẽ là redierect action bằng cách chuột phải vào phần request chọn vào **Send To Repeater** thì nó bay thẳng sang luôn sẽ có request sẵn từ trước nên không cần phải nhập lại nữa.

Ngoài ra chúng ta có thể chọn chế độ xem **reponse** là ***source code*** ở tab ***pretty*** hoặc ***raw***, còn xem như web thì ở tab ***render***

![](https://images.viblo.asia/e3118baa-fb35-4c0e-ab5e-fd54292d3c76.PNG)
![](https://images.viblo.asia/b4422240-cedb-4ee8-be56-4f59a78b88f3.PNG)

## 3.5 Scan (Passive/Active) với các Profile Built-in
Các phiên bản Burp sau này người ta đã lược đi các tab **Scanner** và **Spider** rồi, nên nếu xem các video hướng dẫn cũ sẽ không thấy tab Scanner và Spider đâu cã, thay vào đó nó nằm ở **Dashboard** phần **new scan** nhé :v

**VÍ DỤ** : Scan Audit trang lab của portswigger với url là https://portswigger-labs.net/

![](https://images.viblo.asia/326adbfc-3172-4567-b1d0-d830341d176c.PNG)

Có thể cấu hình lại hình thức scan bằng cách bấm vào tab **Scan Configuation** và chọn vào ***New -> Audit*** và chọn vào mục ***Issue Reported*** rồi chọn phương pháp scan nào tùy mọi người nhé.

![](https://images.viblo.asia/ac126525-98de-43d4-a28e-6a581fcc3afd.PNG)

Hoặc có thể scan theo **Library Built-in** hay là **Custom** nhé

![](https://images.viblo.asia/b0c88166-265d-4434-9cc7-1d6cc6e8c86c.PNG)

Ví dụ mình chọn 1 cái **Build-in** rồi chọn OK sau đó quay về **Dashboard** chờ đợi scan.

![](https://images.viblo.asia/abcf77b1-ec20-4999-bb5c-505f9ef605ff.PNG)

Ở bên phải phần **Issue Activity** sẽ xuất hiện danh sách các **Issue** phát hiện được trong lúc scan, chúng ta có thể bấm vào và xem các mô tả và request ở tab phía dưới.

![](https://images.viblo.asia/4eafb8a6-2063-403f-bff5-ec6f16e1276e.PNG)

Sau khi Scan xong ở bên tab **Tartget** sẽ có **sitemap** của website mà chúng ta đã scan

![](https://images.viblo.asia/604535e3-1b99-4ed6-b2eb-1e00e025174e.PNG)

Ngoài ra **Burp Suite** còn có thể cài được thêm các **extension** phục vụ cho các nhu cầu pentest khác như ***Spydir, Subfinder, etc...*** hoặc có thể là các extension do chính mình tự viết *( bằng Java nhé )*.
# 4. Tổng Kết
Tuy là chỉ dừng ở mức cơ bản, trong BurpSuite vẫn còn rất nhiều cái hay nhưng mà viết tới đây thì mình mỏi tay quá rồi :rofl: . 

Hy vọng bài viết sẽ giúp ích được gì đó cho các bạn đang bắt đầu học về tester cũng như là về BurpSuite. 

Bài viết sẽ có nhiều sơ sót, các bạn có thể đóng góp ý kiến thêm để các bài viết sau tốt hơn ạ. 

Chúc các bạn thành công!!!
# 5. Tham Khảo
- Documentation BurpSuite: https://portswigger.net/burp/documentation
- Book (Error 404 thì reload trang là ok nha mọi người) : https://digtvbg.com/files/books-for-hacking/Burp%20Suite%20Cookbook%20-%20Practical%20recipes%20to%20help%20you%20master%20web%20penetration%20testing%20with%20Burp%20Suite%20by%20Sunny%20Wear.pdf
- All Labs BurpSuite By PortSwigger: https://portswigger.net/web-security/all-labs