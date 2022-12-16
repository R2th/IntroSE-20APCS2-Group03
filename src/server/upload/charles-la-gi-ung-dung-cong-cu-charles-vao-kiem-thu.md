## Mở đầu.
Đối với việc kiểm thử ứng dụng hay app, khi muốn check việc gọi API xem ứng dụng đó gọi API nào hay API nào được gọi trước hoặc là muốn kiểm tra dữ liệu truyền đi / trả về có đúng với mong đợi không?

Thường những việc như vậy chúng cần phải nhờ dev debug để check logs để kiểm tra các request, gọi api, response và HTTP headers ,....

Hôm nay được “một chị QA pro” khai sáng thêm được một phương pháp. Đó là dùng Charles Proxy, sau tìm hiểu mình muốn chia sẻ và demo lại cách cài đặt cũng như sử dụng công cụ này để đội QA đỡ phiền các anh dev.

## Charles là gì?
Charles là một web proxy (HTTP Proxy / HTTP Monitor) cho phép lập trình viên/tester có thể theo dõi toàn bộ thông tin HTTP và SSL/HTTPS giữa thiết bị như browser/mobile tới Internet, bao gồm request, response và HTTP headers (bao gồm cả cookie và cache).
Tình huống mình nghĩ đến là sẽ là thiết lập một kết nối giữa điện thoại mình - thiết bị test ứng dụng WSM-android và máy tính windows thông qua Charles.
Một số chức năng chính mà QA thường sử dụng của Charles tool:

* SSL Proxying – xem SSL requests and responses
* Bandwidth Throttling – dùng để test với những đường truyền khác nhau (giới hạn tốc độ đường truyền)
* AJAX debugging – xem XML and JSON requests and responses theo dạng cây thư mục hoặc dạng text
* Repeat requests to test thay đổi back-end
* Edit requests – để test nhiều inputs
* Breakpoints để chỉnh sửa requests và responses

## Cách cài đặt charles
Ứng dụng Charles hiện có trên cả 3 nền tảng Mac, Linux, Windows, các bạn có thể tải về tại địa chỉ: https://www.charlesproxy.com/download/.

Ở đây mình đang cài đặt và sử dụng charles trên windows. 

