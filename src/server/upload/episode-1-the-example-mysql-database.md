**Giới thiệu về 1 ví dụ của cơ sở dữ liệu MySql**

Bắt đầu bài học đầu tiên, tôi sẽ giới thiệu đến các bạn 1 ví dụ cơ bản của cơ sở dữ liệu mysql. Chúng ta sẽ truy cập vào link https://dev.mysql.com/doc/sakila/en/ để download 1 ví dụ về cơ sở dữ liệu chuẩn.

![](https://images.viblo.asia/fe98aa71-290f-43db-a8fb-47e5afd8efec.png)

Sau đó chọn mục ***4 Installation***

![](https://images.viblo.asia/45d77d10-f280-488b-bb82-29407b27362c.png)

Tiếp đến chúng ta sẽ click vào link  https://dev.mysql.com/doc/index-other.html . Trang sẽ chuyển tiếp và kéo xuống title ***Example Databases*** chọn sakila database và download về theo dạng gì thì tùy ý. Ở đây mình sẽ download bản Zip về.

![](https://images.viblo.asia/cc7bbc8f-8d46-4bf1-bc6c-3aacbb8300eb.png)

Hoặc đơn giản hơn thì chúng ta có thể tải trực tiếp tại link http://mysql-tools.com/downloads/mysql-databases/4-sakila-db.html. Mình muốn giới thiệu trang https://dev.mysql.com vì nó vô cùng hữu ích khi các bạn sử dụng mysql.

Okie, phần tải cở sở dữ liệu ví dụ đã xog. Giờ chúng ta sẽ cùng import mysql vào và cùng nghiên cứu xem nhé. Có rất nhiều các tools hỗ trợ việc thao tác trên mysql và hiện tại thì mình đang dùng ***NaviCat***.

![](https://images.viblo.asia/e527d76f-ff4b-46e8-b846-67588670ae70.png)

Để thực hiện import với NaviCat, đơn giản là mình vào folder vừa download giải nén ra, chuột phải vào file ***sakila-schema.sql*** chọn Open With đương nhiên là với ***NaviCat***
![](https://images.viblo.asia/48a16b67-ac85-45fb-ad50-6e9b9fdd755a.png)

Tiếp đó, chúng ta sẽ chọn connection *localhost* và trước đó mình đã tạo sẵn 1 database mới tên là *sakila*
![](https://images.viblo.asia/2192af97-50e6-472e-8c93-231fc1cf7184.png)

Ấn Ok và phần code mysql đã được đưa vào trong database *sakila*. Giờ đơn giản là ấn ***Run*** sau đó chờ trong giây lát để thực hiện việc tạo table
![](https://images.viblo.asia/4aa4ae68-1946-4093-b4f5-d55962d8567d.png)

![](https://images.viblo.asia/d17ce2ad-4714-486f-9c46-53b7c2a5de2b.png)

Vậy là phần chạy mysql đã xong và có kết quả báo về, hãy refesh database bằng ***Command + R với Mac***
![](https://images.viblo.asia/42ba8688-d69d-4665-9c16-24d7bb2b25df.png)

Okie thế là phần tạo bảng đã xong, làm tương tự với file *sakila-data.sql*. Chúng ta sẽ có toàn bộ các data của các bảng.
![](https://images.viblo.asia/6a857bb1-fa1d-4331-abc0-7cbb6fafa5a6.png)


**Vậy là chúng ta đã được giới thiệu sơ qua về việc import cơ sở dữ liệu ở bài mở đầu này. Bài tiếp theo chúng ta sẽ đi sâu hơn vào các khái niệm, định nghĩa về khóa chính, khóa phụ và quan hệ giữa các bảng với nhau. Hẹn gặp lại mọi người vào bài học tiếp theo**