Hiện nay, các ứng dụng chat đang trở thành xu hướng phát triển nhằm tăng tính tương tác và kết nối tiện lợi cho người dùng mọi lúc, mọi nơi. Bạn có bao giờ tự hỏi, để xây dựng được messenger, zalo hay whatsapp cần công nghệ gì, code như thế nào? 

Ở trên mạng đã có rất nhiều bài viết xây dựng ứng dụng Chat với *React Native*, với sự trợ giúp của *Firebase*. Ưu điểm giải quyết phần lớn bài toán từ back-end, dựng database, cũng như có hỗ trợ push notification và theo mình đánh giá là tốc độ gọi API rất nhanh. Tuy nhiên, với bài viết này, mình muốn giúp các bạn có thể hiểu và làm tất tần tật mọi thứ, nhờ đó mà có thể nắm được luồng đi của một ứng dụng.

Bắt đầu thôi!

#### Vì các bước tạo lập ứng dụng khá “khoai” nên nội dung này sẽ được chia làm 4 phần như sau:
-	**Dựng Database với Heroku Postgres**
-	Xây dựng API cho ứng dụng Chat với Spring Boot
-	Deploy API lên Heroku
-	Xây dựng giao diện Chat đơn giản trên điện thoại với React Native

#### Kiến thức nền trong phần này:
-	Hiểu nền tảng các [câu lệnh SQL đơn giản](https://quantrimang.com/13-cau-lenh-sql-quan-trong-programmer-nao-cung-can-biet-136595) (mà ở đây là PostgreSQL).
-	Cách sử dụng công cụ Navicat hoặc công cụ quản lý CSDL nào bạn quen thuộc.

#### Bước 1: Tạo một tài khoản Heroku

![Imgur](https://i.imgur.com/5ruSEBf.png)

#### Bước 2: Tạo một dự án (project) mới trong Heroku

![Imgur](https://i.imgur.com/7OxD3JW.png)

![Imgur](https://i.imgur.com/82IUQzS.png)

*Lưu ý: App name chỉ gồm chữ thường và có dấu gạch nối (do heroku quy định). Để tránh trường hợp bị conflict (mâu thuẫn) domain, ngay tại bước này bạn nên đặt một tên khác theo ý thích của mình.*

#### Bước 3: Dựng Database với Heroku Postgres
Sau khi **Create App** ở bước 2, bạn chuyển sang tab **Resources**, trong phần **Add-ons** hãy tìm và chọn *Heroku Postgres*.

![Imgur](https://i.imgur.com/6pqPIHP.png)

![Imgur](https://i.imgur.com/6ebThuQ.png)

Sau khi nhấp Provision, ta sẽ được như hình bên dưới. Hãy làm theo các số thứ tự bên dưới nhé:

![Imgur](https://i.imgur.com/rtdGYB7.png)

![Imgur](https://i.imgur.com/kISFblx.png)

![Imgur](https://i.imgur.com/Jnipex6.png)

Đây là những thông tin cần thiết để kết nối với database, giúp cho bạn trích xuất dữ liệu dễ dàng thông qua các công cụ hỗ trợ. Hãy lưu các thông tin này lại nhé.

#### Bước 4: Kết nối database (cơ sở dữ liệu)
Ở đây mình sẽ sử dụng công cụ Navicat dùng để kết nối database. Các bạn có thể xem hướng dẫn cài đặt tại [đây](https://tiennava.com/navicat-premium-12-full-key-huong-dan-crack-chi-tiet.html).
Sau khi cài đặt thành công, hãy làm theo như các hình bên dưới.

![Imgur](https://i.imgur.com/CPVrF74.png)

![Imgur](https://i.imgur.com/bQFR8x2.png)

Hộp thoại này sẽ lưu các thông tin kết nối database ở bước 3. Các bạn có thể chọn **Test Connection** trước để xem có lỗi gì không trước khi chọn OK.
Sau khi kết nối thành công, các bạn nhấp đúp chuột ở **“ChitChatDB-heroku”** để mở kết nối, sau đó nhấp nút trái chuột để **New Query**

![Imgur](https://i.imgur.com/KeaIWtZ.png)

#### Bước 5: Tạo bảng MESSAGES
Nhập dòng code sau để tạo bảng *MESSAGES*
```sql
CREATE TABLE MESSAGES(
   ID 		SERIAL PRIMARY KEY,
   USERNAME VARCHAR(50),
   PASSWORD VARCHAR(50),
   MESSAGES VARCHAR(355),
   STATUS   SMALLINT,
   CREATED_ON TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
Sau khi chạy câu truy vấn này thành công, các bạn có thể *INSERT* 1,2 dòng dữ liệu và thực hiện *SELECT* thử.
```sql
INSERT INTO MESSAGES (USERNAME, PASSWORD, MESSAGES, STATUS) VALUES
    ('bienthaikieusa', '123', 'hello!', 1);
```
```sql
SELECT * FROM MESSAGES;
```
Nếu thành công, thì sẽ có kết quả như sau:

![Imgur](https://i.imgur.com/QBXi0Xh.png)

Kiểm tra lại trang Heroku ở bước 3 và chuyển sang tab **Overview**, ta sẽ thấy kết quả như sau:

![Imgur](https://i.imgur.com/90QKu99.png)

Như các bạn đã thấy, ở đây chúng ta đã có 1 table và 1 row, phản ánh đúng như những gì đã thấy trong Navicat. Đến đây, các bạn đã thành công trong việc dựng Database với Heroku Postgres.

Nếu bạn thấy bài viết này hữu ích và muốn tiếp tục đọc các phần tiếp theo về chủ đề này, đừng ngần ngại like bài viết hay comment ý kiến của mình nhé.