Cách cài đặt charles vô cùng đơn giản, như các phần mềm thông dụng khác. các bạn thực hiện theo các hình bên dưới này là được: 
![](https://images.viblo.asia/ea48352d-0dec-4cf4-bd27-e2e327e28f1f.png)


![](https://images.viblo.asia/2e3d0ec2-3830-4a00-a939-58bcce136e86.png)


![](https://images.viblo.asia/76e2dfed-c16e-476d-b289-0202676e64dc.png)


![](https://images.viblo.asia/8ede6632-6c9e-41c4-ac0a-d4608f6f3615.png)

Tới đây thì các bạn đã hoàn thành xong việc cài đặt charles rồi đó.

## Sử dụng charles như thế nào ?

Sau khi các bạn đã cài đặt thành công, khi mở ứng dụng các bạn sẽ thấy được giao diện trên máy tính là như thế này : 

![](https://images.viblo.asia/67a323cf-7ba3-4406-a163-ebe8a61327cb.png)

*Vô tình để lộ dàn cực phẩm của Sun* * =))


![](https://images.viblo.asia/46251def-e580-4b84-bdab-4d78fa1cec8d.png)


**Bước 1:** Mở Charles sau đó chọn Proxy -> Proxy Settings
 
![](https://images.viblo.asia/852c76d2-cc35-4fb0-a49f-8d51d534f37c.png)


**Bước 2:** Trong tab Proxies, nhập 8888 trong phần HTTP Proxy Port

![](https://images.viblo.asia/d9dea4fc-5980-4005-9e23-ac7f47079b56.png)

**Bước 3:** Bạn chọn Proxy -> SSL Proxying Settings

![](https://images.viblo.asia/80b6e125-55e4-472d-9e96-47b81fc8706c.png)

**Bước 4:**  Click vào tab [SSL Proxying] và check vào [Enable SSL Proxying] để cài đặt web domain bạn muốn test. Sau đó nhấn vào nút [Add]. 


![](https://images.viblo.asia/9fea466f-9118-4be6-ae26-01dd9bebde76.png)


Vậy là chúng ta đã hoàn thành xong phần thiết lập trên máy tính : 

![](https://images.viblo.asia/2ab76823-e954-4129-ba1f-f9b6dc58dc59.png)

## Setup cho thiết bị hoặc device 

Ở đây mình sẽ setup cho điện thoại coloros 6 -  android 9

**Bước 1:** Lấy Ip của máy tính:
Trước hết bạn cần kiểm tra ip máy tính bằng cách vào command line gõ  ipconfig   hoặc đi đến Network and Internet sharing để lấy Ip4 của máy bạn.,  IP này sẽ sử dụng ở phần setting tiếp theo của Mobile. 

Nếu các bạn chưa biết cách lấy IP máy có thể xem qua các link hướng dẫn lấy IP này nhé: 
Windows : https://quantrimang.com/huong-dan-cach-xac-dinh-dia-chi-ip-tren-may-tinh-88276
Mac : https://www.wikihow.vn/X%C3%A1c-%C4%91%E1%BB%8Bnh-%C4%91%E1%BB%8Ba-ch%E1%BB%89-IP-tr%C3%AAn-m%C3%A1y-t%C3%ADnh-Mac
Ubuntu : https://thuthuat.taimienphi.vn/cach-check-dia-chi-ip-tren-linux-30151n.aspx

**Bước 2:** Vào wifi mình đang kết nối (GIAO THUY). Sau đó Modify network/Chi tiết.

![](https://images.viblo.asia/4ca63625-6c74-4c76-afe9-998e5b9cdff3.png)

**Bước 3:** Tiếp đến Advanced Options/Nâng cao, cuộn xuống Proxy rồi chọn Manual/Thủ công

![](https://images.viblo.asia/83c9cdd3-49e0-47d8-81e3-ace2a7e32529.png)


**Bước 4:** Thêm Proxy 

- Ở ô Proxy Hostname chọn IP của máy tính đã lấy ở trên. Ở đây là 192.168.1.168
- Ở ô Proxy port là 8888

![](https://images.viblo.asia/7e234076-f538-4c89-b0bc-c5d54520d078.png)

**Bước 5:** Sau đó Save lại. Sẽ có một popup thông báo có một kết nối từ điện thoại của bạn tới Charles. Mình Allow là được.

Muốn kiểm tra đã kết nối hay chưa vào Proxy -> Access Control Settings

Ví dụ điện thoại mình vừa thêm có IP là 192.168.1.22

![](https://images.viblo.asia/dd154aa6-3df9-4e99-990b-1860f7934690.png)

Tuy nhiên, Vì dữ liệu truyền qua HTTPS đều đã được mã hóa, nên để Charles có thể theo dõi và đọc được các kết nối HTTPS, client cần phải cài đặt và trust CA Certificate từ Charles cho phép quyền

##  Cài đặt SSL Certificate
**Bước 1:**  Bạn vào trình duyệt trên điện thoại sau đó nhập địa chỉ chls.pro/ssl hoặc http://charlesproxy.com/getssl và download SSL certificate về.

**Bước 2:**  Sau khi download xong certificate, click vào để mở file đó. Android sẽ hiển thị một dialog để bạn cài đặt file này, nhập tên chứng chỉ sau đó nhấn OK. Tên chứng chỉ bạn nhập bất kì

![](https://images.viblo.asia/1cb69ff7-47d8-4654-9827-24ded53f4049.png)

Nếu có yêu cầu tạo mật khẩu bạn cứ tạo bình thường.
Và đây là kết quả trên màn hình charles khi truy cập từ điện thoại mình đã cấu hình:
Kết quả trả về có thể kiểm tra được 1 số thông tin cơ bản như  Status (Complete), protocol(1.1), response code trả về (200 OK), phương thức (GET.)....

![](https://images.viblo.asia/f3fd1ba5-8150-4b9b-b777-3bdad0020e54.png)

## Kết luận
Để phục vụ cho 1 số dự án mobile nên mình tìm hiểu sơ bộ và giới thiệu lại ứng dụng này, ở mức “Giới thiệu” bạn thao tác để khám phá thêm nhé! 

Ngoài ra chúng ta còn có thể có các app khác như proxyman - 1 featured app trên Product Hunt (https://www.producthunt.com/posts/proxyman). Các bạn có thể khám phá thêm.

## Tham khảo
https://viblo.asia/p/charles-ung-dung-cong-cu-charles-vao-kiem-thu-Qbq5Q1A45D8

https://www.charlesproxy.com/

https://medium.com/@hackupstate/using-charles-proxy-to-debug-android-ssl-traffic-e61fc38760f7