## Google cloud là gì?
Google Cloud Platform (GCP) là nền tảng điện toán đám mây cho phép doanh nghiệp, tổ chức xây dựng và chạy các ứng dụng của mình trên chính hệ thống mà Google xây dựng. Các ứng dụng phổ biến của Google sử dụng Google Cloud Platform đang rất được ưa chuộng hiện nay đó là: Google Search, Google Maps, Google Apps, Chrome, Youtube, …
Hiện tại GCP để cạnh tranh với Amazon thì họ đang khuyễn mãi 300$ cho những người đăng ký sử dụng dịch vụ của họ. Tự dung có 300$ dùng 1 năm tại sao không sử dụng đúng không ạ. Vậy trong bài viết này mình sẽ hướng dẫn mọi người các đăng ký và tạo một database sử dụng SQL hoàn toàn miễn phí, sẽ rất phù hợp cho project làm việc nhóm mọi người sẽ có thể sử dụng chung database mà hoàn toàn miễn phí  trong 1 năm. 

## Đăng ký Google Cloud Platform
Đầu tiên cần đăng nhập tài khoản google hay chính là Gmail và truy cập vào trang chủ của Google Cloud

https://cloud.google.com

Một khung dùng thử sẽ hiện ra 
![](https://images.viblo.asia/937596c2-e36a-426a-a446-e0edeb6b6f56.png)
Nhập vào các thông tin cần thiết của bạn.
 
Điều quan trọng ở đây là bạn cần phải khai báo một phương thức thanh toán (Payment method), chẳng hạn thông qua VISA để kiểm tra đảm bảo các thông tin bạn khai báo là chính xác. 1$ sẽ bị trừ khỏi tài khoản của bạn, nhưng google sẽ trả lại bạn 1$ sau đó vài ngày. Nếu bạn không có VISA có thể đăng ký 1 thẻ VISA ảo của TPB ở đây app.emoney.tpb.vn và nạp vào 30.000 để google xác nhận khi bạn đăng ký VPS.

![](https://images.viblo.asia/ddb1b5a2-96f7-4b3e-b764-5756fba6bfa3.png)

## Tạo database và cấu hình database sử dụng SQL
Đầu tiên sau khi đã đăng ký thành công google sẽ chuyển đến một trang dashboard với các tính năng của mình. Ở phần này ta chọn vào thanh bar bên góc trái để show ra nhưng tính năng mà nhà cung cấp đang có. Ta sẽ tìm và chọn vào mục SQL

![](https://images.viblo.asia/b80d6be5-d204-4b55-b9e6-2a28b7aae17b.png)

Tiếp đến chọn Create Instance
![](https://images.viblo.asia/9cd185e5-3c68-44ba-937a-e13ef1bcbd3e.png)

Chọn MySQL
![](https://images.viblo.asia/371c09d3-1825-4ecc-866c-285c51339389.png)

Tiếp đến chọn thế hệ của MySQL và google khuyên dùng  Choose Second Generation. Và ta cũng sẽ chọn thế hệ này.
![](https://images.viblo.asia/fec1cb73-d287-4040-8883-86bbcc57dd34.png)

Tiếp đến là thiết lập thông tin cho Instance ID. Mục password chúng ta nên để là no password, phần chọn khu vực nên chọn khu vực đông nam á (asia-southeast1) vì càng gần mình thì tốc độ sẽ càng nhanh.
![](https://images.viblo.asia/0e5f99ca-815e-436b-9a32-f7b7a1da3c46.png)

![](https://images.viblo.asia/20f45655-df9f-4bb5-8613-cd507c653d35.png)

Và Create để tạo database

![](https://images.viblo.asia/994328a5-b0d6-4e55-9dfb-f05c69a67e85.png)

![](https://images.viblo.asia/7902bfe7-1c75-4879-99e0-f25d1d20b35e.png)

Chúng ta sẽ phải đợi từ 5-7 phút để database được tạo

![](https://images.viblo.asia/334d7afb-d6a8-4147-855c-d1db66fd4143.png)

khi dấu tích xanh đã hiện tức database đã được tạo thành công. Bước tiếp theo chúng ta sẽ cấu hình tài khoản và ip public để có thể kết nối đến database bằng các trình quản lý database khác.

Giờ đến phần cấu hình chúng ta sẽ vào bên trong database và chọn đến phần Users.

![](https://images.viblo.asia/c7b84212-d154-41af-80fe-5aa904425723.png)


Mặc định sẽ có 2 tài khoản là root và mysql.sys	. Chúng ta có thể vào thay đổi mật khẩu hoặc tạo 1 tài khoản mới cho riêng mình.

![](https://images.viblo.asia/9d3a90ce-0317-4a1c-8796-b0e0c7ba591a.png)

sẽ đợi database cập nhật và tiếp đến chúng ta sẽ cấu hình ip public để truy cập từ xa.

![](https://images.viblo.asia/d975688d-17ef-446e-bbc3-bdc7ab3ce2c6.png)

Tại đây ta sẽ cấp cho những ip nào được phép truy cập vào database. Chú ý là sẽ sử dụng IPv4 để tránh trường hợp tìm kiếm bằng MyIP trên google sẽ ra IPv6 sẽ không phù hợp với chuẩn.

![](https://images.viblo.asia/ffd5161d-f4b6-43a4-9a20-a01409387690.png)

![](https://images.viblo.asia/6270a22f-a183-4675-b3bb-7e2c07ac49dc.png)

![](https://images.viblo.asia/8d093ed7-1251-4b5b-9673-94ef3c2e7822.png)

Add vào IP Public và save lại

![](https://images.viblo.asia/79cfd5be-1698-4291-af63-d78061856dcf.png)

Tiếp đến là kết nối với trình quản lý mà trong bài này mình sẽ sử dụng Navicat một cung cụ cực kỳ hữu dụng. Chắc bài sau mình sẽ hướng dẫn crack và sử dụng phần mềm này.

Đầu tiên sẽ tạo kết nối đến database

![](https://images.viblo.asia/036d7ff1-f1d1-4169-bd40-d6342e8a3b19.png)

Quay lại trang GCP và  coppy địa chỉ của database sau đó dán vào natvicat

![](https://images.viblo.asia/6be4c07d-28cc-4e77-86d8-57544c2a7e63.png)

sử dụng tài khoản chúng ta vừa tạo để đăng nhập. Chọn Test Connection

![](https://images.viblo.asia/79bb67b7-dec4-46db-bcd7-31316fb8651d.png)

Vậy là đã tạo kết nối thành công. Bây giờ chỉ việc sử dụng và trải nghiệm thôi :D :D 

![](https://images.viblo.asia/326e2884-cf41-4053-b78a-2a25d02fd9b0.png)

Chuột phải vào kết nối và tạo database mới

![](https://images.viblo.asia/8a8d15cc-8234-40be-bcdb-8bebafe8ab07.png)

![](https://images.viblo.asia/44f68ba4-bbe4-48ce-9945-dfe763b001ce.png)

Vậy là giờ có thể tạo bảng kết nối một cách thật dễ dàng rồi

![](https://images.viblo.asia/cc8a5540-850e-48df-9366-0a94184645a0.png)

## Kết luận
Còn đợi chờ gì nữa chỉ cần có một tài khoản ngân hàng visa là bạn đã có 1 năm sử dụng dịch vụ GCP miễn phí, làm những việc mình thích đặc viết phù hợp với sinh viên kinh tế không được quá dư dả.

Phần tiếp theo mình sẽ làm một bài về công cụ Naicat này và hướng dẫn crack nó luôn ;) ;)